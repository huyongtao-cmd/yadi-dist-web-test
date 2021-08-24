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
import { Input, Checkbox, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import { maths } from '@/utils'
import store from '@/store';
import CheckCodeModal from '../../checkCodeModal';

// interface State {
//   baseFormRef: FormInstance;
//   detailTableRef: any;
//   formData: { [key: string]: any };
//   tableData: Array<any>;
//   pageLoading: boolean;
//   deleteFlags: Array<any>;
//   invFormRef: any;
// }
interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  invFormRef: any;
  type: any;
  poId: any;
  custId: any;
  relateDoc2Cls: any;
  relateDoc2Id: any;
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
    // const res = await service.findSerialNoOnes(e.target.value);    //查车架号
    const form = await this.props.formRef.validateFields();
    const data = {
      buId: form.buId,
      whId: form.whId,
      serialNo: e.target.value
    }
    if (!e.target.value) {
      ElNotification({
        type: 'warning',
        message: '扫码信息有误，请检查！'
      });
      return;
    }
    this.props.handleLoading(true);
    const res = await service.findSerialNoOnesOut(data);   //车架号新接口校验库存
    this.props.handleLoading(false);
    this.props.invFormRef.setFieldsValue({
      docNo: ''
    })
    const tableData = await this.props.editTableRef.validateTableRows();
    const itemIdList = tableData.data?.map((item) => item.itemId);
    const newData = tableData.data?.filter((item) => item.itemName?.id == res.data?.itemId);
    if (res.success) {
      //是否有前置单据
      if (this.props.type === ':type') {
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
                ohQty: res.data.ohQty || 0,
                qty: 1,
                dbrand: res.data?.brand,
                price: null,
                amt: null,
                itemType: {
                  udcVal: res.data?.itemType,
                  valDesc: res.data?.itemTypeName
                },
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
              console.log(tableData, '不勾选冲销', newData[0].id);
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
              this.props.editTableRef.addRow({
                ...res.data,
                id: maths.genFakeId(-1),
                itemName: {
                  id: res.data?.itemId,
                  itemName: res.data?.itemName,
                  itemCode: res.data?.itemCode,
                  brandName: res.data?.brandName
                },
                ohQty: res.data.ohQty || 0,
                qty: 1,
                dbrand: res.data?.brand,
                price: null,
                amt: null,
                itemType: {
                  udcVal: res.data?.itemType,
                  valDesc: res.data?.itemTypeName
                },
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
        console.log(this.props.type, '有前置单据');
        //判断商品是否存在于明细
        if (!itemIdList.includes(res.data?.itemId)) {
          console.log(itemIdList, res.data?.itemId);
          ElNotification({
            type: 'warning',
            message: '该商品不在本次入库范围内，请检查！'
          });
          return;
        }
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
                // this.props.editTableRef.removeRowByKey(newData[0].id,'rowKey')
                const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo)
                this.props.editTableRef.updateRows({
                  qty: newData[0].qty - 1,
                  amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty - 1 || 0), 2),
                  serialNoList: serialNoList
                }, [newData[0].id])
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
            //扫码数量大于单据数量-已出库数量  // todo
            if (newData[0].qty === maths.sub(newData[0].poQty || 0, newData[0].shippedQty || 0)) {
              ElNotification({
                type: 'warning',
                message: '出库数量超出订单数量，请检查！'
              });
              return;
            }
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
            console.log(tableData, '不勾选冲销', newData[0].id);
          }
        } else {
          if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
            ElNotification({
              type: 'warning',
              message: '冲销只针对于整车商品，请检查！'
            });
          } else {
            //扫码数量大于单据数量-已出库数量  // todo
            if (newData[0].qty === maths.sub(newData[0].poQty || 0, newData[0].shippedQty || 0)) {
              ElNotification({
                type: 'warning',
                message: '出库数量超出订单数量，请检查！'
              });
              return;
            }
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

  // onValuesChange = (changedFields) => {
  //   if (changedFields.docNo) {
  //     todo
  //     this.props.formRef.setFieldsValue({
  //       currAmt: 8.01,
  //       currName: 'RMB',
  //       currNetAmt: 7.09,
  //       ouName: '上海慎昌贸易有限公司',
  //       suppName: '大昌行食品(上海)有限公司'
  //     });
  //     this.props.editTableRef.clearRows();
  //   }
  // };

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.onPressEnter),
          // onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

class Edit extends React.Component<any, State> {
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
      custId: null,
      type: this.props.match.params?.type,
      relateDoc2Cls: null,
      relateDoc2Id: null
    };
  }

  componentDidMount() {
    if (this.props.match.params?.type !== ':type') {
      this.getDetails(this.props.match.params?.id);
    } else {
      this.getWareHouse();
    }
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
          docTime: new Date().toString(),
          buId: buIdList[0] && buIdList[0].id,
          whId: param[0] && param[0].value
        }
      });
    }
  }

  //批发单出库查详情
  getDetails = async (params) => {
    this.setState({
      pageLoading: true
    })
    const res = await service.findSaleOrder(params);
    this.setState({
      pageLoading: false
    })
    console.log(res, 'reeeeeeee')
    this.setState({ pageLoading: false });
    if (res.success) {
      const formData = {
        // ...res.data,
        whId: res.data?.whId,
        relateDocNo: res.data?.docNo,
        poId: res.data?.id,
        docType: this.props.match.params?.type,
        buId: res.data?.storeId,
        createUserId: {
          createUserId: store.principal['id'],
          firstName: store.principal['firstName']
        },
        remark: res.data?.remark,
        docTime: new Date().toString(),
        es4: Object.keys(res.data).includes('es4') ? res.data?.es4 : '',
        docTime1: res.data?.docTime   // 前置单据的时间  需要在出库时传递给后端
      };
      const tableData = res.data?.salSoDVOList.map((item) => ({
        ...item,
        itemName: {
          id: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode
        },
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        qty: 0,
        poQty: item.qty,
        ohQty: item.invQty,
        serialNoList: [],
        itemId: item.itemId?.toString(),
        shippedQty: res.data.es4 === '1' && Object.keys(item).includes('shippedQty') ? item.shippedQty || 0 : 0
      }));
      this.setState({ formData, tableData, poId: res.data?.id, custId: res.data?.custId, relateDoc2Cls: 'PF' });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  };


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
    const qtyNum = detailTableValues.data?.filter((item) => item.qty > item.ohQty);
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
        message: '总出库数量不能为0，请检查！'
      });
    }
    if (qtyNum.length !== 0) {
      return ElNotification({
        type: 'warning',
        message: '出库数量不能大于库存数量，请检查！'
      });
    }
    const params = {
      ...baseFormValues,
      createUserId: store.principal['id'],
      creator: store.principal['firstName'],
      // suppId: baseFormValues.suppId?.id,
      qty,
      poId: this.state.poId,
      custId: this.state.custId,
      relateDoc2Cls: this.state.relateDoc2Cls,
      docTime: baseFormValues.docTime && dayjs(baseFormValues.docTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      es4: Object.keys(this.state.formData).includes('es4') ? this.state.formData?.es4 : '',
      es3: Object.keys(this.state.formData).includes('docTime1') ? this.state.formData.docTime1 : '',
      // docNo: baseFormValues.docNo && baseFormValues.docNo.docNo,
      // masId: baseFormValues.docNo && baseFormValues.docNo.id,
      salDodSaleList: detailTableValues.data.map((item) => ({
        ...item,
        itemName: item.itemName?.itemName,
        itemId: item.itemName?.id,
        itemType: item.itemType?.udcVal,
        uom: item.uom?.udcVal,
        brand: item.itemName?.brand,
        whId: baseFormValues.whId,
        buId: baseFormValues.buId,
        soQty: item.poQty,
        srcDocDid: item.id,
        relateDocDid: item.id,
        relateDoc2Id: this.state.poId,
        relateDoc2No: baseFormValues.relateDocNo ? baseFormValues.relateDocNo : null,
        relateDoc2Did: item.id,
        es5: Object.keys(item).includes('shippedQty') ? item.shippedQty : 0
        // buId: baseFormValues.buId
        // whLoc: '11111'
        // whId: baseFormValues.whId,
        // whLoc: baseFormValues.whLoc
        // payType: item.payType && item.payType.udcVal,
        // payTypeName: item.payType && item.payType.valDesc,
        // planPayDate:
        //   item.planPayDate &&
        //   dayjs(item.planPayDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }))
    };
    // console.log(params, 'params')
    this.setState({ pageLoading: true });
    const res = await service.submit(params);
    console.log(res, 'ppppp')
    this.setState({ pageLoading: false });
    if (res.success) {
      let para = res.data;
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.multiTabStore.closeCurrentToPath(`/inventory/inventoryout/itemview/${para}`);

      // this.multiTabStore.closeCurrentToPath('/inventory/inventorysearch/account');
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

  //查看条码
  handleCode = async () => {
    await this.state.detailTableRef.quitEditState();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    // const data = detailTableValues.data?.filter(item => item.itemType?.udcVal === 'ALL');
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={detailTableValues.data} />,
      okText: '确认',
      icon: ''
    })
  }

  //返回
  onBack = () => {
    this.props.push(`/salesCenter/wholeorder/detail/${this.props.match.params?.id}`);
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
          blocks={getActionButtons(this.handleSubmit, this.handleCode)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.props.match.params.type}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
          />
        </ElCard>
        <ElCard title='出库信息'>
          <InvForm
            handleLoading={this.handleLoading}
            onRef={this.getInvFormRef}
            formRef={this.state.baseFormRef}
            invFormRef={this.state.invFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.state.type}
          />
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
            type={this.state.type}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
