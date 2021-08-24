import React from 'react';
import { ElContainerProps } from '@/components/el/ElRowContainer';
import { AddWhite, EditWhite } from '@/components/el/ElIcon';
import { ElFormProps } from '@/components/el/ElForm';
import { isEmpty } from 'ramda';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElSearchTableColumns> => [
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
  }
  // {
  //   title: '排列序号',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'sortNo'
  // }
];

const getTableActionButtons = ({
  handleActionCreate,
  handleActionEdit,
  selectedNode
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增能力',
      key: 'create',
      icon: <AddBlue />,
      disabled: isEmpty(selectedNode),
      hidden: false,
      location: 'left',
      handleClick: handleActionCreate,
      authCode: 'permissionsAbilityListAdd'
    },
    {
      text: '编辑能力',
      key: 'edit',
      icon: <EditBlue />,
      disabled: isEmpty(selectedNode),
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      authCode: 'permissionsAbilityListEdit',
      handleClick: ({ selectedRows }) => handleActionEdit(selectedRows)
    }
  ];
};
const getActionButtons = ({
  handleMenuCreate,
  handleMenuEdit,
  selectedNode,
  menuEditButtonLoading
}): Array<ElContainerProps> => {
  return [
    {
      text: '新增菜单',
      key: 'create',
      icon: <AddWhite />,
      disabled: false,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuCreate,
      // authCode: 'permissionsMenuListAdd'
    },
    {
      text: '编辑菜单',
      key: 'edit',
      icon: <EditWhite />,
      loading: menuEditButtonLoading,
      disabled: isEmpty(selectedNode) || menuEditButtonLoading,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuEdit,
      // authCode: 'permissionsMenuListEdit',
    }
  ];
};
const getMenuEditForm = (): ElFormProps => {
  return {
    items: [
      {
        title: '菜单代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入菜单代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '菜单代码'
          }
        }
      },
      {
        title: '菜单名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入菜单名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '菜单名称'
          }
        }
      },
      {
        title: '菜单路由',
        name: 'pattern',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入菜单路由!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '菜单路由'
          }
        }
      },
      {
        title: '排列序号',
        name: 'sortNo',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入排列序号!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '排列序号'
          }
        }
      },
      {
        title: '是否隐藏',
        name: 'isHidden',
        span: 24,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '是否隐藏'
          }
        }
      }
    ]
  };
};
const getActionEditForm = (isEdit): ElFormProps => {
  return {
    items: [
      {
        title: '能力代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入能力代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '能力代码',
            disabled: isEdit
          }
        }
      },
      {
        title: '能力名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入能力名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '能力名称'
          }
        }
      },
      {
        title: '能力路由',
        name: 'pattern',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入能力路由!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '能力路由'
          }
        }
      }
      // {
      //   title: '排列序号',
      //   name: 'sortNo',
      //   span: 24,
      //   rules: [
      //     {
      //       required: true,
      //       message: '请输入排列序号!'
      //     }
      //   ],
      //   formOption: {
      //     type: '$inputNumber',
      //     props: {
      //       placeholder: '排列序号'
      //     }
      //   }
      // }
    ]
  };
};
export {
  getTableColumns,
  getTableActionButtons,
  getActionButtons,
  getActionEditForm,
  getMenuEditForm
};
