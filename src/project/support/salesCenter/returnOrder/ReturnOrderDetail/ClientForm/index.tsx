// 客户信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
class ClientForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ElForm
        data={this.props.data}
        onRef={this.props.onRef}
        formProps={{ items: getFormItems() }}
      />
    );
  }
}

export default ClientForm;
