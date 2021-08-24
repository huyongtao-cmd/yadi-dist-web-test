import React, { Component } from 'react';
import request from '@/utils/request';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import { ElSearchTable } from '@/components/el';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { merDetails } from '../../../service';
interface Props {
  id?: any;
  numbers: any;
}
interface State { }
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    dataIndex: 'id',
    title: '序号',
    align: 'left',
    render: (value, record, index) => index + 1,
  },
  // {
  //   dataIndex: 'merchantId',
  //   title: '商户ID',
  //   align: 'left',
  // },
  // {
  //   dataIndex: 'merchantName',
  //   title: '商户名称',
  //   align: 'right',
  //   render: (value) =>
  //     asserts.isExist(value) ? <Statistic value={value} precision={2} /> : '-'
  // },
  {
    dataIndex: 'settleRule',
    title: '结算规则',
    align: 'right',
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : '-'
  },
  {
    dataIndex: 'settleRuleName',
    title: '结算规则名称',
    align: 'right',
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} /> : '-'
  },
  {
    dataIndex: 'settleQuota',
    title: '分配结算额',
    align: 'left',
  },
  {
    dataIndex: 'receiveAccount',
    title: '收款账户',
    align: 'left',
  },
  {
    dataIndex: 'receiveAccNo',
    title: '收款账号',
    align: 'left',
  }
];

export class Merchant extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    // const { id } = this.props;
    return (
      <ElSearchTable
        rowKey='id'
        tableId='fin_sale_statementMerchantList'
        // onRef={(ref) => (this.tableRef = ref)}
        rowSelectionConfig={null}
        tableProxy={{
          request: async (paramData) => {
            const params = {
              orders: [{ asc: false, column: "createTime" }],
              ...paramData,
              relationNumber: this.props.numbers
            }
            return merDetails(params)
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

export default Merchant;
