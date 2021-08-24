import React from 'react';
import {
  getInstanceList,
  getProcessHistoryList,
  hangOrActiveProcess
} from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getExpandedRowRender
} from './config';
import { FormInstance } from 'antd';
import { ElSearchTable, ElNotification } from '@/components/el';
import ProcInstBpmnModal from '../BpmnViewer/ProcInstBpmnModal';
import {
  ChangeTaskAssignessModal,
  CompleteModal,
  InterruptProcessModal
} from './components';
import { clone } from 'mathjs';
interface State {
  userVisible: boolean;
  formRef: FormInstance;
  tableRef: any;
  insHistoryTableData: Array<any>;
  tempProcessDefinitionId: string;
  insModalRef: any;
  interruptModalRef: any;
  completeModalRef: any;
  changeTaskModalRef: any;
  tempTaskRow: any;
  expandTableLoading: boolean;
}
class ProcessInstance extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userVisible: false,
      formRef: null,
      tableRef: null,
      insHistoryTableData: [],
      tempProcessDefinitionId: '',
      insModalRef: null,
      interruptModalRef: null,
      completeModalRef: null,
      changeTaskModalRef: null,
      tempTaskRow: {},
      expandTableLoading: false
    };
  }
  handleInsModalShow = (tempProcessDefinitionId) => {
    this.setState(
      {
        tempProcessDefinitionId
      },
      () => {
        const { insModalRef } = this.state;
        if (insModalRef) {
          insModalRef.setModalVisible(true);
        }
      }
    );
  };
  handleInterruptModalShow = (tempProcessDefinitionId) => {
    this.setState(
      {
        tempProcessDefinitionId
      },
      () => {
        const { interruptModalRef } = this.state;
        if (interruptModalRef) {
          interruptModalRef.setModalVisible(true);
        }
      }
    );
  };
  handleCompleteModalShow = (row) => {
    this.setState(
      {
        tempTaskRow: row
      },
      () => {
        const { completeModalRef } = this.state;
        if (completeModalRef) {
          completeModalRef.setModalVisible(true);
        }
      }
    );
  };
  handleChangeTaskModalShow = (row) => {
    this.setState(
      {
        tempTaskRow: row
      },
      () => {
        const { changeTaskModalRef } = this.state;
        if (changeTaskModalRef) {
          changeTaskModalRef.setModalVisible(true);
        }
      }
    );
  };

  getTableData = () => {
    const { tableRef } = this.state;
    if (tableRef) {
      tableRef.getTableData();
    }
  };
  hanldeProcessHangOrActive = async (data) => {
    const res = await hangOrActiveProcess(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '挂起成功'
      });
      this.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  getExpandTableData = async (processInstanceId, businessKey) => {
    this.setState({
      expandTableLoading: true
    });
    const res = await getProcessHistoryList({ processInstanceId });
    if (res.success) {
      const { insHistoryTableData } = this.state;
      this.setState({
        insHistoryTableData: clone({
          ...insHistoryTableData,
          [`#${businessKey}`]: res.data
        })
      });
    }
    this.setState({
      expandTableLoading: false
    });
  };
  onTableExpand = (expanded, record) => {
    if (expanded) {
      const { id, businessKey } = record;
      this.getExpandTableData(id, businessKey);
    }
  };
  render() {
    return (
      <>
        <CompleteModal
          tempTaskRow={this.state.tempTaskRow}
          onRef={(completeModalRef) => {
            this.setState({
              completeModalRef
            });
          }}
          getExpandTableData={this.getExpandTableData}
        />
        <ChangeTaskAssignessModal
          tempTaskRow={this.state.tempTaskRow}
          onRef={(changeTaskModalRef) => {
            this.setState({
              changeTaskModalRef
            });
          }}
          getExpandTableData={this.getExpandTableData}
        />
        <ProcInstBpmnModal
          processDefinitionId={this.state.tempProcessDefinitionId}
          onRef={(insModalRef) => {
            this.setState({
              insModalRef
            });
          }}
        />
        <InterruptProcessModal
          processDefinitionId={this.state.tempProcessDefinitionId}
          onRef={(interruptModalRef) => {
            this.setState({
              interruptModalRef
            });
          }}
          getTableData={this.getTableData}
        />
        <ElSearchTable
          expandable={{
            onExpand: this.onTableExpand,
            expandedRowRender: (record) =>
              getExpandedRowRender({
                record,
                expandTableLoading: this.state.expandTableLoading,
                insHistoryTableData: this.state.insHistoryTableData,
                handleCompleteModalShow: this.handleCompleteModalShow,
                handleChangeTaskModalShow: this.handleChangeTaskModalShow
              })
          }}
          tableId='workflow-instance'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns({
            handleInsModalShow: this.handleInsModalShow,
            handleInterruptModalShow: this.handleInterruptModalShow,
            hanldeProcessHangOrActive: this.hanldeProcessHangOrActive
          })}
          pageSize={20}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getInstanceList(paramData);
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
export default ProcessInstance;
