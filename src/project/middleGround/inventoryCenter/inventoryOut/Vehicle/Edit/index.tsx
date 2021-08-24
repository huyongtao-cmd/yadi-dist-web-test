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
// import { Input, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
// import * as service from '../service';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
// import { async } from '@antv/x6/lib/registry/marker/async';
interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
}

const getFormItems = (): Array<ElFormItemProps> => [
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
      props: { placeholder: '请输入' }
    }
  },
  {
    title: '冲销',
    name: 'ouName',
    span: 2,
    formOption: {
      type: '$checkbox',
      props: {
        options: [
          { label: '', value: true }
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
          items: getFormItems(),
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
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.type !== 'create') {
      this.getDetails(this.props.match.params.type);
    }
  }

  getDetails = async (params) => {
    console.log(params);

    // this.setState({ pageLoading: true });
    // const res = await service.findIdOne(params);
    // this.setState({ pageLoading: false });
    // if (res.success) {
    //   const formData = {
    //     ...res.data,
    //     docNo: {
    //       docNo: res.data.docNo,
    //       id: res.data.id,
    //       ouId: res.data.ouId,
    //       ouCode: res.data.ouCode,
    //       ouName: res.data.ouName,
    //       suppId: res.data.suppId,
    //       suppCode: res.data.suppCode,
    //       suppName: res.data.suppName,
    //       currCode: res.data.currCode,
    //       currName: res.data.currName,
    //       paymentTerm: res.data.paymentTerm,
    //       paymentTermName: res.data.paymentTermName
    //     }
    //   };
    //   const tableData = res.data.purPoPayplanRespVOlist.map((item) => ({
    //     ...item,
    //     payType: { udcVal: item.payType, valDesc: item.payTypeName },
    //     planPayDate:
    //       item.planPayDate && dayjs(item.planPayDate).format('YYYY-MM-DD')
    //   }));
    //   this.setState({ formData, tableData });
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: res.msg || '操作失败'
    //   });
    // }
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

  //提交
  handleSubmit = async () => {
    console.log('提交');
  }

  //保存
  handleSave = async () => {
    console.log('保存');

    // await this.state.detailTableRef.quitEditState();
    // const baseFormValues = await this.state.baseFormRef.validateFields();
    // console.log('表单校验通过', baseFormValues);
    // const detailTableValues = await this.state.detailTableRef.validateTableRows();
    // console.log('可编辑表格校验通过', detailTableValues);
    // if (detailTableValues.data.length === 0) {
    //   return ElNotification({
    //     type: 'warning',
    //     message: '请添加明细信息'
    //   });
    // }
    // if (!detailTableValues.success) {
    //   return ElNotification({
    //     type: 'warning',
    //     message: '请检查必填项'
    //   });
    // }
    // const params = {
    //   ...baseFormValues,
    //   docNo: baseFormValues.docNo && baseFormValues.docNo.docNo,
    //   masId: baseFormValues.docNo && baseFormValues.docNo.id,
    //   purPoPayplanRespVOList: detailTableValues.data.map((item) => ({
    //     ...item,
    //     payType: item.payType && item.payType.udcVal,
    //     payTypeName: item.payType && item.payType.valDesc,
    //     planPayDate:
    //       item.planPayDate &&
    //       dayjs(item.planPayDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    //   }))
    // };
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', params);
    // this.setState({ pageLoading: true });
    // const res = await service.save(params);
    // if (this.state.deleteFlags.length > 0) {
    //   const res = await service.deleteBetch(this.state.deleteFlags);
    //   this.setState({ pageLoading: false });
    //   if (res.success) {
    //     ElNotification({
    //       type: 'success',
    //       message: res.msg || '操作成功'
    //     });
    //     this.multiTabStore.closeCurrentToPath('/purc/payment/plan');
    //   } else {
    //     ElNotification({
    //       type: 'error',
    //       message: res.msg || '操作失败'
    //     });
    //   }
    // } else {
    //   this.setState({ pageLoading: false });
    //   if (res.success) {
    //     ElNotification({
    //       type: 'success',
    //       message: res.msg || '操作成功'
    //     });
    //     this.multiTabStore.closeCurrentToPath('/purc/payment/plan');
    //   } else {
    //     ElNotification({
    //       type: 'error',
    //       message: res.msg || '操作失败'
    //     });
    //   }
    // }
  };

  //返回
  onBack = () => {
    this.props.push('/purc/order/index');
  };

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons(this.handleSave, this.handleSubmit)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
          />
        </ElCard>
        <ElCard title='出库整车信息'>
          <InvForm />
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
