/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 11:01:49
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-24 11:02:14
 */
import React, { PureComponent } from 'react';
import { history, push } from 'react-router-dom';

import { Table, Spin } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import ElNotification from '@/components/el/ElNotification';

import PropTypes from 'prop-types';
// import { ElTabPaneProps } from "@/components/el/ElTab";

import {
  getTableSearchFormItems,
  getTableActionButtons,
  getTableColumns
} from './config';

import * as service from './service'

interface Props {
  history: history;
  match: any;
  push: push;
}

interface State {
  selectedRowKeys: Array<any>;
  selectedRows: Array<any>;
  [props: string]: any;
}

export default class Query extends PureComponent<Props, State> {
  static propTypes = {};
  tableRef: any;
  itemsTableRef: any;
  tagsTableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 表格勾选行keys
      selectedRows: [] // 表格勾选行rows
    };
  }

  handleAdd = () => {
    this.props.push('/orgCenter/orgTree/add');
  }

  handleEdit = () => {
    const row = this.state.selectedRows[0];
    const { id, nowVersion } = row;
    this.props.push(`/orgCenter/orgTree/edit/${id}/${nowVersion}`);
  }

  handlePermissionEdit = () => {
    const row = this.state.selectedRows[0];
    const { id, nowVersion } = row;
    this.props.push(`/orgCenter/orgTree/permission/${id}/${nowVersion}`);
  };

  handleSetStatus = async (payload: { ids: Array<string>, status: string }) => {
    const { ids, status } = payload;
    const res = await service.setBuTreeStatus({
      ids,
      buTreeStatus: status
    });
    if (res?.success) {
      this.tableRef.refreshData()
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      })
    }
  };

  handleNewVision = () => {
    const id = this.state.selectedRowKeys[0];
    this.props.push(`/orgCenter/orgTree/add/${id}/1`);
  }

  handleResume = () => {
    const id = this.state.selectedRowKeys[0];
    this.props.push(`/orgCenter/orgTree/resume/${id}`);
  }

  render() {
    return (
      <>
        <ElSearchTable
          rowKey='id'
          onRef={(ref) => (this.tableRef = ref)}
          mode={{
            proxy: true, // 筛选器
            search: true, // searchForm
            action: true,
            pagination: true, // 分页
            descriptions: true, // descriptions
            tabs: false
          }}
          searchFormProps={getTableSearchFormItems()}
          actionButtons={getTableActionButtons(this)}
          columns={getTableColumns()}
          rowSelectionConfig={{
            disabledRowIds: [],
            type: 'checkbox',
            fixed: false,
            onChange: ({ selectedRowKeys, selectedRows }) => {
              this.setState({
                selectedRowKeys,
                selectedRows
              });
            }
          }}
          tableProxy={{
            request: (paramData) => {
              paramData.orders = [{ asc: false, column: 'createTime' }]
              return service.getList({ ...paramData });
            },
            successCallBack: (tableRef) => { },
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
        />
      </>
    );
  }
}
