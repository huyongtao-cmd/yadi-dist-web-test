//公司主数据
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ELImportExcel, ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import * as service from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import app from '@/project/utils/appCommon';

const { Option } = Select;

interface Props {
  history: history;
  match: any;
  style: any;
  push: push;
}
interface State {
  tableRef: any;
  searchparmas: any;
  switchLodingList: any;
  modalSatus: boolean;
  importModalRef: any;
}

export default class SupportStoreList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      searchparmas: '',
      switchLodingList: [],
      modalSatus: false,
      importModalRef: null
    };
  }

  // 增加商品跳转
  addItem = () => {
    this.changeModalStatus(true);
  };

  changeModalStatus = (status) => {
    this.setState({ modalSatus: status });
  };

  handleCancel = () => {
    this.changeModalStatus(false);
  };
  //操作按钮
  handleClick = (keys, rows, type) => {
    // 2021.06.24  修改路由配置 去掉 /orgCenter 改为mainData
    switch (type) {
      case 'add':
        return this.props.push('/mainData/store/detail/add/0');
      case 'edit':
        return this.props.push(`/mainData/store/detail/edit/${keys[0]}`);
      case 'sure': //启用
        return this.sure(keys, rows, 'ACTIVE');
      case 'stop': //禁用
        return this.sure(keys, rows, 'CLOSED');
    }
  };
  //确认
  sure = async (ids, rows, storeStatus) => {
    let flag = false;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].storeStatus === storeStatus) {
        flag = true;
        break;
      }
    }
    if (flag) {
      ElNotification({
        type: 'warning',
        message: `请勾选状态为${storeStatus === 'ACTIVE' ? '禁用' : '启用'
          }状态的门店`
      });
      return;
    }
    const res = await service.updateOrgStoreStatus({ ids, storeStatus });
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  };

  //获取modalref
  modalRef = (importModalRef) => {
    this.setState({
      importModalRef
    });
  };

  onImport = async ({ selectedRowKeys, selectedRows }) => {
    const { importModalRef } = this.state;
    importModalRef.openModal();
  };

  //导入接口调用成功后的回调
  importCallBack = async (res) => {
    app.ShowMsg(res);
    this.state.tableRef._refreshData();
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
          actionButtons={getTableActionButtons(this.handleClick, this.onImport)}
          tableProxy={{
            request: async (paramData) => {
              paramData.pid = paramData.buObj ? paramData.buObj.buId : '';
              delete paramData.buObj;
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              return service.getOuDataList(paramData);
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
          searchFormProps={getTableSearchFormItems}
          columns={getTableColumns(this)}
        />
        <ELImportExcel
          downTemplateRequest='/yd-user/itm/itmItemYd/downloadTemplate'
          downTemplateFileName='门店导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-user/itm/itmItemYd/import'
          successCallBak={this.importCallBack}
          onRef={this.modalRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
      </>
    );
  }
}
