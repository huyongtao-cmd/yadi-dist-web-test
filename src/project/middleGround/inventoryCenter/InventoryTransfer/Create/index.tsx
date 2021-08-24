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
  num: any;
  buIds: any;
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
    const form = await this.props.formRef.validateFields();
    const data = {
      buId: form.oouId,
      whId: form.owhId,
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
    // const res = await service.findSerialNoOnes(e.target.value);  //车架号老接口
    const res = await service.findSerialNoOnesOut(data);   //车架号新接口校验库存
    this.props.handleLoading(false);
    this.props.invFormRef.setFieldsValue({
      docNo: ''
    })
    const tableData = await this.props.editTableRef.validateTableRows();
    const itemIdList = tableData.data?.map((item) => item.itemId);
    const newData = tableData.data?.filter((item) => item.itemName?.id === res.data?.itemId);
    if (res.success) {
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
              this.props.editTableRef.removeRowByKey(newData[0].id, 'rowKey');
              const data = this.props.editTableRef.getRows();
              this.props.setNum(data)
            } else {
              const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo)
              this.props.editTableRef.updateRows({
                qty: newData[0].qty - 1,
                amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty - 1 || 0), 2),
                serialNoList: serialNoList
              }, [newData[0].id])
              const data = this.props.editTableRef.getRows();
              this.props.setNum(data)
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
              ohQty: res.data?.ohQty || 0,
              qty: 1,
              price: null,
              amt: null,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              dbrand: res.data?.brand,
              qtyUom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              },
              serialNoList: [res.data?.serialNo]
            })
            const data = this.props.editTableRef.getRows();
            this.props.setNum(data)
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
            const data = this.props.editTableRef.getRows();
            this.props.setNum(data)
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
              ohQty: res.data?.ohQty || 0,
              price: null,
              amt: null,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              dbrand: res.data?.brand,
              qtyUom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              }
            })
            const data = this.props.editTableRef.getRows();
            this.props.setNum(data)
          } else {
            this.props.editTableRef.updateRows({
              qty: newData[0].qty + 1,
              amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2)
            }, [newData[0].id])
            const data = this.props.editTableRef.getRows();
            this.props.setNum(data)
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
        <div style={{ textAlign: 'right', marginRight: 50 }}>总数量：{this.props.num}</div>
      </div>
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
      num: 0,
      type: this.props.match.params?.type,
      buIds: []
    };
  }

  componentDidMount() {
    this.getWareHouse();
    this.getBu();
  }
  //更新总数量和总价格
  setNum = (data) => {
    console.log(data, 'paramsparamsparamsparamsparamsparamsparamsparamsparams');
    const { qty } = this.sum(data)
    console.log(qty);
    this.setState({
      num: qty
    })
    // this.setState({
    //   num: this.state.num + data
    // })
    // this.sum(data);
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
          applyDate: new Date().toString(),
          oouId: buIdList[0] && buIdList[0].id,
          owhId: param[0] && param[0].value
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

  getBu = async () => {
    const params = {
      current: 1,
      size: 99999,
      buType: 'DEALER'
    }
    const res = await service.agentList(params);
    if (res.success) {
      this.setState({
        buIds: res.data?.records
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

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
    console.log('提交');
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log(detailTableValues, 'detailTableValuesdetailTableValuesdetailTableValues');
    //   
    const qtyNum = detailTableValues.data?.filter((item) => item.qty <= 0 || item.qty > item.ohQty)
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
    console.log(detailTableValues, 'detailTableValuesdetailTableValues');
    if (qty === 0) {
      return ElNotification({
        type: 'warning',
        message: '调拨数量不能为0，请检查！'
      });
    }
    if (qtyNum.length !== 0) {
      return ElNotification({
        type: 'warning',
        message: '调拨数量不能大于库存数量，请检查！'
      });
    }
    const params = {
      header: {
        ...baseFormValues,
        createUserId: store.principal['id'],
        creator: store.principal['firstName'],
        qty,
        buId: this.state.buIds[0]?.id,
        applyDate: baseFormValues.applyDate && dayjs(baseFormValues.applyDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      details: detailTableValues.data.map((item, index) => ({
        ...item,
        itemName: item.itemName?.itemName,
        buId: undefined,
        whId: undefined,
        lineNo: index + 1,
        itemId: Object.keys(item).includes('itemId') ? item.itemId : item.itemName?.itemId,
        itemType: item.itemType?.udcVal,
        qtyUom: item.qtyUom?.udcVal,
        iwhId: baseFormValues.iwhId,
        iouId: baseFormValues.iouId,
        owhId: baseFormValues.owhId,
        oouId: baseFormValues.oouId,
        applyDate: baseFormValues.applyDate && dayjs(baseFormValues.applyDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      }))
    };
    console.log(params, 'paramsparamsparamsparamsparams');

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
      this.multiTabStore.closeCurrentToPath(`/inventory/inventorytransfer/view/A/${res.data}`);
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
  handleCode = () => {
    console.log('查看条码');
  }

  //返回
  onBack = () => {
    this.props.push('/inventory/inventorytransfer/index');
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
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.props.match.params.type}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
          />
        </ElCard>
        <ElCard title='调拨信息'>
          <InvForm
            handleLoading={this.handleLoading}
            onRef={this.getInvFormRef}
            formRef={this.state.baseFormRef}
            invFormRef={this.state.invFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.state.type}
            num={this.state.num}
            setNum={this.setNum}
          />
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
            type={this.state.type}
            setNum={this.setNum}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
