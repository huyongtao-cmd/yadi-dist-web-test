import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { maths } from '@/utils';
import * as service from '../service';
import { ElNotification } from '@/components/el';

const getTableColumns = (baseFormRef, handleLoading, setnums, oldCarTableRef): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 100,
      dataIndex: 'lineNo',
      fixed: 'left',
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
      field: ({ record }) => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$yd-mg-pop-items',
            props: {
              showColumn: 'itemName',
              rules: [{ required: true, message: '必填！' }],
              paramData: { buId: record?.buId, whId: record?.whId },
              multiple: false
            }
          },
          name: 'itemName'
        };
      },
      async selectMapping({ changedValues, formRef, editTableRef, record }) {
        editTableRef && editTableRef.refreshCurrentColumns();
        console.log(formRef, 'formRefformRefformRef')
        console.log(record, changedValues, 'changedValues?????');
        const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
        const storeIds = buIdList && buIdList.map((item) => item.id);
        const { itemName } = changedValues;
        // 根据仓库Id和itemId查询这个商品的库存数
        const whId = record.whId;
        const buId = record.buId;
        const formRef1 = record.ref;
        const itemId = itemName.itemId;   // todo   组件更改后要确认商品id
        const itemType = itemName.itemType;
        const es9 = itemName.es9;
        handleLoading(true)
        const res = await service.findPage({ whId, itemId, buId, storeIds });
        const data = editTableRef.getRows();
        if (record?.itemId !== changedValues?.itemId) {
          // 说明选择的不是同一个商品
          let isSpecial = data.some(item => item.itemType.udcVal === 'ALL' && item.es9 === '1');
          let index = data.filter(item => item.itemType.udcVal === 'ALL');  // 等于1 一个整车
          if (!isSpecial) {
            // 判断以前选择的商品里是否有特价车   包含两种情况  
            // 1.新增弹窗选择的商品全部是配件 2.新增弹窗选择的商品全部是整车但都不是特价车  
            // 再次在单条明细中选择  可能是把以前整车改为现在配件 或者以前整车改为整车 或者把以前配件改为现在配件 以前配件改为现在整车
            if (itemType === 'ALL') {
              // 以前没有 但是现在有
              if (es9 === '1') {
                formRef1.setFieldsValue({ es1: 'B' });
              } else {
                formRef1.setFieldsValue({ es1: 'A' });
              }
            } else {
              // 现在是配件  
              if (!data.every(item => item.itemType.udcVal === 'PART')) {
                // 之前有整车的数据  判断是不是修改了整车的数据
                if (record.itemType.udcVal === 'ALL') {
                  // 修改整车为配件数据
                  if (index.length === 1) {
                    formRef1.setFieldsValue({ es1: '' });
                  }
                }
              }
            }
          } else {
            // 有
            let index1 = data.filter(item => item.itemType.udcVal === 'ALL' && item.es9 === '1');
            if (index1.length === 1) {
              // 只有一条的情况需要处理 修改的一条就是特价车   不是的情况不用重置参保方式  大于1条的情况也不用重置
              if (record.itemType.udcVal === 'ALL' && record.es9 === '1') {
                // 如果修改的一条之前是特价车 判断现在修改的是整车还是配件
                if (index.length > 1) {
                  // 在不止有一条整车数据之下
                  if ((itemType === 'ALL' && es9 !== '1') || itemType === 'PART') {
                    formRef1.setFieldsValue({ es1: 'A' });
                  }
                } else if (index.length === 1) {
                  if (itemType === 'ALL' && es9 !== '1') {
                    formRef1.setFieldsValue({ es1: 'A' });
                  } else if (itemType === 'PART') {
                    formRef1.setFieldsValue({ es1: '' });
                  }
                }
              }
            }
          }
        }

        if (res.success == false) {
          ElNotification({
            type: 'error',
            message: res.message || res.msg || '操作失败！'
          });
          return;
        } else {
          handleLoading(false)
          const ohQty = res.data?.records[0]?.ohQty || 0;
          // if (ohQty > 0) {
          let price = itemName.retailPrice; // 单格
          let qty = itemName?.itemType === 'PART' ? 1 : 0; // 数量
          let discRatio = itemName.discRatio || 100; // 折扣率
          let discAmt = itemName.discAmt || 0; // 折扣金额
          const amt1 = maths.rounds(maths.mul(price, + qty || 0), 2); // 数量*金额
          const amt2 = maths.rounds(maths.mul(amt1, discRatio / 100 || 0), 2); //  数量*金额 *折扣比例
          const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
          const records = editTableRef.getActiveRecord();
          setnums(data, records, qty, amt);
          return {
            itemCode: itemName.itemCode,
            uom: {
              udcVal: itemName?.uom,
              valDesc: itemName?.uomName
            },
            // brand: {
            //   udcVal: itemName?.brand,
            //   valDesc: itemName?.brandName
            // },
            brand: itemName.brand,
            // brandName: itemName.brand,
            // brand: {
            //   udcVal: changedValues.itemName?.brand,
            //   valDesc: changedValues.itemName?.brandName
            // },
            qty: qty,
            discRatio: discRatio,
            discAmt: discAmt,
            price: price,
            itemType: {
              udcVal: itemName?.itemType,
              valDesc: itemName?.itemTypeName
            },
            amt: amt,
            ohQty: ohQty
          };
        }
      },
      cellRender: (value) => value && value.itemName
    },
    {
      title: '商品编码',
      width: 200,
      dataIndex: 'itemCode',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: { disabled: true }
          },
          name: 'itemCode'
        };
      }
    },
    {
      title: '商品类型',
      width: 150,
      dataIndex: 'itemType',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$udc',
            props: {
              disabled: true,
              selectRecord: true,
              prefixStr: '/yd-system',
              domain: 'ITM',
              udc: 'ITEM_TYPE'
            }
          },
          name: 'itemType'
        };
      },
      cellRender: (value) => value && value.valDesc
    },
    {
      title: '库存数',
      width: 150,
      dataIndex: 'ohQty',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$inputNumber',
            props: { disabled: true }
          },
          name: 'ohQty'
        };
      }
    },
    {
      title: '销售数量',
      width: 120,
      dataIndex: 'qty',
      editable: true,
      rule: {
        required: true
      },
      field: ({ formRef, record, editTableRef }) => {
        // editTableRef && editTableRef.refreshCurrentColumns();
        const itemName = formRef.getFieldValue('itemName');
        // const maxInvCount = formRef.getFieldValue('ohQty');
        // console.log(maxInvCount, 'maxInvCount', record);
        return {
          formOption: {
            type: '$inputNumber',
            props: {
              min: 0,
              precision: 0,
              // max: maxInvCount, //最大值是库存数
              disabled: ['ALL'].includes(record.itemType?.udcVal) || ['ALL'].includes(itemName?.itemType)
            }
          },
          name: 'qty'
        };
      },
      selectMapping: ({ changedValues, record, formRef, editTableRef }) => {
        editTableRef && editTableRef.refreshCurrentColumns();
        const maxInvCount = formRef.getFieldValue('ohQty');
        console.log('changedValues', changedValues); // 数量*价格*折扣比例-折扣金额=金额
        const price = formRef.getFieldValue('price'); // 单格
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例div
        const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
        const amt1 = maths.rounds(maths.mul(price, + changedValues.qty || 0), 2); // 数量*金额
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣比例
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        console.log(data, 'editTableRef', records)
        let qty = changedValues.qty;
        if (qty > maxInvCount) {
          qty = maxInvCount
        }
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discAmt = 0;
          let discRatio = 100;
          setnums(data, records, qty, amt)
          return {
            qty,
            amt,
            discAmt,
            discRatio
          };
        } else {
          setnums(data, records, qty, amt)
          return {
            qty,
            amt
          };
        }
      },
      // cellRender: (value) => <Statistic value={value} precision={2} />
    },
    {
      title: '单位',
      width: 150,
      dataIndex: 'uom',
      align: 'left',
      editable: true,
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
    {
      title: '价格',
      width: 150,
      dataIndex: 'price',
      align: 'left',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
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
        const price = changedValues.price // 单格
        const qty = formRef.getFieldValue('qty')
        const discRatio = formRef.getFieldValue('discRatio') / 100; // 折扣比例div
        const discAmt = formRef.getFieldValue('discAmt'); // 折扣金额
        const amt1 = maths.rounds(maths.mul(price, + qty || 0), 2); // 数量*金额
        const amt2 = maths.rounds(maths.mul(amt1, discRatio || 0), 2); //  数量*金额 *折扣比例
        const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discAmt = 0;
          let discRatio = 100;
          setnums(data, records, qty, amt)
          return {
            amt,
            discAmt,
            discRatio
          };
        } else {
          setnums(data, records, qty, amt)
          return {
            amt
          };
        }
        // const { price } = changedValues; //价格
        // const qty = formRef.getFieldValue('qty'); //数量
        // const discRatio = formRef.getFieldValue('discRatio'); //折扣比例
        // const discAmt = formRef.getFieldValue('discAmt'); //折扣金额
        // const amt = maths.sub(
        //   maths.mul(maths.mul(qty, price || 0), maths.div(discRatio, 100)),
        //   discAmt || 0
        // );
        // return {
        //   amt
        // };
      }
    },
    {
      title: '折扣率(%)',
      width: 150,
      dataIndex: 'discRatio',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$inputNumber',
            props: {
              min: 0,
              max: 100,
              precision: 0,
            }
          },
          name: 'discRatio'
        };
      },
      selectMapping: async ({ changedValues, record, formRef, editTableRef }) => {
        const { discRatio } = changedValues; //折扣比例
        const price = formRef.getFieldValue('price'); //价格
        const qty = formRef.getFieldValue('qty'); //数量
        const discAmt = formRef.getFieldValue('discAmt'); //折扣金额
        const amt = maths.sub(
          maths.mul(maths.mul(qty, price || 0), maths.div(discRatio, 100)),
          discAmt || 0
        );
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discRatio = 100; // 折扣比例
          let discAmt = 0; // 折扣金额
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
      }
    },
    {
      title: '优惠金额',
      width: 150,
      dataIndex: 'discAmt',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$inputNumber',
            props: {
              min: 0
            }
          },
          name: 'discAmt'
        };
      },
      selectMapping: async ({ changedValues, record, formRef, editTableRef }) => {
        const { discAmt } = changedValues; //折扣金额
        const price = formRef.getFieldValue('price'); //价格
        const qty = formRef.getFieldValue('qty'); //数量
        const discRatio = formRef.getFieldValue('discRatio'); //折扣比例
        const amt = maths.sub(
          maths.mul(maths.mul(qty, price || 0), maths.div(discRatio, 100)),
          discAmt || 0
        );
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        if (amt < 0) {
          const amt = maths.rounds(maths.mul(qty, price || 0), 2); // 数量*单价
          let discRatio = 100; // 折扣比例
          let discAmt = 0; // 折扣金额
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
      }
    },
    {
      title: '金额',
      width: 150,
      dataIndex: 'amt',
      align: 'left',
      editable: true,
      field: ({ formRef }) => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$inputNumber',
            props: { disabled: true }
          },
          name: 'amt'
        };
      }
    },
    {
      title: '品牌',
      width: 150,
      dataIndex: 'brand',
      align: 'left',
      editable: true,
      field: (formRef) => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$yd-mg-select-brand',
            props: { disabled: true }
          },
          name: 'brand'
        };
      },
      cellRender: (value, record) => {
        console.log(record, 'record')
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
    handleClick: add,
    // authCode: 'retailOrderAdd'
  },
  {
    key: 'remove',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    needConfirm: true,
    confirmText: '确定要删除吗？',
    minSelection: 1,
    handleClick: del
  }
];

export { getTableColumns, getTableActionButtons };
