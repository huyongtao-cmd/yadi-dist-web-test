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

  onValuesChange = (changedFields) => {
    if (changedFields.docNo) {
      // todo
      // this.props.formRef.setFieldsValue({
      //   currAmt: 8.01,
      //   currName: 'RMB',
      //   currNetAmt: 7.09,
      //   ouName: '上海慎昌贸易有限公司',
      //   suppName: '大昌行食品(上海)有限公司'
      // });
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
