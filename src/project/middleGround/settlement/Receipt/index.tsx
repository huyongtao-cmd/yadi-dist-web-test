import React from 'react';
import { Modal, Input } from 'antd'
import { ElNotification, ElSearchTable } from '@/components/el';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils'; // 导出
import { approved, rejected, pending, search } from './service';

interface Props {
  // history: any;
  // location: any;
}

interface State {
  areaValue: string;
  searchParams: object;
  // tableRef: any;
}
class ReceStatement extends React.Component<Props, State> {
  tableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      areaValue: '',
      searchParams: {},
    };
  }

  /* 
 *审核通过
 */
  handleApprovePass = async (rowKeys, rows) => {
    if (!(rows[0].state === 'DRAFT' || rows[0].state === 'PENDING')) {
      return ElNotification({
        type: 'warning',
        message: '请选择<状态>为【待审批】的单据！'
      });
    }
    const res = await approved(rowKeys)
    if (res && res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      })
      this.tableRef.getTableData()
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      })
    }
  }


  // 点击审核拒绝
  handleApproveRefused = async (rowKeys, rows) => {
    if (!(rows[0].state === 'DRAFT' || rows[0].state === 'PENDING')) {
      return ElNotification({
        type: 'warning',
        message: '请选择<状态>为【待审批】的单据！'
      });
    }
    const { TextArea } = Input
    Modal.confirm({
      width: 500,
      maskClosable: true,
      centered: true,
      title: '审批拒绝理由',
      onOk: (cl,e) => this.refused(e, rowKeys),
      onCancel: () => { return },
      content: (
        <TextArea
          onChange={this.areaChange}
          autoSize={{ minRows: 8, maxRows: 10 }}
          // value={areaValue}
          placeholder='请输入理由（一百个字以内）'
        />
      ),
      cancelText: '取消',
      okText: '确认'
    });
  }
  // 审批拒绝确认
  async refused(e, rowKeys) {
    if (!this.state.areaValue) {
      ElNotification({
        type: 'warning',
        message: '请填写拒绝理由'
      })
      e.preventDefault()
    }else if(this.state.areaValue.length>100){
      ElNotification({
        type: 'warning',
        message: '拒绝理由超过一百个字'
      })
      e.preventDefault()
    } else {
      const params = { ids: rowKeys, reason: this.state.areaValue }
      const res = await rejected(params)
      if (res && res.success) {
        ElNotification({
          type: 'success',
          message: res.msg || '操作成功'
        })
        this.tableRef.getTableData()
      } else {
        ElNotification({
          type: 'error',
          message: res.msg || '操作失败'
        })
      }
    }
  }
  areaChange = ({ target: { value } }) => {
    this.setState({ areaValue: value });
  };

  // 时间日期处理方法（处理成hh:mm:ss)
  handleValidRange = (data) => {
    return {
      startTime:
        data.startTime &&
        data.startTime[0] &&
        dayjs(data.startTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime:
        data.startTime &&
        data.startTime[1] &&
        dayjs(data.startTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      flowHookDateS:
        data.flowHookDate &&
        data.flowHookDate[0] &&
        dayjs(data.flowHookDate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      flowHookDateE:
        data.flowHookDate &&
        data.flowHookDate[1] &&
        dayjs(data.flowHookDate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      // flowHookTimeS:
      //   data.flowHookTime &&
      //   data.flowHookTime[0] &&
      //   dayjs(data.flowHookTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      // flowHookTimeE:
      //   data.flowHookTime &&
      //   data.flowHookTime[1] &&
      //   dayjs(data.flowHookTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    }
  }
  // 导出
  handleExport = (rowKeys) => {
    const {searchParams:params} = this.state
    commonExport({
      url: '/yst-fin/sal/receiveSettle/export',
      params,
      fileName: '收款结算单'
    });
  }
  // 暂挂
  handlePending = async (rowKeys) => {
    const res = await pending(rowKeys)
    if (res && res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      })
      this.tableRef.getTableData()
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      })
    }
  }

  render() {
    return (<>
      <ElSearchTable
        id='ReceiptStatement'
        tableId='fin_sale_ReceiptStatementList'
        rowKey='id'
        bordered
        onRef={(ref) => (this.tableRef = ref)}
        scroll={{ x: 'max-content', }}
        tableProxy={{
          request: async (paramData) => {
            const params = {
              orders: [{ asc: false, column: "createTime" }],
              ...paramData,
              settleEntityId: paramData.settleEntityId?.id,
              settleOrgId: paramData.settleOrgId?.id,
              settleType: paramData.settleType?.settleTypeCode,
              contactId: paramData.contactId?.id,
              salesManId: paramData.salesManId?.id,
              ...this.handleValidRange(paramData)
            }
            this.setState({searchParams: params})
            return search(params)
          },
          successCallBack: (tableRef) => { },
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
        columns={getTableColumns({ that: this })}
        actionButtons={
          getTableActionButtons({
            handleApprovePass: this.handleApprovePass,
            handleApproveRefused: this.handleApproveRefused,
            handleExport: this.handleExport,
            handlePending: this.handlePending,
          })
        }
      />

    </>)
  }
}

export default ReceStatement;