import React, { Component } from "react";
import { ActionButtonProps, ElEditTableColumns } from "@/components/el/ElEditTable";
import { ElFormItemProps } from "@/components/el/ElForm";
import { AddBlue, DeleteRed } from "@/components/el/ElIcon";
import * as service from '../../service';

const getTableColumns = (beforeConfirm): Array<ElEditTableColumns> => {
  return [
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
    {
      title: '商品名称',
      dataIndex: 'itemName',
      width: 200,
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$yd-mg-pop-item',
            props: {
              showColumn: 'itemName',
              beforeConfirm,
            }
          },
          name: 'itemName'
        }
      },
      selectMapping: async ({ changedValues, formRef, editTableRef, record }) => {
        editTableRef && editTableRef.refreshCurrentColumns();
        console.log(changedValues, 'changedValueschangedValues', record);
        const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
        const storeIds = buIdList && buIdList.map(item => item.id);
        let accQty = 0; // 库存数
        const res = await service.getAccQtyByItemId({ buId: record.buId?.id, whId: record.whId, itemId: changedValues.itemName?.id, storeIds });
        if (res.success) {
          accQty = res.data.accQty || 0;
          await editTableRef.updateRows({
            serialNoLod: res.data.serialNoLod || [],
            serialNoNew: res.data.serialNoNew || [],
            serialNoNow: res.data.serialNoNow || []
          }, [record.id])
        }
        return {
          itemCode: changedValues.itemName?.itemCode,
          itemType: {
            udcVal: changedValues.itemName?.itemType,
            valDesc: changedValues.itemName?.itemTypeName,
          },
          uom: {
            udcVal: changedValues.itemName?.uom,
            valDesc: changedValues.itemName?.uomName,
          },
          dbrand: changedValues.itemName?.brand,
          factQty: 0,
          accQty,
        }
      },
      cellRender: (text) => text?.itemName
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
          name: 'dbrand'
        }
      },
      cellRender: (text, record) => record.itemName?.brandName
    },
    {
      title: '商品类型',
      dataIndex: 'itemType',
      width: 140,
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
        }
      },
      cellRender: (value) => value && value.valDesc
    },
    {
      title: '库存数',
      dataIndex: 'accQty',
      width: 140,
      editable: true,
      field: ({ record }) => {
        console.log(record, 'recordrecordrecord')
        return {
          formOption: {
            type: `${record.docMethod === 'A' ? '$asterisk_input' : '$input'}`,
            props: {
              disabled: true,
            }
          },
          name: 'accQty'
        }
      },
      cellRender: (value, record, text) => {
        console.log(value, record, text);
        //(value || 0).toString().replace(/./g, '*'); 
        return <span>{record.docMethod === 'A' ? '***' : value || 0}</span>
      }
    },
    // docMethod !== 'A' && {
    //   title: '库存数',
    //   dataIndex: 'accQty',
    //   width: 140,
    //   editable: true,
    //   field: ({ record }) => {
    //     console.log(record, 'recordrecordrecord')
    //     return {
    //       formOption: {
    //         type: '$input',
    //         props: {
    //           disabled: true,
    //         }
    //       },
    //       name: 'accQty'
    //     }
    //   },
    //   cellRender: (value, record, text) => {
    //     console.log(value, record, text);
    //     //(value || 0).toString().replace(/./g, '*'); 
    //     return <span>{'明'}</span>
    //   }
    // },
    {
      title: '实际数量',
      dataIndex: 'factQty',
      width: 140,
      editable: true,
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
          name: 'factQty'
        }
      }
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
    },
  ].filter(Boolean)
};

const getTableActionButtons = (
  handleAdd,
  handleRemove,
  handleClear,
  type
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
    {
      key: 'clear',
      text: '清除',
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      needConfirm: true,
      confirmText: '确认要清除选中的数据吗？',
      handleClick: handleClear,
      disabled: !type
    },
  ];


const getFormItems = (onPressEnter): Array<ElFormItemProps> => [
  {
    title: '',
    name: 'doc',
    span: 16,
    formOption: {
      // type: '$input',
      // props: { placeholder: '请输入' }
    }
  },
  {
    title: '条码录入',
    name: 'docNo',
    span: 8,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        onPressEnter
      }
    }
  },
  // {
  //   title: '',
  //   name: 'flag',
  //   span: 2,
  //   formOption: {
  //     type: '$checkbox',
  //     props: {
  //       options: [
  //         { label: '冲销', value: true }
  //       ]
  //     }
  //   }
  // }
]


export { getTableColumns, getTableActionButtons, getFormItems }