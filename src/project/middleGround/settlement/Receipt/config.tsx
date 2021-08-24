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
import { render } from '@testing-library/react';

const getTableSearchFormItems = (): ElFormProps => {
  return {
    wrapperCol: { span: 17 },
    labelCol: { span: 7 },
    items: [
      {
        title: '销售主体',
        name: 'settleEntityId',
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
        name: 'settleOrgId',
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
        title: '收款日期',
        name: 'startTime',
        span: 6,
        formOption: {
          type: '$rangePicker',
          props: {
            // placeholder: '请选择时间段'
          }
        }
      },
      {
        title: '是否预收',
        name: 'preReceiveFlag',
        span: 6,
        wrapperCol: { span: 16 },
        formOption: {
          type: '$radio',
          props: {
            options: [
              { label: '全部', value: undefined },
              { label: '是', value: true },
              { label: '否', value: false }
            ],
            // defaultValue:
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
        title: '收款方式',
        name: 'receiveMethod',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'COM',
            udc: 'PAY_METHOD',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
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
        title: '收款结算单号',
        name: 'receiveSettleNo',
        span: 6,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
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
            prefixStr: '/yst-system',
            domain: 'FIN',
            udc: 'BILL_STATUS',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      {
        title: '核对状态',
        name: 'flowHookState',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yst-system',
            domain: 'FIN',
            udc: 'HOOK_STATE',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      },
      {
        title: '核对时间',
        name: 'flowHookDate',
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
      fixed: 'left',
      dataIndex: 'lineNo',
      render: (value, record, index) => `${index + 1}`
    },
    {
      title: '收款结算单号',
      width: 160,
      align: 'center',
      fixed: 'left',
      dataIndex: 'receiveSettleNo',
      render: (value, record) => {
        const { id, relationNumber } = record || {};
        return <Link to={`/saleSettlement/receipt/view/${id}`}>{value}</Link>;
      }
    },
    {
      title: '收款日期',
      align: 'center',
      width: 120,
      dataIndex: 'processTime',
      render: (value) => {
        return (value ? dayjs(value).format('YYYY-MM-DD') : '')
      }
    },
    {
      title: '订单编号',
      align: 'center',
      width: 150,
      dataIndex: 'salOrderNumber'
    },
    {
      title: '销售主体',
      align: 'left',
      width: 140,
      dataIndex: 'settleEntityName'
    },
    {
      title: '销售组织',
      align: 'left',
      width: 140,
      dataIndex: 'settleOrgName'
    },
    {
      title: '下单渠道',
      align: 'center',
      width: 100,
      dataIndex: 'orderChannel'
    },
    {
      title: '订单类型',
      align: 'center',
      width: 100,
      dataIndex: 'businessType2Name'
    },
    {
      title: '收款单类型',
      align: 'center',
      width: 100,
      dataIndex: 'receiveDocTypeName'
    },
    {
      title: '退款类型',
      align: 'center',
      dataIndex: 'refundTypeName',
      render: (value) => value ? value : ''
    },
    {
      title: '是否预收',
      align: 'center',
      width: 100,
      dataIndex: 'preReceiveFlag',
      render: (value) => {
        return (
          value ? '是' : '否'
        )
      }
    },
    {
      title: '收款类型',
      align: 'center',
      width: 100,
      dataIndex: 'receiveTypeName'
    },
    {
      title: '收款方式',
      align: 'center',
      width: 100,
      dataIndex: 'receiveMethodName'
    },
    {
      title: '客户编码',
      align: 'center',
      width: 150,
      dataIndex: 'contactCode'
    },
    {
      title: '客户名称',
      align: 'left',
      width: 100,
      dataIndex: 'contactName'
    },
    {
      title: '客户属性',
      width: 150,
      align: 'center',
      dataIndex: 'contactTypeName'
    },
    {
      title: '币种',
      align: 'center',
      width: 100,
      dataIndex: 'currencyName'
    },
    {
      title: '收款总金额',
      align: 'right',
      width: 100,
      dataIndex: 'totalAmount',
      summary: { sum: {} }
    },
    {
      title: '到账金额',
      align: 'right',
      width: 100,
      dataIndex: 'realAmount',
      summary: { sum: {} }
    },
    {
      title: '累计核销金额',
      align: 'right',
      width: 100,
      dataIndex: 'totalVerifyAmount',
      summary: { sum: {} }
    },
    {
      title: '未核销金额',
      align: 'right',
      width: 100,
      dataIndex: 'canVerifyAmount',
      summary: { sum: {} }
    },
    {
      title: '单据状态',
      align: 'center',
      width: 100,
      dataIndex: 'stateName',
      // render: (text, record) => (
      //   <span style={{ color: statusMap.get(`BILL_STATUS_${record.state}`) }}>
      //     {text}
      //   </span>
      // )
    },
    {
      title: '创建人',
      width: 100,
      align: 'center',
      dataIndex: 'creator'
    },
    {
      title: '审核人',
      width: 100,
      align: 'center',
      dataIndex: 'approverName'
    },
    {
      title: '审核日期',
      width: 120,
      align: 'center',
      dataIndex: 'approveTime',
      render: (value) => {
        return (value ? dayjs(value).format('YYYY-MM-DD') : '')
      }
    },
    {
      title: '核对状态',
      align: 'center',
      width: 80,
      dataIndex: 'flowHookStateName'
    },
    {
      title: '核对日期',
      align: 'center',
      width: 80,
      dataIndex: 'flowHookDate'
    },
    {
      title: '核销状态',
      align: 'center',
      width: 80,
      dataIndex: 'verifyStateName'
    },
    {
      title: '拒绝原因',
      width: 150,
      align: 'left',
      dataIndex: 'rejectReason'
    },
    {
      title: '传ERP状态',
      width: 100,
      align: 'center',
      dataIndex: 'erpTransferState'
    },
    {
      title: '传ERP时间',
      width: 120,
      align: 'center',
      dataIndex: 'erpTransferDate',
      render: (value) => {
        return (value ? dayjs(value).format('YYYY-MM-DD') : '')
      }
    },
    {
      title: 'ERP单据号',
      width: 150,
      align: 'center',
      dataIndex: 'erpNumber'
    },
    {
      title: 'ERP凭证号',
      width: 150,
      align: 'center',
      dataIndex: 'erpReturnVoucher'
    },
    {
      title: '备注',
      align: 'left',
      dataIndex: 'remark'
    },
  ];
};

const getTableActionButtons = ({
  handleApprovePass,
  handleApproveRefused,
  handleExport,
  handlePending,
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
