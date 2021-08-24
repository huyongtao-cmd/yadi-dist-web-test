import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  EditBlue,
  BindBlue,
  ActiveBlue
} from '@/components/el/ElIcon';
import { isEmpty } from 'ramda';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '角色名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '角色代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '角色启用状态',
    // width: 100,
    align: 'center',
    dataIndex: 'enabled',
    render: (value: boolean, record: any) => {
      return value ? '启用' : '停用';
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '角色名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '角色名称'
        }
      }
    },
    {
      title: '角色代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '角色代码'
        }
      }
    },
    {
      title: '角色启用状态',
      name: 'enabled',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          options: [
            {
              key: 'active',
              label: '启用',
              value: true
            },
            {
              key: 'close',
              label: '停用',
              value: false
            },
            {
              key: 'all',
              label: '全部',
              value: ''
            }
          ],
          placeholder: '角色启用状态'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  roletriggerLoading,
  triggerActive
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      location: 'left',
      handleClick: handleCreate,
      authCode: 'rolesListAdd',
    },
    {
      text: '编辑',
      key: 'edit',
      icon: <EditBlue />,
      disabled: false,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRows }) => handleEdit(selectedRows),
      authCode: 'rolesListEdit',
    },
    {
      text: '切换激活',
      key: 'triggerActive',
      icon: <ActiveBlue />,
      disabled: roletriggerLoading,
      loading: roletriggerLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => triggerActive(selectedRowKeys)
    }
  ];
};
const getEditForm = (isEdit): ElFormProps => {
  return {
    items: [
      {
        title: '角色代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '角色代码',
            disabled: isEdit
          }
        }
      },
      {
        title: '角色名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '角色名称'
          }
        }
      },
      {
        title: '角色启用状态',
        name: 'enabled',
        span: 24,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '角色启用状态'
          }
        }
      }
    ]
  };
};
const getModalTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '能力代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '能力名称',
    // width: 100,
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '能力路由',
    // width: 100,
    align: 'center',
    dataIndex: 'pattern'
  },
  {
    title: '排列序号',
    // width: 100,
    align: 'center',
    dataIndex: 'sortNo'
  }
];

const getTableActionButtons = ({
  handleActionBind,
  selectedNode,
  actionBindButtonLoading
}): Array<ActionButtonProps> => {
  return [
    {
      text: '绑定',
      key: 'edit',
      icon: <BindBlue />,
      disabled: isEmpty(selectedNode) || actionBindButtonLoading,
      hidden: false,
      loading: actionBindButtonLoading,
      minSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleActionBind(selectedRowKeys)
    }
  ];
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getTableActionButtons,
  getModalTableColumns
};
