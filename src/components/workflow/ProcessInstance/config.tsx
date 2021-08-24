import React from 'react';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  EditBlue,
  DeleteRed,
  WorkflowShowBlue,
  WorkflowHangYellow
} from '@/components/el/ElIcon';
import { Button, Modal, Table, Tag } from 'antd';
import { getCategoryDropDownList } from './service';
import { PROC_DEF_STATUS, PROC_INST_STATUS_EUMN } from '../constance';
import Time from '../Time';
import DateFormatter from '../DateFormatter';
import { clone } from 'mathjs';
const { confirm } = Modal;
const getTableColumns = ({
  handleInsModalShow,
  handleInterruptModalShow,
  hanldeProcessHangOrActive
}): Array<ElSearchTableColumns> => [
  {
    title: '流程实例名称',
    align: 'center',
    dataIndex: 'procInstName'
  },
  {
    title: '流程定义名称',
    align: 'center',
    dataIndex: 'procDefName'
  },
  {
    title: '业务KEY',
    // width: 100,
    align: 'center',
    dataIndex: 'businessKey'
  },

  {
    title: '发起人',
    align: 'center',
    dataIndex: 'startUser'
  },
  {
    title: '发起人姓名',
    align: 'center',
    dataIndex: 'startUserName'
  },
  {
    title: '发起时间',
    // width: 100,
    align: 'center',
    dataIndex: 'startTime',
    render: (value, record) => {
      return <DateFormatter dateString={record.startTime} />;
    }
  },

  {
    title: '持续时间',
    align: 'center',
    dataIndex: 'duration',
    render: (text, record) => {
      return <Time milliseconds={record.duration} />;
    }
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    render: (value) => {
      return PROC_INST_STATUS_EUMN[value];
    }
  },
  {
    title: '挂起',
    // width: 100,
    align: 'center',
    dataIndex: 'isSuspended',
    render: (value, record) => {
      return !record.endTime ? (
        value ? (
          <Tag color='#f50'>是</Tag>
        ) : (
          <Tag color='#87d068'>否</Tag>
        )
      ) : (
        '-'
      );
    }
  },

  {
    title: '异常',
    dataIndex: 'exception',
    align: 'center',
    render: (value, record) => {
      if (record.lackTaskAssigneeCount >= 1) {
        return <Tag color='#f50'>有任务没有处理人</Tag>;
      } else {
        return '-';
      }
    }
  },
  {
    title: '操作',
    // width: 100,
    align: 'left',
    dataIndex: '',
    render: (value, record) => {
      const suspensionText = record.isSuspended ? '激活' : '挂起';

      return (
        <>
          <Button
            icon={<WorkflowShowBlue />}
            type='link'
            onClick={(e) => {
              e.stopPropagation();
              handleInsModalShow(record.id);
            }}
          >
            查看流程图
          </Button>
          {!record.endTime ? (
            <Button
              icon={<WorkflowHangYellow />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                confirm({
                  content: '是否确定要挂起?',
                  onOk: () => {
                    console.log(record);
                    hanldeProcessHangOrActive({
                      isSuspended: !record.isSuspended,
                      processInstanceId: record.id
                    });
                  },
                  onCancel: () => {}
                });
              }}
            >
              挂起流程
            </Button>
          ) : null}
          {!record.endTime ? (
            <Button
              icon={<WorkflowShowBlue />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                handleInterruptModalShow(record.id);
              }}
            >
              中断流程
            </Button>
          ) : null}
        </>
      );
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '流程类别',
      name: 'categoryId',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          request: getCategoryDropDownList,
          placeholder: '流程类别'
        }
      }
    },
    {
      title: '流程定义名称',
      name: 'procDefName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程定义名称'
        }
      }
    },
    {
      title: '流程定义KEY',
      name: 'procDefKey',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '流程定义KEY'
        }
      }
    },
    {
      title: '状态',
      name: 'state',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          options: PROC_DEF_STATUS,
          placeholder: '状态'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  handleDelete,
  categoryEditLoading,
  categoryDeleteLoading
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      location: 'left',
      handleClick: handleCreate
    },
    {
      text: '编辑',
      key: 'edit',
      icon: <EditBlue />,
      disabled: categoryEditLoading,
      loading: categoryEditLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleEdit(selectedRowKeys, selectedRows)
    },
    {
      text: '删除',
      key: 'delete',
      icon: <DeleteRed />,
      disabled: categoryDeleteLoading,
      loading: categoryDeleteLoading,
      hidden: false,
      minSelection: 1,
      location: 'left',
      needConfirm: true,
      confirmText: '是否确定要删除?',
      handleClick: ({ selectedRowKeys }) => handleDelete(selectedRowKeys[0])
    }
  ];
};
const getEditForm = (): ElFormProps => {
  return {
    items: [
      {
        title: '流程定义类别',
        name: 'categoryId',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入流程类别!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            request: getCategoryDropDownList,
            placeholder: '流程类别'
          }
        }
      },
      {
        title: '流程定义名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入流程定义名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '流程定义名称'
          }
        }
      },
      {
        title: '流程定义KEY',
        name: 'key',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入流程定义KEY!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '流程定义KEY'
          }
        }
      }
    ]
  };
};
const getExpandedRowRender = ({
  record,
  expandTableLoading,
  insHistoryTableData,
  handleCompleteModalShow,
  handleChangeTaskModalShow
}) => {
  const columns = [
    {
      title: '任务节点名称',
      dataIndex: 'taskName'
    },
    {
      title: '任务负责人',
      dataIndex: 'taskLeaders',
      render: (text, row) => {
        return text || <Tag color='#f50'>无负责人</Tag>;
      }
    },
    {
      title: '任务处理人',
      dataIndex: 'taskHandler'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      render: (value, record) => {
        return <DateFormatter dateString={record.startTime} />;
      }
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (value, record) => {
        return <DateFormatter dateString={record.endTime} />;
      }
    },
    {
      title: '持续时间',
      dataIndex: 'duration',
      render: (text, record) => {
        return <Time milliseconds={record.duration} />;
      }
    },
    {
      title: '操作',
      key: 'option',
      render: (text, row) => {
        return row.endTime
          ? '-'
          : [
              <Button
                icon={<WorkflowShowBlue />}
                type='link'
                key='1'
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeTaskModalShow(row);
                }}
              >
                修改任务处理人
              </Button>,
              <Button
                icon={<WorkflowShowBlue />}
                type='link'
                key='2'
                onClick={(e) => {
                  console.log(row);
                  e.stopPropagation();
                  handleCompleteModalShow(row);
                }}
              >
                推进流程
              </Button>
            ];
      }
    }
  ];

  return (
    <Table
      size='small'
      loading={expandTableLoading}
      columns={columns}
      dataSource={insHistoryTableData[`#${record.businessKey}`]}
      pagination={false}
    />
  );
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getExpandedRowRender
};
