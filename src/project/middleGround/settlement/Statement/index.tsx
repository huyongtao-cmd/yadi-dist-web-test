// 采购结算单
import React from 'react';
import { ElNotification, ElSearchTable } from '@/components/el';
import { Spin } from 'antd';
import Modal from './Modal/index';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { getList, approved, rejected, review, pending } from './service';
import * as service from './service';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils'; // 导出
interface Props {
  // history: any;
  // location: any;
  formRef: any; //表单的ref
}

interface State {
  tableRef: any;
  modalVisible: Boolean;
  mark: String;
  data: any;
  formRef: any; //表单的ref
  loading: boolean;
  payModalExtraData: any;
}
class PurcStatement extends React.Component<Props, State> {
  tableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      mark: 'generate',
      modalVisible: false,
      data: null,
      formRef: null, //表单的ref
      loading: false,
      payModalExtraData: {}
    };
  }

  //审核通过
  handleApprovePass = async (selectedRowKeys) => {
    const res = await approved(selectedRowKeys);
    if (res && res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };
  //  复核
  // handleReview = async (selectedRowKeys) => {
  //   console.log('复核', selectedRowKeys, 'review');
  //   const res = await review(selectedRowKeys);
  //   if (res && res.success) {
  //     ElNotification({
  //       type: 'success',
  //       message: res.msg || '操作成功'
  //     });
  //     this.tableRef.getTableData();
  //   } else {
  //     ElNotification({
  //       type: 'error',
  //       message: res.msg || '操作失败'
  //     });
  //   }
  // };
  // 生成付款单
  handlePushPayment = async (keys, rows, type) => {
    // if(rows.state === 'APPROVED'){
    const selectedRow = this.tableRef.getSelectionData().selectedRows[0];
    const res = await service.getCanPayAmount(selectedRow.id); // 接口验证可推付金额，有就弹框，没有就不弹框
    if (res && res.success) {
      const paymentAmount = res.data;
      const canPayAmount = parseInt(paymentAmount).toFixed(2);
      this.setState({
        modalVisible: true,
        data: {}, // 给组件传默认值
        mark: 'generate',
        payModalExtraData: {
          settleEntityAddrNo: selectedRow.settleEntityAddrNo, // 我方银行账号 weAccount,
          contactAddrNo: selectedRow.contactAddrNo, // 收款开户行地址号
          canPayAmount // 可推付款金额
        }
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
      return false;
    }
  };

  // 审核拒绝
  handleApproveRefused = async (rows) => {
    const res = await rejected(rows);
    if (res && res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };

  // 时间日期处理方法（处理成hh:mm:ss)
  handleValidRange = (data) => {
    return {
      startTime:
        (data.dataTime && data.dataTime[0] &&
          dayjs(data.dataTime[0]).format('YYYY-MM-DD 00:00:00')) ||
        undefined, //日期
      endTime:
        (data.dataTime && data.dataTime[1] &&
          dayjs(data.dataTime[1]).format('YYYY-MM-DD 23:59:59')) ||
        undefined, //日期
      dataTime: undefined
    };
  };
  // 导出
  handleExport = (...[, paramData]) => {
    // const paramData = this.tableRef.getFormRef().getFieldsValue();
    const params = {
      orders: [{ asc: false, column: 'createTime' }],
      ...paramData,
      settleEntityId: paramData.settleEntityId?.id,
      settleTypeCode: paramData.settleTypeCode?.settleTypeCode,
      contactId: paramData.contactId?.id,
      ...this.handleValidRange(paramData) // 时间处理
    };
    console.log(params);
    commonExport({
      url: '/yst-fin/fin/purSettle/export',
      params,
      fileName: '采购结算单'
    });
  };

  // form表单ref
  formRef = (ref) => {
    this.setState({
      formRef: ref
    });
  };
  // 关闭新增弹窗
  closeModal = () => {
    this.setState({ modalVisible: false });
    this.state.formRef.resetFields(); // 清空数据
  };
  save = async () => {
    const { formRef, mark } = this.state;
    // 表单验证
    await formRef.validateFields().catch((info) => {
      ElNotification({
        type: 'warning',
        message: '请检查必填项！'
      });
      return Promise.reject();
    });
    const fieldsValue = formRef.getFieldsValue();
    const selectedRow = this.tableRef.getSelectionData().selectedRows[0];
    if (mark == 'generate') {
      // 编辑
      let paramsEdit = {
        account: fieldsValue.account,
        accountName: fieldsValue.accountName,
        payType: fieldsValue.payType, // 付款方式
        purSettleId: selectedRow.id,
        remark: fieldsValue.remark,
        totalAmount: fieldsValue.totalAmount,
        weAccount: fieldsValue.weAccount.bankAcc, // 我方银行账号
        weAccountName: fieldsValue.weAccountName // 我方银行账户
      };
      const res = await service.getProcurementStatement(paramsEdit);
      if (res.success) {
        ElNotification({ type: 'success', message: res.msg });
        this.setState({
          modalVisible: false
        });
        formRef.resetFields(); // 清空数据
        this.state.tableRef.getTableData();
      } else {
        ElNotification({
          type: 'error',
          message: res.msg || res.data || '操作失败！'
        });
      }
    }
  };
  render() {
    const { modalVisible, loading, mark, formRef, data, payModalExtraData } =
      this.state;
    return (
      <div>
        <Spin spinning={loading}>
          <ElSearchTable
            id='purcStatement'
            tableId='fin_purc_statementList'
            rowKey='id'
            bordered
            onRef={(ref) => (this.tableRef = ref)}
            scroll={{ x: 'max-content' }}
            tableProxy={{
              request: async (paramData) => {
                if (paramData.dataTime == undefined || paramData.dataTime[0] == '' || paramData.dataTime[0] == undefined && paramData.dataTime[1] == '' || paramData.dataTime[1] == undefined) {
                  ElNotification({
                    type: 'error',
                    message: '请选择业务日期！'
                  });
                  // return Promise.reject();
                }
                else {
                  const params = {
                    orders: [{ asc: false, column: 'createTime' }],
                    ...paramData,
                    settleEntityId: paramData.settleEntityId?.id,
                    settleTypeCode: paramData.settleTypeCode?.settleTypeCode,
                    contactId: paramData.contactId?.id,
                    ...this.handleValidRange(paramData) // 时间处理
                  };
                  return getList(params);
                }
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
            actionButtons={getTableActionButtons({
              handleApprovePass: this.handleApprovePass,
              handlePushPayment: this.handlePushPayment,
              handleApproveRefused: this.handleApproveRefused,
              // handleReview: this.handleReview, // 复核先隐藏
              handleExport: this.handleExport
            })}
            defaultSearchData={{
              dataTime: [
                dayjs().startOf('month').format('YYYY-MM-DD'),
                dayjs().endOf('month').format('YYYY-MM-DD')
              ]
            }}
          />
          {/* 生成付款单弹框 */}
          <Modal
            modalVisible={modalVisible}
            closeModal={this.closeModal}
            save={this.save}
            onRef={this.formRef}
            data={data}
            mark={mark}
            extraData={payModalExtraData}
          ></Modal>
        </Spin>
      </div>
    );
  }
}

export default PurcStatement;
