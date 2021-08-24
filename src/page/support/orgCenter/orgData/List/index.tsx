import React from 'react';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import ElForm from '@/components/el/ElForm';
import { ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import service from './service';
import { getTableSearchFormItems, getTableColumns } from './config';
import './index.less';
import app from '@/utils/appCommon';
import { EditBlue, CloseRed, SubmitBlue } from '@/components/el/ElIcon';

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
      modalSatus: false
    };
  }
  componentDidMount() { }
  getTableActionButtons = (): Array<ActionButtonProps> => {
    let btns: Array<ActionButtonProps> = [
      {
        text: '编辑',
        key: 'edit',
        minSelection: 1,
        maxSelection: 1,
        disabled: false,
        icon: <EditBlue />,
        location: 'left',
        handleClick: ({ selectedRowKeys, selectedRows }) => {
          this.onEdit(selectedRows[0]);
        },
        authCode: 'orgDataListEdit'
      },
      {
        text: '确认',
        key: 'confirm',
        minSelection: 1,
        icon: <SubmitBlue />,
        disabled: false,
        location: 'left',
        handleClick: this.confirm
      },
      {
        text: '停用',
        key: 'stop',
        minSelection: 1,
        disabled: false,
        icon: <CloseRed />,
        location: 'left',
        needConfirm: true,
        confirmText: '您确定要停用吗？',
        handleClick: this.stop
      },
      {
        text: '强行停用',
        key: 'stopForce',
        minSelection: 1,
        disabled: false,
        icon: <CloseRed />,
        location: 'left',
        needConfirm: true,
        confirmText: '您确定要强行停用吗？',
        handleClick: this.stopForce
      }
    ];

    return btns;
  };
  beforeSave = (rows, buStatus) => {
    const status = buStatus === 'ACTIVE' ? 'DRAFT' : 'ACTIVE';
    let flag = false;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].buStatus != status) {
        flag = true;
        break;
      }
    }
    return flag;
  };
  confirm = async ({ selectedRowKeys, selectedRows }) => {
    const flag = this.beforeSave(selectedRows, 'ACTIVE');
    if (flag) {
      ElNotification({
        type: 'warning',
        message: `请勾选状态为草稿的组织`
      });
      return;
    }
    const res = await service.confirm(selectedRowKeys);
    app.ShowMsg(res);
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  };
  stop = async ({ selectedRowKeys, selectedRows }) => {
    const flag = this.beforeSave(selectedRows, 'CLOSED');
    if (flag) {
      ElNotification({
        type: 'warning',
        message: `请勾选状态为正常的组织`
      });
      return;
    }
    const res = await service.stop(selectedRowKeys, false);
    app.ShowMsg(res);
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  };
  stopForce = async ({ selectedRowKeys, selectedRows }) => {
    const flag = this.beforeSave(selectedRows, 'CLOSED');
    if (flag) {
      ElNotification({
        type: 'warning',
        message: `请勾选状态为正常的组织`
      });
      return;
    }
    const res = await service.stop(selectedRowKeys, true);
    app.ShowMsg(res);
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  };

  // 跳转方法
  onEdit = (row) => {
    if (!row.id) {
      ElNotification({ type: 'error', message: '未获取到数据ID' });
      return;
    }
    this.props.push(`/orgCenter/orgData/orgList/detail/edit/${row.id}`);
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
          actionButtons={this.getTableActionButtons()}
          tableProxy={{
            request: async (paramData) => {
              paramData.ouId = paramData.ouObj?.id;
              paramData.orders = [{ asc: false, column: 'createTime' }];
              const res: any = await service.search({
                ...paramData
              });
              if (res && res.success) {
                const setData = res.data.records.map((item) => {
                  return {
                    id: item.id,
                    navSwitchLoding: false,
                    showSwitchLoding: false
                  };
                });
                this.setState({
                  switchLodingList: setData
                });
              }
              return res;
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
          columns={getTableColumns(this)}
        />
      </>
    );
  }
}
