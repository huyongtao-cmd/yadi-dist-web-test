import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue, DeleteRed } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '规则编码',
    align: 'center',
    width: 160,
    dataIndex: 'ruleCode'
  },
  {
    title: '规则名称',
    align: 'center',
    width: 200,
    dataIndex: 'ruleName'
  },
  {
    title: '规则分类码',
    width: 140,
    align: 'center',
    dataIndex: 'ruleClassName'
  },
  {
    title: '取号示例',
    width: 140,
    align: 'center',
    dataIndex: 'sampleCode'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '规则编码',
      name: 'ruleCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入规则编码'
        }
      }
    },
    {
      title: '规则名称',
      name: 'ruleName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入规则名称'
        }
      }
    },
    {
      title: '规则分类码',
      name: 'ruleClass',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '规则分类码',
          prefixStr: '/yd-system',
          domain: 'COM',
          udc: 'DOMAIN'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  editLoading
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      location: 'left',
      authCode: 'numberingRuleListAdd',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleCreate('create', selectedRowKeys)
    },
    {
      text: '编辑',
      key: 'edit',
      icon: <EditBlue />,
      disabled: editLoading,
      loading: editLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      authCode: 'numberingRuleListEdit',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleEdit('edit', selectedRows)
    }
  ];
};
export { getTableSearchFormItems, getTableColumns, getActionButtons };
