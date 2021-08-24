import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
interface Props {
  formData: { [key: string]: any };
}
class PresetForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    return (
      <ElForm
        data={this.props.formData}
        formProps={{ items: getFormItems() }}
      />
    );
  }
}

export default PresetForm;
