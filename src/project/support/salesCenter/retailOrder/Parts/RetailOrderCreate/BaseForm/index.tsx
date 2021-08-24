//基本信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  flags: Boolean
}

class BaseForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    return (
      <ElForm
        data={this.props.data}
        onRef={this.props.onRef}
        formProps={{
          items: getFormItems(this.props?.whRef, this.props.flags, this.props.empList),
          onValuesChange: this.props.onValuesChange
        }}
      />
    );
  }
}

export default BaseForm;
