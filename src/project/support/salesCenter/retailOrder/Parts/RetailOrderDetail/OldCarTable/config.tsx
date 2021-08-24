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
      cellRender: (value, record, index) => index + 1
    },
    // {
    //   title: '序号',
    //   width: 150,
    //   dataIndex: 'lineNo',
    //   align: 'center',
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$input',
    //         props: {}
    //       },
    //       name: 'lineNo'
    //     };
    //   },
    //   render: (value, record, index) => index
    // },
    {
      title: '商品名称',
      width: 150,
      dataIndex: 'itemName',
      align: 'center',
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
    //   dataIndex: '',
    //   align: 'center',
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$input',
    //         props: {}
    //       },
    //       name: ''
    //     };
    //   }
    // },
    {
      title: '销售数量',
      width: 150,
      dataIndex: 'qty',
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'qty'
        };
      }
    },
    // {
    //   title: '单位',
    //   width: 150,
    //   dataIndex: 'uom',
    //   align: 'left',
    //   // editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         placeholder: '请选择',
    //         type: '$udc',
    //         props: {
    //           prefixStr: '/yd-system',
    //           domain: 'COM',
    //           udc: 'UOM',
    //           selectRecord: true,
    //           transfer: {
    //             value: 'udcVal',
    //             lable: 'valDesc'
    //           }
    //         }
    //       },
    //       name: 'uom'
    //     };
    //   },
    //   cellRender: (value) => value && value.valDesc
    // },
    {
      title: '单位',
      width: 150,
      dataIndex: 'uomName',
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
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
      align: 'center',
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
      title: '品牌',
      width: 150,
      dataIndex: 'brandName',
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'remark'
        };
      }
    }
  ];
};

export { getTableColumns };
