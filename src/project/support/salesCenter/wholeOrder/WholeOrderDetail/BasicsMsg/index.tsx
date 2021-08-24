import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  formRef: any;
  editTableRef: any;
}
class PresetForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  // 点击客户查询时自动带出数据
  onValuesChange = (changedFields) => {
    if (changedFields.custCode) {
      // console.log(changedFields.custCode,'changedFields.custCode');
      this.props.formRef.setFieldsValue({
        tel: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.tel, // 联系电话
        contPerson: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.contPerson, // 联系人
        detailAddr: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.detailAddr, // 联系地址
      });
      this.props.editTableRef.clearRows();
    }
  };

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(),
          onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default PresetForm;
