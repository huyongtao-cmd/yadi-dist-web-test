//员工列表
import React from 'react';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import service from './service';
import { getTableSearchFormItems, getTableColumns } from './config';
import './index.less';
import app from '@/utils/appCommon';
import { AddBlue, EditBlue, RefreshBlue } from '@/components/el/ElIcon';

interface Props {
  history: history;
  match: any;
  style: any;
  push: push;
}
interface State {
  tableRef: any;
  userTableRef: any;
  searchparmas: any;
  modalSatus: boolean;
  visible: boolean;
  selectedEmpId: any;
  unBindLoading: boolean;
  bindLoading: boolean;
}

export default class SupportItemList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      userTableRef: null,
      searchparmas: '',
      modalSatus: false,
      visible: false,
      selectedEmpId: '',
      unBindLoading: false,
      bindLoading: false
    };
  }
  componentDidMount() { }
  getTableActionButtons = ({ unBindLoading }): Array<ActionButtonProps> => {
    let btns: Array<ActionButtonProps> = [
      {
        text: '新建',
        key: 'create',
        disabled: false,
        location: 'left',
        icon: <AddBlue />,
        handleClick: this.create
      },
      {
        text: '编辑',
        key: 'edit',
        minSelection: 1,
        maxSelection: 1,
        disabled: false,
        location: 'left',
        icon: <EditBlue />,
        handleClick: this.onEdit
      },
      {
        text: '更新状态',
        key: 'updateStatus',
        minSelection: 1,
        disabled: false,
        location: 'left',
        icon: <RefreshBlue />,
        handleClick: this.updateStatus
      }
    ];

    return btns;
  };
  create = async ({ selectedRowKeys, selectedRows }) => {
    this.props.push('/orgCenter/empData/detail/add/add');
  };
  updateStatus = async ({ selectedRowKeys, selectedRows }) => {
    const res = await service.updateStatus(selectedRowKeys);
    app.ShowMsg(res);
  };

  // 跳转方法
  onEdit = ({ selectedRowKeys, selectedRows }) => {
    const row = selectedRows[0];
    if (!row.id) {
      ElNotification({ type: 'error', message: '未获取到数据ID' });
      return;
    }

    this.props.push(`/orgCenter/empData/detail/edit/${row.id}`);
  };
  onUserModalCancel = () => {
    this.setState(
      {
        visible: false
      },
      () => {
        this.tableRef.getTableData();
      }
    );
  };
  render() {
    return (
      <>
        <ElSearchTable
          rowKey='id'
          bordered
          onRef={(ref) => {
            this.tableRef = ref;
          }}
          actionButtons={this.getTableActionButtons({
            unBindLoading: this.state.unBindLoading
          })}
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              paramData.buCodeName = paramData.buObj
                ? paramData.buObj.buCode
                : '';
              return service.search(paramData);
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
          searchFormProps={getTableSearchFormItems()}
          columns={getTableColumns()}
        />
      </>
    );
  }
}
