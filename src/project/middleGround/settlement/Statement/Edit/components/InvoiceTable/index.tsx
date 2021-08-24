// 关联发票明细
import React, { Component } from 'react';
import request from '@/utils/request';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import { ElSearchTable } from '@/components/el';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { invoice } from '../../../service'
interface Props {
  id?: any;
  type: any
}
interface State {
  id: any
}
const getTableColumns = (): Array<ElSearchTableColumns> => [
  // {
  //   dataIndex: 'id',
  //   title: '序号',
  //   align: 'left',
  //   render: (value, record, index) => index + 1,
  // },
  {
    dataIndex: 'invoiceNumber',
    title: '发票号码',
    align: 'center'
  },
  {
    dataIndex: 'invoiceCode',
    title: '发票代码',
    align: 'center'
  },
  {
    dataIndex: 'invoiceTypeName',
    title: '发票类型',
    align: 'center',
  },
  {
    dataIndex: 'taxRate',
    title: '税率',
    align: 'right',
  },
  {
    dataIndex: 'taxAmount',
    title: '税额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} prefix={''} /> : '-'
  },
  {
    dataIndex: 'noTaxAmount',
    title: '不含税金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} prefix={''} /> : '-'
  },
  {
    dataIndex: 'totalAmount',
    title: '价税合计',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} prefix={''} /> : '-'
  },
  // {
  //   dataIndex: 'totalAmountBase',
  //   title: '价税合计本位币',
  //   align: 'right',
  //   render: (value) =>
  //     asserts.isExist(value) ? <Statistic value={value} precision={2} prefix={''} /> : '-'
  // },
  {
    dataIndex: 'checkState',
    title: '验证状态',
    align: 'center',
  },
  {
    dataIndex: 'invoiceDate',
    title: '收票时间',
    align: 'center',
  }
];

export class InvoiceTable extends Component<Props, State> {
  constructor(props) {
    super(props);
    console.log("this.InvoiceTableprops", this.props);

    this.state = {
      id: this.props.type
    }
  }
  componentDidMount() {
    this.setState({
      id: this.props.type
    })
  }
  render() {
    return (
      this.props.type && <ElSearchTable
        tableId='fin_purc_statementInvoiceTableList'
        rowKey='id'
        // onRef={(ref) => (this.tableRef = ref)}
        // rowSelectionConfig={null}
        tableProxy={{
          autoLoad: true,
          request: async (paramData) => {
            const params = {
              ...paramData,
              orders: [{ asc: false, column: 'createTime' }],
              id: this.props.type // 对账单号
            }
            // const res =await invoice(params)
            // const resData = res.data.records
            return invoice(params)
          },
          successCallBack: () => {
            //  请求成功的回调
          },
          errCallBack: () => {
            //  请求失败的回调
            console.log('err');
          },
          props: {
            success: 'success',
            result: 'data.records',
            total: 'data.total'
          }
        }}
        scroll={{
          x: 'max-content'
          //  y: 'calc(100vh - 400px)'
        }}
        bordered
        columns={getTableColumns()}
        mode={{
          // 精简模式,是否隐藏搜索表格的某一块元素
          proxy: false, // 筛选器
          search: false, // SearchForm
          action: true, // actionButtons
          pagination: true, // 分页
          descriptions: false, // descriptions
          tabs: false
        }}
      />
    );
  }
}

export default InvoiceTable;
