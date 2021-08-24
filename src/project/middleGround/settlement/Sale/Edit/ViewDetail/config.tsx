import React from 'react';
import { Statistic, Button } from 'antd';
import dayjs from 'dayjs';
import { ElFormProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { Link } from 'react-router-dom';
import {
  SubmitBlue,
  CancelRed,
  ExportBlue,
  AuditBlue
} from '@/components/el/ElIcon';
import { asserts } from '@/utils';
import { leftShift } from 'mathjs';

const getTableSearchFormItems = (): ElFormProps => {
  return {
    wrapperCol: { span: 17 },
    labelCol: { span: 7 },
    items: [
      {
        title: '订单编号',
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
        title: '父订单号',
        name: 'pno',
        span: 6,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '销售主体',
        name: 'ouId',
        span: 6,
        formOption: {
          type: '$pop-ou',
          props: {
            placeholder: '请选择',
            showColumn: 'ouName',
          }
        }
      },
      {
        title: '销售组织',
        name: 'buId',
        span: 6,
        formOption: {
          type: '$pop-bu',
          props: {
            placeholder: '请选择',
            showColumn: 'buName',
          }
        }
      },
      // {
      //   title: '业务员',
      //   name: 'salesManId',
      //   span: 6,
      //   formOption: {
      //     type: '$fin-item-Salesman',
      //     props: {
      //       placeholder: '请选择',
      //       showColumn: 'empName',
      //     }
      //   }
      // },
      {
        title: '客户名称',
        name: 'custId',
        span: 6,
        formOption: {
          type: '$fin-item-ContactCustomer',
          props: {
            placeholder: '请选择',
          }
        }
      },
      {
        title: '下单渠道',
        name: 'soSource',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'SAL',
            udc: 'SO_SOURCE',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      {
        title: '订单日期',
        name: 'salDocDate',
        span: 6,
        formOption: {
          type: '$rangePicker',
          props: {
            // placeholder: '请输入'
          }
        }
      },
      {
        title: '订单类型',
        name: 'docType',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'SAL',
            udc: 'SO_TYPE',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      // {
      //   title: '币种',
      //   name: 'currency',
      //   span: 6,
      //   formOption: {
      //     type: '$fin-currency',
      //     props: {
      //       placeholder: '请选择币种',
      //     }
      //   }
      // },
      {
        title: '退货类型',
        name: 'returnType',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'FIN',
            udc: 'VERIFY_STATUS',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      // {
      //   title: '订单状态',
      //   name: 'state',
      //   span: 6,
      //   formOption: {
      //     type: '$udc',
      //     props: {
      //       placeholder: '请选择',
      //       domain: 'FIN',
      //       prefixStr: '/yst-system',
      //       udc: 'BILL_STATUS',
      //       transfer: {
      //         value: 'udcVal',
      //         lable: 'valDesc'
      //       }
      //     }
      //   }
      // },
      {
        title: '结算含税金额',
        name: 'settleAmt',
        span: 6,
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '商品品类',
        name: 'itemCateCode',
        span: 6,
        formOption: {
          type: '$fin-item-classify',
          props: { placeholder: '请选择商品品类' }
        }
      },
      // {
      //   title: '财务分类',
      //   name: 'finCat',
      //   span: 6,
      //   formOption: {
      //     type: '$fin-item-classify',
      //     props: { placeholder: '请选择财务分类' }
      //   }
      // },  
      {
        title: '商品名称',
        name: 'itemName',
        span: 6,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '税率',
        name: 'taxRate',
        span: 6,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      // {
      //   title: '是否预售',
      //   name: 'presaleFlag',
      //   formOption: {
      //     type: '$radio',
      //     props: {
      //       disabled: true,
      //       options: [
      //         { label: '全部', value: undefined },
      //         { label: '是', value: true },
      //         { label: '否', value: false }
      //       ],
      //     }
      //   }
      // },
    ]
  };
};

const getTableColumns = ({ that }): Array<ElSearchTableColumns> => {
  return [
    {
      title: '序号',
      width: 60,
      align: 'center',
      dataIndex: 'num',
      fixed: 'left',
      render: (value, record, index) => `${index + 1}`
    },
    {
      title: '订单编号',
      width: 160,
      align: 'center',
      dataIndex: 'docNo',
    },
    {
      title: '订单行号',
      width: 120,
      align: 'center',
      dataIndex: 'lineNo',
    },
    {
      title: '订单日期',
      width: 120,
      align: 'center',
      dataIndex: 'docTime',
      render: (value) => asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      title: '父订单号',
      width: 120,
      align: 'center',
      dataIndex: 'pno',
    },
    {
      title: '销售主体',
      width: 140,
      // align: 'left',
      dataIndex: 'ouName'
    },
    {
      title: '销售组织',
      width: 140,
      // align: 'left',
      dataIndex: 'buName'
    },
    // {
    //   title: '销售业务员',
    //   width: 120,
    //   align: 'center',
    //   dataIndex: 'salesManName'
    // },
    {
      title: '组织类型',
      width: 120,
      align: 'center',
      dataIndex: 'settleBuTypeName'
    },
    {
      title: '退货类型',
      width: 120,
      align: 'center',
      dataIndex: 'returnTypeName',
      render: (value, record) => {
        return value || ''
      }
    },
    {
      title: '订单类型',
      width: 120,
      align: 'center',
      dataIndex: 'docTypeName'
    },
    {
      title: '下单渠道',
      width: 120,
      align: 'center',
      dataIndex: 'soSourceName'
    },
    {
      title: '客户编码',
      width: 120,
      align: 'center',
      dataIndex: 'custCode'
    },
    {
      title: '客户名称',
      width: 150,
      align: 'center',
      dataIndex: 'custName'
    },
    {
      title: '商品品类',
      width: 100,
      align: 'center',
      dataIndex: 'itemCatName',
    },
    {
      title: '财务分类',
      width: 100,
      align: 'center',
      dataIndex: 'finCatName',
    },
    {
      title: '商品编码',
      width: 100,
      align: 'center',
      dataIndex: 'itemCode',
    },
    {
      title: '商品名称',
      width: 100,
      align: 'center',
      dataIndex: 'itemName',
    },
    {
      title: '计量单位',
      width: 100,
      align: 'center',
      dataIndex: 'uom',
    },
    {
      title: '结算数量',
      width: 100,
      align: 'right',
      dataIndex: 'settleQty',
    },
    {
      dataIndex: 'salePrice',
      title: '销售单价',
      width: 100,
      align: 'right',
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'originAmt',
      title: '销售含税金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'discAmt',
      title: '折扣含税金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'couponAmt',
      title: '优惠券金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'apAmt',
      title: '应收款金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'cardAmt',
      title: '购物卡金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'giftAmt',
      title: '提货券金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'usepointAmt',
      title: '使用积分金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'settlePrice',
      title: '结算单价',
      align: 'right',
      width: 100,
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'settleAmt',
      title: '结算含税金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'taxRate',
      title: '税率',
      width: 100,
      align: 'right',
    },
    {
      dataIndex: 'settleTax',
      title: '结算税额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'settleNetAmt',
      title: '结算未税金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    // {
    //   dataIndex: 'savingCardAmt',
    //   title: '储蓄卡金额',
    //   align: 'center',
    //   render: (value) =>
    //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : '-'
    // },
    {
      dataIndex: 'pointsAmount',
      title: '发放积分金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      title: '表体备注',
      width: 120,
      // align: 'center',
      dataIndex: 'remark'
    },
  ];
};

const getTableActionButtons = ({
  handleExport,
  // handlePending,
}): Array<ActionButtonProps> => {
  return [
    {
      key: 'export',
      text: '导出',
      location: 'left',
      icon: <ExportBlue />,
      // handleClick: handleExport,
      disabled: false,
      hidden: false,
      // minSelection: 1,
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleExport(selectedRowKeys, selectedRows)
    },
  ];
};

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
