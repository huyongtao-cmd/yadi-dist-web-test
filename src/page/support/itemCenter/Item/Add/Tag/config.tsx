
import React from 'react';
import { ElEditTableColumns, ActionButtonProps } from '@/components/el/ElEditTable';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';

const getEditTableColumns = (): Array<ElEditTableColumns> => {
  return [{
    title: '序号',
    width: 10,
    dataIndex: 'index',
    cellRender: (text, record, index) => (index + 1)
  },
  {
    title: '标签分类',
    width: 150,
    dataIndex: 'tagGroupName'
  },
  {
    title: '标签名称',
    width: 300,
    dataIndex: 'tagName'
  }]
}
const getEditTableActionButtons = (handleAdd: Function, handleDelete: Function, type): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: '3',
      location: 'left',
      needConfirm: false,
      icon: <AddBlue />,
      disabled: type === 'view',
      handleClick: () => {
        handleAdd();
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
      handleClick: (val) => {
        handleDelete(val.selectedRowKeys)
      }
    }
  ];
}

export { getEditTableColumns, getEditTableActionButtons };
