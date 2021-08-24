import React from 'react';
import { Modal } from 'antd';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import * as service from '../service';
import dayjs from 'dayjs';
import { SaveWhite, CancelWhite } from '@/components/el/ElIcon';
import CheckCodeModal from '../checkCodeModal';
interface State {
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  btnFlag: any;
  closeFlag: any;
  docNo: any;
  allamt: any;
  nums: any;
}
class View extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      tableData: [],
      pageLoading: false,
      btnFlag: false,
      closeFlag: false,
      docNo: null,
      allamt: 0,
      nums: 0
    };
  }

  componentDidMount() {
    this.getDetails(this.props.match.params.id);
  }

  getDetails = async (params) => {
    this.setState({ pageLoading: true });
    const res = await service.findDocNoOne(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      if (res.data?.docStatus === '1' || res.data?.docStatus === '2' || res.data?.docStatus === '3') {
        this.setState({ btnFlag: true })
      }
      if (res.data?.docStatus !== '4' && res.data?.docStatus !== '5') {
        this.setState({ closeFlag: true })
      }
      const formData = { ...res.data };
      const tableData = res.data.purPoDRespVOList.map((item) => ({
        ...item,
        planPayDate:
          item.planPayDate && dayjs(item.planPayDate).format('YYYY-MM-DD')
      }));
      this.setState({ formData, tableData, docNo: formData.docNo, nums: res.data.qty, allamt: res.data.amt });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };
  handleIn = () => {
    console.log('入库');
    // this.props.history.push(`/inventory/inventoryin/item/purcOrder/${this.props.match.params?.id}`);
    this.props.push(`/inventory/inventoryin/item/purcOrder/${this.state.docNo}`);
  }
  close = async () => {
    this.setState({ pageLoading: true });
    const res = await service.close(this.props.match.params?.id);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.props.push('/purc/order/index');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  }
  onBack = () => {
    this.props.push('/purc/order/index');
  };

  btn = () => {
    let btn = [
      {
        key: 'checkSerialNos',
        text: '查看条码',
        location: 'left',
        handleClick: this.checkSerialNos,
      },
      this.state.btnFlag && {
        key: 'add',
        text: '入库',
        icon: <SaveWhite />,
        location: 'left',
        handleClick: this.handleIn
      },
      this.state.closeFlag && {
        key: 'close',
        text: '关闭',
        icon: <CancelWhite />,
        location: 'left',
        needConfirm: true,
        confirmText: '是否要关闭该采购单？',
        handleClick: this.close
      }
    ].filter(Boolean);
    return btn;
  }

  checkSerialNos = () => {
    const { tableData } = this.state;
    console.log(tableData, 'dataSourcedataSource');
    const filterData = tableData.filter(item => item.itemType === 'ALL')
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={filterData} />,
      okText: '确认',
      icon: null
    })
  }

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={this.btn()}
          onBack={this.onBack}
          position={'top'}
        />
        <ElCard title='基本信息'>
          <BaseForm formData={this.state.formData} />
        </ElCard>
        <ElCard title='订单信息'>
          <DetailTable
            tableData={this.state.tableData}
            nums={this.state.nums}
            allamt={this.state.allamt}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default View;
