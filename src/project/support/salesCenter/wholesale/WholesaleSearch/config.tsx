import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// import { Checkbox } from 'antd';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';

// 搜索字段
const getTableSearchFormItems = (): Array<ElFormItemProps> => [
  {
    title: '客户编码',
    name: 'whIds',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '会员ID/账户' }
    }
  },
  {
    title: '客户名称',
    name: 'deter2s',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '客户类型',
    name: 'docDate',
    span: 6,
    formOption: { type: '$datePicker', props: { placeholder: '请选择时间' } }
  },
  {
    title: '所属门店',
    name: 'brands',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入' }
    }
  },
  {
    title: '电话',
    name: 'itemIds', //猜的，应该没错
    span: 6,
    formOption: {
      type: '$mg-pop-item',
      props: {
        placeholder: '请选择',
        showColumn: 'itemName',
        multiple: true
      }
    }
  },
  {
    title: '手机号',
    name: 'phone',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请选择手机号' }
    }
  }
];

// 表单字段
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    dataIndex: 'whCode',
    width: 100,
    align: 'center'
  },
  {
    title: '客户名称',
    dataIndex: 'whName',
    width: 100,
    align: 'center'
  },
  {
    title: '客户编码',
    dataIndex: 'itemCode',
    width: 100,
    align: 'center'
  },
  {
    title: '类型',
    dataIndex: 'itemName',
    width: 100,
    align: 'center'
  },
  {
    title: '合作时间',
    dataIndex: 'lotNo',
    width: 100,
    align: 'center'
  },
  {
    title: '所属门店',
    dataIndex: 'barCode',
    width: 100,
    align: 'center'
  },
  {
    title: '地址',
    dataIndex: 'tOhQty',
    width: 100,
    align: 'center'
  }
];

// table按钮
const getTableActionButtons = (edit): Array<ActionButtonProps> => [
  {
    key: 'edit',
    text: '编辑',
    location: 'left',
    handleClick: edit,
    icon: <EditBlue />
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
