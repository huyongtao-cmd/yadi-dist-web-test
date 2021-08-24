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
}
class PresetForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      oareaRef: null,
      iareaRef: null
    };
  }


  componentDidMount() { }

  onValuesChange = async (changedFields) => {
    const formData = this.props.formRef.getFieldsValue()
    //调出门店
    if (changedFields.oouId) {
      this.props.handleLoading(true);
      this.props.formRef.setFieldsValue({
        owhId: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        buId: changedFields.oouId,
        storeIds
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
        this.state.oareaRef.setList(param);
        this.props.formRef.setFieldsValue({
          owhId: param[0] && param[0].value
        });
        if (changedFields.oouId === formData.iouId || param[0] && param[0].value === formData.iwhId) {
          this.props.formRef.setFieldsValue({
            iouId: '',
            iwhId: ''
          });
        }
      }
      this.props.editTableRef.clearRows();
    }
    //调出仓库
    if (changedFields.owhId) {
      if (changedFields.owhId === formData.iwhId) {
        this.props.formRef.setFieldsValue({
          iouId: '',
          iwhId: ''
        });
      }
      this.props.editTableRef.clearRows();
    }
    //调入仓库
    if (changedFields.iwhId) {
      if (changedFields.iwhId === formData.owhId) {
        this.props.formRef.setFieldsValue({
          oouId: '',
          owhId: ''
        });
      }
      this.props.editTableRef.clearRows();
    }
    //调入门店
    if (changedFields.iouId) {
      this.props.handleLoading(true);
      this.props.formRef.setFieldsValue({
        iwhId: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('inBuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        buId: changedFields.iouId,
        storeIds
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
        this.state.iareaRef.setList(param);
        this.props.formRef.setFieldsValue({
          iwhId: param[0] && param[0].value
        });
        if (changedFields.iouId === formData.oouId || param[0] && param[0].value === formData.owhId) {
          this.props.formRef.setFieldsValue({
            oouId: '',
            owhId: ''
          });
        }
      }
      this.props.editTableRef.clearRows();
    }
  };

  //调出仓库下拉
  oareaRef = (ref) => {
    this.setState({
      oareaRef: ref
    });
  };

  //调入仓库下拉
  iareaRef = (ref) => {
    this.setState({
      iareaRef: ref
    });
  };

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.oareaRef, this.iareaRef),
          onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default PresetForm;
