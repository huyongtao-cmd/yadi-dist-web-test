//下一编号规则
import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '下一编号代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '下一编号名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '下一编号分类',
    // width: 100,
    align: 'center',
    dataIndex: 'numberClass'
  },
  {
    title: '下一编号步长',
    // width: 100,
    align: 'center',
    dataIndex: 'step'
  },
  {
    title: '下一编号取值',
    // width: 100,
    align: 'center',
    dataIndex: 'nextNumber'
  },
  {
    title: '下一编号周期',
    // width: 100,
    align: 'center',
    dataIndex: 'nnPeriodName'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '下一编号代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '下一编号代码'
        }
      }
    },
    {
      title: '下一编号名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '下一编号名称'
        }
      }
    },
    {
      title: '下一编号分类',
      name: 'numberClass',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '下一编号分类'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit
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
      authCode: 'numberingNextnumListAdd'
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
      handleClick: handleEdit,
      authCode: 'numberingNextnumListEdit'
    }
  ];
};
export { getTableSearchFormItems, getTableColumns, getActionButtons };
