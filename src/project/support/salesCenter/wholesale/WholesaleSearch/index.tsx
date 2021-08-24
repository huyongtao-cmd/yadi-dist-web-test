// 批发顾客查询
import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';

import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { commonExport } from '@/utils/utils';

import * as service from './service';

class Search extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null
    };
  }
  edit = () => {
    console.log('编辑');
  };
  onRef = (tableRef) => {
    this.setState({
      tableRef: tableRef
    });
  };
  request = async (paramData) => {
    console.log('查询参数', paramData);
    return service.search(paramData);
  };
  render() {
    return (
      <>
        <ElSearchTable
          bordered
          rowKey='id'
          scroll={{ x: 'max-content' }}
          onRef={this.onRef}
          tableProxy={{
            request: this.request,
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
          searchFormProps={{ items: getTableSearchFormItems() }}
          columns={getTableColumns()}
          actionButtons={getTableActionButtons(this.edit)}
        />
      </>
    );
  }
}
export default Search;
