//公司主数据
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import * as service from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';

const { Option } = Select;

interface Props {
  history: history;
  match: any;
  style: any;
  push: push;
}
interface State {
  tableRef: any;
  searchparmas: any;
  switchLodingList: any;
  modalSatus: boolean;
}

export default class SupportStoreList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      searchparmas: '',
      switchLodingList: [],
      modalSatus: false,
    };
  }

  // 增加商品跳转
  addItem = () => {
    this.changeModalStatus(true);
  };

  changeModalStatus = (status) => {
    this.setState({ modalSatus: status });
  };

  handleCancel = () => {
    this.changeModalStatus(false);
  };
  //操作按钮
  handleClick = (keys, rows, type) => {
    switch (type) {
      case 'add':
        return (
          this.props.push('/orgCenter/store/detail/add/0')
        )
      case 'edit':
        return (
          this.props.push(`/orgCenter/store/detail/edit/${keys[0]}`)
        )
      case 'sure':  //启用
        return this.sure(keys, rows, 'ACTIVE')
      case 'stop':  //禁用
        return this.sure(keys, rows, 'CLOSED')
    }
  }
  //确认
  sure = async (ids, rows, storeStatus) => {
    let flag = false;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].storeStatus === storeStatus) {
        flag = true;
        break;
      }
    }
    if (flag) {
      ElNotification({
        type: 'warning',
        message: `请勾选状态为${storeStatus === 'ACTIVE' ? '禁用' : '启用'}状态的门店`
      });
      return;
    }
    const res = await service.updateOrgStoreStatus({ ids, storeStatus });
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  }

  render() {
    return (
      <>
        <ElSearchTable
          rowKey='id'
          bordered
          onRef={(ref) => {
            this.tableRef = ref;
          }}
          actionButtons={getTableActionButtons(this.handleClick)}
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [{
                asc: false,
                column: 'createTime'
              }]
              paramData.pid = paramData.buObj ? paramData.buObj.buId : '';
              return service.getOuDataList(paramData)
            },
            successCallBack: (tableRef) => {
              this.setState({
                tableRef
              });
            },
            errCallBack: () => {
              console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          searchFormProps={getTableSearchFormItems}
          columns={getTableColumns()}
        />
      </>
    );
  }
}
