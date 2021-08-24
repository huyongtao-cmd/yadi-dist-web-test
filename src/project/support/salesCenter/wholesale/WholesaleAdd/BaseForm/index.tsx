import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
class BaseForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <ElForm formProps={{ items: getFormItems() }} />;
  }
}

export default BaseForm;
