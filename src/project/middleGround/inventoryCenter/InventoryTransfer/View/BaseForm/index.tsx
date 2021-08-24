import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';

interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  formRef: any;
  editTableRef: any;
  handleLoading: any;
  type: any;
}
class PresetForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      areaRef: null
    };
  }

  componentDidMount() { }

  areaRef = (ref) => {
    this.setState({
      areaRef: ref
    });
  };

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.areaRef, this.props.type)
        }}
      />
    );
  }
}

export default PresetForm;
