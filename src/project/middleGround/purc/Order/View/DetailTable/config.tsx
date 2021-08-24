import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 110,
      // dataIndex: 'No',
      cellRender: (text, record, index) => index + 1 
    },
    {
      title: '商品型号',
      width: 200,
      dataIndex: 'itemName',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'itemName'
        };
      }
      // selectMapping: () => {},
      // field: () => {
      //   return {
      //     formOption: {
      //       type: '$udc',
      //       props: {
      //         prefixStr: '/yst-pur',
      //         domain: 'PUR',
      //         udc: 'PO_PAY_TYPE',
      //         selectRecord: true
      //       }
      //     },
      //     name: 'payType'
      //   };
      // },
      // cellRender: (value) => value && value.valDesc
    },
    {
      title: '商品编码',
      width: 200,
      dataIndex: 'itemCode',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'itemCode'
        };
      }
    },
    // {
    //   title: '库存数',
    //   width: 200,
    //   dataIndex: 'ouName',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: { type: '$input' },
    //       name: 'itemId'
    //     };
    //   }
    // },
    {
      title: '采购数量',
      width: 100,
      dataIndex: 'qty',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'qty'
        };
      }
    },
    {
      title: '已入库数量',
      width: 100,
      dataIndex: 'acceptQty',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'acceptQty'
        };
      }
    },
    {
      title: '未入库数量',
      width: 100,
      dataIndex: 'unStoreQty',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'unStoreQty'
        };
      },
      cellRender: (value, record)=>record.qty - record.acceptQty
    },
    {
      title: '单位',
      width: 100,
      dataIndex: 'uomName',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'uomName'
        };
      }
    },
    {
      title: '价格',
      width: 160,
      dataIndex: 'price',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'price'
        };
      }
    },
    {
      title: '小计',
      width: 140,
      dataIndex: 'amt',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'amt'
        };
      }
    },
    // {
    //   title: '计划付款金额（含税）',
    //   width: 180,
    //   dataIndex: 'planPayAmt',
    //   editable: true,
    //   align: 'right',
    //   rule: {
    //     required: true
    //   },
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$inputNumber',
    //         props: {
    //           min: 0,
    //           max: 9999999,
    //           precision: 2,
    //           style: { width: '100%' }
    //         }
    //       },
    //       name: 'planPayAmt'
    //     };
    //   },
    //   cellRender: (value) => <Statistic value={value} precision={2} />
    // },
    // {
    //   title: '币种',
    //   width: 120,
    //   dataIndex: 'currName'
    // },
    // {
    //   title: '采购单编号',
    //   width: 140,
    //   dataIndex: 'docNo'
    // },
    // {
    //   title: '付款申请单号',
    //   width: 140,
    //   dataIndex: 'paId'
    // },
    // {
    //   title: '实际支付状态',
    //   width: 120,
    //   dataIndex: 'payStatus'
    // },
    // {
    //   title: '实际付款日期',
    //   width: 140,
    //   dataIndex: 'actualPayDate'
    // },
    {
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: { }
          },
          name: 'remark'
        };
      }
    }
  ];
};

export { getTableColumns };
