import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { maths } from '@/utils';

const getTableColumns = (): Array<ElEditTableColumns> => {
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
            type: '$text',
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
      selectMapping({ changedValues, editTableRef, record }) {
        let price = changedValues.itemName?.retailPrice;
        const { itemName } = changedValues;
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
          // itemName: changedValues.itemName?.itemName, // 名称
          itemCode: changedValues.itemName?.itemCode, // 编码
          // ohQty: qty, // 库存数
          qty: qty, // 数量
          uom: {
            udcVal: changedValues.itemName?.uom,
            valDesc: changedValues.itemName?.uomName
          }, // 单位
          brand: changedValues.itemName.brand,
          price: price, // 价格
          discRatio: discRatio, // 折扣比例
          discAmt: discAmt,// 折扣金额
          amt: amt, // 金额
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
            }
          },
          name: 'qty'
        };
      },
      selectMapping: async ({ changedValues, record, formRef }) => {
        console.log(formRef, '金额=数量*单格*折扣比例-折扣金额sub')
        const price = formRef.getFieldValue('price'); // 单格
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例div
        const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
        const amt1 = maths.rounds(maths.mul(price, +changedValues.qty || 0), 2); // 数量*金额
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
    // {
    //   title: '单位', // 带出
    //   width: 100,
    //   dataIndex: 'uom', // uomName
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$input',
    //         props: {
    //           // disabled: true,
    //           selectRecord: true
    //         }
    //       },
    //       name: 'uom'
    //     };
    //   },
    // },
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
    // {
    //   title: '单价',
    //   width: 100,
    //   dataIndex: 'price',
    //   editable: true,
    //   selectMapping: async ({ changedValues, record, formRef }) => {
    //     console.log(formRef, '金额=数量*单格*折扣比例-折扣金额sub')
    //     const qty = formRef.getFieldValue('qty'); // 数量
    //     const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例div
    //     const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
    //     const amt1 = maths.rounds(maths.mul(qty, +changedValues.price || 0), 2); // 数量*单价
    //     const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣比例
    //     const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
    //     return {
    //       amt
    //     };
    //   },
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'price'
    //     };
    //   }
    // },
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
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discRatio = 0;
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
            }
          },
          name: 'discRatio'
        };
      }
    },
    // {
    //   title: '折扣比例：%',
    //   width: 100,
    //   dataIndex: 'discRatio',
    //   align: 'left',
    //   editable: true,
    //   selectMapping: async ({ changedValues, record, formRef }) => {
    //     console.log(formRef, '金额=数量*单格*折扣比例-折扣金额sub')
    //     const qty = formRef.getFieldValue('qty'); // 数量
    //     const price = formRef.getFieldValue('price')  // 单价
    //     const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
    //     const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
    //     const zk = maths.rounds(maths.mul(amt1, +changedValues.discRatio / 100 || 0), 2); // 数量*单格*折扣比例
    //     const amt = maths.rounds(maths.sub(zk, discAmt || 0), 2); // 总价
    //     return {
    //       amt
    //     };
    //   },
    //   field: () => {
    //     return {
    //       formOption: {
    //         placeholder: '请输入',
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'discRatio'
    //     };
    //   }
    // },
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
          let discRatio = 0;
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
    // {
    //   title: '折扣金额',
    //   width: 100,
    //   dataIndex: 'discAmt',
    //   align: 'left',
    //   editable: true,
    //   selectMapping: async ({ changedValues, record, formRef }) => {
    //     console.log(formRef, '金额=数量*单格*折扣比例-折扣金额sub')
    //     const qty = formRef.getFieldValue('qty'); // 数量
    //     const price = formRef.getFieldValue('price')  // 单价
    //     const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例
    //     const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
    //     const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); // 数量*单价*折扣比例
    //     // const zk = maths.rounds(maths.div(amt1, +changedValues.discRatio || 0), 2); // 数量*单格*折扣比例
    //     const amt = maths.rounds(maths.sub(amt2, +changedValues.discAmt || 0), 2); // 总价
    //     return {
    //       amt
    //     };
    //   },
    //   field: () => {
    //     return {
    //       formOption: {
    //         placeholder: '请输入',
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'discAmt'
    //     };
    //   }
    // },
    {
      title: '金额',
      width: 100,
      dataIndex: 'amt',
      align: 'left',
      editable: true,
      field: () => {
        // const amt = formRef.getFieldValue('amt'); // 数量
        // console.log(amt, 'amtamtamt')
        return {
          formOption: {
            placeholder: '请输入',
            type: '$input',
            props: { disabled: true }
          },
          name: 'amt'
        };
      },
    },
    // {
    //   title: '金额',
    //   width: 100,
    //   dataIndex: 'amt',
    //   align: 'left',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         placeholder: '请输入',
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'amt'
    //     };
    //   }
    // },
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

const getTableActionButtons = (add, del, isLS): Array<ActionButtonProps> => [
  {
    key: 'add',
    text: '新增',
    icon: <AddBlue />,
    location: 'left',
    handleClick: add,
    disabled: isLS
  },
  {
    key: 'remove',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    minSelection: 1,
    handleClick: del,
    disabled: isLS
  }
];

export { getTableColumns, getTableActionButtons };
