/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-03-05 11:35:03
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 17:50:53
 */
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

export default class ServiceInfo extends PureComponent<Props, State> {
  serviceRef: any;
  submitIndex: Number;
  serviceData: any;
  constructor(props) {
    super(props);
    this.serviceRef = {};
    this.submitIndex = 0;
    this.serviceData = {
      installFlag: true,
      returnExchangeFlag: true,
      warrantyFlag: true,
      warrantyPeriod: '',
      warrantyPeriodUnit: null
    },
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
          type,
          formData: this.serviceData
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
      onRef && onRef(this.serviceRef);
    }
  }
  changedFields = (e, type) => {
    const data = { ...this.state.formData };
    data[type] = e.target.value;
    if (type === 'warrantyFlag' && !e.target.value) {
      data['warrantyPeriod'] = '';
      data['warrantyPeriodUnit'] = null;
    }
    this.setState({
      formData: data
    })
  }

  render() {
    const { formData } = this.state;
    const { type } = this.props;
    return (
      <ElForm
        data={formData}
        onRef={(e) => (this.serviceRef = e)}
        formProps={getTableFormItems(type, this)}
      />
    );
  }
}
