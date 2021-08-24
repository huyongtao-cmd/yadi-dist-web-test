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

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '门店编号',
    align: 'center',
    dataIndex: 'storeCode',
    width: 160,
    render: (text, column) => {
      return (
        <Link to={`/orgCenter/store/detail/view/${column.id}`}>{text}</Link>
      );
    }
  },
  {
    title: '门店名称',
    align: 'center',
    dataIndex: 'storeName'
  },
  {
    title: '门店类型',
    // width: 100,
    align: 'center',
    dataIndex: 'storeTypeName'
  },
  {
    title: '所属组织',
    // width: 100,
    align: 'center',
    dataIndex: 'pidName'
  },
  {
    title: '营业时间段',
    // width: 100,
    align: 'center',
    dataIndex: 'openTimeSpan'
  },
  {
    title: '状态',
    // width: 100,
    align: 'center',
    dataIndex: 'storeStatusName'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '门店',
      name: 'storeCodeOrNameLike',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入编号/名称'
        }
      }
    },
    {
      title: '门店类型',
      name: 'storeType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'STORE_TYPE'
        }
      }
    },
    {
      title: '所属组织',
      name: 'buObj',
      span: 6,
      formOption: {
        type: '$support-org-tree',
        props: {
          placeholder: '请选择',
          showColumn: 'buName'
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
    }
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
    }
  },
  {
    text: '启用',
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
    text: '禁用',
    key: 'stop',
    minSelection: 1,
    disabled: false,
    location: 'left',
    icon: <CloseRed />,
    needConfirm: true,
    confirmText: '您确定要禁用吗？',
    handleClick: ({ selectedRowKeys, selectedRows }) => {
      handleClick(selectedRowKeys, selectedRows, 'stop');
    }
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
