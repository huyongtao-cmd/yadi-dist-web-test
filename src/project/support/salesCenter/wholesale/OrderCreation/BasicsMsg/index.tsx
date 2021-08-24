//基本信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  onRef?: Function;
}

interface State {
  [key: string]: any;
}

class BaseForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <ElForm onRef={this.props.onRef} formProps={{ items: getFormItems() }} />
    );
  }
}

export default BaseForm;
