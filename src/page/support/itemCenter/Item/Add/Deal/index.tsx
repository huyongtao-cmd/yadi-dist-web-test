
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
  loaded: boolean;
}

interface State {
  type: string;
  formData: any;
}

export default class DealInfo extends PureComponent<Props, State> {
  dealRef: any;
  submitIndex: Number;
  constructor(props) {
    super(props);
    this.dealRef = {};
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
      onRef && onRef(this.dealRef);
    }
  }

  render() {
    const { formData } = this.state;
    const { type } = this.props;
    return (
      <ElForm
        data={formData}
        onRef={(e) => (this.dealRef = e)}
        formProps={getTableFormItems(type)}
      />
    );
  }
}
