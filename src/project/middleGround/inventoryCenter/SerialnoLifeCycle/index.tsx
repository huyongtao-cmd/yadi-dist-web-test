import React from 'react';
import { ElSearchTable } from '@/components/el';
import * as service from './service';
import { getTableActionButtons, getTableColumns, getTableSearchFormItems } from './config';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils';


class SerialnoLifeCycle extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      storeRef: null,
      whRef: null
    }
  }

  onRef = (tableRef) => {
    this.setState({
      tableRef
    })
  }

  storeRef = (ref) => {
    this.setState({
      storeRef: ref
    });
  };

  whRef = (ref) => {
    this.setState({
      whRef: ref
    });
  };

  onSelectChange = async (value) => {
    this.setState({
      loading: true
    })
    this.state.tableRef.setSearchFormData({
      whId: ''
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
      const param = res.data.records?.map((item) => {
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

  beforeRequestParams = (params) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map(item => item.id);
    const param = {
      ...params,
      storeIds,
      // docMode: params.docMode === 'C' ? '' : params.docMode,
      orders: [{ asc: false, column: 'invSerialDocDO.createTime' }],
      ioDates: params.ioDates && params.ioDates[0] && params.ioDates[1] ?
        [params.ioDates[0] && dayjs(params.ioDates[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        params.ioDates[1] && dayjs(params.ioDates[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')] : [],
    };
    return param;
  }

  requset = (param) => {
    console.log(param, 'paramparamparamparamparamparam');
    return service.getList(this.beforeRequestParams(param));
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
      url: '/yd-inv/Inv/ydSerialDoc/downloadTrn',
      params: this.beforeRequestParams(data),
      fileName: '车架号生命周期导出'
    });
  };

  render() {
    return (
      <>
        <ElSearchTable
          rowKey='id'
          tableId='InventoryCheck'
          onRef={this.onRef}
          scroll={{ x: 'max-content' }}
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
          actionButtons={
            getTableActionButtons(
              this.exports,
            )
          }
          searchFormProps={{
            items: getTableSearchFormItems(this.storeRef, this.whRef, this.onSelectChange)
          }}
          columns={getTableColumns()}
        />
      </>
    )
  }

}

export default SerialnoLifeCycle;