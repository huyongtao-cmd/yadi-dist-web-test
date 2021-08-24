
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';

import { Table, Spin } from "antd";
import ElSearchTable from '@/components/el/ElSearchTable';

import PropTypes from 'prop-types';
// import { ElTabPaneProps } from "@/components/el/ElTab";

import { getTableSearchFormItems, getTableActionButtons, getTableColumns } from './config'

import * as service from './service'

interface Props {
  history: history;
  match: any;
}

interface State {
  searchForm: any;
  [props: string]: any;
}

export default class Query extends PureComponent<Props, State> {
  static propTypes = {};
  formRef: any;
  itemsTableRef: any;
  tagsTableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      searchForm: {
      },
    }
  }

  render() {
    const { searchForm } = this.state;
    return (
      <>
        <ElSearchTable
          rowKey='id'
          onRef={(ref) => (this.formRef = ref)}
          mode={{
            proxy: true, // 筛选器
            search: true,  // searchForm
            action: false,
            pagination: true, // 分页
            descriptions: true,// descriptions
            tabs: false
          }}
          searchFormProps={getTableSearchFormItems()}
          defaultSearchData={searchForm}
          columns={getTableColumns(this)}
          rowSelectionConfig={null}
          tableProxy={{
            request: (paramData) => {
              paramData.orders = [{ asc: false, column: 'createTime' }]
              return service.getList(paramData);
            },
            successCallBack: (tableRef) => {
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
        />
      </>
    )
  }
}
