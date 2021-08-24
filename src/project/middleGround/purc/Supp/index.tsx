// 供应商查询页面
import React from 'react';
import { ElNotification, ElPage, ElSearchTable } from '@/components/el';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { history, push } from 'react-router-dom';
import * as service from './service';
interface Props {
  history: history;
  push: push;
}
interface State {
  tableRef: any;
  pageLoading: boolean;
}
class Supp extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      pageLoading: false
    };
  }

  componentDidMount() { }

  onRef = (ref) => {
    this.setState({ tableRef: ref });
  };

  request = (paramData) => {
    return service.search({
      ...paramData,
      orders: [{ asc: false, column: 'createTime' }],
      // ...this.handleValidRange(paramData)
    });
  };

  //新增供应商
  handleCreate = () => {
    this.props.push('/purc/supp/create');
  };

  //编辑供应商
  handleEdit = ({ selectedRows, selectedRowKeys }) => {
    if (selectedRowKeys[0] === "0") {
      ElNotification({
        type: 'warning',
        message: '置顶供应商无法编辑，请检查！'
      });
      return;
    }
    this.props.push('/purc/supp/index/' + selectedRows[0].id);
  };

  tableProxy = () => ({
    request: this.request,
    errCallBack: (res) => {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    },
    props: {
      success: 'success',
      result: 'data.records',
      total: 'data.total'
    },
    autoLoad: true
  });

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElSearchTable
          bordered
          rowKey='id'
          onRef={this.onRef}
          scroll={{ x: 'min-content', y: 550 }}
          tableProxy={this.tableProxy()}
          searchFormProps={{ items: getTableSearchFormItems() }}
          columns={getTableColumns()}
          actionButtons={getTableActionButtons(
            this.handleCreate,
            this.handleEdit
          )}
        />
      </ElPage>
    );
  }
}

export default Supp;
