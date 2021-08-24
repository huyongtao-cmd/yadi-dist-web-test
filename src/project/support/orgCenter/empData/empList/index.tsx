/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 10:56:37
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 09:54:56
 */
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import service from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getUserTableSearchFormItems,
  getUserTableColumns
} from './config';
import './index.less';
import app from '@/project/utils/appCommon';

const { Option } = Select;

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
  switchLodingList: any;
  modalSatus: boolean;
  visible: boolean;
  selectedEmpId: any;
  unBindLoading: boolean;
  bindLoading: boolean;
}

export default class SupportItemList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  detailPageUrl: string;
  constructor(props) {
    super(props);
    // 2021年6月24日  修改路由配置  需删掉/orgCenter
    this.detailPageUrl = '/mainData/empData/empList/detail';
    this.state = {
      tableRef: null,
      userTableRef: null,
      searchparmas: '',
      switchLodingList: [],
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
        handleClick: this.create,
        authCode: 'empLDataListAdd'
      },
      {
        text: '编辑',
        key: 'edit',
        minSelection: 1,
        maxSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.onEdit,
        authCode: 'empLDataListEdit'
      },
      {
        text: '更新状态',
        key: 'updateStatus',
        minSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.updateStatus,
        authCode: 'empLDataListUpdateStatus'
      },
      {
        text: '绑定用户',
        key: 'bindUser',
        minSelection: 1,
        maxSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.openVisible,
        authCode: 'empLDataListBindUser'
      },
      {
        text: '解绑用户',
        key: 'empLDataListBindUser',
        minSelection: 1,
        maxSelection: 1,
        disabled: unBindLoading,
        loading: unBindLoading,
        location: 'left',
        handleClick: this.unBindUser,
        authCode: 'empLDataListUnbindUser'
      }
    ];

    return btns;
  };
  openVisible = ({ selectedRowKeys }) => {
    this.setState({ visible: true, selectedEmpId: selectedRowKeys[0] });
  };
  bindUser = async () => {
    const {
      selectedRowKeys,
      length
    } = this.state.userTableRef.getSelectionData();
    if (length > 1) {
      ElNotification({ type: 'error', message: '只能选择一个用户' });
    } else {
      this.setState({
        bindLoading: true
      });
      const res = await service.bindUser(
        this.state.selectedEmpId,
        selectedRowKeys[0]
      );
      if (res.success) {
        ElNotification({ type: 'success', message: '绑定成功' });
      } else {
        ElNotification({ type: 'error', message: res.msg });
      }
      this.setState({
        bindLoading: false
      });
    }
  };
  unBindUser = async ({ selectedRowKeys }) => {
    this.setState({
      unBindLoading: true
    });
    const res = await service.unBindUser(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({ type: 'success', message: '解绑成功' });
      // this.tableRef.getTableData();
    } else {
      ElNotification({ type: 'error', message: res.msg });
    }
    this.setState({
      unBindLoading: false
    });
  };
  create = async ({ selectedRowKeys, selectedRows }) => {
    this.props.push(`${this.detailPageUrl}/add/-1`);
  };
  updateStatus = async ({ selectedRowKeys, selectedRows }) => {
    const res = await service.updateStatus(selectedRowKeys);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    this.tableRef.refreshData();
  };

  // 跳转方法
  onEdit = ({ selectedRowKeys, selectedRows }) => {
    const row = selectedRows[0];
    if (!row.id) {
      ElNotification({ type: 'error', message: '未获取到数据ID' });
      return;
    }

    this.props.push(`${this.detailPageUrl}/edit/${row.id}`);
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
        <Modal
          visible={this.state.visible}
          width='1000px'
          okText='绑定'
          onOk={this.bindUser}
          onCancel={this.onUserModalCancel}
          okButtonProps={{
            loading: this.state.bindLoading
          }}
        >
          <ElSearchTable
            tableId='sys_user'
            onRef={(userTableRef) => {
              this.setState({
                userTableRef
              });
            }}
            columns={getUserTableColumns()}
            pageSize={10}
            rowSelectionConfig={{
              type: 'radio',
              fixed: true,
              disabledRowIds: []
            }}
            searchFormProps={getUserTableSearchFormItems}
            tableProxy={{
              request: (paramData) => {
                return service.getUserList(paramData);
              },
              successCallBack: (tableRef) => {
                // this.setState({
                //   tableRef
                // });
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
          />
        </Modal>
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
              if (paramData.buObj) {
                paramData.empBuId = paramData.buObj.buId;
                paramData.empBuTreeId = paramData.buObj.buTreeId;
                paramData.empBuTreeDId = paramData.buObj.buTreeDId;
              }
              delete paramData.buObj;
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
          columns={getTableColumns()}
        />
      </>
    );
  }
}
