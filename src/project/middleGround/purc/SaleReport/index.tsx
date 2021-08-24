import React from 'react';
import { history, push } from 'react-router-dom';
import { ElNotification, ElPage, ElSearchTable } from '@/components/el';
import { getTableActionButtons, getTableColumns, getTableSearchFormItems } from './config';
import * as service from './service';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils';

interface Props {
  history: history;
  push: push;
}

interface State {
  tableRef: any;
  modalVisible: boolean;
  expandTableLoading: boolean;
  expandTableData: Array<any>;
}


class InventoryCheck extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      modalVisible: false,
      expandTableLoading: false,
      expandTableData: []
    }
  }

  onRef = (tableRef) => {
    this.setState({
      tableRef
    })
  }

  // 导出 
  exports = (a, b, page) => {
    console.log(a, b, page)
    const data = {
      ...b,
      size: page.pageSize,
      current: page.current
    }
    commonExport({
      url: '/yd-inv/ydinvCk/exportInvCkList',
      params: this.beforeRequestParams(data),
      fileName: '销售报表导出'
    });
  };

  beforeRequestParams = (params) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map(item => item.id);
    const param = {
      ...params,
      storeIds,
      // docMode: params.docMode === 'C' ? '' : params.docMode,
      orders: [{ asc: false, column: 'createTime' }],
      startTime: params.createTime && params.createTime[0] && dayjs(params.createTime[0]).startOf('day').format('YYYY-MM-DD'),
      endTime: params.createTime && params.createTime[1] && dayjs(params.createTime[1]).endOf('day').format('YYYY-MM-DD'),
      createTime: null,
      docTypeList: ['A', 'B', 'F', 'G']
    };
    return param;
  }

  requset = async (param) => {
    console.log(param, 'paramparamparamparamparamparam');
    // return service.getList(this.beforeRequestParams(param));
    const res = await service.getList(this.beforeRequestParams(param));
    if (res.success) {
      const { total, records = [] } = res.data;
      if (total > 0) {
        records.forEach(item => {
          item.serialNo = Array.isArray(item.serialNoList) ? item.serialNoList.join(',') : null
        })
      }
      return Promise.resolve({
        success: true,
        data: {
          total,
          records
        }
      })
    } else {
      return res
    }
  }

  getExpandTableData = async (record) => {
    console.log(record);
    // this.setState({
    //   expandTableLoading: true,
    // });
  };

  onTableExpand = (expanded, record) => {
    if (expanded) {
      this.getExpandTableData(record);
    }
  };

  render() {
    return (
      <ElPage>
        <ElSearchTable
          rowKey='id'
          tableId='SaleReport'
          onRef={this.onRef}
          scroll={{ x: 'max-content' }}
          // expandable={{
          //   onExpand: this.onTableExpand,
          //   expandedRowRender: (record) =>
          //     getExpandedRowRender({
          //       record,
          //       expandTableLoading: this.state.expandTableLoading,
          //       expandTableData: this.state.expandTableData,
          //     })
          // }}
          tableProxy={{
            request: this.requset,
            successCallBack: () => { },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          // actionButtons={
          //   getTableActionButtons(
          //     this.exports,
          //   )
          // }
          searchFormProps={{
            items: getTableSearchFormItems()
          }}
          columns={getTableColumns()}
        />
      </ElPage>
    )
  }
}

export default InventoryCheck;