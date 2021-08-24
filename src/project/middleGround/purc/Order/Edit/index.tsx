import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import { getActionButtons } from './config';
import { FormInstance } from 'antd/lib/form';
import { maths } from '@/utils'
import * as service from '../service';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  id: any;
}
class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      baseFormRef: null,
      detailTableRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      id: null
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ id: this.props.match.params.id })
      this.getDetails(this.props.match.params.id);
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
          docTime: new Date().toString(),
          buId: buIdList[0] && buIdList[0].id,
          whId: param[0] && param[0].value
        }
      });
    }
  }

  getDetails = async (params) => {
    this.setState({ pageLoading: true });
    const res = await service.findIdOne(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      const formData = {
        ...res.data,
        registerAddress: res.data?.suppDetailAddr,
        suppId: {
          id: res.data?.suppId,
          suppName: res.data?.suppName
        }
      };
      const tableData = res.data?.purPoDRespVOList?.map((item) => ({
        ...item,
        itemId: {
          id: item.itemId,
          itemName: item.itemName
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        unStoreQty: item.qty - item.acceptQty
      }));
      this.setState({ formData, tableData });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
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

  getDetailTableRef = (ref) => {
    this.setState({
      detailTableRef: ref
    });
  };

  // //提交
  // handleSubmit = async()=>{
  //   await this.state.detailTableRef.quitEditState();
  //   const baseFormValues = await this.state.baseFormRef.validateFields();
  //   console.log('表单校验通过', baseFormValues);
  //   const detailTableValues = await this.state.detailTableRef.validateTableRows();
  //   console.log('可编辑表格校验通过', detailTableValues);
  //   if (detailTableValues.data.length === 0) {
  //     return ElNotification({
  //       type: 'warning',
  //       message: '请添加明细信息'
  //     });
  //   }
  //   if (!detailTableValues.success) {
  //     return ElNotification({
  //       type: 'warning',
  //       message: '请检查必填项'
  //     });
  //   }
  //   const { amt, qty } = this.sum(detailTableValues.data)
  //   console.log(baseFormValues,detailTableValues);
  //   const params = {
  //     ...baseFormValues,
  //     amt,
  //     qty,
  //     docTime: dayjs(baseFormValues.docTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  //     createUserId: store.principal['id'],
  //     creator: store.principal['firstName'],
  //     suppId: baseFormValues.suppId?.id,
  //     purPoDCreateParamVOList: detailTableValues.data.map((item) => ({
  //       ...item,
  //       itemId: item.itemId?.id,
  //       uom: item.uom?.udcVal
  //     }))
  //   };
  //   this.setState({ pageLoading: true });
  //   const res = await service.submit(params);
  //   this.setState({ pageLoading: false });
  //   if (res.success) {
  //     ElNotification({
  //       type: 'success',
  //       message: res.msg || '操作成功'
  //     });
  //     this.multiTabStore.closeCurrentToPath('/purc/order/index');
  //   } else {
  //     ElNotification({
  //       type: 'error',
  //       message: res.msg || '操作失败'
  //     });
  //   }
  // }

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

  //保存
  handleSave = async () => {
    console.log('保存');
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    console.log('表单校验通过', baseFormValues);
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log('可编辑表格校验通过', detailTableValues);
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
    const { amt, qty } = this.sum(detailTableValues.data)
    console.log(baseFormValues, detailTableValues);
    const params = {
      ...baseFormValues,
      amt,
      qty,
      docTime: dayjs(baseFormValues.docTime).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      createUserId: store.principal['id'],
      creator: store.principal['firstName'],
      suppId: baseFormValues.suppId?.id,
      id: this.state.id,
      purPoDCreateParamVOList: detailTableValues.data.map((item) => ({
        ...item,
        itemId: item.itemId?.id,
        uom: item.uom?.udcVal
      }))
    };

    this.setState({ pageLoading: true });
    const res = await service.submit(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.multiTabStore.closeCurrentToPath('/purc/order/index');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };

  onBack = () => {
    this.props.push('/purc/order/index');
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
          blocks={getActionButtons(this.handleSave)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            id={this.props.match.params.id}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
          />
        </ElCard>
        <ElCard title='订单信息'>
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
            sum={this.sum}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
