import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 150,
      dataIndex: 'lineNo',
      editable: false,
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$text',
            props: {
            }
          },
          name: 'lineNo'
        };
      },
      cellRender: (text, record, index) => index + 1
    },
    {
      title: '商品名称',
      width: 150,
      dataIndex: 'itemName', // item_name
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'itemName' // brandName
        };
      }
    },
    {
      title: '商品编码',
      width: 150,
      dataIndex: 'itemCode', // item_code
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'itemCode'
        };
      }
    },
    {
      title: '数量',
      width: 150,
      dataIndex: 'qty',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'qty'
        };
      }
    },
    {
      title: '已退货数量',
      width: 150,
      dataIndex: 'shippedQty',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'shippedQty'
        };
      }
    },
    {
      title: '未退货数量',
      width: 150,
      dataIndex: 'noQty',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'noQty'
        };
      },
    },
    {
      title: '单位',
      width: 150,
      dataIndex: 'uomName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'uomName'
        };
      }
    },
    {
      title: '价格',
      width: 150,
      dataIndex: 'price',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'price'
        };
      }
    },
    {
      title: '折扣率(%)',
      width: 150,
      dataIndex: 'discRatio', // disc_ratio
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'discRatio'
        };
      }
    },
    {
      title: '优惠金额',
      width: 150,
      dataIndex: 'discAmt', // disc_amt
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'discAmt'
        };
      }
    },
    // {
    //   title: '是否取整',
    //   width: 150,
    //   dataIndex: 'intNumber',
    //   align: 'left',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         placeholder: '请选择',
    //         type: '$select',
    //         props: {
    //           options: [
    //             { label: '是', value: '1' },
    //             { label: '否', value: '0' }
    //           ]
    //         }
    //       },
    //       name: 'intNumber'
    //     };
    //   }
    // },
    {
      title: '金额',
      width: 150,
      dataIndex: 'amt',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'amt'
        };
      }
    },
    // {
    //   title: '车型系列',
    //   width: 150,
    //   dataIndex: 'motorcycleType', //没有
    //   align: 'left',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         placeholder: '请选择',
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'motorcycleType'
    //     };
    //   }
    // },
    {
      title: '品牌',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'brand'
        };
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark', // remark
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$text',
            props: {}
          },
          name: 'remark'
        };
      }
    }
  ];
};

// const getTableActionButtons = (add, del): Array<ActionButtonProps> => [
//   {
//     key: 'add',
//     text: '新增',
//     icon: <AddBlue />,
//     location: 'left',
//     handleClick: add
//   },
//   {
//     key: 'remove',
//     text: '删除',
//     icon: <DeleteRed />,
//     location: 'left',
//     minSelection: 1,
//     handleClick: del
//   }
// ];

export { getTableColumns };
