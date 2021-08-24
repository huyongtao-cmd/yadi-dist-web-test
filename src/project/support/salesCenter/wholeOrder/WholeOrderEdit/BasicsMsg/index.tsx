import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
import * as service from '../service';
interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  formRef: any;
  editTableRef: any;
}
class PresetForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      areaRef: null
    }
  }

  componentDidMount() { }
  // 点击客户查询时自动带出数据
  onValuesChange = async (changedFields) => {
    // console.log(changedFields, 'changedFields是什么');
    if (changedFields.storeId) {
      // this.props.handleLoading(true);
      this.props.formRef.setFieldsValue({
        whId: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        buId: changedFields.storeId,
        storeIds
      }
      const res = await service.findOneInv(data);
      // this.props.handleLoading(false);
      if (res.success) {
        const param = res.data.records?.map((item) => {
          if (item.whStatus === 'ACTIVE') {
            return {
              value: item.id,
              label: item.whName
            }
          }
        }).filter(Boolean);
        // console.log(this.state, 'this.state.areaRef');
        this.state.areaRef.setList(param);
      }
      // this.props.editTableRef.clearRows();
    }

    if (changedFields.custCode) {
      // console.log(changedFields.custCode,'changedFields.custCode');
      this.props.formRef.setFieldsValue({
        tel: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.tel, // 联系电话
        contPerson: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.contPerson, // 联系人
        detailAddr: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.detailAddr, // 联系地址
        recvAddrNo: changedFields.custCode?.addrNo, // 地址号
        custName: changedFields.custCode?.custName, // 二网名称
        // id:  changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.id,
      });
      this.props.editTableRef.clearRows();
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
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.areaRef),
          onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default PresetForm;
