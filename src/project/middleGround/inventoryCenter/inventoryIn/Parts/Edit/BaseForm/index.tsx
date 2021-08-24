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
  handwarehousingFlag: any;
  showWarehousing: any;
  whList: any;
}
class PresetForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      areaRef: null
    };
  }


  componentDidMount() { }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.whList) === JSON.stringify(prevProps.whList)) {
      return false;
    }
    this.state.areaRef && this.state.areaRef.setList(this.props.whList);
    return true
  }

  onValuesChange = async (changedFields) => {
    // console.log(changedFields, '.suppId2222');
    if (changedFields.suppId) {
      console.log(changedFields.suppId, 'changedFields.suppIdchangedFields.suppId');
      this.props.formRef.setFieldsValue({
        suppContactName: changedFields.suppId.invPicName,
        suppContactTel: changedFields.suppId.invTel,
        registerAddress: changedFields.suppId.registerAddress
      });
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
        buId: changedFields.buId,
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
        this.state.areaRef.setList(param);
        this.props.formRef.setFieldsValue({
          whId: param[0] && param[0].value
        });
      }
      // this.props.editTableRef.clearRows();
    }
    if (changedFields.flag) {
      if (changedFields.flag[0] === true) {
        this.props.handwarehousingFlag(true);
      } else {
        this.props.handwarehousingFlag(false);
      }
    }
  };

  areaRef = (ref) => {
    this.setState({
      areaRef: ref
    });
  };

  // onValuesChange = async(changedFields) => {
  //   console.log(changedFields,'changedFieldschangedFields');
  //   // if (changedFields.whId) {
  //   //   this.props.handleLoading(true);
  //   //   this.props.formRef.setFieldsValue({
  //   //     whLoc: ''
  //   //   });
  //   //   const res = await service.findOneInvAj(changedFields.whId);
  //   //   this.props.handleLoading(false);
  //   //   if(res.success){
  //   //     const param = res.data.ydInvWhAreaRespList?.map((item)=>{
  //   //       if( item.areaStatus === 'ACTIVE' ){
  //   //         return {
  //   //            value:item.id,
  //   //            label:item.areaCode
  //   //           //  ...item
  //   //         }
  //   //       }
  //   //     }).filter(Boolean);
  //   //     this.state.areaRef.setList(param);
  //   //   }
  //   //   // this.props.editTableRef.clearRows();
  //   // }
  // };

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.areaRef, this.props.type, this.props.showWarehousing),
          onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default PresetForm;
