import React from 'react';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

const getTableColumns = (confirmBtn): Array<ElEditTableColumns> => {
  if(confirmBtn === 'A'){
    return [
      {
        title: '序号',
        width: 120,
        dataIndex: 'no',
        cellRender: (text,record,index) => index + 1
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
              // props:{
              //   showColumn: 'itemName'
              // }
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
      // cellRender: (text) => text?.itemName,
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
        title: '库存数',
        width: 120,
        dataIndex: 'ohQty',
        editable: true,
        field: () => {
          return {
            formOption: {
              type: '$input',
              props: {
                disabled: true
              }
            },
            name: 'ohQty'
          };
        }
      },
      {
        title: '调拨数量',
        width: 120,
        dataIndex: 'qty',
        editable: true
      },
      {
        title: '确认数量',
        width: 120,
        dataIndex: 'qty',
        editable: true
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
              props:{ 
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
  }
  return [
    {
      title: '序号',
      width: 120,
      dataIndex: 'no',
      cellRender: (text,record,index) => index + 1
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
            // props:{
            //   showColumn: 'itemName'
            // }
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
    // cellRender: (text) => text?.itemName,
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
      title: '库存数',
      width: 120,
      dataIndex: 'ohQty',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true
            }
          },
          name: 'ohQty'
        };
      }
    },
    {
      title: '调拨数量',
      width: 120,
      dataIndex: 'qty',
      editable: true
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
            props:{ 
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

export { getTableColumns };
