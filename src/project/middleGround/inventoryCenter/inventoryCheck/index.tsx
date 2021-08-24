import React from 'react';
import { history, push } from 'react-router-dom';
import { ElNotification, ElPage, ElSearchTable } from '@/components/el';
import { getTableActionButtons, getTableColumns, getTableSearchFormItems } from './config';
import * as service from './service';
import dayjs from 'dayjs';
import { Button, Modal } from 'antd';
import { commonExport } from '@/utils/utils';

interface Props {
  history: history;
  push: push;
}

interface State {
  pageLoading: boolean;
  tableRef: any;
  modalVisible: boolean;
  passLoading: boolean;
  refuseLoading: boolean;
}


class InventoryCheck extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: false,
      tableRef: null,
      modalVisible: false,
      passLoading: false,
      refuseLoading: false
    }
  }

  onRef = (tableRef) => {
    this.setState({
      tableRef
    })
  }

  // 新增
  create = () => {
    this.props.push('/inventory/inventoryCheck/create');
  }

  // 修改
  edit = ({ selectedRows }) => {
    if (selectedRows[0].docStatus === 'A') {
      this.props.push('/inventory/inventoryCheck/edit/' + selectedRows[0].id)
    } else {
      ElNotification({
        type: 'warning',
        message: '只有草稿状态下的单据可以修改，请检查！'
      });
    }
  }

  // 作废
  invalid = async ({ selectedRows, selectedRowKeys }) => {
    if (selectedRows[0].docStatus !== 'A') {
      ElNotification({
        type: 'warning',
        message: '只有草稿状态下的单据可以修改，请检查！'
      });
    } else {
      this.setState({ pageLoading: true })
      const res = await service.invalidById(selectedRowKeys[0]);
      this.setState({ pageLoading: false })
      if (res.success) {
        this.state.tableRef.refreshData();
        ElNotification({
          type: 'success',
          message: res.data || res.msg
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.data || res.msg
        });
      }
    }
    console.log(selectedRowKeys, 'selectedRowKeys');
  }

  // 审核
  approve = ({ selectedRows }) => {
    // 状态为待审核的单子可以审核
    if (selectedRows[0].docStatus === 'B') {
      this.setState({
        modalVisible: true
      })
    } else {
      ElNotification({
        type: 'warning',
        message: '只有待审核状态下的单据可以审核，请检查！'
      });
    }
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
      fileName: '库存盘点查询导出'
    });
  };

  // 库存调整
  invAdjust = () => {

  }

  beforeRequestParams = (params) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map(item => item.id);
    const param = {
      ...params,
      storeIds,
      // docMode: params.docMode === 'C' ? '' : params.docMode,
      orders: [{ asc: false, column: 'createTime' }],
      createTimeStart: params.createTime && params.createTime[0] && dayjs(params.createTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      createTimeEnd: params.createTime && params.createTime[1] && dayjs(params.createTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    };
    return param;
  }

  requset = (param) => {
    console.log(param, 'paramparamparamparamparamparam');
    return service.getList(this.beforeRequestParams(param));
  }

  // 审核取消
  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  // 审核通过
  handlePass = async () => {
    this.setState({
      passLoading: true,
    })
    console.log(this.state.tableRef, this.state.tableRef.getSelectionData()?.selectedRowKeys, '222');
    const id = this.state.tableRef.getSelectionData()?.selectedRowKeys[0];
    const res = await service.approvePass(id);
    this.setState({
      passLoading: false,
    });
    if (res?.success) {
      this.state.tableRef.refreshData();
      this.setState({
        modalVisible: false
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || ' 操作失败'
      });
    }
  }
  // 审核拒绝
  handleRefuse = async () => {
    this.setState({
      refuseLoading: true,
    })
    const id = this.state.tableRef.getSelectionData()?.selectedRowKeys[0];
    const res = await service.approveRefuse(id);
    this.setState({
      refuseLoading: false,
    });
    if (res?.success) {
      this.state.tableRef.refreshData();
      this.setState({
        modalVisible: false
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.data || ' 操作失败'
      });
    }
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    return (
      <ElPage spinning={!!this.state.pageLoading}>
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
              this.create,
              this.approve,
              this.edit,
              this.invalid,
              this.exports,
            )
          }
          searchFormProps={{
            items: getTableSearchFormItems()
          }}
          columns={getTableColumns(this)}
        />
        {
          this.state.modalVisible ? (
            <Modal
              width='40%'
              title='审核'
              visible={this.state.modalVisible}
              onCancel={this.closeModal}
              footer={
                [
                  <Button key='cancel' onClick={this.handleCancel} type='primary'>取消</Button>,
                  <Button key='pass' onClick={this.handlePass} type='primary' loading={this.state.passLoading}>审核通过</Button>,
                  <Button key='refuse' onClick={this.handleRefuse} type='primary' danger loading={this.state.refuseLoading}>审核拒绝</Button>,
                ]
              }
              destroyOnClose
            >
              是否通过审核？
            </Modal>
          ) : null
        }
      </ElPage>
    )
  }
}

export default InventoryCheck;