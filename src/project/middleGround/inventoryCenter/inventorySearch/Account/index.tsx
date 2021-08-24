// 库存台账查询
import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';

import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { commonExport } from '@/utils/utils';
import dayjs from 'dayjs';
import * as service from './service';

class Account extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null
    };
  }
  beforeRequest = (formData) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    let params = {
      ...formData,
      storeIds,
      orders: [{ asc: false, column: 'invIoDO.createTime' }],
      // itemCode: formData.itemCode?.itemCode,
      ioDate: undefined,
      docTimeFrom:
        formData.ioDate &&
        formData.ioDate[0] &&
        dayjs(formData.ioDate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      docTimeTo:
        formData.ioDate &&
        formData.ioDate[1] &&
        dayjs(formData.ioDate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      // whIds: formData.whIds?.map((item) => item.whId),
      // ouIds: formData.ouIds?.map((item) => item.id),
      // brandIds: formData.brands?.map((item) => item.id),
      // itemIds: formData.itemIds?.map((item) => item.id)
      // lotNo: formData.lotNo?.lotNo
    };
    console.log('处理后的结果', params);
    return params;
  };

  //查询仓库下拉
  onSelectChange = async (value) => {
    this.state.tableRef.setSearchFormData({
      whIds: []
    })
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      storeIds,
      buId: value
    }
    const res = await service.findOneInv(data);
    if (res.success) {
      const param = res.data?.records?.map((item) => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
          }
        }
      }).filter(Boolean);
      this.state.whRef.setList(param);
    }
  }

  //仓库下拉ref
  whRef = (ref) => {
    this.setState({
      whRef: ref
    });
  };

  //导出
  exports = (a, b, page) => {
    const data = {
      ...b,
      size: page.pageSize,
      current: page.current
    }
    commonExport({
      url: '/yd-inv/inv/ydInvIo/ydStkAcct/export',
      params: this.beforeRequest(data),
      fileName: '库存台账查询导出'
    });
  };
  render() {
    return (
      <>
        <ElSearchTable
          bordered
          rowKey='id'
          scroll={{ x: 'max-content' }}
          onRef={(tableRef) => {
            this.setState({
              tableRef: tableRef
            });
          }}
          tableProxy={{
            request: async (paramData) => {
              console.log('查询参数', paramData);
              return service.search(this.beforeRequest(paramData));
            },
            successCallBack: (tableRef) => {
              console.log('请求成功的回调', tableRef);
            },
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
          searchFormProps={{ items: getTableSearchFormItems(this.whRef, this.onSelectChange) }}
          columns={getTableColumns(this)}
          actionButtons={getTableActionButtons(this.exports)}
        />
      </>
    );
  }
}
export default Account;
