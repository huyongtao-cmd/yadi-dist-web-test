//基本信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  flags: Boolean;
  handleChangeRequired: Function;
  data: any;
  onRef: any;
  areaRef: any;
  whRef: any;
  empList: any;
  onValuesChange: any;
}

class BaseForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  // 选择参保方式为不参保时，证件类型和证件号码不为必填，年龄段为必填
  handleChangeEs1 = (value) => {
    console.log(value, 'valuevaluevaluevalue');
    if (value === 'D') {
      this.props.handleChangeRequired(false);
    } else {
      this.props.handleChangeRequired(true);
    }
  }

  render() {
    return (
      <ElForm
        data={this.props.data}
        onRef={this.props.onRef}
        formProps={{
          items: getFormItems(this.props?.whRef, this.props.flags, this.props.empList, this.handleChangeEs1),
          onValuesChange: this.props.onValuesChange
        }}
      />
    );
  }
}

export default BaseForm;
