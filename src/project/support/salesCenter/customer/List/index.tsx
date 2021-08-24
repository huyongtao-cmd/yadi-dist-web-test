//顾客查询
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import { history } from 'react-router-dom';
import * as service from './service';
import EditModal from '../Edit/index'; // 新增弹框
import { ElNotification } from '@/components/el';

import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';

import dayjs from 'dayjs';
// import { null } from 'mathjs';
// import { null } from 'mathjs';
// import { null } from 'mathjs';

const { Option } = Select;

interface Props {
  history: history;
  match: any;
  style: any;
}
interface State {
  tableRef: any;
  searchparmas: any;
  switchLodingList: any;
  modalVisible: boolean;
  GK: String,
  loading?: boolean;
  buId: any;
  onRef: any;
  formRefs: any;

}

export default class SupportItemList extends React.Component<Props, State> {
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      searchparmas: '',
      switchLodingList: [],
      modalVisible: false,
      GK: '',
      buId: null,
      onRef: null,
      formRefs: null,
    };
  }
  componentDidMount() {
    this.userOrgBu();
  }

  //新增,开启Modal
  add = async () => {
    this.setState({
      modalVisible: true
    });
  };

  userOrgBu = async () => {
    // storeType: "A"
    this.setState({ loading: true });
    let data = { "current": 1, "size": 999999, }
    const formData = await service.searchUserOrgBu(data);
    if (formData.success) {
      console.log(formData, 'formData')
      this.setState({ loading: false });
      const newData = formData.data.records?.map((item) => ({ ...item, name: item.storeName }));
      const filterData = newData && newData.filter((item) => item.storeStatus === 'ACTIVE');
      this.setState({
        formRefs: {
          storeId: filterData[0].id
        }
      });
    } else {
      ElNotification({
        type: 'error',
        message: formData.msg
      });
    }
  }

  // 关闭Modal
  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    return (
      <>
        <ElSearchTable
          rowKey='index'
          bordered
          onRef={(ref) => {
            this.setState({
              tableRef: ref
            });
          }}
          rowSelectionConfig={null}
          actionButtons={getTableActionButtons(this.add)}
          tableProxy={{
            request: async (paramData) => {
              console.log(paramData, '查询条件')
              const buIdList = JSON.parse(localStorage.getItem('BuIdList')).records;
              const storeIds = buIdList.map((item) => item.id);
              const data = {
                ...paramData,
                // 查询时间到日就可以。
                registerDate: paramData.registerDate && dayjs(paramData?.registerDate).format('YYYY-MM-DD'), //注册日期
                // 根据订单日期倒序排序
                orders: [
                  {
                    asc: false,
                    column: 'createTime'
                  }
                ],
                storeIds
                // keyword: 'GK',
                // 经销商直接带出来的
                // buId: paramData.buId,
              };
              return service.getSelctClient(data);
            },
            successCallBack: (tableRef) => {
              console.log(tableRef, 'records')
            },
            errCallBack: () => {
              // console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          searchFormProps={getTableSearchFormItems}
          columns={getTableColumns(this)}
        />
        <EditModal
          modalVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          tableRef={this.state.tableRef}
          data={this.state.formRefs}
        ></EditModal>
      </>
    );
  }
}
