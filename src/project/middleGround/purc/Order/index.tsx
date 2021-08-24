// 采购订单查询页面
import React from 'react';
import { ElNotification, ElPage, ElSearchTable } from '@/components/el';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { history, push } from 'react-router-dom';
import * as service from './service';
import AuthMobx from '@/store/auth';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils';
import { observer } from 'mobx-react';
interface Props {
  history: history;
  push: push;
}
interface State {
  tableRef: any;
  pageLoading: boolean;
  whRef: any;
}
@observer
class Order extends React.Component<Props, State> {
  authMobx: any;
  constructor(props) {
    super(props);
    this.authMobx = AuthMobx;
    this.state = {
      tableRef: null,
      pageLoading: false,
      whRef: null,
    };
  }

  componentDidMount() { }

  onRef = (ref) => {
    this.setState({ tableRef: ref });
  };
  handleValidRange = (data) => ({
    suppIds: data.suppIdList && data.suppIdList.map((item) => item.id),
    // createUserId: data.createUserId && data.createUserId.id,
    docTime: undefined,
    docTimeFrom:
      data.docTime &&
      data.docTime[0] &&
      dayjs(data.docTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    docTimeTo:
      data.docTime &&
      data.docTime[1] &&
      dayjs(data.docTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
  });
  request = (paramData) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    return service.search({
      ...paramData,
      storeIds,
      orders: [{ asc: false, column: 'createTime' }],
      ...this.handleValidRange(paramData)
    });
  };

  //同步订单
  handleSync = () => {
    console.log('同步订单');
  };

  //采购订单导出
  handleExport = (a, b, page) => {
    const data = {
      ...b,
      size: page.pageSize,
      current: page.current
    }
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    commonExport({
      url: '/yd-pur/pur/purPo/exportPurPoList',
      params: {
        ...data,
        storeIds,
        orders: [{ asc: false, column: 'createTime' }],
        ...this.handleValidRange(data)
      },
      fileName: '采购订单导出'
    });
  };

  //新增
  handleAdd = () => {
    this.props.push('/purc/order/index/create');
  }

  //编辑
  handleEdit = ({ selectedRows }) => {
    if (selectedRows[0].docStatus === '2' || selectedRows[0].docStatus === '1') {
      this.props.push('/purc/order/index/edit/' + selectedRows[0].id);
    } else {
      ElNotification({
        type: 'warning',
        message: '当前单据不可以编辑，请检查！'
      });
    }
  }

  handleIn = ({ selectedRows }) => {
    if (selectedRows[0].docStatus === '1' || selectedRows[0].docStatus === '2' || selectedRows[0].docStatus === '3') {
      // this.props.history.push(`/inventory/inventoryin/item/purcOrder/${selectedRows[0].id}`);
      this.props.push(`/inventory/inventoryin/item/purcOrder/${selectedRows[0].docNo}`);
    } else {
      ElNotification({
        type: 'warning',
        message: '只有草稿、未入库、部分入库的单据可以入库，请检查！'
      });
    }
  }

  //仓库下拉ref
  whRef = (ref) => {
    this.setState({
      whRef: ref
    });
  };

  //查询仓库下拉
  onSelectChange = async (value) => {
    this.state.tableRef.setSearchFormData({
      whIds: []
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
      this.state.whRef.setList(param);
    }
  }

  tableProxy = () => ({
    request: this.request,
    errCallBack: (res) => {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    },
    props: {
      success: 'success',
      result: 'data.records',
      total: 'data.total'
    },
    autoLoad: true
  });

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElSearchTable
          bordered
          rowKey='id'
          onRef={this.onRef}
          scroll={{ x: 'max-content', y: 550 }}
          tableProxy={this.tableProxy()}
          searchFormProps={{ items: getTableSearchFormItems(this.whRef, this.onSelectChange) }}
          columns={getTableColumns(this)}
          actionButtons={getTableActionButtons(
            this.handleAdd,
            this.handleSync,
            this.handleExport,
            this.handleIn,
            this.handleEdit
          )}
        />
      </ElPage>
    );
  }
}

export default Order;
