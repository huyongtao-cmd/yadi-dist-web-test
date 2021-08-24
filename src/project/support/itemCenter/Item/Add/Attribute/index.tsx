
import React, { PureComponent } from 'react';
import { message } from 'antd';
import ElForm from '@/components/el/ElForm';
import { getTableFormItems } from './config';

interface Props {
  onRef: Function;
  data: any;
  submitIndex: Number;
  // majorId: Function;
  type: any;
  formInfo: any;
  loaded: boolean;
}

interface State {
  type: string;
  formData: any;
}

export default class Attribute extends PureComponent<Props, State> {
  attributeRef: any;
  submitIndex: Number;

  constructor(props) {
    super(props);
    this.attributeRef = {};
    this.submitIndex = 0;
    this.state = {
      type: '',
      formData: {}
    };
  }

  componentDidUpdate() {
    const { submitIndex, onRef, data, type, loaded } = this.props;
    if (type !== this.state.type) {
      if (type === 'add') {
        this.setState({
          type
        });
      } else {
        if (Object.keys(data).length !== Object.keys(this.state.formData).length && loaded) {
          this.setState({
            formData: data,
            type
          });
        }
      }
    }
    // 根据submitIndex判断是否进行提交的操作，传递最新的form
    if (this.submitIndex !== submitIndex) {
      this.submitIndex = submitIndex;
      onRef && onRef(this.attributeRef);
    }
  }

  render() {
    const { formData } = this.state;
    const { data } = this.props
    return (
      <ElForm
        data={data}
        onRef={(e) => (this.attributeRef = e)}
        formProps={getTableFormItems(this.props.formInfo)}
      />
    );
  }
}
