import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import { commonExport } from '@/utils/utils'; // 导出
import { ElSearchTable } from '@/components/el';
import {ExportBlue} from '@/components/el/ElIcon';
import { ActionButtonProps,ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { searchItemList } from '../../../service';
interface Props {
  id?: any;
  selectId: any;
  // num: string;
}
interface State {
  searchParams: object;
}
const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    dataIndex: 'lineNumber',
    title: '行号',
    align: 'center'
  },
  {
    dataIndex: 'salOrderNumber',
    title: '订单编号',
    align: 'center'
  },
  {
    dataIndex: 'lineNo',
    title: '订单行号',
    align: 'center'
  },
  {
    dataIndex: 'refundTypeName',
    title: '退货类型',
    align: 'center'
  },
  {
    dataIndex: 'itemClassName',
    title: '商品品类',
    align: 'center'
  },
  {
    dataIndex: 'financeClassName',
    title: '财务分类',
    align: 'center'
  },
  {
    dataIndex: 'itemCode',
    title: '商品编码',
    align: 'center',
  },
  {
    dataIndex: 'itemName',
    title: '商品名称',
    align: 'left',
  },
  {
    dataIndex: 'taxRate',
    title: '税率',
    align: 'right',
  },
  {
    dataIndex: 'receiveAmount',
    title: '应收款金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  // {
  //   dataIndex: 'totalAmount',
  //   title: '订单含税金额',
  //   align: 'right',
  //   summary: { sum: {} },
  //   render: (value) =>
  //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  // },
  // {
  //   dataIndex: 'taxAmount',
  //   title: '订单税额',
  //   align: 'right',
  //   summary: { sum: {} },
  //   render: (value) =>
  //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  // },
  // {
  //   dataIndex: 'unTaxAmount',
  //   title: '订单未税金额',
  //   align: 'right',
  //   summary: { sum: {} },
  //   render: (value) =>
  //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  // },
  {
    dataIndex: 'shoppingCardAmt',
    title: '购物卡金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'billCouponAmt',
    title: '提货券金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'scoreAmount',
    title: '使用积分金额',
    align: 'right',
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
    dataIndex: 'realReceiveAmount',
    title: '收款金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'receiveTaxAmount',
    title: '收款税额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'totalVerifyAmount',
    title: '累计核销金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'canVerifyAmount',
    title: '未核销金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'contractNumber',
    title: '合同号',
    align: 'center',
  },
  {
    dataIndex: 'remark',
    title: '备注',
    // align: 'center',
  },
  {
    title: '联查',
    width: 100,
    align: 'center',
    fixed: 'right',
    dataIndex: 'action',
    render: (value, record) => {
      const { id, relationNumber } = record || {};
      // return <Link to={`/saleSettlement/receipt/viewDetail/${id}/${that.props.num}`}>查看明细</Link>;
      return <Link to={`/saleSettlement/receipt/viewDetail/${id}`}>查看明细</Link>;
    }
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
        tableId='fin_sale_ReceiptItemList'
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
            return searchItemList(params)
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
        columns={getTableColumns(this)}
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
