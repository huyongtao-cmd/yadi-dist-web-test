// 生成付款单弹框
import React from 'react';
import { Modal } from 'antd';
import { ElForm } from '@/components/el';
import { getFormItems } from './config';
import * as service from './service'
class EditModal extends React.Component<any, any> {
  formOnRef = null;
  extraData: any = {};
  constructor(props) {
    super(props);
    this.state = {
      userModalloading: false,
      data: {},
    };
  }
  componentDidUpdate() {
    if (this.props.modalVisible) {
      const extraData = this.props.extraData;
      this.extraData = extraData;
      if (extraData?.settleEntityAddrNo)
        this.setWeDefaultAccount(extraData.settleEntityAddrNo);
      if (extraData?.contactAddrNo)
        this.setDefaultAccount(extraData.contactAddrNo);
      if (extraData?.canPayAmount)
        this.setCanPayAmount(extraData.canPayAmount);
    }
  }

  /**
   * 设置我方银行信息
   */
  setWeDefaultAccount = async (addrNo) => {
    const params = {
      "accType": "OUT",
      "addrNo": addrNo,
      "current": 0,
      "defaultFlag": true,
      "orders": [
        {
          "asc": true,
          "column": "createTime"
        }
      ],
      "size": 1
    }
    const result = await service.getBankInfo(params);
    if (result && result.success) {
      const record = result?.data?.records?.[0];
      if (record) {
        this.formOnRef?.setFieldsValue({
          weAccount: record,//因为组件内部的原因  所以这个字段应该设置为本行 而不是一个字符串否则 getFieldsValue会有问题
          weAccountName: record.bankName
        });
      }
    }
  }

  /**
  * 设置对方银行信息
  */
  setDefaultAccount = async (addrNo) => {
    const params = {
      "addrNo": addrNo,
      "current": 0,
      "defaultFlag": true,
      "orders": [
        {
          "asc": true,
          "column": "createTime"
        }
      ],
      "size": 1
    }
    const result = await service.getBankInfo(params);
    if (result && result.success) {
      const record = result?.data?.records?.[0];
      if (record) {
        this.formOnRef?.setFieldsValue({
          account: record.bankAcc,
          accountName: record.bankName
        });
      }
    }
  }
  setCanPayAmount = async (canPayAmount) => {
    this.formOnRef?.setFieldsValue({
      canPayAmount,
      totalAmount: 0
    })
  }

  // 点击带出银行信息
  onValuesChange = async (changedFields) => {
    if ('weAccount' in changedFields) { // 我方银行账号
      let weAccountName = '';
      if (changedFields.weAccount) {
        weAccountName = changedFields.weAccount.bankName
      }
      this.formOnRef.setFieldsValue({
        weAccountName
      });
    }
  };
  render() {
    const { modalVisible, save, closeModal, onRef, data, mark } = this.props;
    return (
      <Modal
        title= '生成付款单'
        okText='保存'
        visible={modalVisible}
        onOk={save}
        onCancel={closeModal}
        keyboard={true}
        okButtonProps={{
          loading: this.state.userModalloading
        }}
      >
        <ElForm
          onRef={(form) => {
            this.formOnRef = form;
            this.props.onRef(form)
          }}
          data={data}
          formProps={{
            items: getFormItems(this.props.data, this.props.mark, this, this.extraData),
            onValuesChange: this.onValuesChange,
            labelCol: { span: 6 },
            wrapperCol: { span: 19 }
          }}
        />
      </Modal>
    );
  }
}

export default EditModal;
