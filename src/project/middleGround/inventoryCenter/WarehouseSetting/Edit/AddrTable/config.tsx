import React from 'react';
import dayjs from 'dayjs';
import { asserts } from '@/utils';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
const getTableColumns = (ptype, setStateData): Array<ElEditTableColumns> => [
  // {
  //   title: '序号',
  //   dataIndex: 'no',
  //   width: 60,
  //   cellRender: (text, record, index) => index + 1
  // },
  {
    title: '地址类型',
    dataIndex: 'itemCode',
    align: 'center',
    width: 200,
    editable: true,
    rule: {
      required: true
    },
    field: () => ({
      name: 'itemCode',
      formOption: { type: '$input', props: { } }
    })
  },
  {
    title: '默认',
    dataIndex: 'itemName',
    width: 140,
    rule: {
      required: true
    },
    editable: true,
    render: (text) => text,
    field: () => ({
      name: 'itemName',
      formOption: { type: '$input', props: { } }
    })
  },
  {
    title: '联系人',
    dataIndex: 'qty',
    width: 100,
    align: 'center',
    editable: true,
    render: (text) => text,
    field: () => ({
      name: 'itemName',
      formOption: { type: '$input', props: { } }
    })
  },
  {
    title: '手机',
    dataIndex: 'remark',
    align: 'center',
    width: 120,
    ellipsis: true,
    editable: true,
    field: () => ({
      formOption: {
        type: '$input',
        props: { placeholder: '请输入' }
      },
      name: 'remark'
    })
  },
  {
    title: '电话',
    dataIndex: 'tel',
    align: 'center',
    width: 120,
    ellipsis: true,
    editable: true,
    field: () => ({
      formOption: {
        type: '$input',
        props: { placeholder: '请输入' }
      },
      name: 'tel'
    })
  },
  {
    title: '传真',
    dataIndex: 'phone',
    align: 'center',
    width: 120,
    ellipsis: true,
    editable: true,
    field: () => ({
      formOption: {
        type: '$input',
        props: { placeholder: '请输入' }
      },
      name: 'phone'
    })
  }
];

const getTableActionButtons = (
  create,
  del
): Array<ActionButtonProps> => [
  {
    text: '新增',
    key: 'create',
    handleClick: create,
    location: 'left',
    icon: <AddBlue />
  },
  {
    text: '删除',
    key: 'del',
    handleClick: del,
    location: 'left',
    minSelection: 1,
    needConfirm: true,
    icon: <DeleteRed />
  }
];

export { getTableColumns, getTableActionButtons };
