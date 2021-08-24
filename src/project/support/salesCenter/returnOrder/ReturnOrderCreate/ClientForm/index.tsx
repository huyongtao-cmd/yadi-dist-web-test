// 客户信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  formRef: any;
  editTableRef: any;
  handleLoading: any;
  clientFormRef: any
}
class ClientForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  onValuesChange = async (changedFields) => {
    console.log(changedFields, 'changedFields????')
    // if (data.orgAddrAddressVos && data.orgAddrAddressVos != null && data.orgAddrAddressVos[0]) {
    if (changedFields.custCode && changedFields.custCode.orgAddrDetailDTO && changedFields.custCode.orgAddrDetailDTO != null && changedFields.custCode.orgAddrDetailDTO.orgAddrAddressVos.length > 0) {
      this.props.formRef.setFieldsValue({
        contPerson: changedFields.custCode?.orgAddrDetailDTO.orgAddrAddressVos[0].contPerson, // 联系人
        tel: changedFields.custCode?.orgAddrDetailDTO.orgAddrAddressVos[0].tel, // 联系电话
        detailAddr: changedFields.custCode?.orgAddrDetailDTO.orgAddrAddressVos[0].detailAddr, // 送货地址
      });
      // this.props.orderTableRef.clearRows();
    }
  };

  render() {
    return (
      <ElForm
        data={this.props.data}
        onRef={this.props.onRef}
        formProps={{ items: getFormItems(), onValuesChange: this.onValuesChange }}
      />
    );
  }
}

export default ClientForm;
