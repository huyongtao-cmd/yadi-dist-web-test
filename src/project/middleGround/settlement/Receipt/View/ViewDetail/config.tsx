import React from 'react';
import { Statistic } from 'antd';
import dayjs from 'dayjs';
import { ElFormProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import {
  ExportBlue,
} from '@/components/el/ElIcon';
import { asserts } from '@/utils';

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
        title: '订单日期',
        name: 'salDocDate',
        span: 6,
        formOption: {
          type: '$rangePicker',
          props: {}
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
        title: '组织类型',
        name: 'settleBuType',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'ORG',
            udc: 'BU-TYPE',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      {
        title: '业务员',
        name: 'agentEmpId',
        span: 6,
        formOption: {
          type: '$fin-item-Salesman',
          props: {
            placeholder: '请选择',
            showColumn: 'empName',
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
      //   title: '币种',
      //   name: 'currCode',
      //   span: 6,
      //   formOption: {
      //     type: '$fin-currency',
      //     props: {
      //       placeholder: '请选择币种',
      //     }
      //   }
      // },
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
      //     type: '',
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
    {
      title: '组织类型',
      width: 120,
      align: 'center',
      dataIndex: 'settleBuTypeName'
    },
    {
      title: '业务员',
      width: 120,
      align: 'center',
      dataIndex: 'agentName'
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
      title: '退货类型',
      width: 120,
      align: 'center',
      dataIndex: 'returnTypeName',
      render: (value, record) => {
        return value || ''
      }
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
      title: '税率',
      width: 100,
      align: 'right',
      dataIndex: 'taxRate',
    },
    // {
    //   title: '订单数量',
    //   width: 100,
    //   align: 'right',
    //   dataIndex: 'qty',
    // },
    // {
    //   dataIndex: 'originAmt',
    //   title: '订单含税金额',
    //   align: 'right',
    //   width: 100,
    //   summary: { sum: {} },
    //   render: (value) =>
    //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    // },
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
      title: '使用购物卡金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'giftAmt',
      title: '使用提货券金额',
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
    // {
    //   dataIndex: 'settlePrice',
    //   title: '结算单价',
    //   align: 'right',
    //   width: 100,
    //   render: (value) =>
    //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    // },
    {
      dataIndex: 'receiptAmt',
      title: '收款金额',
      align: 'right',
      width: 100,
      summary: { sum: {} },
      render: (value) =>
        asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
    },
    {
      dataIndex: 'receiptTax',
      title: '收款税额',
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
