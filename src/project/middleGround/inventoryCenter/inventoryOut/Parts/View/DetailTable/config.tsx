import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
        {
      title: '序号',
      width: 120,
      dataIndex: 'no',
      cellRender: (text, record, index) => index + 1
    },
    {
      title: '商品名称',
      width: 160,
      dataIndex: 'itemName',
      editable: false,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'itemName'
        };
      },
      cellRender: (text) => text
    },
    {
      title: '商品编码',
      width: 200,
      dataIndex: 'itemCode',
      editable: false,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'itemCode'
        };
      },
      cellRender: (text) => text,
    },
    {
      title: '商品类型',
      width: 200,
      dataIndex: 'itemTypeName',
      editable: false,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'itemType'
        };
      },
      cellRender: (text) => text,
    },
    {
      title: '出库数量',
      width: 120,
      dataIndex: 'qty',
      editable: false,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
            }
          },
          name: 'qty'
        };
      }
    },
    {
      title: '单位',
      width: 140,
      dataIndex: 'uom',
      editable: false,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'uom'
        };
      },
      cellRender: (text, record) => record.uomName
    },
    {
      title: '品牌',
      width: 140,
      dataIndex: 'brandName',
      editable: false,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: { autoSize: { minRows: 1, maxRows: 3 } }
          },
          name: 'remark'
        };
      }
    }
  ];
};

const getTableActionButtons = (
  handleAdd,
  handleRemove
): Array<ActionButtonProps> => [
  {
    key: 'add',
    text: '新增',
    icon: <AddBlue />,
    location: 'left',
    handleClick: handleAdd
  },
  {
    key: 'remove',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    minSelection: 1,
    needConfirm: true,
    confirmText: '确认要删除选中的数据吗？',
    handleClick: handleRemove
  }
];

export { getTableColumns, getTableActionButtons };
