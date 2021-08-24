import React from 'react';
import { ElNotification, ElEditTable, ElForm } from '@/components/el';
import { maths } from '@/utils';
import { Statistic } from '@/components/el/ItemComponent';
import { getTableColumns, getTableActionButtons, getFormItems } from './config';
import WholeItemModal from '@/project/components/el/Modal/WholeItemModal';
import * as service from '../service';
import { Button } from 'antd';
import { isEmpty, isNil } from 'ramda';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  totalNum: Number;
  totalPrice: Number;
  nums: number;
  allamt: number;
  setnums: any;
  delnums: any;
  computedSum: any;
  handleLoading: Function;
  handleOutSubmit: Function;
}

interface State {
  itemModalRef: any;
  defaultSearchData: any;
  paramData: any;
  invFormRef: any;
  searchModeDisabled: any
}

class DetailTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      itemModalRef: null,
      defaultSearchData: {},
      paramData: {},
      invFormRef: null,
      searchModeDisabled: 0,
    }
  }

  componentDidMount() { }

  getInvFormRef = (ref) => {
    this.setState({
      invFormRef: ref,
    })
  }

  // 点击新增事件
  // handleAdd = async () => {
  async handleAdd() {
    // console.log('新增11');
    const validateFields = await this.props.formRef.validateFields(); //基本数据的值所有制
    const whId = validateFields.whId // 仓库id
    const buId = validateFields.storeId
    await this.props.editTableRef.quitEditState();
    const dataList = this.props.editTableRef.getRows();
    console.log(dataList, dataList.length, 'dataListdataListdataList')
    this.setState({
      paramData: {
        whId,
        buId,
        searchMode: 'item',
      },
      searchModeDisabled: dataList.length
    });
    this.state.itemModalRef && this.state.itemModalRef.setModalVisible(true);
    // 新增数据的内容
    // this.props.editTableRef.addRow({
    //   id: maths.genFakeId(-1),
    //   whId,
    //   buId
    // });
    // const data = this.props.editTableRef.getRows();
    // // const records = this.props.editTableRef.getActiveRecord();
    // // console.log(data, 'data', records)
    // // this.props.setnums(data, records, qty, amt)
  }

  //  退出编辑状态
  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    const data = this.props.editTableRef.getRows();
    this.props.delnums(data);
    if (data.every(item => item.ohQty)) {
      this.props.handleOutSubmit(false);
    } else {
      this.props.handleOutSubmit(true);
    }
  }

  onChange = (a) => {
    console.log(a)
    // this.getToTal(a)
  }

  onPressEnter = async (e) => {
    this.props.editTableRef.quitEditState();
    // 验证
    const baseInfo = await this.props.formRef
      .validateFields(['storeId', 'whId', 'custCode'])
      .catch((cb) => {
        const { storeId, whId, custCode } = cb.values;
        let flag1 = isNil(storeId) || isEmpty(storeId) ? '【门店】' : '';
        let flag2 = isNil(whId) || isEmpty(whId) ? '【仓库】' : '';
        let flag3 = isNil(custCode) || isEmpty(custCode) ? '【二网客户】' : '';
        ElNotification({
          type: 'warning',
          message: `请选择基础信息` + flag1 + flag2 + flag3
        });
        return Promise.reject();
      });
    const invFormValues = this.state.invFormRef?.getFieldsValue();
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    console.log(baseInfo, 'ppppp')
    let paramInfo = {
      buId: baseInfo.storeId,
      whId: baseInfo.whId,
      // storeIds,
      serialNo: e.target.value
    }
    this.props.handleLoading(true);
    const res = await service.findSerialNoOnesSalOut(paramInfo);
    // const res = await service.findSerialNoOnes(e.target.value);
    this.props.handleLoading(false);
    this.state.invFormRef.setFieldsValue({
      docNo: ''
    })
    const tableData = await this.props.editTableRef.validateTableRows();
    console.log(tableData, 'tableDatatableDatatableData')
    const itemIdList = tableData.data?.map((item) => item.itemId);
    const newData = tableData.data?.filter(
      (item) => item.itemId?.id === res.data?.itemId
    );

    if (res.success) {
      if (res.data?.itemType === 'ALL') {
        //商品为整车
        console.log(invFormValues, 'invFormValuesinvFormValues');
        if (invFormValues.flag && invFormValues.flag[0] === true) {
          //勾选冲销
          console.log(tableData, '勾选冲销');
          if (newData.length === 0) {
            //没有商品明细
            ElNotification({
              type: 'warning',
              message: '没有对应的商品明细，请检查！'
            });
          } else {
            if (!newData[0].serialNoList.includes(res.data?.serialNo)) {
              //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '没有找到对应商品，请检查！'
              });
              return;
            }
            if (newData[0].qty === 1) {
              this.props.editTableRef.removeRowByKey(newData[0].id, 'rowKey');
              const data = this.props.editTableRef.getRows();
              this.props.computedSum(data);
            } else {
              const serialNoList = newData[0].serialNoList?.filter(
                (item) => item !== res.data?.serialNo
              );
              this.props.editTableRef.updateRows(
                {
                  qty: newData[0].qty - 1,
                  amt: maths.rounds(
                    maths.mul(newData[0].price || 0, + newData[0].qty - 1 || 0),
                    2
                  ),
                  // amt: maths.rounds(maths.mul(newData[0].price, + qty || 0), 2); // 数量*金额
                  discRatio: 100,
                  discAmt: 0,
                  serialNoList: serialNoList
                },
                [newData[0].id]
              );
            }
          }
        } else {
          //不勾选冲销
          console.log(newData, 'newData', tableData, res.data);
          if (newData.length === 0) {
            //扫码为整车且不存在明细时
            // const whId = res.data?.whId;
            // const itemId = res.data?.itemId;
            // this.props.handleLoading(true);
            // const qtyres = await service.findPage({ whId, itemId });
            // this.props.handleLoading(false);
            // if (qtyres.success == false) {
            //   ElNotification({
            //     type: 'error',
            //     message: res.message || res.msg || '操作失败！'
            //   });
            //   return;
            // } else {
            // console.log(qtyres, 'res.datares.datares.datares.datares.data');
            await this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemId: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName,
              },
              qty: 1,
              discRatio: 100,
              discAmt: 0,
              price: res.data?.whSalePrice,
              // ohQty: qtyres.data?.records[0]?.ohQty || 0,
              ohQty: res.data.ohQty || 0,
              amt: maths.rounds(maths.mul(res.data?.whSalePrice || 0, 1 || 0), 2),
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              brand: res.data?.brand,
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              },
              serialNoList: [res.data?.serialNo]
            });
            const data = this.props.editTableRef.getRows();
            this.props.computedSum(data);
            console.log(this.props.editTableRef.getRows(), 'tableDatatableData0000')
            // }
          } else {
            //扫码为整车已存在明细
            console.log(newData[0].serialNoList, 'newData[0].serialNoList')
            if (newData[0].serialNoList.includes(res.data?.serialNo)) {
              //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '该商品已经扫码，请检查！'
              });
              return;
            }
            if (newData[0].qty === 1) {
              //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '零售单只可以销售一件！'
              });
              return;
            }
            console.log(this.props.editTableRef, 'this.props.editTableRef');
            this.props.editTableRef.updateRows(
              {
                qty: newData[0].qty + 1,
                amt: maths.rounds(
                  maths.mul(newData[0].price, +newData[0].qty + 1 || 0),
                  2
                ),
                discRatio: 100,
                discAmt: 0,
                serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
              },
              [newData[0].id]
            );
            const data = this.props.editTableRef.getRows();
            this.props.computedSum(data);
            console.log(tableData, '不勾选冲销', newData[0].id);
          }
        }
      } else {
        console.log('配件'); //商品为配件
        if (invFormValues.flag && invFormValues.flag[0] === true) {
          //勾选冲销
          ElNotification({
            type: 'warning',
            message: '冲销只针对于整车商品，请检查！'
          });
          console.log(tableData, '勾选冲销');
        } else {
          //不勾选冲销
          console.log(tableData, '不勾选冲销');
          if (newData.length === 0) {
            //扫码为配件且不存在明细时
            console.log(
              '扫码为配件且不存在明细时扫码为配件且不存在明细时扫码为配件且不存在明细时'
            );
            this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName,
              },
              price: res.data?.retailPrice,
              qty: 1,
              discRatio: 100,
              discAmt: 0,
              amt: maths.rounds(maths.mul(res.data?.whSalePrice, 1), 2),
              remark: res.data?.remark,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              brand: res.data?.brand,
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              }
            });
            const data = this.props.editTableRef.getRows();
            this.props.computedSum(data);
          } else {
            this.props.editTableRef.updateRows(
              {
                qty: newData[0].qty + 1,
                amt: maths.rounds(
                  maths.mul(newData[0].price, +newData[0].qty + 1 || 0),
                  2
                ),
                discRatio: 100,
                discAmt: 0,
              },
              [newData[0].id]
            );
            const data = this.props.editTableRef.getRows();
            this.props.computedSum(data);
          }
        }
      }
    } else {
      this.props.handleLoading(false);
      ElNotification({
        type: 'warning',
        message: res.data || res.msg || '调用失败'
      });
    }
  };

  onItemModalRef = (ref) => {
    this.setState({
      itemModalRef: ref
    });
  };

  handleConfirm = async ({ selectedRows }) => {
    const formRefs = this.props.formRef && this.props.formRef.getFieldsValue();
    const tableData = this.props.editTableRef.getRows();
    const rows = selectedRows.map(item => {
      console.log(item, 'itemitemitem')
      let price = item?.whSalePrice || 0; // 单格
      let qty = item?.ohQty && item.itemType === 'ALL' ? item.qty || 0 : item.qty || 1; // 数量
      const amt = maths.rounds(maths.mul(price || 0, qty), 2); // 总价
      return {
        ...item,
        id: maths.genFakeId(-1),
        whId: formRefs.whId,
        buId: formRefs.storeId,
        itemId: {
          id: item.itemId || item.id,
          itemName: item.itemName,
          itemCode: item.itemCode,
          brandName: item?.brandName,
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        ohQty: item.ohQty, // 库存数
        qty, // 销售数量
        price: item?.whSalePrice,// 价格
        discRatio: item?.discRatio || 100, // 折扣率
        discAmt: item?.discAmt || 0,// 优惠金额
        amt: amt,
        remark: item?.remark, //备注
        brandName: item?.brandName, // 品牌
        brand: item?.brand,
        serialNoList: []
      }
    });
    const itemIds = tableData.map((item) => item.itemId);
    const filterRows = rows.filter((item) => itemIds.indexOf(item.itemId) === -1);
    console.log('filterRows', filterRows);
    await this.props.editTableRef.addRows(filterRows);
    const dataList = this.props.editTableRef.getRows();
    console.log(dataList, 'dataListdataList');
    this.props.computedSum(dataList);
    if (dataList.every(item => item.ohQty)) {
      this.props.handleOutSubmit(false);
    } else {
      this.props.handleOutSubmit(true);
    }
  };

  render() {
    return (
      <div>
        <div>
          <ElForm
            onRef={this.getInvFormRef}
            formProps={{
              items: getFormItems(this.onPressEnter),
              className: 'ant-detailForm'
            }}
          />
          {/* <div style={{ textAlign: 'right', marginRight: '30px' }}>
            <span>
              总数量：
            <Statistic
                value={0}
                style={{ display: 'inline-block' }}
                precision={2}
              />
            </span>
            <span style={{ marginLeft: '30px' }}>
              总价格：
            <Statistic
                value={0}
                style={{ display: 'inline-block' }}
                precision={2}
              />
            </span>
          </div> */}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>
            总数量：
            <Statistic
              value={this.props.nums}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
          <span style={{ marginLeft: '30px' }}>
            总价格：
            <Statistic
              value={this.props.allamt}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
        </div>
        <ElEditTable
          rowKey='id'
          bordered
          scroll={{ y: 370 }}
          onRef={this.props.onRef}
          dataSource={this.props.tableData}
          actionButtons={getTableActionButtons(
            this.handleAdd.bind(this),
            this.handleRemove.bind(this)
          )}
          columns={getTableColumns(this.props.setnums)}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: [],
            // onChange: this.onChange
          }}
        />
        <WholeItemModal
          onRef={this.onItemModalRef}
          defaultSearchData={this.state.defaultSearchData}
          handleConfirm={this.handleConfirm}
          paramData={this.state.paramData}
          searchModeDisabled={this.state.searchModeDisabled}
        />
      </div>
    );
  }
}
export default DetailTable;
