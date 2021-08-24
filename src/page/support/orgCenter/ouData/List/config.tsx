//员工列表
import React from 'react';
import { Radio, Form } from 'antd';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Link } from 'react-router-dom';
import {
  AddBlue,
  EditBlue,
  CloseRed,
  SubmitBlue
} from '@/components/el/ElIcon';

const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    title: '公司编号',
    align: 'center',
    dataIndex: 'ouCode',
    width: 160,
    render: (text, column) => {
      const linkTo = () => {
        that.props.push(`/orgCenter/ouData/detail/view/${column.id}`)
      }
      return <a onClick={linkTo}>{text}</a>;
    }
  },
  {
    title: '公司名称',
    align: 'center',
    dataIndex: 'ouName'
  },
  {
    title: '公司简称',
    // width: 100,
    align: 'center',
    dataIndex: 'ouAbbr'
  },
  {
    title: '类型',
    // width: 100,
    align: 'center',
    dataIndex: 'ouTypeName'
  },
  {
    title: '状态',
    // width: 100,
    align: 'center',
    dataIndex: 'ouStatusName'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '公司名称',
      name: 'ouCodeNameLike',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '公司编号、名称、简称'
        }
      }
    },
    {
      title: '公司类型',
      name: 'ouType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'OU_TYPE'
        }
      }
    }
  ]
};

const getTableActionButtons = (
  handleClick: Function
): Array<ActionButtonProps> => [
    {
      text: '新建',
      key: 'add',
      disabled: false,
      location: 'left',
      icon: <AddBlue />,
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleClick(selectedRowKeys, selectedRows, 'add');
      },
      authCode: 'ouListAdd'
    },
    {
      text: '编辑',
      key: 'edit',
      minSelection: 1,
      maxSelection: 1,
      disabled: false,
      icon: <EditBlue />,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleClick(selectedRowKeys, selectedRows, 'edit');
      },
      authCode: 'ouListEdit'
    },
    {
      text: '确认',
      key: 'sure',
      minSelection: 1,
      disabled: false,
      icon: <SubmitBlue />,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleClick(selectedRowKeys, selectedRows, 'sure');
      }
    },
    {
      text: '停用',
      key: 'stop',
      minSelection: 1,
      disabled: false,
      location: 'left',
      icon: <CloseRed />,
      needConfirm: true,
      confirmText: '您确定要停用吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleClick(selectedRowKeys, selectedRows, 'stop');
      }
    },
    {
      text: '强行停用',
      key: 'forceStop',
      minSelection: 1,
      disabled: false,
      icon: <CloseRed />,
      location: 'left',
      needConfirm: true,
      confirmText: '您确定强行停用吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleClick(selectedRowKeys, selectedRows, 'forceStop');
      }
    }
  ];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
