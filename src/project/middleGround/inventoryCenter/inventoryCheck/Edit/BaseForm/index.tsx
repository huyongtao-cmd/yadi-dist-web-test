import { ElCard, ElForm, ElPage, ElRowContainer } from '@/components/el';
import { SaveWhite } from '@/components/el/ElIcon';
import { getFormItems } from './config';
import React from 'react';
import { Button } from 'antd';
import { asserts, maths } from '@/utils';
import * as service from '../../service';
import { clone } from 'ramda';
interface Props {
  formRef: any;
  onRef: any;
  editTableRef: any;
  formData: Object;
  loading: any;
  type: String;
  getInvDisabled: boolean;
  resetCheckDisabled: boolean;
  handleButtonDisabled: Function;
  handleResetDetails: Function;
}
class CheckBaseForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      whRef: null,
    }
  }

  whRef = (ref) => {
    this.setState({
      whRef: ref
    })
  }

  onValuesChange = async (changedFields) => {
    const { buId = '', whId = '', docMethod = '' } = changedFields;
    if (asserts.isExist(buId)) {
      this.props.editTableRef.clearRows();
      this.props.loading(true);
      this.props.formRef.setFieldsValue({
        whId: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map(item => item.id);
      const data = {
        current: 1,
        size: 9999,
        buId: buId?.id,
        storeIds
      };
      const res = await service.findOneInv(data);
      this.props.loading(false);
      if (res.success) {
        const param = res.data.records?.map(item => {
          if (item.whStatus === 'ACTIVE') {
            return {
              value: item.id,
              label: item.whName
            }
          }
        }).filter(Boolean);
        this.state.whRef.setList(param);
        this.props.formRef.setFieldsValue({
          whId: param[0] && param[0].value
        })
      }
    }

    if (whId) {
      this.props.editTableRef.clearRows();
    }

    if (docMethod) {
      await this.props.editTableRef.quitEditState();
      const tableData = await this.props.editTableRef.validateTableRows();
      // const ids = tableData.data.map(item => item.id);
      // this.props.editTableRef.updateRows({
      //   docMethod,
      // }, ids);
      const data = tableData.data?.map(item => {
        return {
          ...item,
          docMethod,
        }
      })
      await this.props.editTableRef.clearRows();
      this.props.editTableRef.addRows(data);

    }
  }

  // 获取账面库存
  getInvDetail = async () => {
    await this.props.editTableRef.quitEditState();
    await this.props.formRef.validateFields().then(async values => {
      console.log(values, 'valuesvaluesvalues');
      const { buId = '', whId = '', docMode = '', docMethod = '' } = values;
      this.props.loading(true);
      const params = {
        buId: buId?.id,
        whId,
        itemType: docMode === 'C' ? '' : docMode
        // buId: '24',
        // whId: '418481155286822912',
        // itemType: 'ALL'    // todo
      }
      const res = await service.getInvsByBase(params);
      console.log(res, 'resresresresres');
      this.props.loading(false);
      if (res.success) {
        this.props.handleButtonDisabled('getInv', true);
        console.log(this.props.editTableRef, 'reoroeor');
        const tableData = await this.props.editTableRef.validateTableRows();
        console.log(tableData, 'tableDatatableDatatableData');
        // 过滤库存数不为0的数据
        const filterData = res.data.filter(item => item.accQty);
        // 明细没有数据  直接添加
        if (tableData.data.length === 0) {
          const dataSource = filterData.map(item => {
            return {
              ...item,
              id: maths.genFakeId(-1),
              itemName: {
                id: item.itemId,
                itemName: item.itemName,
                itemCode: item.itemCode,
                brand: item?.brand,
                brandName: item?.brandName
              },
              dbrand: item?.brand,
              itemType: {
                udcVal: item.itemType,
                valDesc: item.itemTypeName,
              },
              uom: {
                udcVal: item.uom,
                valDesc: item.uomName
              },
              docMethod,
              buId: buId?.id,
              whId,
              serialNoList: [],
            }
          })
          console.log(dataSource)
          this.props.handleResetDetails(dataSource);
        } else {
          // 明细有数据 需替换或添加 
          let arr1 = [];
          let arr2 = [];
          if (tableData.data.length > filterData.length) {
            arr2 = clone(tableData.data);
            arr1 = clone(filterData);
          } else {
            arr2 = clone(filterData);
            arr1 = clone(tableData.data);
          }
          tableData.data.forEach(item => {
            let qty = 0;
            filterData.forEach(itm => {
              if (item.itemName?.id === itm?.itemId) {
                // 相同的话实际数量加1
                qty += 1;
              }
            });
            item.factQty += qty;
          });

          console.log(arr2, 'arr2', arr1, 'arr1');

          let result = [];
          for (let i = 0; i < arr2.length; i++) {
            let itemId = typeof arr2[i].itemName === 'object' ? arr2[i].itemName?.id : arr2[i].itemId;
            let isExist = false;
            for (let j = 0; j < arr1.length; j++) {
              let itemId1 = typeof arr1[j].itemName === 'object' ? arr1[j].itemName?.id : arr1[j].itemId;
              if (itemId1 == itemId) {
                isExist = true;
                break;
              }
            }
            if (!isExist) {
              result.push(arr2[i]);
            }
          }
          console.log(result);
          let newData = [];
          if (result.length > 0) {
            const flag = result.every(item => !item.id);
            console.log(flag, 'flagflagflag')
            // 说明是请求到的数据
            if (flag) {
              result.forEach(itm => {
                itm.id = maths.genFakeId(-1);
                itm.itemName = {
                  id: itm.itemId,
                  itemName: itm.itemName,
                  itemCode: itm.itemCode,
                  brand: itm?.brand,
                  brandName: itm?.brandName
                };
                itm.dbrand = itm?.brand;
                itm.itemType = {
                  udcVal: itm.itemType,
                  valDesc: itm.itemTypeName,
                };
                itm.uom = {
                  udcVal: itm.uom,
                  valDesc: itm.uomName
                };
                itm.docMethod = docMethod;
                itm.buId = buId?.id;
                itm.whId = whId;
                itm.serialNoList = [];
              }
              );
              console.log(result, 'resultresultresultresult')
              newData = tableData.data.concat(result);
            } else {
              newData = tableData.data;
            }
            console.log(newData, 'dataSourcedataSource')
            this.props.handleResetDetails(newData);
            console.log(this.props.editTableRef, '000000000')
          }
        }
      }
    }).catch(error => {
      throw (error);
    });
  }

  // 重置盘点
  resetCheck = async () => {
    this.props.formRef.resetFields();
    this.props.editTableRef.clearRows();
    this.props.handleButtonDisabled('reset', false);
  }



  render() {
    return (
      <>
        <ElForm
          data={this.props.formData}
          onRef={this.props.onRef}
          formProps={{
            onValuesChange: this.onValuesChange,
            items: getFormItems(this.props.type, this.whRef, this.props.getInvDisabled)
          }}
        />
        <div style={{ marginLeft: '60px', display: !this.props.type ? 'block' : 'none' }}>
          <Button type='primary' onClick={this.getInvDetail} style={{ marginRight: '20px' }} disabled={!!this.props.getInvDisabled}>获取账面库存</Button>
          <Button type='primary' onClick={this.resetCheck} disabled={!!this.props.resetCheckDisabled}>重置盘点</Button>
        </div>
      </>

    )
  }
}

export default CheckBaseForm;