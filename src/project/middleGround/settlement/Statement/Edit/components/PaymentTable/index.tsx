// 付款核销明细 信息行
import React, { Component } from 'react';
import request from '@/utils/request';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import { ElSearchTable } from '@/components/el';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { Link } from 'react-router-dom';
import { pay } from '../../../service';
interface Props {
  id?: any;
  type: any;
}
interface State {
  id: any;
}
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    dataIndex: 'verifyNo',
    title: '核销编号',
    align: 'center'
  },
  {
    dataIndex: 'settleEntityName',
    title: '结算主体',
    align: 'center'
  },
  {
    dataIndex: 'buTime',
    title: '业务日期',
    align: 'center'
  },
  {
    dataIndex: 'createTime',
    title: '核销日期',
    align: 'center'
  },
  {
    dataIndex: 'preSettleNo',
    title: '单据编号',
    align: 'center'
  },
  {
    dataIndex: 'currName',
    title: '币种',
    align: 'center'
  },
  {
    title: '是否预付',
    align: 'center',
    dataIndex: 'preFlag',
    render: (value) => {
      return value === true ? '是' : '否';
    }
  },
  {
    dataIndex: 'verifyAmount',
    title: '核销金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2}  prefix={''}/> : '-'
  }
];

export class PaymentTable extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props?.type
    };
  }
  componentDidMount() {
    console.log('this_____', this);
  }
 

  render() {
    return (
      this.props.type && (
        <ElSearchTable
          tableId='fin_purc_paymentTableList'
          rowKey='id'
          // onRef={(ref) => (this.tableRef = ref)}
          // rowSelectionConfig={null}
          tableProxy={{
            autoLoad: true,
            request: async (paramData) => {
              const params = {
                ...paramData,
                orders: [{ asc: false, column: 'createTime' }],
                id: this.props?.type
              };
              return pay(params);
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
      )
    );
  }
}

export default PaymentTable;
