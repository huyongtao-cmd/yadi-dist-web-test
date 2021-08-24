import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
import * as service from '../../service';
import {
  ElNotification
} from '@/components/el';

interface Props {
  onRef: Function;
  formRef: any;
  editTableRef: any;
  formData: Object;
  setAddr: any;
  loading: any;
  addrTableRef: any;
}

class BaseForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  onValuesChange = async (changedFields) => {
    console.log('onValuesChange', changedFields);
    if (changedFields.buId) {
      this.props.addrTableRef?.addressTableRef.clearRows();
      console.log(this.props.setAddr);
      this.props.loading(true);
      console.log(this.props.addrTableRef,'addrTableRefaddrTableRefaddrTableRef');
      const res = await service.findAddr(changedFields.buId?.id);
      this.props.loading(false);
      if(res.success){
        const addrDataSource = res.data.orgAddrDetailVO?.orgAddrAddressVos?.map((item)=>{
          const regionNames = [];
          if (item.province) { regionNames.push({ label: item.provinceName, value: item.province }) }
          if (item.city) { regionNames.push({ label: item.cityName, value: item.city }) }
          if (item.county) { regionNames.push({ label: item.countyName, value: item.county }) }
          return {
            ...item,
            addressTypeNames:{
              udcVal: item.addressType,
              valDesc: item.addressTypeName
            },
            regionNames: regionNames
          }
        });
        this.props.addrTableRef?.addressTableRef.addRows(addrDataSource);
      }else{
        ElNotification({
          type: 'error',
          message: res.msg || res.data || '操作失败！'
        });
      }
    }
  };
  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        formProps={{
          onValuesChange: this.onValuesChange,
          items: getFormItems()
        }}
        data={this.props.formData}
      />
    );
  }
}

export default BaseForm;
