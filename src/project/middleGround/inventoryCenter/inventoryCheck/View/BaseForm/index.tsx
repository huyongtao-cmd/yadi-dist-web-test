import React from 'react';
import { ElForm } from '@/components/el';
import { getFormItems } from './config';

interface Props {
  formData: Object;
}

class CheckBaseFormView extends React.Component<Props>{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ElForm
        data={this.props.formData}
        formProps={{ items: getFormItems() }}
      />
    );
  }
}

export default CheckBaseFormView;