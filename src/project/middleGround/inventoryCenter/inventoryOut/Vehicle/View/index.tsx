import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import * as service from './service';
import dayjs from 'dayjs';
interface State {
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
}
class View extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      tableData: [],
      pageLoading: false
    };
  }

  componentDidMount() {
    // this.getDetails(this.props.match.params.id);
    this.getDetails('369902878318895104');
  }

  getDetails = async (params) => {
    this.setState({ pageLoading: true });
    // const res = await service.findIdOne(params);
    const res = await service.findBySalDoIdOne(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      const formData = { ...res.data };
      const tableData = res.data.salDodRespVOList.map((item) => ({
        ...item,
        planPayDate:
          item.planPayDate && dayjs(item.planPayDate).format('YYYY-MM-DD')
      }));
      this.setState({ formData, tableData });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };
  handleIn = () => {
    console.log('入库');
  }
  onBack = () => {
    this.props.push('/purc/order/index');
  };

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={[
            {
              location: 'left',
            }
          ]}
          onBack={this.onBack}
          position={'top'}
        />
        <ElCard title='基本信息'>
          <BaseForm formData={this.state.formData} />
        </ElCard>
        <ElCard title='订单信息'>
          <DetailTable tableData={this.state.tableData} />
        </ElCard>
      </ElPage>
    );
  }
}

export default View;
