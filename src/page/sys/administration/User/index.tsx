import React from 'react';
import {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  getAllRoleList,
  triggerUserActive,
  changePassword
} from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { FormInstance, Modal } from 'antd';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { isEmpty } from 'ramda';
interface State {
  userVisible: boolean;
  formRef: FormInstance;
  formData: object;
  tableRef: any;
  roleList: Array<any>;
  userEditLoading: boolean;
  userSaveLoading: boolean;
  usertriggerLoading: boolean;
  resetLoading: boolean;
  action: string;
}
class User extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userVisible: false,
      formRef: null,
      formData: { password: '888888' },
      tableRef: null,
      roleList: [],
      userEditLoading: false,
      userSaveLoading: false,
      usertriggerLoading: false,
      resetLoading: false,
      action: ''
    };
  }
  componentDidMount() {
    this.getAllRoleList();
  }
  getAllRoleList = async () => {
    const res = await getAllRoleList();
    if (res.success) {
      this.setState({
        roleList: res.data.records.map((v) => {
          return {
            key: v.id,
            label: v.name,
            value: v.id
          };
        })
      });
    }
  };
  handleCreate = () => {
    this.setState({
      userVisible: true,
      formData: { password: '888888' },
      action: '新增'
    });
  };
  handleEdit = async (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      userEditLoading: true
    });
    const res = await getUserById(selectedRowKeys[0]);
    if (res.success) {
      res.data.roleIds = res.data.roles.map((v) => v.id);
      this.setState({
        userVisible: true,
        formData: res.data,
        action: '编辑'
      });
    }
    this.setState({
      userEditLoading: false
    });
  };
  closeModal = () => {
    this.setState({
      userVisible: false
    });
    const { formRef, tableRef } = this.state;
    if (formRef) {
      formRef.resetFields();
    }
    if (tableRef) {
      tableRef.getTableData();
    }
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        userSaveLoading: true
      });
      if (!isEmpty(formData)) {
        data = { ...formData, ...data };
      }
      let res;
      if (data.id) {
        res = await updateUser(data);
      } else {
        res = await createUser(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        userSaveLoading: false
      });
    }
  };
  triggerActive = async (selectedRowKeys) => {
    this.setState({
      usertriggerLoading: true
    });
    const res = await triggerUserActive(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '切换成功'
      });
      const { tableRef } = this.state;
      tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      usertriggerLoading: false
    });
  };
  resetPassword = async (selectedRowKeys) => {
    this.setState({
      resetLoading: true
    });
    const res = await changePassword(selectedRowKeys[0], '888888');
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '重置成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      resetLoading: false
    });
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.userVisible}
          okText='保存'
          title={`用户${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          okButtonProps={{
            disabled: this.state.userSaveLoading,
            loading: this.state.userSaveLoading
          }}
        >
          <ElForm
            formProps={getEditForm({
              roleList: this.state.roleList,
              formData: this.state.formData
            })}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='sys_user'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            userEditLoading: this.state.userEditLoading,
            usertriggerLoading: this.state.usertriggerLoading,
            triggerActive: this.triggerActive,
            resetLoading: this.state.resetLoading,
            resetPassword: this.resetPassword
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getUserList(paramData);
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
      </>
    );
  }
}
export default User;
