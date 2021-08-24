//公司主数据
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
// import ElSearchTable from '@/components/el/ElSearchTable';
import { ELImportExcel, ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import * as service from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  // getTableActionButtons,
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

export default class SupportItemList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      searchparmas: '',
      switchLodingList: [],
      modalSatus: false,
      importModalRef: null,
    };
    console.log(this.props, 'props')
  }

  async componentWillUnmount() { }


  // 跳转方法
  skipRouterFn = (id = '') => {
    if (!id) {
      this.setState({ modalSatus: true });
    } else if (id) {
      this.props.push(`/itemCenter/item/detail/edit/${id}`);
    }
  };

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

  // 修改
  edit = ({ selectedRows }) => {
    console.log('selectedRows', selectedRows);
    this.props.push('/salesCenter/ouDatas/edit/edit/' + selectedRows[0].custCode);
  };

  //新增
  create = () => {
    console.log('selectedRows');
    this.props.push('/salesCenter/ouDatas/add/add');
  }

  //操作按钮
  // handleClick = (keys, type) => {
  //   switch (type) {
  //     case 'add':
  //       return (
  //         this.props.history.push({
  //           pathname: '/salesCenter/ouDatas/add/add'
  //         })
  //       )
  //     case 'edit':
  //       return (
  //         this.props.history.push({
  //           pathname: `/salesCenter/ouDatas/edit/edit/${keys[0]}`
  //         })
  //       )
  //     case 'sure':
  //       return this.sure(keys, 'ACTIVE')
  //     case 'stop':
  //       return this.sure(keys, 'CLOSING')
  //     case 'forceStop':
  //       return this.sure(keys, 'CLOSED')
  //   }
  // }
  //确认
  sure = async (ids, ouStatus) => {
    console.log(ids, ouStatus, 'ids, ouStatus')
    const res = await service.updateOrgBuStatus({ ids, ouStatus });
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  }

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
          // actionButtons={getTableActionButtons(this.handleClick)}
          actionButtons={getTableActionButtons(
            this.create,
            this.edit,
            this.onImport
          )}
          tableProxy={{
            request: async (paramData) => {
              const datas = {
                ...paramData,
                // 查询时间到日就可以。
                // registerDate: paramData.registerDate && dayjs(paramData?.registerDate).format('YYYY-MM-DD'), //注册日期
                // 根据订单日期倒序排序
                orders: [
                  {
                    asc: false,
                    column: 'createTime'
                  }
                ],
                // keyword: 'KH'
              };
              return service.getOuDataList(datas)
            },
            successCallBack: (tableRef) => {
              console.log(tableRef, 'tableRef')
              // dataSource
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
          downTemplateFileName='批发客户导入模板'
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
