/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 10:56:37
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 09:54:56
 */
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ELImportExcel, ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import service from './service';
import { getTableSearchFormItems, getTableColumns } from './config';
import './index.less';
import app from '@/project/utils/appCommon';
import { async } from '@antv/x6/lib/registry/marker/async';

interface Props {
  history: history;
  match: any;
  style: any;
  push: push;
}
interface State {
  tableRef: any;
  userTableRef: any;
  searchparmas: any;
  switchLodingList: any;
  importModalRef: any;
  importModalSpecialRef: any;
}

export default class SupportItemList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      userTableRef: null,
      searchparmas: '',
      switchLodingList: false,
      importModalRef: null,
      importModalSpecialRef: null
    };
  }
  componentDidMount() { }
  getTableActionButtons = (): Array<ActionButtonProps> => {
    let btns: Array<ActionButtonProps> = [
      {
        text: '新增',
        key: 'create',
        disabled: false,
        location: 'left',
        handleClick: this.create,
        authCode: 'bikeDocListAdd'
      },
      {
        text: '编辑',
        key: 'edit',
        maxSelection: 1,
        minSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.edit,
        authCode: 'bikeDocListEdit'
      },
      {
        text: '导入',
        key: 'import',
        disabled: false,
        location: 'left',
        handleClick: this.onImport,
        authCode: 'bikeDocListImport'
      },
      {
        text: '特价车导入',
        key: 'import',
        disabled: false,
        location: 'left',
        handleClick: this.onImportSpecial,
        authCode: 'bikeDocListSpecialImport'
      },
      // {
      //   text: '删除',
      //   key: 'del',
      //   minSelection: 1,
      //   disabled: false,
      //   location: 'left',
      //   needConfirm: true,
      //   handleClick: this.onDel
      // },
      {
        text: '更新状态',
        key: 'updateStatus',
        minSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.updateStatus
      }
    ];

    return btns;
  };
  updateStatus = async ({ selectedRowKeys, selectedRows }) => {
    const res = await service.updateStatus(selectedRowKeys);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    this._refreshData();
  };

  create = async ({ selectedRowKeys, selectedRows }) => {
    // 2021年06.24 修改路由配置   去掉 /orgCenter
    this.props.push(`/mainData/bikeDoc/detail/add/-1`);
  };
  // 跳转方法
  edit = ({ selectedRowKeys, selectedRows }) => {
    const row = selectedRows[0];
    if (!row.id) {
      ElNotification({ type: 'error', message: '未获取到数据ID' });
      return;
    }
    // 2021年06.24 修改路由配置   去掉 /orgCenter
    this.props.push(`/mainData/bikeDoc/detail/edit/${row.id}`);
  };
  onImport = async ({ selectedRowKeys, selectedRows }) => {
    const { importModalRef } = this.state;
    importModalRef.openModal();
  };
  onImportSpecial = async ({ selectedRowKeys, selectedRows }) => {
    const { importModalSpecialRef } = this.state;
    importModalSpecialRef.openModal();
  };
  onDel = async ({ selectedRowKeys, selectedRows }) => {
    const res = await service.del(selectedRowKeys);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    this._refreshData();
  };

  _refreshData() {
    this.tableRef.refreshData();
  }
  //获取modalref
  modalRef = (importModalRef) => {
    this.setState({
      importModalRef
    });
  };
  modalSpecialRef = (importModalSpecialRef) => {
    this.setState({
      importModalSpecialRef
    });
  };

  //导入接口调用成功后的回调
  importCallBack = async (res) => {
    app.ShowMsg(res);
    this._refreshData();
  };
  render() {
    return (
      <>
        <ElSearchTable
          rowKey='id'
          bordered
          onRef={(ref) => {
            this.tableRef = ref;
          }}
          actionButtons={this.getTableActionButtons()}
          tableProxy={{
            request: async (paramData) => {
              paramData.buId = paramData.buObj?.id;
              delete paramData.buObj;
              const res: any = await service.search({
                ...paramData
              });
              if (res && res.success) {
                const setData = res.data.records.map((item) => {
                  return {
                    id: item.id,
                    navSwitchLoding: false,
                    showSwitchLoding: false
                  };
                });
                this.setState({
                  switchLodingList: setData
                });
              }
              return res;
            },
            successCallBack: (tableRef) => {
              this.setState({
                tableRef
              });
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
          scroll={{ x: 'max-content' }}
          searchFormProps={getTableSearchFormItems()}
          columns={getTableColumns(this)}
        />
        <ELImportExcel
          downTemplateRequest='/yd-user/itm/itmItemYd/downloadTemplate'
          downTemplateFileName='商品导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-user/itm/itmItemYd/import'
          successCallBak={this.importCallBack}
          onRef={this.modalRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
        <ELImportExcel
          downTemplateRequest='/yd-user/itm/itmItemYd/downloadSpcTemplate'
          downTemplateFileName='特价车导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-user/itm/itmItemYd/importSpecial'
          successCallBak={this.importCallBack}
          onRef={this.modalSpecialRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
      </>
    );
  }
}
