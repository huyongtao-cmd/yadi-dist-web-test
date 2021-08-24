// 客户信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  onRef: Function;
  formData3: { [key: string]: any };
  formRef: any;
  editTableRef: any;
  handleLoading: any;
  clientFormRef: any
}
class ClientForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    console.log(this.props.formData3, 'formData3')
  }

  componentDidMount() { }

  // onValuesChange = async (changedFields) => {
  //   console.log(changedFields, 'changedFields')
  //   if (changedFields.custCode) {
  //     this.props.formRef.setFieldsValue({
  //       cont_person: changedFields.custCode.orgAddrAddressVos[0].cont_person, // 联系人
  //       tel: changedFields.custCode.orgAddrAddressVos[0].tel, // 联系电话
  //       detailAddr: changedFields.custCode.orgAddrAddressVos[0].detailAddr, // 送货地址
  //     });
  //     // this.props.orderTableRef.clearRows();
  //   }
  // };
  onValuesChange = async (changedFields) => {
    console.log(changedFields, 'changedFields????')
    // if (data.orgAddrAddressVos && data.orgAddrAddressVos != null && data.orgAddrAddressVos[0]) {
    if (changedFields.custCode && changedFields.custCode.orgAddrAddressVos && changedFields.custCode.orgAddrAddressVos != null && changedFields.custCode.orgAddrAddressVos.length > 0) {
      this.props.formRef.setFieldsValue({
        contPerson: changedFields.custCode?.orgAddrAddressVos[0].contPerson, // 联系人
        tel: changedFields.custCode?.orgAddrAddressVos[0].tel, // 联系电话
        detailAddr: changedFields.custCode?.orgAddrAddressVos[0].detailAddr, // 送货地址
      });
      // this.props.orderTableRef.clearRows();
    }
  };


  render() {
    return (
      <ElForm
        data={this.props.formData3}
        // data={this.props.data}
        onRef={this.props.onRef}
        formProps={{ items: getFormItems(), onValuesChange: this.onValuesChange }}
      />
    );
  }
}

export default ClientForm;
