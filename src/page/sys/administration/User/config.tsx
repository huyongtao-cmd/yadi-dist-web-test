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
  ActiveBlue
} from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '用户账号',
    align: 'center',
    dataIndex: 'username'
  },
  {
    title: '用户姓名',
    align: 'center',
    dataIndex: 'firstName'
  },
  {
    title: '用户别名',
    // width: 100,
    align: 'center',
    dataIndex: 'lastName'
  },
  {
    title: '手机号码',
    // width: 100,
    align: 'center',
    dataIndex: 'mobile'
  },
  {
    title: '电子邮箱',
    // width: 100,
    align: 'center',
    dataIndex: 'email'
  },
  {
    title: '角色列表',
    // width: 100,
    align: 'center',
    dataIndex: 'roleNames'
  },
  {
    title: '是否激活',
    // width: 100,
    align: 'center',
    dataIndex: 'enabled',
    render: (value) => {
      return value ? '是' : '否';
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '用户账号',
      name: 'username',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '用户账号'
        }
      }
    },
    {
      title: '用户姓名',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '用户姓名'
        }
      }
    },
    {
      title: '手机号码',
      name: 'mobile',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '手机号码'
        }
      }
    },
    {
      title: '电子邮箱',
      name: 'email',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '电子邮箱'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  userEditLoading,
  triggerActive,
  usertriggerLoading,
  resetLoading,
  resetPassword
}): Array<ActionButtonProps> => {
  return [
    // {
    //   text: '新增',
    //   key: 'create',
    //   icon: <AddBlue />,
    //   disabled: false,
    //   hidden: false,
    //   location: 'left',
    //   handleClick: handleCreate
    // },
    {
      text: '编辑',
      key: 'edit',
      icon: <EditBlue />,
      disabled: userEditLoading,
      loading: userEditLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      authCode: 'usersListEdit',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleEdit(selectedRowKeys, selectedRows)
    },
    {
      text: '切换激活',
      key: 'triggerActive',
      icon: <ActiveBlue />,
      disabled: usertriggerLoading,
      loading: usertriggerLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      authCode: 'usersListTriggerActive',
      handleClick: ({ selectedRowKeys }) => triggerActive(selectedRowKeys)
    },
    {
      text: '重置密码',
      key: 'reset',
      icon: <RefreshBlue />,
      disabled: resetLoading,
      loading: resetLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => resetPassword(selectedRowKeys)
    }
  ];
};
const getEditForm = ({ roleList, formData }): ElFormProps => {
  return {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        title: '用户账号',
        name: 'username',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户账号!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '用户账号'
          }
        }
      },
      {
        title: '用户姓名',
        name: 'firstName',
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
            placeholder: '用户姓名'
          }
        }
      },
      {
        title: '用户别名',
        name: 'lastName',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '用户别名'
          }
        }
      },
      {
        title: '手机号码',
        name: 'mobile',
        span: 24,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入手机号码!'
        //   }
        // ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '手机号码'
          }
        }
      },
      {
        title: '电子邮箱',
        name: 'email',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '电子邮箱'
          }
        }
      },
      {
        title: '角色配置',
        name: 'roleIds',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            placeholder: '角色配置',
            options: roleList,
            multiple: true
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
