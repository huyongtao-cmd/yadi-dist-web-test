//顾客详情
import React from 'react';
import { Descriptions, Image } from 'antd';
import { history, match, push } from 'react-router-dom';
import { ElPage, ElRowContainer } from '@/components/el';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';
import './style.less';
import * as service from './service';
// import request from '@/utils/request';
// import { ConsoleSqlOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import EditModal from './Edit/index';
// import { null } from 'mathjs';

interface Props {
  history: history;
  match: match;
  push: push;
}
interface State {
  tableRef: any;
  pageloading: boolean;
  dataSource: any;
  modalVisible: boolean;
}

export default class CustomerView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      pageloading: false,
      dataSource: null,
      modalVisible: false

    };
  }
  async componentDidMount() {
    // console.log(this.props.match.params);
    const custCode = this.props.match.params.id;
    const storeId = this.props.match.params.buid;
    // const buid = '88';
    const { tableRef } = this.state;
    // console.log(custCode, '接口id')
    const res = await service.getSelctList(custCode, storeId);
    // console.log(res, 'ooooo')
    const dataSource = {
      ...res.data,
      // BirthDate: dayjs(res.data.vipBirthDate).startOf('day').format('YYYY[年]MM[月]DD[日]'), //生日
    }
    if (res && res.success) {
      this.setState({
        // dataSource: res.data
        dataSource
      })
      // tableRef.setFieldsValue(res.data);
    }
  }

  onBack = () => {
    // console.log('返回');
    this.props.push('/salesCenter/custom/search');
  };
  // 关闭Modal
  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };
  // addAction = () => {
  //   console.log('新建资料');
  // };
  editAction = () => {
    const { pageloading, dataSource } = this.state;
    // console.log('编辑资料', dataSource);

    // 弹框显示
    this.setState({
      modalVisible: true,
    });
  }
  render() {
    const { pageloading, dataSource } = this.state;
    return (
      <>
        <ElPage spinning={pageloading}>
          <ElRowContainer
            position='top'
            onBack={this.onBack}
            blocks={[
              {
                key: 'edit',
                text: '编辑资料',
                icon: <EditBlue />,
                location: 'left',
                handleClick: this.editAction
              }
            ]}
          />
          <div className='custinfo'>
            <Descriptions bordered column={2} className='custlist'>
              <Descriptions.Item label='顾客账号'>{dataSource?.custCode}</Descriptions.Item>
              <Descriptions.Item label='职业'>{dataSource?.vipJob}</Descriptions.Item>
              <Descriptions.Item label='手机号'>{dataSource?.reprCertMobile}</Descriptions.Item>
              <Descriptions.Item label='证件类型'>{dataSource?.reprCertTypeName}</Descriptions.Item>
              {/* <Descriptions.Item label='证件号码'>{dataSource?.reprCertNo}</Descriptions.Item> */}
              <Descriptions.Item label='性别'>{dataSource?.vipGenderName}</Descriptions.Item>
              <Descriptions.Item label='顾客等级'>{dataSource?.custLevelName}</Descriptions.Item>
              <Descriptions.Item label='生日'>{dataSource?.vipBirthDate}</Descriptions.Item>
              <Descriptions.Item label='注册时间'>{dataSource?.registerDate}</Descriptions.Item>
              <Descriptions.Item label='地址'>{dataSource?.registerAddress}</Descriptions.Item>
              <Descriptions.Item label='所属门店'>{dataSource?.storeName}</Descriptions.Item>
            </Descriptions>
          </div>
          <EditModal
            modalVisible={this.state.modalVisible}
            closeModal={this.closeModal}
            tableRef={this.state.tableRef}
            data={this.state.dataSource}
          ></EditModal>
        </ElPage>
      </>
    );
  }
}
