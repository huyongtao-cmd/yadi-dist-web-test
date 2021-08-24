import React from 'react';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { maths } from '@/utils';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 100,
      dataIndex: 'no',
      cellRender: (text, record, index) => index + 1,
      align: 'center',
    },
    {
      title: '商品名称',
      width: 120,
      dataIndex: 'itemName',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'itemName'
        };
      },
    },
    {
      title: '商品编码',
      width: 110,
      dataIndex: 'itemCode',
      align: 'left',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              placeholder: '请选择',
              disabled: true
            }
          },
          name: 'itemCode'
        };
      }
    },
    {
      title: '品牌', // 商品带出
      width: 100,
      dataIndex: 'brandName',
      align: 'left',
      // cellRender: (text, record) => record && record.itemId?.brandName,
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            // type: '$input',
            type: '$yd-mg-select-brand',
            props: { disabled: true }
          },
          name: 'brandName'
        };
      },
      // cellRender: (text) => text?.brandName,
    },
    {
      title: '库存数',
      width: 100,
      dataIndex: 'ohQty',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true,
            }
          },
          name: 'ohQty'
        };
      }
    },
    {
      title: '销售数量', // 可改变
      width: 100,
      align: 'left',
      dataIndex: 'qty',
      field: () => {
        return {
          formOption: {
            type: '$input',
            disabled: true,
          },
          name: 'qty'
        };
      },
      selectMapping: async ({ changedValues, record, formRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const price = formRef.getFieldValue('price'); // 单格
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣率div
        const discAmt = formRef.getFieldValue('discAmt'); // 优惠金额
        const amt1 = maths.rounds(maths.mul(price, +changedValues.qty || 0), 2); // 数量*金额
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣率
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        return {
          amt
        };
      }
    },
    {
      title: '单位', // 带出
      width: 50,
      dataIndex: 'uomName',  // uomName
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {
              disabled: true,
              selectRecord: true
            }
          },
          name: 'uomName'
        };
      }
    },
    {
      title: '价格',
      width: 100,
      dataIndex: 'price',
      selectMapping: async ({ changedValues, record, formRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const qty = formRef.getFieldValue('qty'); // 数量
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣率div
        const discAmt = formRef.getFieldValue('discAmt'); // 优惠金额
        const amt1 = maths.rounds(maths.mul(qty, +changedValues.price || 0), 2); // 数量*单价
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣率
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        return {
          amt
        };
      },
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
      title: '折扣率%',
      width: 100,
      dataIndex: 'discRatio',
      align: 'left',
      selectMapping: async ({ changedValues, record, formRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const qty = formRef.getFieldValue('qty'); // 数量
        const price = formRef.getFieldValue('price')  // 单价
        const discAmt = formRef.getFieldValue('discAmt'); // 优惠金额
        const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
        const zk = maths.rounds(maths.mul(amt1, +changedValues.discRatio / 100 || 0), 2); // 数量*单格*折扣率
        const amt = maths.rounds(maths.sub(zk, discAmt || 0), 2); // 总价
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 销售数量*单价
          let discRatio = 100; // 折扣率
          let discAmt = 0; // 优惠金额
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
            type: '$input',
            props: { disabled: true }
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
      selectMapping: async ({ changedValues, record, formRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const qty = formRef.getFieldValue('qty'); // 数量
        const price = formRef.getFieldValue('price')  // 单价
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣率
        const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); // 数量*单价*折扣率
        const amt = maths.rounds(maths.sub(amt2, +changedValues.discAmt || 0), 2); // 总价
        return {
          amt
        };
      },
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            type: '$input',
            props: { disabled: true }
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
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            type: '$input',
            props: { disabled: true }
          },
          name: 'amt'
        };
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: { disabled: true }
          },
          name: 'remark'
        };
      }
    }
  ];
};
export { getTableColumns };
