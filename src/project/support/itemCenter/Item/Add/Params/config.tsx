
import React from 'react';
import { ElEditTableColumns, ActionButtonProps } from '@/components/el/ElEditTable';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';

const getEditTableColumns = (type): Array<ElEditTableColumns> => {
  return [{
    title: '序号',
    width: 50,
    dataIndex: 'no',
    cellRender: (text, record, index) => index + 1
  },
  {
    title: '自定义属性名',
    width: 100,
    dataIndex: 'tagCode',
    editable: type != 'view',
    field: (form) => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'tagCode'
      };
    }
  },
  {
    title: '属性值',
    width: 800,
    dataIndex: 'tagName',
    editable: type != 'view',
    field: (form) => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'tagName'
      };
    }
  }]
}
const getEditTableActionButtons = (addRow: Function, deleteRow: Function, type): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: '3',
      location: 'left',
      needConfirm: false,
      disabled: type === 'view',
      icon: <AddBlue />,
      handleClick: () => {
        addRow();
      }
    },
    {
      text: '删除',
      key: '1',
      needConfirm: false,
      location: 'left',
      minSelection: 1,
      icon: <DeleteRed />,
      disabled: type === 'view',
      handleClick: (index) => {
        deleteRow(index.selectedRowKeys)
      }
    }
  ];
}

export { getEditTableColumns, getEditTableActionButtons };
