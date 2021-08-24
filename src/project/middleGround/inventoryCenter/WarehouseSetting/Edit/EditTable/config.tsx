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
    title: '库位编号',
    dataIndex: 'areaCode',
    width: 140,
    // rule: {
    //   required: true
    // },
    editable: true,
    render: (text) => text,
    field: () => ({
      name: 'areaCode',
      formOption: { type: '$input', props: { } }
    })
  },
  {
    title: '库位名称',
    dataIndex: 'areaName',
    width: 200,
    editable: true,
    // rule: {
    //   required: true
    // },
    field: () => ({
      name: 'areaName',
      formOption: { type: '$input', props: { } }
    })
  },
  // {
  //   title: '库管员',
  //   dataIndex: 'qty',
  //   width: 100,
  //   align: 'center',
  //   editable: true,
  //   render: (text) => text,
  //   field: () => ({
  //     name: 'itemName',
  //     formOption: { type: '$input', props: { } }
  //   })
  // },
  {
    title: '状态',
    dataIndex: 'areaStatus',
    // align: 'center',
    width: 120,
    ellipsis: true,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$udc',
          props: {
            domain: 'INV',
            udc: 'WH_STATUS',
            showColumn: 'areaStatusName',
            prefixStr: '/yd-system',
            selectRecord: true
          }
        },
        name: 'areaStatus'
      };
    },
    cellRender: (value) => value && value.valDesc
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
