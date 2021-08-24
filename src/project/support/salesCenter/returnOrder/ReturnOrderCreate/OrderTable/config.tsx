import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { maths } from '@/utils';
import * as service from '../service';
import {
  ElNotification
} from '@/components/el';
const getTableColumns = (formRef): Array<ElEditTableColumns> => {
  console.log(formRef, 'formRef')
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
            props: {}
          },
          name: 'lineNo'
        };
      },
      cellRender: (text, record, index) => index + 1
    },
    {
      title: '商品名称',
      width: 200,
      dataIndex: 'itemName',
      align: 'left',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$yd-mg-pop-item',
            props: { showColumn: 'itemName' }
          },
          name: 'itemName'
        };
      },
      // 选择商品型号自动带出相关编码
      async selectMapping({ changedValues, editTableRef, record }) {
        console.log(changedValues, 'changedValueschangedValueschangedValues---')
        let price = changedValues.itemName?.retailPrice;
        if (record.docType == 'D') {
          price = changedValues.itemName?.retailPrice; // 零售价格
        } else {
          price = changedValues.itemName?.whSalePrice; // 批发价格
        }

        // const price = formRef.getFieldValue('price'); // 单格
        let qty = changedValues.itemName?.qty || 1; // 数量
        let discRatio = changedValues.itemName?.discRatio || 100; // 折扣率
        let discAmt = changedValues.itemName?.discAmt || 0; // 折扣金额

        const amt1 = maths.rounds(maths.mul(price, + qty || 0), 2); // 数量*金额
        const amt2 = maths.rounds(maths.mul(amt1, discRatio / 100 || 0), 2); //  数量*金额 *折扣比例
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        return {
          itemName: changedValues.itemName, // 名称
          itemCode: changedValues.itemName?.itemCode, // 编码
          brand: changedValues.itemName?.brand, // 品牌
          // ohQty: qty, // 库存数
          // qty: changedValues.itemName?.qty || 1, // 数量
          qty: qty,
          // uom: changedValues.itemName?.uom, //
          uom: {
            udcVal: changedValues.itemName?.uom,
            valDesc: changedValues.itemName?.uomName
          }, // 单位
          price: price, // 价格
          discRatio: discRatio, // 折扣比例
          discAmt: discAmt,// 折扣金额
          amt: amt, // 金额
          // amt: changedValues.itemName?.amt, // 金额
          remark: changedValues.itemName?.remark, //备注
        };
      },
      cellRender: (value) => value && value.itemName
    },
    {
      title: '商品编码',
      width: 120,
      dataIndex: 'itemCode',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: { disabled: true }
          },
          name: 'itemCode'
        };
      }
    },
    {
      title: '数量', // 可改变
      width: 100,
      align: 'left',
      dataIndex: 'qty',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$inputNumber',
            props: {
              min: 0,
              precision: 0,
              // defaultValue: 1,
              // placeholder: 1,
            }
          },
          name: 'qty'
        };
      },
      selectMapping: async ({ changedValues, record, formRef }) => {
        console.log(formRef, '数量')
        // const qtynum = changedValues.qty || 1;
        const price = formRef.getFieldValue('price'); // 单格
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例div
        const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
        const amt1 = maths.rounds(maths.mul(price, + changedValues.qty || 0), 2); // 数量*金额
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣比例
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(changedValues.qty, price || 0), 2); // 数量*单价
          let discAmt = 0;
          let discRatio = 100;
          return {
            amt,
            discAmt,
            discRatio
          };
        } else {
          return {
            amt
          };
        }
        // return {
        //   amt
        // };
      }
    },
    {
      title: '单位', // 带出
      width: 100,
      dataIndex: 'uom', // uomName
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$udc',
            props: {
              // disabled: true,
              domain: 'COM',
              prefixStr: '/yd-system',
              udc: 'UOM',
              selectRecord: true
            }
          },
          name: 'uom'
          // formOption: {
          //   type: '$input',
          //   props: {
          //     // disabled: true,
          //     selectRecord: true
          //   }
          // },
          // name: 'uom'
        };
      },
      cellRender: (value) => value && value.valDesc
    },
    {
      title: '单价',
      width: 100,
      dataIndex: 'price',
      editable: true,
      selectMapping: async ({ changedValues, record, formRef }) => {
        //  console.log(record.docType)
        console.log(record, formRef, '金额=数量*单格*折扣比例-折扣金额sub')
        const qty = formRef.getFieldValue('qty'); // 数量
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例div
        const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
        const amt1 = maths.rounds(maths.mul(qty, + changedValues.price || 0), 2); // 数量*单价
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣比例
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, changedValues.price || 0), 2); // 数量*单价
          let discAmt = 0;
          let discRatio = 100;
          return {
            amt,
            discAmt,
            discRatio
          };
        } else {
          return {
            amt
          };
        }
        // return {
        //   amt
        // };
      },
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
      }
    },
    {
      title: '折扣率(%)',
      width: 100,
      dataIndex: 'discRatio',
      align: 'left',
      editable: true,
      selectMapping: async ({ changedValues, record, formRef }) => {
        console.log(changedValues.discRatio, 'changedValues.discRatio')
        const qty = formRef.getFieldValue('qty'); // 数量
        const price = formRef.getFieldValue('price') // 单价
        const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
        const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
        const zk = maths.rounds(maths.mul(amt1, + changedValues.discRatio / 100 || 0), 2); // 数量*单格*折扣比例
        const amt = maths.rounds(maths.sub(zk, discAmt || 0), 2); // 总价
        console.log(qty, price, amt, 'amt,,,,,,')
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discRatio = 100;
          let discAmt = 0;
          return {
            amt,
            discRatio,
            discAmt
          };
        } else {
          return {
            amt
          };
        }
      },
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            type: '$inputNumber',
            props: {
              min: 0,
              max: 100,
              precision: 2,
              // defaultValue: 1,
            }
          },
          name: 'discRatio'
        };
      }
    },
    {
      title: '优惠金额',
      width: 100,
      dataIndex: 'discAmt',
      align: 'left',
      editable: true,
      selectMapping: async ({ changedValues, record, formRef }) => {
        console.log(formRef, '金额=数量*单格*折扣比例-折扣金额sub')
        const qty = formRef.getFieldValue('qty'); // 数量
        const price = formRef.getFieldValue('price')  // 单价
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例
        const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); // 数量*单价*折扣比例
        const amt = maths.rounds(maths.sub(amt2, +changedValues.discAmt || 0), 2); // 总价
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discAmt = 0;
          let discRatio = 100;
          return {
            amt,
            discAmt,
            discRatio
          };
        } else {
          return {
            amt
          };
        }
      },
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            type: '$inputNumber',
            props: {
              min: 0,
            }
          },
          name: 'discAmt'
        };
      }
    },
    {
      title: '金额',
      width: 100,
      dataIndex: 'amt',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            type: '$input',
            props: { precision: 2, disabled: true }
          },
          name: 'amt'
        };
      },
    },
    {
      title: '品牌',
      width: 150,
      dataIndex: 'brand',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$yd-mg-select-brand',
            props: {
              disabled: true
            }
          },
          name: 'brand'
        };
      },
      cellRender: (value, record) => {
        return record.itemName?.brandName
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
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

const getTableActionButtons = (add, del): Array<ActionButtonProps> => [
  {
    key: 'add',
    text: '新增',
    icon: <AddBlue />,
    location: 'left',
    handleClick: add
  },
  {
    key: 'remove',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    minSelection: 1,
    needConfirm: true,
    confirmText: '确认要删除选中的数据吗？',
    handleClick: del
  }
];

export { getTableColumns, getTableActionButtons };
