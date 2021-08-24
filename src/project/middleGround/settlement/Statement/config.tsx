import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { Link } from 'react-router-dom';
import { SubmitBlue, CancelRed, PermissionsCyan, ExportBlack, AddBlue } from '@/components/el/ElIcon';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import dayjs from 'dayjs';

const getTableSearchFormItems = (): ElFormProps => {
  return {
    wrapperCol: { span: 16 },
    labelCol: { span: 8 },
    items: [
      {
        title: '结算主体',
        name: 'settleEntityId',
        span: 6,
        formOption: {
          type: '$yd-mg-select-store',
          props: {
            placeholder: '结算主体',
          }
        }
      },
      {
        title: '币种',
        name: 'currCode',
        span: 6,
        formOption: {
          type: '$mg-select-curr',
        }
      },
      {
        title: '业务日期',
        name: 'dataTime',
        span: 6,
        rules: [{ required: true, message: '必填！' }],
        formOption: {
          type: '$rangePicker',
          props: {
            placeholder: ['起', '止']
          },
        }
      },
      {
        title: '往来对象名称',
        name: 'contactId',
        span: 6,
        formOption: {
          type: '$yd-mg-pop-supp', // 采购供应商
          props: {
            placeholder: '往来对象名称',
            showColumn: 'suppName',
          },
        }
      },
      {
        title: '来源方式',
        name: 'createMode',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择来源方式',
            prefixStr: '/yst-system',
            domain: 'FIN',
            udc: 'CREATE_MODE'
          }
        }
      },
      {
        title: '结算类型',
        name: 'settleTypeCode',
        span: 6,
        formOption: {
          type: '$fin-item-settleTypeName',
          props: { placeholder: '请选择结算类型' }
        }
      },
      {
        title: '关联对账单号',
        name: 'relationNumber',
        span: 6,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
          }
        }
      },
      {
        title: '采购结算单号',
        name: 'purSettleCode',
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
            placeholder: '请选择核销状态',
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
        title: '状态',
        name: 'state',
        span: 6,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择状态',
            prefixStr: '/yst-system',
            domain: 'FIN',
            udc: 'BILL_STATUS',
            transfer: {
              value: 'udcVal',
              lable: 'valDesc'
            }
          }
        }
      }
    ]
  };
};
const getTableColumns = ({ that }): Array<ElSearchTableColumns> => {
  return [
    // {
    //   title: '序号',
    //   width: 60,
    //   align: 'center',
    //   dataIndex: 'lineNo',
    //   render: (value, record, index) => `${index + 1}`
    // },
    {
      title: '结算主体',
      align: 'center',
      dataIndex: 'settleEntityName',
      width: 150,
    },
    {
      title: '采购结算单号',
      align: 'center',
      dataIndex: 'purSettleCode',
      width: 150,
      render: (value, record) => {
        const { id } = record || {};
        return <Link to={`/purcSettlement/statement/view/${id}`}>{value}</Link>;
      }
    },
    {
      title: '来源方式',
      align: 'center',
      dataIndex: 'createModeName',
      width: 100,
    },
    {
      title: '关联对账单号',
      dataIndex: 'relationNumber',
      align: 'center',
      width: 120,
    },
    {
      title: '结算类型',
      align: 'center',
      dataIndex: 'settleTypeName',
      width: 150,
    },
    {
      title: '往来对象名称',
      align: 'center',
      dataIndex: 'contactName',
      width: 200,
    },
    {
      title: '创建人',
      align: 'center',
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: '审核人',
      align: 'center',
      dataIndex: 'approveUser',
      width: 100,
    },
    // { // 暂时隐藏
    //   title: '复核人',
    //   align: 'center',
    //   dataIndex: 'checkUser'
    // },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'stateName',
      width: 100,
      // render: (text, record) => (
      //   <span style={{ color: statusMap.get(`BILL_STATUS_${record.state}`) }}>
      //     {text}
      //   </span>
      // )
    },
    {
      title: '核销状态',
      align: 'center',
      dataIndex: 'verifyStateName',
      width: 100,
    },
    {
      title: '业务日期',
      align: 'center',
      dataIndex: 'processTime',
      width: 150,
      render: (value) => asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      title: '币种',
      align: 'center',
      dataIndex: 'currName',
      width: 80,
    },
    {
      title: '总数量',
      align: 'right',
      dataIndex: 'totalQty',
      width: 100,
      summary: { sum: {} },
      render: (value) => <Statistic value={value} precision={2} prefix={''} />
    },
    {
      title: '总金额',
      align: 'right',
      dataIndex: 'totalAmount',
      width: 100,
      summary: { sum: {} },
      render: (value) => <Statistic value={value} precision={2} prefix={''} />
    },
    {
      title: '总金额(本位币)',
      align: 'right',
      dataIndex: 'totalAmountBase',
      width: 150,
      summary: { sum: {} },
      render: (value) => <Statistic value={value} precision={2} prefix={''} />
    },
    {
      title: '税额',
      align: 'right',
      dataIndex: 'taxAmount',
      width: 100,
      summary: { sum: {} },
      render: (value) => <Statistic value={value} precision={2} prefix={''} />
    },
    {
      title: '传输状态',
      align: 'center',
      width: 150,
      dataIndex: 'transferStateName'
    },
    // {
    //   title: '已支付金额',
    //   align: 'center',
    //   dataIndex: 'payAmount',
    //   render: (value) => <Statistic value={value} precision={2} prefix={''} />
    // },
    {
      title: '备注',
      align: 'left',
      dataIndex: 'remark',
      width: 200,
    }
  ];
};

const getTableActionButtons = ({
  handleApprovePass,
  handlePushPayment,
  handleApproveRefused,
  // handlePending,
  // handleReview,
  handleExport
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
      needConfirm: true,
      confirmText: '确认要审核通过选中的数据吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleApprovePass(selectedRowKeys, selectedRows)
    },
    {
      text: '生成付款单',
      key: 'generate',
      icon: <PermissionsCyan />,
      disabled: false,
      hidden: false,
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handlePushPayment(selectedRowKeys, selectedRows, 'generate')
    },
    {
      text: '审核拒绝',
      key: 'approveRefused',
      icon: <CancelRed />,
      disabled: false,
      hidden: false,
      location: 'left',
      minSelection: 1,
      //  maxSelection: 1,
      needConfirm: true,
      confirmText: '确认要拒绝选中的数据吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleApproveRefused(selectedRowKeys, selectedRows)
    },
    // { // 暂时隐藏
    //   text: '批量复核',
    //   key: 'review',
    //   icon: <SubmitBlue />,
    //   disabled: false,
    //   hidden: false,
    //   minSelection: 1,
    //   location: 'left',
    //   needConfirm: true,
    //   confirmText: '确认要复核选中的数据吗？',
    //   handleClick: ({ selectedRowKeys, selectedRows }) =>
    //     handleReview(selectedRowKeys, selectedRows, 'review')
    // },
    {
      key: 'exports',
      text: '导出',
      icon: <ExportBlack />,
      location: 'left',
      needConfirm: true,
      confirmText: '确认要导出选中的数据吗？',
      handleClick: handleExport
    }
    // {
    //   key: 'pending',
    //   text: '暂挂',
    //   icon: <ExportBlack />,
    //   location: 'left',
    //   disabled: false,
    //   hidden: false,
    //   minSelection: 1,
    //   needConfirm: true,
    //   confirmText: '确认要暂挂选中的数据吗？',
    //   handleClick: ({ selectedRowKeys, selectedRows }) =>
    //   handlePending(selectedRowKeys, selectedRows, 'pending')
    // },
  ];
};

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
