//基本信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
import * as service from '../service';

interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  formRef: any;
  editTableRef: any;
  handleLoading: any;
  type: any;
  setdoctype: any;
  orderTableRef: any;
  // setorderTable: any;
}


class BaseForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      areaRef: null
    };
  }

  componentDidMount() { }

  onValuesChange = async (changedFields) => {
    if (changedFields.storeId) {
      this.props.handleLoading(true);
      this.props.formRef.setFieldsValue({
        whId: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        storeIds,
        buId: changedFields.storeId
      }
      const res = await service.findOneInv(data);
      this.props.handleLoading(false);
      if (res.success) {
        const param = res.data.records?.map((item) => {
          if (item.whStatus === 'ACTIVE') {
            return {
              value: item.id,
              label: item.whName
              //  ...item
            }
          }
        }).filter(Boolean);
        console.log(this.state, 'this.state.areaRef');
        this.state.areaRef.setList(param);
        this.props.formRef.setFieldsValue({
          whId: param[0] && param[0].value
        });
      }
    }

    if (changedFields.whId) {
      await this.props.orderTableRef.clearRows();
    }
    if (changedFields.docType) {
      this.props.setdoctype(changedFields.docType) // 传参给父组件
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
        data={this.props.formData}
        onRef={this.props.onRef}
        formProps={{
          items: getFormItems(this.areaRef),
          onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default BaseForm;
