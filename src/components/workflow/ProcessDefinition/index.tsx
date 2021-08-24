import React from 'react';
import {
  getDefinitionList,
  getDefinitionById,
  saveDefinition,
  deleteDefinition,
  getDefinitionHistoryListByKey,
  deployProcess,
  hangOrActiveProcess
} from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getExpandedRowRender
} from './config';
import { FormInstance, Modal } from 'antd';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { isEmpty } from 'ramda';
import BpmnModeler from '../BpmnModeler';
import ProcDefBpmnModal from '../BpmnViewer/ProcDefBpmnModal';
interface State {
  userVisible: boolean;
  formRef: FormInstance;
  editFormData: object;
  tableRef: any;
  definitionEditLoading: boolean;
  definitionDeleteLoading: boolean;
  definitionSaveLoading: boolean;
  definitionHistoryTableData: Array<any>;
  bpmnModelerRef: any;
  processDefinitionId: string;
  bpmnViewerRef: any;
  expandTableLoading: boolean;
}
class ProcessCategory extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userVisible: false,
      formRef: null,
      editFormData: {},
      tableRef: null,
      definitionEditLoading: false,
      definitionDeleteLoading: false,
      definitionSaveLoading: false,
      definitionHistoryTableData: [],
      bpmnModelerRef: null,
      processDefinitionId: '',
      bpmnViewerRef: null,
      expandTableLoading: false
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
      definitionEditLoading: true
    });
    const res = await getDefinitionById(selectedRowKeys[0]);
    if (res.success) {
      this.setState({
        userVisible: true,
        editFormData: res.data
      });
    }
    this.setState({
      definitionEditLoading: false
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
        definitionSaveLoading: true
      });
      if (!isEmpty(editFormData)) {
        data = { ...editFormData, ...data };
      }
      let res = await saveDefinition(data);
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
        definitionSaveLoading: false
      });
    }
  };
  handleProcessDesign = (rowData) => {
    const { bpmnModelerRef } = this.state;
    if (bpmnModelerRef) {
      bpmnModelerRef.setModalVisible(true, rowData);
    }
  };
  handleProcessDeploy = async (record) => {
    const res = await deployProcess(record.id);
    if (res.success) {
      const { tableRef } = this.state;
      ElNotification({
        type: 'success',
        message: '保存成功'
      });
      if (tableRef) {
        tableRef.getTableData();
      }
      this.getExpandTableData(record.procDefKey);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  hanldeProcessHangOrActive = async (data) => {
    const res = await hangOrActiveProcess(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '保存成功'
      });
      this.getExpandTableData(data.procDefKey);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  handleDelete = async (selectedRowKeys) => {
    const { tableRef } = this.state;
    const res = await deleteDefinition(selectedRowKeys);
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
  getExpandTableData = async (procDefKey) => {
    this.setState({
      expandTableLoading: true
    });
    const res = await getDefinitionHistoryListByKey(procDefKey);
    if (res.success) {
      const { definitionHistoryTableData } = this.state;
      this.setState({
        definitionHistoryTableData: {
          ...definitionHistoryTableData,
          [procDefKey]: res.data
        }
      });
    }
    this.setState({
      expandTableLoading: false
    });
  };
  onTableExpand = (expanded, record) => {
    if (expanded) {
      const { procDefKey } = record;
      this.getExpandTableData(procDefKey);
    }
  };
  handleProcessShow = (record) => {
    this.setState(
      {
        processDefinitionId: record.id
      },
      () => {
        this.state.bpmnViewerRef?.setModalVisible(true);
      }
    );
  };
  render() {
    return (
      <>
        <ProcDefBpmnModal
          onRef={(bpmnViewerRef) => {
            this.setState({
              bpmnViewerRef
            });
          }}
          processDefinitionId={this.state.processDefinitionId}
        />
        <Modal
          destroyOnClose={false}
          visible={this.state.userVisible}
          okText='保存'
          title='流程定义维护'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          okButtonProps={{
            disabled: this.state.definitionSaveLoading,
            loading: this.state.definitionSaveLoading
          }}
        >
          <ElForm
            data={this.state.editFormData}
            formProps={getEditForm()}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          expandable={{
            onExpand: this.onTableExpand,
            expandedRowRender: (record) =>
              getExpandedRowRender({
                record,
                definitionHistoryTableData: this.state
                  .definitionHistoryTableData,
                expandTableLoading: this.state.expandTableLoading,
                hanldeProcessHangOrActive: this.hanldeProcessHangOrActive,
                handleProcessShow: this.handleProcessShow
              })
          }}
          tableId='workflow-definition'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns({
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete,
            handleProcessDesign: this.handleProcessDesign,
            handleProcessDeploy: this.handleProcessDeploy
          })}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete,
            definitionEditLoading: this.state.definitionEditLoading,
            definitionDeleteLoading: this.state.definitionDeleteLoading
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getDefinitionList(paramData);
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
        <BpmnModeler
          onRef={(bpmnModelerRef) => {
            this.setState({
              bpmnModelerRef
            });
          }}
        />
      </>
    );
  }
}
export default ProcessCategory;
