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
      areaRef: null
    };
  }


  componentDidMount() { }

  onValuesChange = async (changedFields) => {
    if (changedFields.suppId) {
      console.log(changedFields.suppId, 'changedFields.suppIdchangedFields.suppId');
      this.props.formRef.setFieldsValue({
        suppContactName: changedFields.suppId.invPicName,
        suppContactTel: changedFields.suppId.invTel,
        registerAddress: changedFields.suppId.registerAddress
      });
      this.props.editTableRef.clearRows();
    }
    if (changedFields.whId) {
      this.props.editTableRef.clearRows();
    }
    if (changedFields.buId) {
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
        buId: changedFields.buId
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
      // this.props.editTableRef.clearRows();
    }
  };


  areaRef = (ref) => {
    this.setState({
      areaRef: ref
    });
  };

  // onValuesChange = (changedFields) => {
  //   if (changedFields.docNo) {
  //     todo
  //     this.props.formRef.setFieldsValue({
  //       currAmt: 8.01,
  //       currName: 'RMB',
  //       currNetAmt: 7.09,
  //       ouName: '上海慎昌贸易有限公司',
  //       suppName: '大昌行食品(上海)有限公司'
  //     });
  //     this.props.editTableRef.clearRows();
  //   }
  // };

  render() {
    return (
      // <ElForm
      //   onRef={this.props.onRef}
      //   data={this.props.formData}
      //   formProps={{
      //     items: getFormItems(),
      //     // onValuesChange: this.onValuesChange
      //   }}
      // />
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
