/** 仓库调整 */
import React from 'react';
import { history, push } from 'react-router-dom';
import {
  ElSearchTable,
  ElPage,
  ElNotification
} from '@/components/el';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import * as service from './service';
interface Props {
  history: history;
  push: push;
}
interface State {
  tableRef: any;
  importModalRef: any;
  isModalShow: boolean;
  passLoading: boolean;
  refuseLoading: boolean;
  cancelLoading: boolean;
  adjustLoading: boolean;
  destoryLoading: boolean;
  selectedRows: Array<any>;
}
class Adjust extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      importModalRef: null,
      isModalShow: false,
      passLoading: false,
      refuseLoading: false,
      cancelLoading: false,
      adjustLoading: false,
      destoryLoading: false,
      selectedRows: []
    };
  }

  // 修改
  edit = ({ selectedRows }) => {
    // 2021年06月24  更改路由配置  把/inventory改为/mainData
    this.props.push('/mainData/warehousesetting/edit/' + selectedRows[0].id);
  };

  //新增
  create = () => {
    // 2021年06月24  更改路由配置  把/inventory改为/mainData
    this.props.push('/mainData/warehousesetting/create');
  }

  //更新状态
  update = async ({ selectedRows, selectedRowKeys }) => {
    console.log('更新', selectedRows);
    if (selectedRows[0].whStatus === 'ACTIVE') {
      console.log(selectedRowKeys);
      const data = {
        ids: [selectedRows[0] && selectedRows[0].id],
        whStatus: 'CLOSED'
      }
      const res = await service.updateStatus(data);
      if (res.success) {
        this.state.tableRef.getTableData();
        ElNotification({ type: 'success', message: '操作成功！' });
      } else {
        ElNotification({
          type: 'error',
          message: res.message || res.data || '操作失败！'
        });
      }
    } else {
      const data = {
        ids: [selectedRows[0] && selectedRows[0].id],
        whStatus: 'ACTIVE'
      }
      const res = await service.updateStatus(data);
      if (res.success) {
        this.state.tableRef.getTableData();
        ElNotification({ type: 'success', message: '操作成功！' });
      } else {
        ElNotification({
          type: 'error',
          message: res.message || res.data || '操作失败！'
        });
      }
    }
  };

  // 调转详情
  toDetail = (record) => {
    console.log('record', record);
    this.props.push('/inventory/inventoryAdjust/' + record?.id);
  };
  // 获取ref
  onRef = (tableRef) => {
    this.setState({
      tableRef
    });
  };

  // 分页查询之前数据处理
  beforeRequest = (formData) => {
    console.log('formData', formData);
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const param = {
      ...formData,
      storeIds,
      orders: [{ asc: false, column: 'createTime' }],
      // applyDates:
      //   formData.applyDate && formData.applyDate[0]
      //     ? [
      //         formData.applyDate &&
      //           formData.applyDate[0] &&
      //           formData.applyDate[0] + ' 00:00:00',
      //         formData.applyDate &&
      //           formData.applyDate[1] &&
      //           formData.applyDate[1] + ' 23:59:59'
      //       ]
      //     : undefined,
      // ioDates: formData.ioDate && [
      //   formData.ioDate &&
      //     formData.ioDate[0] &&
      //     formData.ioDate[0] + ' 00:00:00',
      //   formData.ioDate &&
      //     formData.ioDate[1] &&
      //     formData.ioDate[1] + ' 23:59:59'
      // ]
      // applyEmpId: formData?.applyEmpId?.map((val) => val.id),
      // relateDoc: formData?.relateDoc?.map((val) => val.docNo),
      // whIds: formData?.whIds?.map((val) => val.whId),
      // itemIds: formData?.itemIds?.map((val) => val.id)
    };
    return param;
  };
  // 分页请求
  request = (param) => {
    console.log(param);

    return service.getList(this.beforeRequest(param));
  };
  // // 分页查询失败回调
  // errCallBack = (res) => {
  //   console.log('res', res);
  //   ElNotification({
  //     type: 'error',
  //     message: res.msg || res.data || '操作失败！'
  //   });
  // };
  render() {
    return (
      <ElPage>
        <ElSearchTable
          rowKey='id'
          tableId='inventoryAdjust'
          onRef={this.onRef}
          scroll={{ x: 'max-content' }}
          tableProxy={{
            request: this.request,
            successCallBack: () => { },
            // errCallBack: this.errCallBack,
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          actionButtons={getTableActionButtons(
            this.create,
            this.edit,
            this.update,
          )}
          searchFormProps={{
            items: getTableSearchFormItems()
          }}
          columns={getTableColumns(this.toDetail)}
        />
      </ElPage>
    );
  }
}
export default Adjust;
