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
            type: '$yd-mg-pop-item',
            props: {
              showColumn: 'itemName',
              rules: [{ required: true, message: '必填！' }],
              paramData: { es6: '1' },
              multiple: false
            }
          },
          name: 'itemName'
        };
      },
      async selectMapping({ changedValues, formRef, editTableRef, record }) {
        editTableRef && editTableRef.refreshCurrentColumns();
        console.log(record, changedValues, 'changedValues?????');
        const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
        const storeIds = buIdList && buIdList.map((item) => item.id);
        const { itemName } = changedValues;
        // 根据仓库Id和itemId查询这个商品的库存数
        const whId = record.whId;
        const buId = record.buId;
        const itemId = itemName.itemId;   // todo   组件更改撞击后要确认商品id
        // if (ohQty > 0) {
        let price = itemName.retailPrice; // 单格
        return {
          itemCode: itemName.itemCode,
          uom: {
            udcVal: itemName?.uom,
            valDesc: itemName?.uomName
          },
          brand: itemName.brand,
          brandName: itemName.brandName,
          price,
          // itemType: {
          //   udcVal: itemName?.itemType,
          //   valDesc: itemName?.itemTypeName
          // },
        };
      },
      cellRender: (value) => value && value.itemName
    },
    {
      title: '商品编码',
      dataIndex: 'itemCode',
      width: 200,
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
        }
      },
      cellRender: (text) => text
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
        const qty = formRef.getFieldValue('qty'); // 单价
        const price = changedValues.price; // 数量
        const amt = maths.rounds(maths.mul(price || 0, + qty || 0), 2); // 数量*金额
        const data = editTableRef.getRows();
        const records = editTableRef.getActiveRecord();
        setnums2(data, records, qty, price, amt)
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      width: 140,
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$yd-mg-select-brand',
            props: {
              disabled: true
            }
          },
          name: 'brand'
        }
      },
      cellRender: (text) => text
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

const getTableActionButtons = (
  handleAdd,
  handleRemove,
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
    },
  ];

export { getTableColumns, getTableActionButtons };
