import React from 'react';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  EditBlue,
  RefreshBlue,
  ActiveBlue,
  DeleteRed
} from '@/components/el/ElIcon';
import { Button, Modal } from 'antd';
import { PROC_CATEGORY_STATUS } from '../constance';
const { confirm } = Modal;
const getTableColumns = ({
  handleEdit,
  handleDelete
}): Array<ElSearchTableColumns> => [
  {
    title: '类别名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '类别描述',
    align: 'center',
    dataIndex: 'describe'
  },
  {
    title: '排序',
    // width: 100,
    align: 'center',
    dataIndex: 'sort'
  },
  {
    title: '类别状态',
    // width: 100,
    align: 'center',
    render: (value) => {
      return PROC_CATEGORY_STATUS.find((v) => v.value === value)?.label || '';
    },
    dataIndex: 'state'
  },
  {
    title: '流程定义数量',
    // width: 100,
    align: 'center',
    dataIndex: 'processNum'
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
        </>
      );
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '类别名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '类别名称'
        }
      }
    },
    {
      title: '类别描述',
      name: 'describe',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '类别描述'
        }
      }
    },
    {
      title: '类别状态',
      name: 'state',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          options: PROC_CATEGORY_STATUS,
          placeholder: '类别状态'
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
        title: '类别名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入类别名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '类别名称'
          }
        }
      },
      {
        title: '类别描述',
        name: 'describe',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入类别描述!'
          }
        ],
        formOption: {
          type: '$textArea',
          props: {
            placeholder: '类别描述'
          }
        }
      },
      {
        title: '类别排序',
        name: 'sort',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入类别排序!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '类别排序'
          }
        }
      },
      {
        title: '类别状态',
        name: 'state',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入类别状态!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            options: PROC_CATEGORY_STATUS.filter((v) => v.value),
            placeholder: '类别状态'
          }
        }
      }
    ]
  };
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
};
