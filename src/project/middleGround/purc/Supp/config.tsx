import React from 'react';
import { Link } from 'react-router-dom';
import { Statistic } from '@/components/el/ItemComponent';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import dayjs from 'dayjs';
import { asserts } from '@/utils';
import {
  EditBlue,
  AddBlue,
  DeleteRed,
  ExportBlue
} from '@/components/el/ElIcon';

// SearchTable搜索表单
const getTableSearchFormItems = (): Array<ElFormItemProps> => [
  {
    title: '供应商编码',
    name: 'suppCode',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '供应商名称',
    name: 'suppName',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '类型',
    name: 'suppType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择供应商类型',
        domain: 'PUR',
        udc: 'SUPP_TYPE',
        prefixStr: '/yd-system'
      }
    }
  },
  {
    title: '联系人',
    name: 'invPicName',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '电话',
    name: 'invTel',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '手机号',
    name: 'invPicPhone',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '所属经销商',
    name: 'buId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-bu',
      props: {
        placeholder: '请选择'
      }
    }
  }
];

// table搜索表单
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    dataIndex: 'no',
    align: 'center',
    width: 50,
    render: (value, record, index) => index + 1
  },
  {
    title: '供应商名称',
    dataIndex: 'suppName',
    align: 'center',
    width: 150
  },
  {
    title: '供应商编码',
    dataIndex: 'suppCode',
    align: 'center',
    width: 100
  },
  {
    title: '类型',
    dataIndex: 'suppTypeName',
    align: 'center',
    width: 100
  },
  {
    title: '地址',
    dataIndex: 'invAddress',
    align: 'center',
    width: 120
  },
  {
    title: '合作时间',
    dataIndex: 'busiBeginDate',
    align: 'center',
    width: 120,
    render: (value, record) =>
      asserts.isExist(value) ? `${dayjs(value).format('YYYY-MM-DD')}至${dayjs(record.busiEndDate).format('YYYY-MM-DD')}` : ''
  },
  {
    title: '联系人',
    dataIndex: 'invPicName',
    align: 'center',
    width: 120
  },
  {
    title: '手机号',
    dataIndex: 'invPicPhone',
    align: 'center',
    width: 120
  }
];

// table按钮
const getTableActionButtons = (
  handleCreate,
  handleEdit
): Array<ActionButtonProps> => [
    {
      key: 'add',
      text: '新增',
      location: 'left',
      handleClick: handleCreate,
      icon: <AddBlue />,
      authCode: 'suppListAdd'
    },
    {
      key: 'edit',
      text: '编辑',
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      handleClick: handleEdit,
      icon: <EditBlue />,
      authCode: 'suppListEdit'
    }
  ];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
