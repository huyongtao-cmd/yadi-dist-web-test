//基本信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  data?: any;
  onRef?: Function;
  onValuesChange?: (changedValues: any, values: any) => void;
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
      <ElForm
        onRef={this.props.onRef}
        data={this.props.data}
        formProps={{
          items: getFormItems(),
          onValuesChange: this.props.onValuesChange
        }}
      />
    );
  }
}

export default BaseForm;
