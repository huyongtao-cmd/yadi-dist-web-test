import React from 'react';
import { ElFormItemProps } from "@/components/el/ElForm";
import { AddBlue, EditBlue, ExportBlack, ImportBlue } from "@/components/el/ElIcon";
import { ActionButtonProps, ElSearchTableColumns } from "@/components/el/ElSearchTable";
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '订单号',
    dataIndex: 'docNo',
    width: 140,
    align: 'center'
  },
  {
    title: '门店名称',
    dataIndex: 'storeName',
    width: 200,
    align: 'center'
  },
  {
    title: '仓库',
    dataIndex: 'whName',
    width: 200,
    align: 'center'
  },
  {
    title: '销售类型',
    dataIndex: 'docTypeName',
    width: 200,
    align: 'center'
  },
  {
    title: '车架号',
    dataIndex: 'serialNo',
    width: 200,
    align: 'center'
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    width: 200,
    align: 'center'
  },
  {
    title: '电池',
    dataIndex: 'batteryQty',
    width: 200,
    align: 'center'
  },
  {
    title: '充电器',
    dataIndex: 'chargerQty',
    width: 200,
    align: 'center'
  },
  {
    title: '衍生品',
    dataIndex: 'derivativeQty',
    width: 200,
    align: 'center'
  },
  {
    title: '折扣价',
    dataIndex: 'discAmt',
    width: 200,
    align: 'center'
  },
  {
    title: '旧车折价',
    dataIndex: 'oldCarPrice',
    width: 200,
    align: 'center'
  },
  {
    title: '结算价',
    dataIndex: 'amt',
    width: 200,
    align: 'center'
  },
  {
    title: '付款方式',
    dataIndex: 'payMethodName',
    width: 200,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
    align: 'center'
  },
  {
    title: '订单日期',
    dataIndex: 'docTime',
    width: 140,
    align: 'center'
  },
  {
    title: '导购员',
    dataIndex: 'empName',
    width: 200,
    align: 'center'
  },
];

const getTableActionButtons = (exports): Array<ActionButtonProps> => [
  {
    text: '导出',
    key: 'exports',
    icon: <ExportBlack />,
    handleClick: exports,
    location: 'left'
  },
];


const getTableSearchFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'storeId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '销售类型',
    name: 'docType',
    formOption: {
      type: '$udc',
      props: { prefixStr: '/yd-system', domain: 'SAL', udc: 'SAL_TYPE' }
    }
  },
  {
    title: '单号',
    name: 'docNo',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        allowClear: true
      }
    }
  },
  {
    title: '导购员',
    name: 'userName',
    span: 6,
    formOption: {
      type: '$yd-mg-select-user',
      props: {
        placeholder: '请选择',
        transfer: {
          label: 'firstName',
          value: 'username',
          key: 'id'
        }
      }
    }
  },
  {
    title: '手机号',
    name: 'reprCertMobile',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '顾客姓名',
    name: 'custName',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        allowClear: true
      }
    }
  },
  {
    title: '日期',
    name: 'createTime',
    formOption: {
      type: '$rangePicker',
      props: { prefixStr: '/yd-system', }
    }
  },
];

// const getExpandedRowRender = ({
//   record,
//   expandTableLoading,
//   expandTableData,
// }) => {
//   const columns = [
//     {
//       title: '商品名称',
//       dataIndex: 'itemName',
//       width: 200,
//     },
//     {
//       title: '商品编码',
//       dataIndex: 'itemCode',
//       width: 140,
//     },
//     {
//       title: '商品类型',
//       dataIndex: 'itemType',
//       width: 140,
//     },
//     {
//       title: '销售数量',
//       dataIndex: 'qty',
//       width: 140,
//     },
//     {
//       title: '单位',
//       dataIndex: 'uomName',
//       width: 140,
//     },
//   ];

//   return (
//     <Table
//       size='small'
//       loading={expandTableLoading}
//       columns={columns}
//       dataSource={expandTableData[`#${record.businessKey}`]}
//       pagination={false}
//     />
//   );
// };







export { getTableColumns, getTableActionButtons, getTableSearchFormItems };