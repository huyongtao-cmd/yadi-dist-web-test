// 销售订单查询 信息页面
import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// import { Checkbox } from 'antd';
import { EditBlue, ExportBlue, PrintBlue } from '@/components/el/ElIcon';
import { Button } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { asserts } from '@/utils';

// 搜索字段
const getTableSearchFormItems = (storeRef, whRef, onSelectChange): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'storeId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择门店',
        onRef: storeRef, onSelectChange
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
        // showColumn: 'name',
        placeholder: '请选择仓库',
        onRef: whRef
      }
    }
  },
  {
    title: '单号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '销售类型',
    name: 'docType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'SALES_TYPE',
        placeholder: '请选择'
      }
    }
  },

  {
    title: '订单状态',
    name: 'docStatus', // docStatusName
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'SAL_ORDER'
      }
    }
  },
  {
    title: '手机号',
    name: 'reprCertMobile',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入' }
    }
  },
  {
    title: '客户和顾客名称',
    name: 'custName',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入' }
    }
  },
  {
    title: '日期',
    name: 'dataTime',
    span: 6,
    formOption: {
      type: '$rangePicker'
    }
  }
];

// 表单字段
const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    dataIndex: 'lineNo',
    width: 50,
    align: 'center',
    render: (value, record, index) => {
      return index + 1;
    }
  },
  {
    title: '客户和顾客名称',
    dataIndex: 'custName',
    width: 100,
    align: 'center'
  },
  // 点击单号跳进对应页面
  {
    title: '单号',
    dataIndex: 'docNo',
    width: 110,
    align: 'center',
    render: (value, record, index) => {
      let pageType;
      if (record.docType == 'A' || record.docType == 'B' || record.docType == 'F' || record.docType == 'G') {
        if (record.custId) {
          pageType = 'retailorder'; // 整车零售单详情
        } else {
          pageType = 'partsRetailorder'; // 配件零售单详情
        }
      } else if (record.docType == 'C') {
        pageType = 'wholeorder'; //批发单详情
      } else {
        pageType = 'returnorder'; //退货单详情
      }
      const linkTo = () => {
        if (pageType === 'retailorder' || pageType === 'partsRetailorder') {
          that.props.push(`/salesCenter/${pageType}/detail/orderSearch/${record.id}`)
        } else {
          that.props.push(`/salesCenter/${pageType}/detail/${record.id}`)
        }
      }
      return <a onClick={linkTo}>{value}</a>;
    }
  },
  {
    title: '门店',
    dataIndex: 'storeName',
    width: 100,
    align: 'center'
  },
  {
    title: '仓库',
    dataIndex: 'whName',
    width: 100,
    align: 'center'
  },
  {
    title: '销售类型',
    dataIndex: 'docTypeName',
    width: 100,
    align: 'center'
  },
  {
    title: '订单状态',
    dataIndex: 'docStatusName',
    width: 100,
    align: 'center'
  },
  {
    title: '销售数量',
    dataIndex: 'qty',
    width: 100,
    align: 'center'
  },
  {
    title: '已出库数量',
    dataIndex: 'es2',
    width: 100,
    align: 'center'
  },
  {
    title: '未出库数量',
    dataIndex: 'es3qty',
    width: 100,
    align: 'center',
    render: (value, record, index) => {
      return record.qty - record.es2 > 0 ? record.qty - record.es2 : 0;
      // let pageType;
      // if (record.docType == 'A' || record.docType == 'B') {
      //   pageType = 'retailorder'; //零售单详情
      // } else if (record.docType == 'C') {
      //   pageType = 'wholeorder'; //批发单详情
      // } else {
      //   pageType = 'returnorder'; //退货单详情
      // }
      // return (
      //   <Link to={`/salesCenter/${pageType}/detail/${record.id}`}>{value}</Link>
      // );
    }
  },
  {
    title: '金额',
    dataIndex: 'amt',
    width: 100,
    align: 'center'
  },
  {
    title: '订单日期',
    dataIndex: 'docTime',
    width: 100,
    align: 'center',
    render: (value) => asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
  },
  {
    title: '接口是否推送',
    dataIndex: 'intfFlag',
    width: 100,
    align: 'center',
    render: (value, record, index) => {
      if (record.docType !== 'C') {
        return <span>{value ? '是' : '否'}</span>
      }
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
    align: 'center'
  },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: 100,
  //   align: 'center',
  //   render: (value, record, index) => {
  //     if (record.docType == 'D' || record.docType == 'E') {
  //       return (
  //         <Button type='ghost' disabled>
  //           {/* 跳转退货单编辑页面 */}
  //           <Link to={`/salesCenter/returnorder/edit/${record.id}`}>退货</Link>
  //         </Button>
  //       );
  //     } else {
  //       let isDisabled = false;
  //       if (record.docNo.indexOf("LS") == 0) {
  //         if (record.docStatus == '8') {
  //           isDisabled = true;
  //         } else {
  //           isDisabled = false;
  //         }
  //       }
  //       return (
  //         <Button type='ghost' disabled={isDisabled}>
  //           {/* 跳转退货单编辑页面 */}
  //           <Link to={`/salesCenter/returnorder/edit/${record.id}`}>退货</Link>
  //         </Button>
  //       );
  //     }
  //   }
  // }
];

// table按钮
const getTableActionButtons = (
  exports,
  imports,
  edit,
  delivery
): Array<ActionButtonProps> => [
    {
      key: 'exports',
      text: '导出',
      location: 'left',
      handleClick: exports,
      icon: <ExportBlue />,
      authCode: 'saleOrderListExport'
    },
    // {
    //   key: 'print',
    //   text: '打印',
    //   location: 'left',
    //   handleClick: print,
    //   icon: <PrintBlue />
    // },
    {
      key: 'import',
      text: '导入',
      location: 'left',
      handleClick: imports,
      icon: <PrintBlue />,
      authCode: 'saleOrderListImport'
    },
    {
      key: 'edit',
      text: '编辑',
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      handleClick: edit,
      icon: <EditBlue />
    },
    {
      key: 'delivery',
      text: '出库',
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      handleClick: delivery,
      icon: <ExportBlue />,
      authCode: 'saleOrderListDelivery'
    }
  ];

export {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
};
