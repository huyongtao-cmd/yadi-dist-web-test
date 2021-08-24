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
  WorkflowHangYellow,
  WorkflowDeployBlue
} from '@/components/el/ElIcon';
import { Button, Modal, Table, Badge } from 'antd';
import { getCategoryDropDownList } from './service';
import {
  PROC_DEF_STATUS,
  PROC_DEF_HISTORY_STATUS,
  SUSPENDED_STATUS
} from '../constance';
const { confirm } = Modal;
const getTableColumns = ({
  handleEdit,
  handleDelete,
  handleProcessDesign,
  handleProcessDeploy
}): Array<ElSearchTableColumns> => [
  {
    title: '流程类别',
    align: 'center',
    dataIndex: 'categoryName'
  },
  {
    title: '流程定义名称',
    align: 'center',
    dataIndex: 'procDefName'
  },
  {
    title: '流程定义KEY',
    // width: 100,
    align: 'center',
    dataIndex: 'procDefKey'
  },
  {
    title: '状态',
    // width: 100,
    align: 'center',
    render: (value) => {
      return PROC_DEF_STATUS.find((v) => v.value === value)?.label || '';
    },
    dataIndex: 'state'
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
            icon={<EditBlue />}
            type='link'
            onClick={(e) => {
              e.stopPropagation();
              handleEdit([record.id], [record]);
            }}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteRed />}
            type='link'
            onClick={(e) => {
              e.stopPropagation();
              confirm({
                content: '是否确定要删除?',
                onOk: () => {
                  handleDelete(record.id);
                },
                onCancel: () => {}
              });
            }}
          >
            删除
          </Button>
          <Button
            icon={<WorkflowShowBlue />}
            type='link'
            onClick={(e) => {
              e.stopPropagation();
              handleProcessDesign(record);
            }}
          >
            设计流程
          </Button>
          {record.state !== 'RUNNING' && (
            <Button
              icon={<WorkflowDeployBlue />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                handleProcessDeploy(record);
              }}
            >
              部署流程
            </Button>
          )}
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
  definitionEditLoading,
  definitionDeleteLoading
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
      disabled: definitionEditLoading,
      loading: definitionEditLoading,
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
      disabled: definitionDeleteLoading,
      loading: definitionDeleteLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
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
          },
          {
            pattern: new RegExp(/^[A-Z_]+$/, 'g'),
            message: 'KEY只允许包含大写字母或下划线'
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
  definitionHistoryTableData,
  hanldeProcessHangOrActive,
  handleProcessShow,
  expandTableLoading
}) => {
  const columns = [
    { title: '版本', dataIndex: 'version', key: 'version' },
    {
      title: '流程实例(运行/结束/所有)',
      dataIndex: 'procInstInfo',
      key: 'procInstInfo',
      render: (text, row) => {
        return `${row.runingProcInst}/${row.endProcInst}/${row.totalProcInst}`;
      }
    },
    {
      title: '状态',
      dataIndex: 'latestVersion',
      key: 'latestVersion',
      render: (value) => {
        return PROC_DEF_HISTORY_STATUS[value];
      }
    },
    {
      title: '是否挂起',
      dataIndex: 'isSuspended',
      key: 'isSuspended',
      render: (value) => {
        return SUSPENDED_STATUS[value];
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (value, row) => {
        return (
          <>
            <Button
              icon={<DeleteRed />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                handleProcessShow(row);
              }}
            >
              查看流程图
            </Button>
            <Button
              icon={<WorkflowHangYellow />}
              type='link'
              onClick={(e) => {
                e.stopPropagation();
                confirm({
                  content: '是否确定要挂起?',
                  onOk: () => {
                    if (row.isSuspended) {
                      hanldeProcessHangOrActive({
                        isSuspended: false,
                        processDefinitionId: row.id,
                        procDefKey: record.procDefKey
                      });
                    } else {
                      hanldeProcessHangOrActive({
                        isSuspended: true,
                        processDefinitionId: row.id
                      });
                    }
                    // handleDelete(record.id);
                  },
                  onCancel: () => {}
                });
              }}
            >
              {row.isSuspended ? '激活' : '挂起'}
            </Button>
          </>
        );
      }
    }
  ];
  return (
    <Table
      size='small'
      rowKey='id'
      loading={expandTableLoading}
      columns={columns}
      dataSource={definitionHistoryTableData[record.procDefKey]}
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
