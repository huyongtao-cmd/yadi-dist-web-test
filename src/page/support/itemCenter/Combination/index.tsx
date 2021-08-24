/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 11:01:49
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-24 11:02:14
 */
import React, { PureComponent } from 'react';
import { history, push } from 'react-router-dom';

import { Table, Spin } from "antd";
import ElSearchTable from '@/components/el/ElSearchTable';
import Items from './Add/Items';
import Tags from './Add/Tags';

import PropTypes from 'prop-types';
import { ElTabPaneProps } from "@/components/el/ElTab";

import { getTableSearchFormItems, getTableActionButtons, getTableColumns } from './config'

import * as service from './service'

interface Props {
  history: history;
  push: push;
}

interface State {
  // searchForm: any;
  tabLoading: boolean;
  defaultActiveKey: string;
  oldTabKey: string;
  detailListV0: Array<any>;
  tagListV0: Array<any>;
  tableIndex: number;
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
      // searchForm: {
      //   status: ''
      // },
      selectedRowKeys: [], // 表格勾选行keys
      selectedRows: [], // 表格勾选行rows
      tabLoading: false,
      defaultActiveKey: 'isDetailEdit',
      oldTabKey: 'isBaseEdit',
      detailListV0: [],
      tagListV0: [],
      // 基本信息
      isDetailEdit: false,
      // 发票信息
      isTagEdit: false,
      tableIndex: 1
    }
  }

  changeRadio(e) {
    console.log(e)
  }

  newHandle(type) {
    this.props.push('/itemCenter/combination/add');
  }

  editHandle() {
    const id = this.state.selectedRowKeys[0]
    this.props.push(`/itemCenter/combination/edit/${id}`);
  }

  /** tab 列表 */
  setTabList = (): Array<ElTabPaneProps> => {
    const {
      tabLoading,
      tableIndex,
      detailListV0,
      tagListV0
    } = this.state;
    // 组织列表
    let tabList = [
      {
        name: '组合商品明细',
        key: 'isDetailEdit',
        render: () => {
          return (
            <Spin spinning={tabLoading}>
              <Items
                key='itemsList'
                type='view'
                data={detailListV0}
                tableIndex={tableIndex}
                onRef={(ref) => this.itemsTableRef = ref}
              />
            </Spin>
          );
        }
      },
      {
        name: '商品标签',
        key: 'isTagEdit',
        render: () => {
          return (
            <Spin spinning={tabLoading}>
              <Tags
                key='itemsList'
                type='edit'
                data={tagListV0}
                onRef={(ref) => this.tagsTableRef = ref}
                submitIndex={tableIndex}
              />
            </Spin>
          );
        }
      },
    ];
    return tabList;
  };

  /** 点击切换tab */
  onTabClick = async (key = 'isDetailEdit') => {

  };

  onRowClick = async (record) => {
    const { tableIndex } = this.state;
    this.setState({
      tabLoading: true,
      selectedRows: [record],
      selectedRowKeys: [record.id]
    });
    service.getItemDetail(record.id)
      .then(async (res: any) => {
        this.setState({
          tabLoading: false,
        })
        if (res?.success) {
          const { data } = res;
          this.setState({
            // tabListType: data.applyType,
            detailListV0: data.itmComboDVOList,
            tagListV0: data.itmComboTagVOList,
            tableIndex: tableIndex + 1

          })
        }
      })
      .catch((err) => {
        this.setState({ tabLoading: false });
      })


  }

  render() {
    const { tableIndex } = this.state;
    return (
      <>
        <ElSearchTable
          rowKey='id'
          onRef={(ref) => (this.formRef = ref)}
          mode={{
            proxy: true, // 筛选器
            search: true,  // searchForm
            action: true,
            pagination: true, // 分页
            descriptions: true,// descriptions
            tabs: true
          }}
          searchFormProps={getTableSearchFormItems()}
          // defaultSearchData={searchForm}
          actionButtons={getTableActionButtons(this)}
          columns={getTableColumns(this)}
          rowSelectionConfig={{
            disabledRowIds: [],
            type: 'checkbox',
            fixed: false,
            onChange: ({ selectedRowKeys, selectedRows }) => {
              this.setState({
                selectedRowKeys,
                selectedRows
              });
            }
          }}
          tableProxy={{
            request: (paramData) => {
              paramData.orders = [{ asc: false, column: 'createTime' }];
              return service.getList({ ...paramData });
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
          tabs={{
            defaultActiveKey: 'isDetailEdit',
            tabs: this.setTabList(),
            // onRef: (ref) => (this.tabsRef = ref),
            // onTabChange: this.onTabClick
          }}
          onTableRowClick={this.onRowClick}
        />
      </>
    )
  }
}
