import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard,
  ElForm
} from '@/components/el';
import { getActionButtons, getFormItems } from './config';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';

interface State {
  baseFormRef: FormInstance;
  formData: { [key: string]: any };
  pageLoading: boolean;
  type: any;
  id: any;
}
class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      baseFormRef: null,
      formData: {},
      pageLoading: false,
      type: this.props.match.params?.id,
      id: ''
    };
  }

  componentDidMount() {
    if (this.state.type) {
      this.getDetail(this.state.type);
    }
  }

  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
    });
  };

  getDetail = async (data) => {
    this.setState({
      pageLoading: true
    });
    const res = await service.findById(data);
    this.setState({
      pageLoading: false
    });
    console.log(res);
    if (res.success) {
      const formData = {
        ...res.data,
        date: res.data?.busiBeginDate && res.data?.busiEndDate ? [res.data?.busiBeginDate, res.data?.busiEndDate] : undefined
      };
      this.setState({
        formData,
        id: res.data?.id
      });
      // ElNotification({ type: 'success', message: '操作成功！' });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  }

  //提交
  // handleSubmit = async()=>{
  //   console.log('提交');
  // }

  //保存
  handleSave = async () => {
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const params = {
      ...baseFormValues,
      date: undefined,
      busiBeginDate: baseFormValues.date && baseFormValues.date[0] && baseFormValues.date[0].length != 0 && dayjs(baseFormValues.date[0]).format('YYYY-MM-DD HH:mm:ss'),
      busiEndDate: baseFormValues.date && baseFormValues.date[1] && baseFormValues.date[1].length != 0 && dayjs(baseFormValues.date[1]).format('YYYY-MM-DD HH:mm:ss')
    };
    this.setState({ pageLoading: true });
    const res = await service.save(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.multiTabStore.closeCurrentToPath('/purc/supp/index');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };

  //修改
  handleEdit = async () => {
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const params = {
      ...baseFormValues,
      date: undefined,
      id: this.state.id,
      busiBeginDate: baseFormValues.date && baseFormValues.date[0] && baseFormValues.date[0].length != 0 && dayjs(baseFormValues.date[0]).format('YYYY-MM-DD HH:mm:ss'),
      busiEndDate: baseFormValues.date && baseFormValues.date[1] && baseFormValues.date[1].length != 0 && dayjs(baseFormValues.date[1]).format('YYYY-MM-DD HH:mm:ss')
    };
    this.setState({ pageLoading: true });
    const res = await service.update(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.multiTabStore.closeCurrentToPath('/purc/supp/index');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };

  onBack = () => {
    this.props.push('/purc/supp/index');
  };

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons(this.state.type ? this.handleEdit : this.handleSave)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <ElForm
            onRef={this.getBaseFormRef}
            data={this.state.formData}
            formProps={{
              items: getFormItems(),
              // onValuesChange: this.onValuesChange
            }}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
