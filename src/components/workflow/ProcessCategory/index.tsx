import React from 'react';
import {
  getCategoryList,
  getCategoryById,
  saveCategory,
  deleteCategory
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
  editFormData: object;
  tableRef: any;
  categoryEditLoading: boolean;
  categoryDeleteLoading: boolean;
  categorySaveLoading: boolean;
}
class ProcessCategory extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userVisible: false,
      formRef: null,
      editFormData: {},
      tableRef: null,
      categoryEditLoading: false,
      categoryDeleteLoading: false,
      categorySaveLoading: false
    };
  }
  componentDidMount() {}
  handleCreate = () => {
    this.setState({
      userVisible: true,
      editFormData: {}
    });
  };
  handleEdit = async (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      categoryEditLoading: true
    });
    const res = await getCategoryById(selectedRowKeys[0]);
    if (res.success) {
      this.setState({
        userVisible: true,
        editFormData: res.data
      });
    }
    this.setState({
      categoryEditLoading: false
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
    const { formRef, editFormData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        categorySaveLoading: true
      });
      if (!isEmpty(editFormData)) {
        data = { ...editFormData, ...data };
      }
      let res = await saveCategory(data);
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
        categorySaveLoading: false
      });
    }
  };
  handleDelete = async (id) => {
    const { tableRef } = this.state;
    const res = await deleteCategory(id);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '保存成功'
      });
      if (tableRef) {
        tableRef.getTableData();
      }
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.userVisible}
          okText='保存'
          title='流程类型维护'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          okButtonProps={{
            disabled: this.state.categorySaveLoading,
            loading: this.state.categorySaveLoading
          }}
        >
          <ElForm
            data={this.state.editFormData}
            formProps={getEditForm()}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='workflow-category'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns({
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete
          })}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete,
            categoryEditLoading: this.state.categoryEditLoading,
            categoryDeleteLoading: this.state.categoryDeleteLoading
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getCategoryList(paramData);
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
export default ProcessCategory;
