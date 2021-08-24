import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin } from 'antd';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import { getBaseConfig, getClassCodeConfig } from './config';
import './index.less';
import service from '../List/service';
import app from '@/utils/appCommon';
import MultiTabMobx from '@/store/multiTab';
import dayjs from 'dayjs';
import { ElNotification, ElRowContainer } from '@/components/el';
import { SubmitWhite, SaveWhite } from '@/components/el/ElIcon';

interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  id: string | number;
  formDataBase: any;
  formDataClass: any;
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  formBaseRef: any;
  formClassCodeRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    this.mainPagePath = `/orgCenter/orgData/orgList`;
    this.state = {
      loading: false,
      formDataBase: {},
      formDataClass: {},
      // 简化参数
      type: this.props.match.params?.type,
      id: this.props.match.params?.id
    };
  }
  async componentDidMount() {
    const { id } = this.state;

    this.setState({ loading: true });
    let res = await service.getDetail(id);
    this.setState({ loading: false });
    if (!res.success) {
      return;
    }
    res.data.createTime = dayjs().format('YYYY-MM-DD');
    this.setState({
      formDataBase: res.data
    });
    this.setState({
      formDataClass: res.data
    });
  }

  async onSave() {
    const { id } = this.state;
    const formData = await this._getWholeData();
    const res = await service.save(id, formData);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  }
  async onSubmit() {
    const { id } = this.state;
    const formData = await this._getWholeData();
    const res = await service.submit(id, formData);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  }
  handleCancelClick = () => {
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  };

  async _getWholeData() {
    let newFormDataBase = await this.formBaseRef.validateFields();
    let newFormDataClassCode = await this.formClassCodeRef.validateFields();
    return { ...newFormDataBase, ...newFormDataClassCode };
  }
  getButtons = ({ type, formDataBase }) => [
    {
      key: 'save',
      text: '保存',
      icon: <SaveWhite />,
      disabled: type === 'view' || formDataBase.buStatus === 'CLOSED',
      location: 'left',
      type: 'primary',
      handleClick: () => this.onSave()
    },
    {
      key: 'sure',
      text: '确认',
      type: 'primary',
      icon: <SubmitWhite />,
      disabled: type === 'view' || formDataBase.buStatus != 'DRAFT',
      location: 'left',
      handleClick: () => this.onSubmit()
    }
  ];

  render() {
    const { loading, formDataBase, formDataClass, type } = this.state;

    return (
      <>
        <Spin spinning={loading}>
          <ElRowContainer
            onBack={this.handleCancelClick}
            blocks={this.getButtons({ type, formDataBase })}
            position='top'
          />

          <ElCard title='基本信息' className='orgDetailForm'>
            <ElForm
              formProps={getBaseConfig(type, formDataBase.buStatus)}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <ElCard title='类别码'>
            <ElForm
              formProps={getClassCodeConfig(type, formDataBase.buStatus)}
              data={formDataClass}
              onRef={(ref) => (this.formClassCodeRef = ref)}
            ></ElForm>
          </ElCard>
        </Spin>
      </>
    );
  }
}
