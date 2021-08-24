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
      editable: true,
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
      editable: true,
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
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'itemType'
        };
      },
      cellRender: (value) => value
    },
    // {
    //   title: '单据数量',
    //   width: 200,
    //   dataIndex: 'poQty',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: { type: '$input' },
    //       name: 'poQty'
    //     };
    //   }
    // },
    // {
    //   title: '单价',
    //   width: 120,
    //   dataIndex: 'price',
    //   editable: true,
    //   rule:{
    //     required: true
    //   },
    //   field: () => {
    //     return {
    //       formOption: { 
    //         type: '$inputNumber',
    //         props: {}
    //       },
    //       name: 'price'
    //     };
    //   }
    // },
    {
      title: '入库数量',
      width: 120,
      dataIndex: 'qty',
      editable: true,
      rule: {
        required: true
      },
      field: ({ formRef, record }) => {
        const itemName = formRef.getFieldValue('itemName');
        return {
          formOption: {
            type: '$inputNumber',
            props: {
              min: 0,
              disabled: ['ALL'].includes(record.itemType?.udcVal) || ['ALL'].includes(itemName?.itemType)
            }
          },
          name: 'qty'
        };
      }
      // cellRender: (value) => <Statistic value={value} precision={2} />
    },
    {
      title: '单位',
      width: 120,
      dataIndex: 'uomName',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$udc',
            props: {}
          },
          name: 'uom'
        };
      },
      cellRender: (value) => value
    },
    // {
    //   title: '金额',
    //   width: 120,
    //   dataIndex: 'amt',
    //   editable: true,
    //   align: 'right',
    //   rule: {
    //     required: true
    //   },
    //   field: () => {
    //     return {
    //       formOption: { 
    //         type: '$input',
    //         props: {
    //           disabled: true
    //         }
    //       },
    //       name: 'amt'
    //     };
    //   }
    // },
    {
      title: '品牌',
      width: 140,
      dataIndex: 'brandName',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'dbrand'
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
