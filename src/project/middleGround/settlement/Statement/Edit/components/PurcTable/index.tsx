// 关联采购明细列表
import React, { Component } from 'react';
import request from '@/utils/request';
import { Statistic } from 'antd';
import { asserts } from '@/utils';
import { ElSearchTable } from '@/components/el';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { details } from '../../../service';
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
  //   title: '行号',
  //   align: 'left',
  //   render: (value, record, index) => index + 1,
  // },
  // {
  //   dataIndex: 'purOrderNumber',
  //   title: '采购入库单号',
  //   align: 'left'
  // },
  // {
  //   dataIndex: 'purOrderName',
  //   title: '采购订单号',
  //   align: 'left',
  // },
  // {
  //   dataIndex: 'contactCode',
  //   title: '往来对象代码',
  //   align: 'left',
  // },
  // {
  //   dataIndex: 'settleEntityName',
  //   title: '结算主体',
  //   align: 'left',
  // },
  // {
  //   dataIndex: 'deptName',
  //   title: '部门',
  //   align: 'left',
  // },
  {
    dataIndex: 'skuCode',
    title: '物料编码',
    align: 'center'
  },
  {
    dataIndex: 'skuName',
    title: '物料名称',
    align: 'center'
  },
  // {
  //   dataIndex: 'itemName',
  //   title: '产品名称',
  //   align: 'center',
  // },
  // {
  //   dataIndex: 'itemClass',
  //   title: '产品类别',
  //   align: 'center',
  // },
  {
    dataIndex: 'uomName',
    title: '单位',
    align: 'center',
  },
  {
    dataIndex: 'qty',
    title: '数量',
    align: 'right',
    summary: { sum: {} },
  },
  {
    dataIndex: 'taxRate',
    title: '税率',
    align: 'right',
  },
  {
    dataIndex: 'price',
    title: '单价',
    align: 'right',
    // summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} prefix={''}/> : '-'
  },
  {
    dataIndex: 'totalAmount',
    title: '金额',
    align: 'right',
    summary: { sum: {} },
    render: (value) =>
      asserts.isExist(value) ? <Statistic value={value} precision={2} prefix={''}/> : '-'
  },
  {
    dataIndex: 'remark',
    title: '备注',
    align: 'left',
  },
];

export class PurcTable extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.type
    }
  }

  render() {
    return (
      this.props.type && <ElSearchTable
        tableId='fin_purc_purcTableList'
        rowKey='id'
        // onRef={(ref) => (this.tableRef = ref)}
        // rowSelectionConfig={null}
        tableProxy={{
          autoLoad: true,
          // 当传入tableProxy时, dataSource不会起效
          request: async (paramData) => {
            const params = {
              ...paramData,
              orders: [{ asc: false, column: 'createTime' }],
              // relationNumber: this.props?.type // 对账单号
              id: this.props.type // 对账单号
            }
            return details(params)
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

export default PurcTable;
