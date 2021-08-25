// 库存调拨查询
import React from 'react';
import { ElSearchTable, ElNotification, ElPage } from '@/components/el';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { commonExport } from '@/utils/utils';
import dayjs from 'dayjs';
import * as service from './service';

class Transfer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      pageLoading: false
    };
  }
  beforeRequest = (formData) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const docTimeFrom = formData.ioDate &&
      formData.ioDate[0] &&
      dayjs(formData.ioDate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const docTimeTo = formData.ioDate &&
      formData.ioDate[1] &&
      dayjs(formData.ioDate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    let params = {
      ...formData,
      storeIds,
      orders: [{ asc: false, column: 'invTrnDO.createTime' }],
      ioDate: undefined,
      ioDates: formData.ioDate && formData.ioDate[0] && formData.ioDate[1] ? [docTimeFrom, docTimeTo] : undefined
    };
    return params;
  };

  //查询出库仓库下拉
  outSelectChange = async (value) => {
    this.state.tableRef.setSearchFormData({
      oWhId: []
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
      const param = res.data?.records?.map((item) => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
          }
        }
      }).filter(Boolean);
      this.state.oWhRef.setList(param);
    }
  }

  //查询入库仓库下拉
  inSelectChange = async (value) => {
    this.state.tableRef.setSearchFormData({
      iWhId: []
    })
    const buIdList = JSON.parse(localStorage.getItem('inBuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      storeIds,
      buId: value
    }
    const res = await service.findOneInv(data);
    if (res.success) {
      const param = res.data?.records?.map((item) => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
          }
        }
      }).filter(Boolean);
      this.state.iWhRef.setList(param);
    }
  }

  //出库仓库下拉ref
  oWhRef = (ref) => {
    this.setState({
      oWhRef: ref
    });
  };

  //入库仓库下拉ref
  iWhRef = (ref) => {
    this.setState({
      iWhRef: ref
    });
  };

  //确认
  confirm = async ({ selectedRows }) => {
    if (selectedRows[0] && selectedRows[0].es1 !== '1') {
      ElNotification({
        type: 'warning',
        message: '当前用户不可确认调拨单！'
      });
      return;
    }
    if (selectedRows[0] && selectedRows[0].docStatus === 'A') {
      this.setState({ pageLoading: true })
      const res = await service.confirm(selectedRows[0] && selectedRows[0].id);
      if (res.success) {
        this.state.tableRef.getTableData();
        this.setState({ pageLoading: false })
        ElNotification({
          type: 'success',
          message: res.msg || '操作成功'
        });
      } else {
        this.setState({ pageLoading: false })
        ElNotification({
          type: 'error',
          message: res.data || res.msg || '操作失败'
        });
      }
    } else {
      ElNotification({
        type: 'warning',
        message: '只有待确认的单据可以确认，请检查！'
      });
    }
  }

  //新增
  create = () => {
    this.props.push('/inventory/inventorytransfer/create')
  }
  //导出
  exports = (a, b, page) => {
    const data = {
      ...b,
      size: page.pageSize,
      current: page.current
    }
    commonExport({
      url: '/yd-inv/inv/invtrn/downloadTrn',
      params: this.beforeRequest(data),
      fileName: '库存调拨查询导出'
    });
  };
  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElSearchTable
          bordered
          rowKey='id'
          scroll={{ x: 'max-content' }}  // width:max-content表示采用内部元素宽度值最大的那个元素的宽度作为最终容器的宽度。如果出现文本，则相当于文本不换行
          onRef={(tableRef) => {
            this.setState({
              tableRef: tableRef
            });
          }}
          tableProxy={{
            request: async (paramData) => {
              console.log('查询参数', paramData);
              return service.search(this.beforeRequest(paramData));
            },
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
          searchFormProps={{ items: getTableSearchFormItems(this.oWhRef, this.iWhRef, this.outSelectChange, this.inSelectChange) }}
          columns={getTableColumns(this)}
          actionButtons={getTableActionButtons(this.create, this.confirm, this.exports)}
        />
      </ElPage>
    );
  }
}
export default Transfer;
