//顾客信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
import dayjs from 'dayjs';

interface Props {
  onRef: Function;
  formData2: { [key: string]: any };
  formRef: any;
  editTableRef: any;
  handleLoading: any;
  customerFormRef: any;
  isLS: boolean;
}
class CustomerForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      areaRef: null
    };
  }

  componentDidMount() { }

  onValuesChange = async (changedFields) => {
    console.log(changedFields.custName, 'changedFields')
    if (changedFields.custName) {
      console.log(changedFields.custName, 'changedFields.suppIdchangedFields.suppId');
      // 带出来数据
      this.props.formRef.setFieldsValue({
        reprCertMobile: changedFields.custName.reprCertMobile,
        reprCertNo: changedFields.custName.reprCertNo,
        vipGender: changedFields.custName.vipGender,
        reprCertType: changedFields.custName.reprCertType,
        vipBirthDate: dayjs(changedFields.custName.vipBirthDate).format('YYYY-MM-DD HH:mm:ss'), //处理时间
        addrNo: changedFields.custName.addrNo,
      });
      // this.props.orderTableRef.clearRows();
    }
  };

  areaRef = (ref) => {
    this.setState({
      areaRef: ref
    });
  };

  render() {
    return (
      <ElForm
        data={this.props.formData2}
        onRef={this.props.onRef}
        formProps={{ items: getFormItems(this.areaRef, this.props.isLS), onValuesChange: this.onValuesChange }}
      />
    );
  }
}

export default CustomerForm;
