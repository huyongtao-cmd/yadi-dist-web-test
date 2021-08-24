import React from 'react';
import ElSearchTable, {
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Button, Modal } from 'antd';
import { PROC_INST_STATUS, PROC_INST_STATUS_EUMN } from '../constance';
import { ElTabPaneProps } from '@/components/el/ElTab';
import { WorkflowShowBlue, BillBlue } from '@/components/el/ElIcon';
import {
  getMyTodoTaskList,
  getMyCompletedTaskList,
  getMyCreatedTaskList,
  getProcDefsDropdownList
} from './service';
import DateFormatter from '../DateFormatter';
const { confirm } = Modal;
const getTodoTasktableColumns = ({
  setTempProcessDefinitionId,
  setModalVisible
}): Array<ElSearchTableColumns> => [
  {
    title: '流程实例名称',
    dataIndex: 'procInstName'
  },
  {
    title: '流程发起人',
    dataIndex: 'startUser'
  },
  {
    title: '当前任务节点',
    dataIndex: 'taskName'
  },
  {
    title: '任务负责人',
    dataIndex: 'taskLeaders'
  },
  {
    title: '任务处理人',
    dataIndex: 'taskHandler'
  },
  {
    title: '代办人',
    dataIndex: 'taskAgents'
  },
  {
    title: '启动时间',
    dataIndex: 'startTime',
    render: (value) => {
      return <DateFormatter dateString={value} />;
    }
  },
  {
    title: '操作',
    // width: 100,
    dataIndex: '',
    render: (value, record) => {
      return (
        <>
          <Button
            icon={<WorkflowShowBlue />}
            type='link'
            onClick={(e) => {
              e.stopPropagation();
              console.log(record);
            }}
          >
            详情
          </Button>
          <Button
            icon={<WorkflowShowBlue />}
            type='link'
            onClick={(e) => {
              e.stopPropagation();
              setTempProcessDefinitionId(record.processInstanceId, () => {
                setModalVisible(true);
              });
            }}
          >
            查看流程图
          </Button>
        </>
      );
    }
  }
];
const getCompletedTaskTableColumns = ({
  setTempProcessDefinitionId,
  setModalVisible
}): Array<ElSearchTableColumns> => {
  return [
    {
      title: '流程实例名称',
      dataIndex: 'procInstName'
    },
    {
      title: '流程发起人',
      dataIndex: 'startUser'
    },
    {
      title: '当前任务节点',
      dataIndex: 'taskName'
    },
    {
      title: '任务负责人',
      dataIndex: 'taskLeaders'
    },
    {
      title: '任务处理人',
      dataIndex: 'taskHandler'
    },
    {
      title: '启动时间',
      dataIndex: 'startTime',
      render: (value) => {
        return <DateFormatter dateString={value} />;
      }
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (value) => {
        return <DateFormatter dateString={value} />;
      }
    },
    {
      title: '操作',
      // width: 100,
      align: 'center',
      dataIndex: '',
      render: (value, record) => {
        return (
          <>
            <Button
              icon={<BillBlue />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                console.log(record);
              }}
            >
              详情
            </Button>
            <Button
              icon={<WorkflowShowBlue />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                setTempProcessDefinitionId(record.processInstanceId, () => {
                  setModalVisible(true);
                });
              }}
            >
              查看流程图
            </Button>
          </>
        );
      }
    }
  ];
};
const getMyProcessTableColumns = ({
  setTempProcessDefinitionId,
  setModalVisible
}): Array<ElSearchTableColumns> => {
  return [
    {
      title: '流程实例名称',
      dataIndex: 'procInstName'
    },
    {
      title: '发起人',
      dataIndex: 'startUser'
    },
    {
      title: '当前处理人',
      dataIndex: 'taskLeaders'
    },
    {
      title: '启动时间',
      dataIndex: 'startTime',
      render: (value) => {
        return <DateFormatter dateString={value} />;
      }
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (value) => {
        return <DateFormatter dateString={value} />;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value) => {
        return PROC_INST_STATUS_EUMN[value];
      }
    },
    {
      title: '操作',
      // width: 100,
      align: 'center',
      dataIndex: '',
      render: (value, record) => {
        return (
          <>
            <Button
              icon={<BillBlue />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                console.log(record);
              }}
            >
              详情
            </Button>
            <Button
              icon={<WorkflowShowBlue />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                setTempProcessDefinitionId(record.processInstanceId, () => {
                  setModalVisible(true);
                });
              }}
            >
              查看流程图
            </Button>
          </>
        );
      }
    }
  ];
};

const getTodoTaskSearchFormItems: ElFormProps = {
  items: [
    {
      title: '流程实例名称',
      name: 'procInstName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程实例名称'
        }
      }
    },
    {
      title: '流程发起人',
      name: 'startUser',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程发起人'
        }
      }
    }
  ]
};
const getCompletedTaskSearchFormItems: ElFormProps = {
  items: [
    {
      title: '流程实例名称',
      name: 'procInstName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程实例名称'
        }
      }
    },
    {
      title: '流程发起人',
      name: 'startUser',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程发起人'
        }
      }
    }
  ]
};
const getMyProcessSearchFormItems: ElFormProps = {
  items: [
    {
      title: '流程定义',
      name: 'procDefKey',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          request: getProcDefsDropdownList,
          placeholder: '流程定义'
        }
      }
    },
    {
      title: '流程实例名称',
      name: 'procInstName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程实例名称'
        }
      }
    },
    {
      title: '状态',
      name: 'status',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          options: PROC_INST_STATUS,
          placeholder: '状态'
        }
      }
    }
  ]
};

const getTabsConfig = ({
  setTempProcessDefinitionId,
  setModalVisible
}): ElTabPaneProps[] => {
  return [
    {
      key: 'todoTask',
      name: '待办任务',
      render: () => {
        return (
          <ElSearchTable
            tableId='workflow-todoTask'
            columns={getTodoTasktableColumns({
              setTempProcessDefinitionId,
              setModalVisible
            })}
            pageSize={20}
            searchFormProps={getTodoTaskSearchFormItems}
            tableProxy={{
              request: (paramData) => {
                return getMyTodoTaskList(paramData);
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
        );
      }
    },
    {
      key: 'completedTask',
      name: '已办任务',
      render: () => {
        return (
          <ElSearchTable
            tableId='workflow-completedTask'
            columns={getCompletedTaskTableColumns({
              setTempProcessDefinitionId,
              setModalVisible
            })}
            pageSize={20}
            searchFormProps={getCompletedTaskSearchFormItems}
            tableProxy={{
              request: (paramData) => {
                return getMyCompletedTaskList(paramData);
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
        );
      }
    },
    {
      key: 'myProcess',
      name: '我创建的任务',
      render: () => {
        return (
          <ElSearchTable
            tableId='workflow-myProcess'
            columns={getMyProcessTableColumns({
              setTempProcessDefinitionId,
              setModalVisible
            })}
            pageSize={20}
            searchFormProps={getMyProcessSearchFormItems}
            tableProxy={{
              request: (paramData) => {
                return getMyCreatedTaskList(paramData);
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
        );
      }
    }
  ];
};
export { getTabsConfig };
