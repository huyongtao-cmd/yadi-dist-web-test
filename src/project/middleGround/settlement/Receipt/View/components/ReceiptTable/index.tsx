import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import { commonExport } from '@/utils/utils'; // 导出
import { ElSearchTable } from '@/components/el';
import {ExportBlue} from '@/components/el/ElIcon';
import { ActionButtonProps,ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { details } from '../../../service';
interface Props {
  id?: any;
  selectId: any
}
interface State {
  searchParams: object;
}
const getTableColumns = (): Array<ElSearchTableColumns> => [
  // {
  //   dataIndex: 'id',
  //   title: '序号',
  //   align: 'center',
  //   render: (value, record, index) => index + 1,
  // },
  {
    dataIndex: 'receiveTypeName',
    title: '收款类型',
    align: 'center'
  },
  // {
  //   dataIndex: 'merchantId',
  //   title: '商户ID',
  //   align: 'center'
  // },
  // {
  //   dataIndex: 'merchantName',
  //   title: '商户名称',
  //   align: 'center',
  // },
  {
    dataIndex: 'payMethodName',
    title: '收款方式',
    align: 'center',
  },
  {
    dataIndex: 'receiveDate',
    title: '收款日期',
    align: 'center',
    render: (value) => {
      return (value?dayjs(value).format('YYYY-MM-DD'):'')
    }
  },
  {
    dataIndex: 'receiveFlow',
    title: '收款流水',
    align: 'center',
  },
  {
    dataIndex: 'account',
    title: '收款账号',
    align: 'center',
  },
  // {
  //   dataIndex: 'paymentAccount',
  //   title: '付款方账户',
  //   align: 'center',
  // },
  // {
  //   dataIndex: 'paymentName',
  //   title: '付款方账户名称',
  //   align: 'center',
  // },
  {
    dataIndex: 'payAmount',
    title: '收款金额',
    align: 'center',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  // {
  //   dataIndex: 'totalVerifyAmount',
  //   title: '累计核销金额',
  //   align: 'center',
  //   summary: { sum: {} },
  //   render: (value) =>
  //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  // },
  {
    dataIndex: 'realAmount',
    title: '到账金额',
    align: 'center',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  // {
  //   dataIndex: 'settleStartDate',
  //   title: '结算开始时间',
  //   align: 'center',
  // },
  // {
  //   dataIndex: 'settleEndDate',
  //   title: '结算结束时间',
  //   align: 'center',
  // },
  {
    dataIndex: 'salOrderNumber',
    title: '订单编号',
    align: 'center',
  },
  {
    dataIndex: 'lineNo',
    title: '订单行号',
    align: 'center',
  },
  {
    dataIndex: 'contractNumber',
    title: '合同号',
    align: 'center',
  },
  {
    dataIndex: 'remark',
    title: '备注',
    align: 'center',
  },
];

const getTableActionButtons = ({
  handleExport,
}): Array<ActionButtonProps> => {
  return [
    {
      key: 'export',
      text: '导出',
      location: 'left',
      icon: <ExportBlue />,
      disabled: false,
      hidden: false,
      // minSelection: 1,
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleExport(selectedRowKeys, selectedRows)
    }
  ];
};

export class ReceiptTable extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {}
    }
  }

  // 导出
  // handleExport = async (rowKeys) => {
  //   const {searchParams:params} = this.state
  //   commonExport({
  //     url: '/yst-fin/sal/receiveSettle/exportDtl',
  //     params,
  //     fileName: '收款结算单审核查看'
  //   });
  // }

  render() {
    // const { selectId } = this.props;
    return (
      <ElSearchTable
        rowKey='id'
        tableId='fin_sale_statementReceiptTableList'
        // onRef={(ref) => (this.tableRef = ref)}
        // rowSelectionConfig={null}
        tableProxy={{
          request: async (paramData) => {
            const params = {
              orders: [{ asc: false, column: "createTime" }],
              ...paramData,
              receiveSettleId: this.props.selectId
            }
            this.setState({searchParams: params})
            return details(params)
          },
          successCallBack: (tableRef) => { },
          errCallBack: () => {
            console.log('err');
          },
          props: {
            success: 'success',
            result: 'data.records',
            total: 'data.total'
          },
          autoLoad: true
        }}
        scroll={{
          x: 'max-content'
          //  y: 'calc(100vh - 400px)'
        }}
        bordered
        columns={getTableColumns()}
        // actionButtons={
        //   getTableActionButtons({
        //     handleExport: this.handleExport,
        //   })
        // }
        mode={{
          // 精简模式,是否隐藏搜索表格的某一块元素
          proxy: false, // 筛选器
          search: true, // SearchForm
          action: true, // actionButtons
          pagination: true, // 分页
          descriptions: false, // descriptions
          tabs: false
        }}
      />
    );
  }
}

export default ReceiptTable;
