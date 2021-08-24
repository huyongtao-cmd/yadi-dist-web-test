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

export default class SupportItemList extends React.Component<Props, State> {
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
          this.props.push('/orgCenter/ouData/add/add')
        )
      case 'edit':
        return (
          this.props.push(`/orgCenter/ouData/edit/edit/${keys[0]}`)
        )
      case 'sure':
        return this.sure(keys, rows, 'ACTIVE')
      case 'stop':
        return this.sure(keys, rows, 'CLOSED')  //    第一版停用和强行停用都为已停用
      case 'forceStop':
        return this.sure(keys, rows, 'CLOSED')
    }
  }
  //确认
  sure = async (ids, rows, ouStatus) => {
    const status = ouStatus === 'ACTIVE' ? 'DRAFT' : 'ACTIVE';
    let flag = false;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].ouStatus != status) {
        flag = true;
        break;
      }
    }
    if (flag) {
      ElNotification({
        type: 'warning',
        message: `请勾选状态为${ouStatus === 'ACTIVE' ? '草稿' : '正常'}的组织`
      });
      return;
    }
    const res = await service.updateOrgBuStatus({ ids, ouStatus });
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
          columns={getTableColumns(this)}
        />
      </>
    );
  }
}
