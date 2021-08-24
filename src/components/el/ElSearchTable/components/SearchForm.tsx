import React from 'react';
import ElForm, { ElFormProps } from '@/components/el/ElForm';
interface Props {
  searchFormProps: ElFormProps;
  onRef: Function;
  submitForm?: Function;
}
interface State {
  formRef: any;
}
class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formRef: null
    };
  }
  onRef = (ref) => {
    this.setState(
      {
        formRef: ref
      },
      () => {
        if (this.props.onRef) {
          this.props.onRef(this.state.formRef);
        }
      }
    );
  };
  componentDidMount() {
    this.addEnterEvent();
  }
  addEnterEvent = () => {
    document
      .getElementById('elSearchForm')
      ?.addEventListener('keydown', (e) => {
        e.stopImmediatePropagation();
        if (e.key === 'Enter') {
          const { submitForm } = this.props;
          submitForm && submitForm();
        }
      });
  };
  render() {
    return (
      <ElForm
        id='elSearchForm'
        onRef={this.onRef}
        formProps={this.props.searchFormProps}
        rowClassName='el-searchtable-form'
      />
    );
  }
}
export default SearchForm;
