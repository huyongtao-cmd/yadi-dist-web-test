import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard,
  ElForm
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import { getActionButtons } from './config';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import { maths } from '@/utils'
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
import { Modal } from 'antd';
import CheckCodeModal from '../../checkCodeModal';
import { clone, concat } from 'ramda';

interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  invFormRef: any;
  poId: any;
  type: any;
  showWarehousing: boolean;
  warehousingFlag: boolean;
  relateDoc2Id: any;
  relateDoc2No: any;
  relateDoc2Did: any;
  relateDoc2Cls: any;
  custId: any;
  poSource: any;
}

const getFormItems = (onPressEnter): Array<ElFormItemProps> => [
  {
    title: '',
    name: 'doc',
    span: 16,
    formOption: {
      // type: '$input',
      // props: { placeholder: '请输入' }
    }
  },
  {
    title: '条码录入',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        onPressEnter
      }
    }
  },
  {
    title: '',
    name: 'flag',
    span: 2,
    formOption: {
      type: '$checkbox',
      props: {
        options: [
          { label: '冲销', value: true }
        ]
      }
    }
  }
];

class InvForm extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }
  onPressEnter = async (e) => {
    this.props.editTableRef.quitEditState();
    const invFormValues = this.props.invFormRef.getFieldsValue();
    if (!e.target.value) {
      ElNotification({
        type: 'warning',
        message: '扫码信息有误，请检查！'
      });
      return;
    }
    this.props.handleLoading(true);
    // const res = await service.findSerialNoOnes(e.target.value);  //车架号老接口
    const res = await service.findSerialNoOnesin(e.target.value);   //车架号新接口入库
    this.props.handleLoading(false);
    this.props.invFormRef.setFieldsValue({
      docNo: ''
    })
    const tableData = await this.props.editTableRef.validateTableRows();
    const itemIdList = tableData.data?.map((item) => item.itemId);
    const newData = tableData.data?.filter((item) => item.itemName?.id === res.data?.itemId);
    if (res.success) {
      console.log('无前置单据', this.props.type);
      if (res.data?.itemType === 'ALL') {  //商品为整车
        console.log(invFormValues, 'invFormValuesinvFormValues');
        if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
          console.log(tableData, '勾选冲销');
          if (newData.length === 0) {  //没有商品明细
            ElNotification({
              type: 'warning',
              message: '没有对应的商品明细，请检查！'
            });
          } else {
            if (!newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '没有找到对应商品，请检查！'
              });
              return;
            }
            if (newData[0].qty === 1) {
              this.props.editTableRef.removeRowByKey(newData[0].id, 'rowKey')
            } else {
              const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo)
              this.props.editTableRef.updateRows({
                qty: newData[0].qty - 1,
                amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty - 1 || 0), 2),
                serialNoList: serialNoList
              }, [newData[0].id])
            }
          }
        } else {  //不勾选冲销
          console.log(newData, 'newData', tableData, res.data);
          if (newData.length === 0) { //扫码为整车且不存在明细时
            this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName
              },
              qty: 1,
              price: null,
              amt: null,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              dbrand: res.data?.brand,
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              },
              serialNoList: [res.data?.serialNo]
            })
          } else {   //扫码为整车已存在明细
            if (newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '该商品已经扫码，请检查！'
              });
              return;
            }
            console.log(this.props.editTableRef, 'this.props.editTableRef');
            this.props.editTableRef.updateRows({
              qty: newData[0].qty + 1,
              amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
              serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
            }, [newData[0].id])
            console.log(tableData, '不勾选冲销', newData);
          }
        }
      } else {
        console.log('配件');  //商品为配件
        if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
          ElNotification({
            type: 'warning',
            message: '冲销只针对于整车商品，请检查！'
          });
          console.log(tableData, '勾选冲销');
        } else {  //不勾选冲销
          console.log(tableData, '不勾选冲销');
          if (newData.length === 0) { //扫码为配件且不存在明细时
            console.log('扫码为配件且不存在明细时扫码为配件且不存在明细时扫码为配件且不存在明细时');
            this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName
              },
              qty: 1,
              price: null,
              amt: null,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              dbrand: res.data?.brand,
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              }
            })
          } else {
            this.props.editTableRef.updateRows({
              qty: newData[0].qty + 1,
              amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
              // serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
            }, [newData[0].id])
          }
        }
      }
    } else {
      ElNotification({
        type: 'warning',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <ElForm
          onRef={this.props.onRef}
          data={this.props.formData}
          formProps={{
            items: getFormItems(this.onPressEnter)
          }}
        />
        {/* <div style={{ textAlign: 'right', marginRight: 50 }}>总数量：0  总价格：0</div> */}
      </div>
    );
  }
}

class InventoryInCreate extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      baseFormRef: null,
      detailTableRef: null,
      invFormRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      poId: null,
      type: this.props.match.params?.type,
      warehousingFlag: false,
      showWarehousing: true,
      relateDoc2Id: null,
      relateDoc2No: null,
      relateDoc2Did: null,
      relateDoc2Cls: null,
      custId: null,
      poSource: null
    };
  }

  componentDidMount() {
    this.getWareHouse();
  }

  getWareHouse = async () => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      buId: buIdList[0] && buIdList[0].id,
      storeIds
    }
    this.setState({ pageLoading: true })
    const res = await service.findOneInv(data);
    this.setState({ pageLoading: false })
    if (res.success) {
      const param = res.data.records?.map((item) => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
            //  ...item
          }
        }
      }).filter(Boolean);
      this.setState({
        formData: {
          createUserId: {
            createUserId: store.principal['id'],
            firstName: store.principal['firstName']
          },
          recvDate: new Date().toString(),
          buId: buIdList[0] && buIdList[0].id,
          whId: param[0] && param[0].value
        }
      });
    }
  }

  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };

  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
    });
  };

  getInvFormRef = (ref) => {
    this.setState({
      invFormRef: ref
    });
  };

  getDetailTableRef = (ref) => {
    this.setState({
      detailTableRef: ref
    });
  };

  //数值相加
  sum = (data) => {
    const amt = data.reduce((total, current) => {
      return maths.add(total, current.amt || 0);
    }, 0)
    const qty = data.reduce((total, current) => {
      return maths.add(total, current.qty || 0);
    }, 0)
    return {
      amt,
      qty
    };
  }

  //提交
  handleSubmit = async () => {
    console.log('提交', this.state.formData);
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log(detailTableValues, baseFormValues, 'detailTableValuesdetailTableValuesdetailTableValues')
    // const qtyNum = detailTableValues.data?.filter((item)=>item.qty <= 0)
    if (detailTableValues.data.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '请添加明细信息'
      });
    }
    if (!detailTableValues.success) {
      return ElNotification({
        type: 'warning',
        message: '请检查必填项'
      });
    }
    const { qty } = this.sum(detailTableValues.data)
    if (qty === 0) {
      return ElNotification({
        type: 'warning',
        message: '总入库数量不能为0，请检查！'
      });
    }
    const params = {
      ...baseFormValues,
      docStatus: this.state.formData?.docStatus,   // 2021.05.21  入库添加docStatus参数
      createUserId: store.principal['id'],
      creator: store.principal['firstName'],
      suppId: baseFormValues.suppId?.id,
      qty,
      flag: Object.keys(baseFormValues).includes('flag') && Array.isArray(baseFormValues.flag) && baseFormValues.flag.length > 0 ? baseFormValues.flag[0] : undefined,
      poId: this.state.poId,
      recvDate: baseFormValues.recvDate && dayjs(baseFormValues.recvDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      relateDoc2Cls: this.state.relateDoc2Cls,
      es4: Object.keys(this.state.formData).includes('es4') ? this.state.formData.es4 : '',
      es3: Object.keys(this.state.formData).includes('docTime') ? this.state.formData.docTime : '',
      // docNo: baseFormValues.docNo && baseFormValues.docNo.docNo,
      // masId: baseFormValues.docNo && baseFormValues.docNo.id,
      purGrDSaveVOList: detailTableValues.data.map((item) => {
        console.log(item, Object.keys(item).includes('realSerialNoList'), 'pppppppppp')
        return {
          itemName: item.itemName?.itemName,
          itemId: item.itemName?.id,
          itemType: item.itemType?.udcVal,
          price: item.price,
          uom: item.uom?.udcVal,
          qty: item.qty,
          // brand: item.brand,
          whId: baseFormValues.whId,
          buId: baseFormValues.buId,
          relateDoc2Id: this.state.relateDoc2Id,
          relateDoc2No: this.state.relateDoc2No,
          relateDoc2Did: item.id,
          es1: Object.keys(item).includes('shippedQty') ? item.shippedQty : 0,
          serialNoList: Object.keys(item).includes('realSerialNoList') ? clone(item.realSerialNoList) : item.serialNoList,
          poDId: item.id
          // whLoc: baseFormValues.whLoc
          // payType: item.payType && item.payType.udcVal,
          // payTypeName: item.payType && item.payType.valDesc,
          // planPayDate:
          //   item.planPayDate &&
          //   dayjs(item.planPayDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        }
      })
    };
    console.log(params, 'params')
    this.setState({ pageLoading: true });
    const res = await service.submit(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      const para = res.data;
      console.log(para, 'submitsubmitsubmit');
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      // this.multiTabStore.closeCurrentToPath('/inventory/inventorysearch/account');
      this.multiTabStore.closeCurrentToPath(`/inventory/inventoryin/itemview/${para}`);
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

  //保存
  handleSave = async () => {
    console.log('baoc');
  };

  //查看条码
  handleCode = async () => {
    const { formData } = this.state;
    await this.state.detailTableRef.quitEditState();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log(detailTableValues.data, 'tableData');
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={detailTableValues.data} />,
      okText: '确认',
      icon: null
    })
  }

  //返回
  onBack = () => {
    this.props.push('/inventory/inventorysearch/account');
  };

  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    })
  }

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons(this.handleSave, this.handleSubmit, this.handleCode)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            showWarehousing={this.state.showWarehousing}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.props.match.params.type}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
          />
        </ElCard>
        {/* {this.state.docType == 'D' ? (
          <ElCard title='顾客信息'>
            <CustomerForm
              formRef={this.state.customerFormRef}
              onRef={this.getCustomerForm}
              formData2={this.state.formData2}
              isLS={this.state.isLS}
            >
            </CustomerForm>
          </ElCard>
        ) : (
          <ElCard title='客户信息'>
            <ClientForm formRef={this.state.clientFormRef} onRef={this.getClientFormRef} formData3={this.state.formData3}></ClientForm>
          </ElCard>
        )} */}
        <ElCard title='入库信息'>
          {!this.state.warehousingFlag ? (
            <InvForm
              handleLoading={this.handleLoading}
              onRef={this.getInvFormRef}
              invFormRef={this.state.invFormRef}
              editTableRef={this.state.detailTableRef}
              type={this.state.type}
              poSource={this.state.poSource}
            />
          ) : (
            <></>
          )}
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
            type={this.state.type}
            warehousingFlag={this.state.warehousingFlag}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default InventoryInCreate;
