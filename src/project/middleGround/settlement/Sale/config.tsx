import React from 'react';
import { Button } from 'antd';
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
        title: '销售结算单号',
        name: 'salSettleNumber',
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
        name: 'settleEntityId',
        span: 6,
        formOption: {
          type: '$yd-mg-select-store',
          props: {
            placeholder: '请选择',
          }
        }
      },
      {
        title: '销售组织',
        name: 'settleOrgId',
        span: 6,
        formOption: {
          type: '$yd-mg-select-wh',
          props: {
            placeholder: '请选择',
          }
        }
      },
      {
        title: '销售业务员',
        name: 'salesManId',
        span: 6,
        formOption: {
          type: '$yd-mg-select-user',
          props: {
            placeholder: '请选择',
          }
        }
      },
      {
        title: '客户名称',
        name: 'contactId',
        span: 6,
        formOption: {
          type: '$yd-mg-sale-whC',
          props: {
            placeholder: '请选择',
            showColumn: 'custName'
          }
        }
      },
      {
        title: '客户属性',
        name: 'contactType',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'CRM',
            udc: 'CUST_GROUP2',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      {
        title: '下单渠道',
        name: 'orderChannel',
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
        title: '结算日期',
        name: 'startTime',
        span: 6,
        formOption: {
          type: '$rangePicker',
          props: {
            // placeholder: '请输入'
          }
        }
      },
      {
        title: '结算类型',
        name: 'settleType',
        span: 6,
        formOption: {
          type: '$fin-item-SettleTypeSale',
          props: { placeholder: '请选择' }
        }
      },
      {
        title: '订单类型',
        name: 'businessType2',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'SAL',
            udc: 'SO_TYPE2',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      {
        title: '币种',
        name: 'currency',
        span: 6,
        formOption: {
          type: '$mg-select-curr',
          props: {
            placeholder: '请选择币种',
          }
        }
      },
      {
        title: '核销状态',
        name: 'verifyState',
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
        title: '单据状态',
        name: 'state',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            domain: 'FIN',
            prefixStr: '/yst-system',
            udc: 'BILL_STATUS',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      // {
      //   title: 'ERP单据号',
      //   name: 'erpNumber',
      //   span: 6,
      //   formOption: {
      //     type: '$input',
      //     props: {
      //       placeholder: '请输入'
      //     }
      //   }
      // },
      // {
      //   title: '传ERP时间',
      //   name: 'erpTime',
      //   span: 6,
      //   formOption: {
      //     type: '$rangePicker',
      //     props: {
      //       // placeholder: '请输入'
      //     }
      //   }
      // },
      // {
      //   title: '传ERP状态',
      //   name: 'erpTransferState',
      //   span: 6,
      //   formOption: {
      //     type: '$udc',
      //     props: {
      //       placeholder: '请选择',
      //       domain: 'FIN',
      //       prefixStr: '/yst-system',
      //       udc: 'TRANSFER_STATE',
      //       transfer: {
      //         value: 'udcVal',
      //         lable: 'valDesc'
      //       }
      //     }
      //   }
      // },
      // {
      //   title: 'ERP凭证号',
      //   name: 'erpReturnVoucher',
      //   span: 6,
      //   formOption: {
      //     type: '$input',
      //     props: {
      //       placeholder: '请输入'
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
      dataIndex: 'lineNo',
      fixed: 'left',
      render: (value, record, index) => `${index + 1}`
    },
    {
      title: '销售结算单号',
      width: 180,
      align: 'center',
      fixed: 'left',
      dataIndex: 'salSettleNumber',
      render: (value, record) => {
        const { id } = record || {};
        return <Link to={`/saleSettlement/sale/${id}`}>{value}</Link>;
      }
    },
    {
      title: '结算日期',
      width: 120,
      align: 'center',
      dataIndex: 'processTime',
      render: (value) => asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      title: '销售主体',
      width: 140,
      // align: 'left',
      dataIndex: 'settleEntityName'
    },
    {
      title: '销售组织',
      width: 140,
      // align: 'left',
      dataIndex: 'settleOrgName'
    },
    {
      title: '销售业务员',
      width: 120,
      align: 'center',
      dataIndex: 'salesManName'
    },
    {
      title: '退货类型',
      width: 120,
      align: 'center',
      dataIndex: 'refundTypeName',
      render: (value, record) => {
        return value || ''
      }
    },
    {
      title: '下单渠道',
      width: 120,
      align: 'center',
      dataIndex: 'orderChannelName'
    },
    {
      title: '订单类型',
      width: 120,
      align: 'center',
      dataIndex: 'businessType2Name'
    },
    {
      title: '结算类型',
      width: 120,
      align: 'center',
      dataIndex: 'settleTypeName'
    },
    {
      title: '客户编码',
      width: 120,
      align: 'center',
      dataIndex: 'contactCode'
    },
    {
      title: '客户名称',
      width: 150,
      align: 'center',
      dataIndex: 'contactName'
    },
    {
      title: '客户属性',
      width: 150,
      align: 'center',
      dataIndex: 'contactTypeName'
    },
    {
      title: '单据状态',
      width: 100,
      align: 'center',
      dataIndex: 'stateName',
      // render: (text, record) => (
      //   <span style={{ color: statusMap.get(`BILL_STATUS_${record.state}`) }}>
      //     {text}
      //   </span>
      // )
    },
    {
      title: '币种',
      width: 100,
      align: 'center',
      dataIndex: 'currencyName'
    },
    {
      title: '结算含税总金额',
      width: 100,
      align: 'right',
      dataIndex: 'totalAmount',
      summary: { sum: {} }
    },
    {
      title: '结算未税金额',
      width: 100,
      align: 'right',
      dataIndex: 'unTaxAmount',
      summary: { sum: {} }
    },
    {
      title: '结算税额',
      width: 100,
      align: 'right',
      dataIndex: 'taxAmount',
      summary: { sum: {} }
    },
    {
      title: '核销金额',
      width: 100,
      align: 'right',
      dataIndex: 'totalVerifyAmount',
      summary: { sum: {} }
    },
    {
      title: '未核销金额',
      width: 100,
      align: 'right',
      dataIndex: 'canVerifyAmount',
      summary: { sum: {} }
    },
    {
      title: '核销状态',
      width: 100,
      align: 'center',
      dataIndex: 'verifyStateName'
    },
    {
      title: '审核人',
      width: 100,
      align: 'center',
      dataIndex: 'approverName'
    },
    {
      title: '创建人',
      width: 100,
      align: 'center',
      dataIndex: 'creator'
    },
    {
      title: '审核日期',
      width: 120,
      align: 'center',
      dataIndex: 'approveTime',
      render: (value) => asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      title: '拒绝原因',
      width: 160,
      // align: 'center',
      dataIndex: 'rejectReason'
    },
    // {
    //   title: '传ERP时间',
    //   width: 120,
    //   align: 'center',
    //   dataIndex: 'erpTransferDate',
    //   render: (value) => asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
    // },
    // {
    //   title: 'ERP单据号',
    //   width: 160,
    //   align: 'center',
    //   dataIndex: 'erpNumber'
    // },
    // {
    //   title: 'ERP凭证号',
    //   width: 160,
    //   align: 'center',
    //   dataIndex: 'erpReturnVoucher'
    // },
    // {
    //   title: '传ERP状态',
    //   width: 100,
    //   align: 'center',
    //   dataIndex: 'erpTransferState'
    // },
    {
      title: '备注',
      width: 160,
      // align: 'center',
      dataIndex: 'remark'
    },
  ];
};

const getTableActionButtons = ({
  handleApprovePass,
  handleApproveRefused,
  handleExport,
  // handlePending,
}): Array<ActionButtonProps> => {
  return [
    {
      text: '审核通过',
      key: 'approvePass',
      icon: <SubmitBlue />,
      disabled: false,
      hidden: false,
      minSelection: 1,
      // maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleApprovePass(selectedRowKeys, selectedRows)
    },
    {
      text: '审核拒绝',
      key: 'approveRefused',
      icon: <CancelRed />,
      disabled: false,
      hidden: false,
      location: 'left',
      minSelection: 1,
      // maxSelection: 1,
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleApproveRefused(selectedRowKeys, selectedRows)
    },
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
    // {
    //   key: 'pending',
    //   text: '暂挂',
    //   icon: <ExportBlack />,
    //   location: 'left',
    //   disabled: false,
    //   hidden: false,
    //   minSelection: 1,
    //   handleClick: ({ selectedRowKeys, selectedRows }) =>
    //     handlePending(selectedRowKeys, selectedRows, 'pending')
    // },
    // {
    //   text: '复核',
    //   key: 'review',
    //   icon: <SubmitBlue />,
    //   disabled: false,
    //   hidden: false,
    //   minSelection: 1,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) =>
    //     handleReview(selectedRowKeys, selectedRows, 'review')
    // },
  ];
};

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
