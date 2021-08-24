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

const { Option } = Select;

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
  modalSatus: boolean;
  visible: boolean;
  selectedEmpId: any;
  unBindLoading: boolean;
  bindLoading: boolean;
  importModalRef: any;
}

export default class SupportItemList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  detailPageUrl: string;
  constructor(props) {
    super(props);
    // 2021.06.24  修改路由配置 去掉 /orgCenter
    this.detailPageUrl = '/mainData/servingStation/detail';
    this.state = {
      tableRef: null,
      userTableRef: null,
      searchparmas: '',
      switchLodingList: [],
      modalSatus: false,
      visible: false,
      selectedEmpId: '',
      unBindLoading: false,
      bindLoading: false,
      importModalRef: null
    };
  }
  componentDidMount() { }
  getTableActionButtons = ({ unBindLoading }): Array<ActionButtonProps> => {
    let btns: Array<ActionButtonProps> = [
      {
        text: '新建',
        key: 'create',
        disabled: false,
        location: 'left',
        handleClick: this.create,
        authCode: 'sercingStationListAdd'
      },
      {
        text: '编辑',
        key: 'edit',
        minSelection: 1,
        maxSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.onEdit,
        authCode: 'sercingStationListEdit'
      },
      {
        text: '更新状态',
        key: 'updateStatus',
        minSelection: 1,
        disabled: false,
        location: 'left',
        handleClick: this.updateStatus
      },
      // {
      //   text: '导入',
      //   key: 'import',
      //   disabled: false,
      //   location: 'left',
      //   handleClick: this.onImport,
      //   authCode: 'servingStationListImport'
      // },
    ];

    return btns;
  };
  create = async ({ selectedRowKeys, selectedRows }) => {
    this.props.push(`${this.detailPageUrl}/add/-1`);
  };
  updateStatus = async ({ selectedRowKeys, selectedRows }) => {
    const res = await service.updateStatus(selectedRowKeys);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    this.tableRef.refreshData();
  };

  // 跳转方法
  onEdit = ({ selectedRowKeys, selectedRows }) => {
    const row = selectedRows[0];
    if (!row.id) {
      ElNotification({ type: 'error', message: '未获取到数据ID' });
      return;
    }

    this.props.push(`${this.detailPageUrl}/edit/${row.id}`);
  };
  onUserModalCancel = () => {
    this.setState(
      {
        visible: false
      },
      () => {
        this.tableRef.getTableData();
      }
    );
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
          actionButtons={this.getTableActionButtons({
            unBindLoading: this.state.unBindLoading
          })}
          tableProxy={{
            request: async (paramData) => {
              if (paramData.buObj) {
                paramData.pid = paramData.buObj.buId;
              }
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
          searchFormProps={getTableSearchFormItems()}
          columns={getTableColumns(this)}
        />
        <ELImportExcel
          downTemplateRequest='/yd-user/itm/itmItemYd/downloadTemplate'
          downTemplateFileName='维修站导入模板'
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
