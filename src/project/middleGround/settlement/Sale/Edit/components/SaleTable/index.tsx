import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from '@/utils/request';
import { Statistic, Modal, Input } from 'antd';
import { asserts } from '@/utils';
// import { commonExport } from '@/utils/utils'; // 导出
import {ExportBlue} from '@/components/el/ElIcon';
import { ElNotification,ElSearchTable } from '@/components/el';
import { ElSearchTableColumns,ActionButtonProps } from '@/components/el/ElSearchTable';
import { details } from '../../../service';
interface Props {
  id?: any;
  selectId: any,
  num: any,//结算单号
}
interface State {
  tempData: Array<any>;
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
  // {
  //   dataIndex: 'gift',
  //   title: '赠品',
  //   align: 'left',
  // },
  {
    dataIndex: 'qty',
    title: '结算数量',
    align: 'right',
    summary: { sum: {} }
  },
  {
    dataIndex: 'uom',
    title: '计量单位',
    align: 'center',
  },
  {
    dataIndex: 'salPrice',
    title: '销售单价',
    align: 'right',
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'totalAmount',
    title: '销售含税金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'discount',
    title: '折扣含税金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'couponAmount',
    title: '优惠券金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'receiveAmount',
    title: '应收款金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
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
  {
    dataIndex: 'settlePrice',
    title: '结算单价',
    align: 'right',
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'settleAmount',
    title: '结算含税金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'taxRate',
    title: '税率',
    align: 'right',
  },
  {
    dataIndex: 'taxAmount',
    title: '结算税额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : ''
  },
  {
    dataIndex: 'unTaxAmount',
    title: '结算未税金额',
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
    dataIndex: 'pointsAmount',
    title: '发放积分金额',
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
  // {
  //   dataIndex: 'signQty',
  //   title: '签收数量',
  //   align: 'center',
  //   render: (value) =>
  //     asserts.isExist(value) ? value : ''
  // },
  // {
  //   dataIndex: 'checkQty',
  //   title: '验收数量',
  //   align: 'center',
  //   render: (value) =>
  //     asserts.isExist(value) ? value : ''
  // },
  {
    dataIndex: 'contractNumber',
    title: '合同号',
    align: 'center',
  },
  {
    title: '联查',
    width: 100,
    align: 'center',
    fixed: 'right',
    dataIndex: 'action',
    render: (value, record) => {
      const { id, relationNumber } = record || {};
      return <Link to={`/saleSettlement/saleDetail/${id}/${that.props.num}`}>查看明细</Link>;
    }
  },
];

// const getTableActionButtons = ({
//   handleExport,
// }): Array<ActionButtonProps> => {
//   return [
//     {
//       key: 'export',
//       text: '导出',
//       location: 'left',
//       icon: <ExportBlue />,
//       disabled: false,
//       hidden: false,
//       // minSelection: 1,
//       handleClick: ({ selectedRowKeys, selectedRows }) =>
//         handleExport(selectedRowKeys, selectedRows)
//     }
//   ];
// };

export class SaleTable extends Component<Props, State> {
  tableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tempData: [],
      searchParams: {}
    }
  }

  // 导出
  // handleExport = async (rowKeys) => {
  //   const {searchParams:params} = this.state
  //   commonExport({
  //     url: '/yst-fin/fin/salSettle/exportDtl',
  //     params,
  //     fileName: '销售结算单审核查看'
  //   });
  // }

  render() {
    return (
      <ElSearchTable
        rowKey='id'
        tableId='fin_sale_statementSaleTableList'
        onRef={(ref) => (this.tableRef = ref)}
        // rowSelectionConfig={null}
        tableProxy={{
          request: async (paramData) => {
            const params = {
              orders: [{ asc: false, column: "createTime" }],
              ...paramData,
              salSettleId: this.props.selectId
            }
            this.setState({searchParams: params})
            return details(params)
          },
          successCallBack: (tableRef,data) => {},
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
          descriptions: true, // descriptions
          tabs: true
        }}
      />
    );
  }
}

export default SaleTable;
