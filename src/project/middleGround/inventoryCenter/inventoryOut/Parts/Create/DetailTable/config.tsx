import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';
import { maths } from '@/utils';
import * as service from '../service';
import { ElNotification } from '@/components/el';
const getTableColumns = (type): Array<ElEditTableColumns> => {
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
      field: ({ record }) => {
        return {
          formOption: {
            type: '$yd-mg-pop-items',
            props: {
              showColumn: 'itemName',
              paramData: { buId: record?.buId, whId: record?.whId },
              multiple: false
            }
          },
          name: 'itemName'
        };
      },
      selectMapping: async ({ changedValues, formRef, editTableRef, record }) => {
        editTableRef && editTableRef.refreshCurrentColumns();
        const { itemName } = changedValues;
        // 根据仓库Id和itemId查询这个商品的库存数
        const whId = record.whId;
        const buId = record.buId;
        const itemId = itemName.itemId;   // todo   组件更改撞击后要确认商品id
        const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
        const storeIds = buIdList && buIdList.map((item) => item.id);
        let ohQty = 0;
        const res = await service.findPage({ whId, itemId, storeIds, buId });
        if (res.success) {
          ohQty = res.data?.records[0]?.ohQty || 0;
        }
        return {
          amt: 0,
          qty: changedValues.itemName?.itemType === 'ALL' ? 0 : 1,
          ohQty,
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
      // rule: {
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
            props: {
              min: 0
            }
          },
          name: 'price'
        };
      }
    },
    {
      title: '库存数',
      width: 120,
      dataIndex: 'ohQty',
      editable: true,
      align: 'center',
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
      title: '出库数量',
      width: 120,
      dataIndex: 'qty',
      editable: true,
      rule: {
        required: true
      },
      field: ({ formRef, record }) => {
        console.log(formRef, record, 'dadadadada++++++++++++++++++++++++++++++++++++');
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
      align: 'right',
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
