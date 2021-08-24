import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';
import { maths } from '@/utils';
import * as service from '../service';
import { ElNotification } from '@/components/el';
const getTableColumns = (setnums): Array<ElEditTableColumns> => {
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
      dataIndex: 'itemId',
      editable: true,
      rule: {
        required: true
      },
      cellRender: (text) => text && text?.itemName,
      selectMapping: async ({ changedValues, formRef, record, editTableRef }) => {
        // console.log(changedValues, 'changedValues数据', record, '//////')
        const itemId = changedValues['itemId'] && changedValues['itemId'].id;
        const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
        const storeIds = buIdList && buIdList.map((item) => item.id);
        const buId = record.buId;
        let params = {
          itemId,
          whId: record.whId,
          storeIds,
          buId
        }
        // console.log(params)
        const res = await service.getInventory(params);
        if (res.success == false) {
          ElNotification({
            type: 'error',
            message: res.message || res.msg || '操作失败！'
          });
          return;
        } else {
          const data = editTableRef.getRows();
          const records = editTableRef.getActiveRecord();
          const ohQty = res.data?.records[0]?.ohQty || 0; // 库存
          const qty = res.data?.records[0]?.qty || 1; // 数量
          const amt = maths.mul(changedValues.itemId?.whSalePrice, qty);
          setnums(data, records, qty, amt)

          return {
            itemName: changedValues.itemId?.itemName, // 名称
            itemCode: changedValues.itemId?.itemCode, // 编码
            brandName: changedValues.itemId?.brandName, // 品牌
            brand: changedValues.itemId?.brand, // 品牌

            ohQty: ohQty, // 库存数
            qty: qty, // 销售数量
            uom: {
              udcVal: changedValues.itemId?.uom,
              valDesc: changedValues.itemId?.uomName
            }, // 单位
            price: changedValues.itemId?.whSalePrice,// 价格
            discRatio: changedValues.itemId?.discRatio || 100, // 折扣率
            discAmt: changedValues.itemId?.discAmt || 0,// 优惠金额
            amt: maths.mul(changedValues.itemId?.whSalePrice, qty),
            remark: changedValues.itemId?.remark, //备注
          }
        }
      },
      field: () => {
        return {
          formOption: {
            type: '$yd-mg-pop-item',
            props: {
              showColumn: 'itemName'
            }
          },
          name: 'itemId'
        };
      },
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
      title: '品牌', // 商品带出
      width: 100,
      dataIndex: 'brand',
      align: 'left',
      editable: true,
      cellRender: (text, record) => record && record.itemId?.brandName,
      field: () => {
        return {
          formOption: {
            placeholder: '请输入',
            type: '$yd-mg-select-brand',
            props: { disabled: true }
          },
          name: 'brand'
        };
      }
    },
    {
      title: '单位', // 带出
      width: 100,
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
      title: '库存数', // invQty
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
      editable: true,
      rule: {
        required: true
      },
      selectMapping: async ({ changedValues, record, formRef, editTableRef }) => {
        // editTableRef && editTableRef.refreshCurrentColumns()
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const price = formRef.getFieldValue('price'); // 单价
        const discRatio = formRef.getFieldValue('discRatio') / 100 || 100; // 折扣率div
        const discAmt = formRef.getFieldValue('discAmt'); // 优惠金额
        const amt1 = maths.rounds(maths.mul(price, +changedValues.qty || 0), 2); // 数量*单价
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣率
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        setnums(data, records, changedValues.qty, amt)
        return {
          amt
        };
      },
      field: ({ formRef }) => {
        // const maxInvCount = formRef.getFieldValue('ohQty')
        return {
          formOption: {
            props: {
              min: 1,
              precision: 0,
            },
            type: '$inputNumber'
          },
          name: 'qty'
        };
      },
    },
    {
      title: '单价',
      width: 100,
      dataIndex: 'price', // itemPrice
      editable: true,
      selectMapping: async ({ changedValues, record, formRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const qty = formRef.getFieldValue('qty') || 1; // 数量
        const discRatio = formRef.getFieldValue('discRatio') / 100 || 100; // 折扣率div
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
            props: {}
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
      editable: true,
      selectMapping: async ({ changedValues, record, formRef, editTableRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const qty = formRef.getFieldValue('qty') || 1; // 数量
        const price = formRef.getFieldValue('price')  // 单价
        const discAmt = formRef.getFieldValue('discAmt'); // 优惠金额
        const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
        const zk = maths.rounds(maths.mul(amt1, +changedValues.discRatio / 100 || 0), 2); // 数量*单格*折扣率
        const amt = maths.rounds(maths.sub(zk, discAmt || 0), 2); // 总价
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 销售数量*单价
          let discRatio = 100; // 折扣率
          let discAmt = 0; // 优惠金额
          setnums(data, records, qty, amt)
          return {
            amt,
            discRatio,
            discAmt
          };
        } else {
          setnums(data, records, qty, amt)
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
              max: 100,
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
      selectMapping: async ({ changedValues, record, formRef, editTableRef }) => {
        // console.log(formRef, '金额=数量*单格*折扣率-优惠金额sub')
        const qty = formRef.getFieldValue('qty') || 1; // 数量
        const price = formRef.getFieldValue('price')  // 单价
        const discRatio = formRef.getFieldValue('discRatio') / 100 || 100; // 折扣率
        const amt1 = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); // 数量*单价*折扣率
        const amt = maths.rounds(maths.sub(amt2, +changedValues.discAmt || 0), 2); // 总价
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discRatio = 100; // 折扣率
          let discAmt = 0; // 优惠金额
          setnums(data, records, qty, amt)
          return {
            amt,
            discRatio,
            discAmt
          };
        } else {
          setnums(data, records, qty, amt)
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
            props: {
              min: 0
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
            props: {}
          },
          name: 'amt'
        };
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: {
              minLength: 0,
              maxLength: 255,
            }
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
