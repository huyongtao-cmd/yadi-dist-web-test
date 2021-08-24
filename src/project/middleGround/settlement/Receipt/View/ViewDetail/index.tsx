import React from 'react';
import { Modal, Input } from 'antd'
import { ElNotification, ElSearchTable } from '@/components/el';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils'; // 导出
import { searchDetailList } from '../../service';
interface Props {
  // history: any;
  // location: any;
  match: any;
}

interface State {
  searchParams: object;
  // tableRef: any;
}
class SaleStatement extends React.Component<Props, State> {
  tableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {},
    };
  }


  // 时间日期处理方法（处理成hh:mm:ss)
  handleValidRange = (data) => {
    return {
      salDocDateS:
        data.salDocDate &&
        data.salDocDate[0] &&
        dayjs(data.salDocDate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      salDocDateE:
        data.salDocDate &&
        data.salDocDate[1] &&
        dayjs(data.salDocDate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    }
  }
  // 导出
  handleExport = async (rowKeys) => {
    const {searchParams:params} = this.state
    commonExport({
      url: '/yst-order/order/salReceipt/export',
      params,
      fileName: '收款结算单明细查看'
    });
  }

  render() {
    const {id,num} = this.props.match.params
    return (<>
      <ElSearchTable
        id='SaleStatement'
        tableId='fin_sale_SaleStatementViewDetailList'
        rowKey='id'
        bordered
        onRef={(ref) => (this.tableRef = ref)}
        scroll={{ x: 'max-content', }}
        tableProxy={{
          request: async (paramData) => {
            const params = {
              orders: [{ asc: false, column: "createTime" }],
              ...paramData,
              // settleNo: num,
              settleitemId: id,
              ouId: paramData.ouId?.id,
              buId: paramData.buId?.id,
              settleType: paramData.settleType?.settleTypeCode,
              custId: paramData.custId?.id,
              agentEmpId: paramData.agentEmpId?.id,
              itemCateCode: paramData.itemCateCode?paramData.itemCateCode[paramData.itemCateCode.length-1]:undefined,//传入最后一级商品品类
              ...this.handleValidRange(paramData)
            }
            this.setState({searchParams: params})
            return searchDetailList(params)
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
        searchFormProps={getTableSearchFormItems()}
        columns={getTableColumns({ that: this })}
        actionButtons={
          getTableActionButtons({
            handleExport: this.handleExport,
          })
        }
      />

    </>)
  }
}

export default SaleStatement;