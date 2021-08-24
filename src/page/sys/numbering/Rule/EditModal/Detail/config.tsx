import React from 'react';
import {
  ElEditTableColumns,
  ActionButtonProps
} from '@/components/el/ElEditTable';
import { AddBlue, DeleteRed, SaveBlue } from '@/components/el/ElIcon';

// 表格数据
const getTableColumns = (): Array<ElEditTableColumns> => [
  {
    title: '排序号',
    dataIndex: 'seq',
    width: 160,
    align: 'left',
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {}
        },
        name: 'seq'
      };
    }
  },
  {
    title: '取号类型',
    dataIndex: 'numberTypeObj',
    width: 160,
    align: 'left',
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择取号类型',
            prefixStr: '/yd-system',
            domain: 'SYS',
            udc: 'NUMBERING',
            selectRecord: true
          }
        },
        name: 'numberTypeObj'
      };
    },
    cellRender: (value) => {
      console.log('cellRendercellRender', value);
      return value && value.valDesc;
    }
  },
  {
    title: '取号模式',
    dataIndex: 'numberPattern',
    width: 160,
    align: 'left',
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {}
        },
        name: 'numberPattern'
      };
    }
  },
  {
    title: '自增序号宽度',
    dataIndex: 'nnLen',
    width: 160,
    align: 'left',
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {}
        },
        name: 'nnLen'
      };
    }
  }
];

// table按钮
const getTableActionButtons = (
  create,
  del,
  save,
  saveLoading
): Array<ActionButtonProps> => [
  {
    key: 'create',
    text: '新增',
    location: 'left',
    handleClick: create,
    icon: <AddBlue />
  },
  {
    key: 'del',
    text: '删除',
    minSelection: 1,
    location: 'left',
    handleClick: del,
    needConfirm: true,
    confirmText: '确认要删除选中的数据吗？',
    icon: <DeleteRed />
  },
  {
    key: 'save',
    text: '保存',
    // loading: saveLoading,
    // disabled: saveLoading,
    location: 'left',
    handleClick: save,
    icon: <SaveBlue />
  }
];

export { getTableColumns, getTableActionButtons };
