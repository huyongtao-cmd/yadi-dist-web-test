//顾客信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
class CustomerForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ElForm
        data={this.props.data}
        formProps={{ items: getFormItems() }}
        onRef={this.props.onRef}
      />
    );
  }
}

export default CustomerForm;
