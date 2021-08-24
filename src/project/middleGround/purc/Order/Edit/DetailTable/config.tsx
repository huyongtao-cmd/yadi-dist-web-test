import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';
import { maths } from '@/utils';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 110,
      dataIndex: 'no',
      cellRender: (text, record, index) => index + 1
    },
    {
      title: '商品型号',
      width: 160,
      dataIndex: 'itemId',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$yd-mg-pop-item',
            props: {
              placeholder: '请选择商品',
              showColumn: 'itemName'
            }
          },
          name: 'itemId'
        };
      },
      cellRender: (text) => text?.itemName,
      selectMapping: async ({ changedValues, formRef, editTableRef }) => {
        const qty = formRef.getFieldValue('qty');
        const amt = maths.rounds(maths.mul(changedValues.itemId?.purPrice, +qty || 0), 2);
        return {
          itemName: changedValues.itemId?.itemName,
          itemCode: changedValues.itemId?.itemCode,
          uom: {
            udcVal: changedValues.itemId?.uom,
            valDesc: changedValues.itemId?.uomName
          },
          qty: qty || 0,
          price: changedValues.itemId?.purPrice,
          amt,
          acceptQty: 0
        };
      }
    },
    {
      title: '商品编码',
      width: 160,
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
      }
    },
    // {
    //   title: '库存数',
    //   width: 200,
    //   dataIndex: 'ouName',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: { type: '$input' },
    //       name: 'itemId'
    //     };
    //   }
    // },
    {
      title: '采购数量',
      width: 120,
      dataIndex: 'qty',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: { type: '$inputNumber', props: { min: 0 } },
          name: 'qty'
        };
      },
      selectMapping: async ({ changedValues, record, formRef }) => {
        const price = formRef.getFieldValue('price');
        const amt = maths.rounds(maths.mul(price, +changedValues.qty || 0), 2);
        return {
          amt,
          unStoreQty: changedValues.qty
        };
      }
    },
    {
      title: '已入库数量',
      width: 120,
      dataIndex: 'acceptQty',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input', props: { disabled: true } },
          name: 'acceptQty'
        };
      }
    },
    {
      title: '未入库数量',
      width: 120,
      dataIndex: 'unStoreQty',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input', props: { disabled: true } },
          name: 'unStoreQty'
        };
      }
    },
    {
      title: '单位',
      width: 120,
      dataIndex: 'uom',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$udc',
            props: {
              disabled: true,
              domain: 'COM',
              prefixStr: '/yd-system',
              udc: 'UOM',
              selectRecord: true
            }
          },
          name: 'uom'
        };
      },
      cellRender: (value) => value && value.valDesc
    },
    {
      title: '价格',
      width: 120,
      dataIndex: 'price',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: { disabled: true }
          },
          name: 'price'
        };
      }
    },
    {
      title: '小计',
      width: 120,
      dataIndex: 'amt',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: { disabled: true }
          },
          name: 'amt'
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
            props: {}
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
