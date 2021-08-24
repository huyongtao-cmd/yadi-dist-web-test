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
            type: '$yd-mg-pop-item',
            props: {
              showColumn: 'itemName'
            }
          },
          name: 'itemName'
        };
      },
      selectMapping: async ({ changedValues, formRef, editTableRef }) => {
        editTableRef && editTableRef.refreshCurrentColumns();
        return {
          amt: 0,
          qty: 0,
          itemCode: changedValues.itemName?.itemCode,
          // price: changedValues.itemName?.costPrice,
          uom: {
            udcVal: changedValues.itemName?.uom,
            valDesc: changedValues.itemName?.uomName
          },
          itemType: {
            udcVal: changedValues.itemName?.itemType,
            valDesc: changedValues.itemName?.itemTypeName
          },
          // uomName: changedValues.itemName?.uomName,
          dbrand: changedValues.itemName?.brand,
          // brandName: changedValues.itemName?.brandName,
          // itemType: changedValues.itemName?.itemType
        };
      },
      cellRender: (text) => text?.itemName,
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
      dataIndex: 'itemType',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$udc',
            props: {
              disabled: true,
              domain: 'ITM',
              prefixStr: '/yd-system',
              udc: 'ITEM_TYPE',
              selectRecord: true
            }
          },
          name: 'itemType'
        };
      },
      cellRender: (value) => value && value.valDesc
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
    {
      title: '单价',
      width: 120,
      dataIndex: 'price',
      editable: true,
      // rule:{
      //   required: true
      // },
      selectMapping: async ({ changedValues, record, formRef }) => {
        const qty = formRef.getFieldValue('qty');
        const amt = maths.rounds(maths.mul(qty, +changedValues.price || 0), 2);
        return {
          amt
        };
      },
      field: () => {
        return {
          formOption: {
            type: '$inputNumber',
            props: {}
          },
          name: 'price'
        };
      }
    },
    // {
    //   title: '税率选择',
    //   width: 200,
    //   dataIndex: 'suppName'
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
      },
      selectMapping: async ({ changedValues, record, formRef }) => {
        const price = formRef.getFieldValue('price');
        const amt = maths.rounds(maths.mul(price, +changedValues.qty || 0), 2);
        return {
          amt
        };
      }
      // cellRender: (value) => <Statistic value={value} precision={2} />
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
      title: '金额',
      width: 120,
      dataIndex: 'amt',
      editable: true,
      // align: 'left',
      // rule: {
      //   required: true
      // },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'amt'
        };
      }
    },
    // {
    //   title: '车型系列',
    //   width: 120,
    //   dataIndex: 'currName'
    // },
    {
      title: '品牌',
      width: 140,
      dataIndex: 'brand',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$yd-mg-select-brand',
            props: {
              disabled: true
            }
          },
          name: 'dbrand'
        };
      },
      cellRender: (text, record) => record.itemName?.brandName
    },
    {
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      editable: true,
      field: (formRef) => {
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
  handleRemove,
  warehousingFlag
): Array<ActionButtonProps> => [
    {
      key: 'add',
      text: '新增',
      icon: <AddBlue />,
      location: 'left',
      handleClick: handleAdd,
      disabled: warehousingFlag
    },
    {
      key: 'remove',
      text: '删除',
      icon: <DeleteRed />,
      location: 'left',
      minSelection: 1,
      needConfirm: true,
      confirmText: '确认要删除选中的数据吗？',
      handleClick: handleRemove,
      disabled: warehousingFlag
    }
  ];

export { getTableColumns, getTableActionButtons };
