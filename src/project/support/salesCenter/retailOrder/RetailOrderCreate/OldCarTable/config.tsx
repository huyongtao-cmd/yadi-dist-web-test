import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { values } from 'mobx';
import { maths } from '@/utils';

const getTableColumns = (setnums2): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 150,
      dataIndex: 'lineNo',
      // editable: true,
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: { disabled: true }
          },
          name: 'lineNo'
        };
      },
      cellRender: (text, record, index) => index + 1
    },
    {
      title: '商品名称',
      width: 150,
      dataIndex: 'itemName',
      align: 'center',
      // editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'itemName'
        };
      }
    },
    {
      title: '商品编码',
      width: 150,
      dataIndex: 'itemCode',
      align: 'center',
      // editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'itemCode'
        };
      }
    },
    // {
    //   title: '库存数',
    //   width: 150,
    //   dataIndex: 'ohQty',
    //   align: 'center',
    //   // editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'ohQty'
    //     };
    //   }
    // },
    {
      title: '数量',
      width: 150,
      dataIndex: 'qty',
      align: 'center',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$inputNumber',
            props: {
              min: 1,
              precision: 0
            }
          },
          name: 'qty'
        };
      },
      selectMapping: ({ changedValues, record, formRef, editTableRef }) => {
        editTableRef && editTableRef.refreshCurrentColumns();
        const price = formRef.getFieldValue('price'); // 单价
        const qty = changedValues.qty; // 数量
        const amt = maths.rounds(maths.mul(price, + qty || 0), 2); // 数量*金额
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        setnums2(data, records, qty, price, amt)
      },
    },
    {
      title: '单位',
      width: 150,
      dataIndex: 'uom',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$udc',
            props: {
              prefixStr: '/yd-system',
              domain: 'COM',
              udc: 'UOM',
              selectRecord: true,
              transfer: {
                value: 'udcVal',
                lable: 'valDesc'
              }
            }
          },
          name: 'uom'
        };
      },
      cellRender: (value) => value && value.valDesc
    },
    // {
    //   title: '单位',
    //   width: 150,
    //   dataIndex: 'uom',
    //   editable: true,
    //   align: 'left',
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$udc',
    //         props: {
    //           prefixStr: '/yd-system',
    //           domain: 'COM',
    //           udc: 'UOM',
    //           selectRecord: true
    //         }
    //       },
    //       name: 'uom'
    //     };
    //   },
    //   cellRender: (value) => value & value.valDesc
    // },
    {
      title: '价格',
      width: 150,
      dataIndex: 'price',
      align: 'center',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$inputNumber',
            props: {
              min: 0,
              precision: 2,
            }
          },
          name: 'price'
        };
      },
      selectMapping: ({ changedValues, record, formRef, editTableRef }) => {
        editTableRef && editTableRef.refreshCurrentColumns();
        const price = formRef.getFieldValue('qty'); // 单价
        const qty = changedValues.price; // 数量
        const amt = maths.rounds(maths.mul(price, + qty || 0), 2); // 数量*金额
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        setnums2(data, records, qty, price, amt)
      },
    },
    {
      title: '品牌',
      width: 150,
      dataIndex: 'brand',
      // align: 'center',
      editable: false,
      field: () => {
        return {
          formOption: {
            type: '$yd-mg-select-brand',
            props: { disabled: true }
          },
          name: 'brand'
        };
      },
      cellRender: (value, record) => {
        console.log(record, 'record9999')
        return record?.brandName
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      align: 'center',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: {
              minLength: 0,
              maxLength: 255
            }
          },
          name: 'remark'
        };
      }
    }
  ];
};

export { getTableColumns };
