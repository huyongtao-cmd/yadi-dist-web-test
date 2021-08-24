import Selection from '../../Selection';
import React from 'react';
import request from '@/utils/request';
interface TransferProps {
  value: string;
  label: string;
}
const defaultTransfer: TransferProps = {
  value: 'code',
  label: 'name'
};
interface Props {
  value?: any;
  onChange?: Function;
  transfer?: null;
  [props: string]: any;
}
// 在此处组装所有的数据
class CountrySelection extends React.Component<Props> {
  static defaultProps = {
    disabled: false,
    multiple: false,
    allowClear: true,
    transfer: defaultTransfer,
    selectRecord: false
  };
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}
  // 请求数据方法
  onRequest = async () => {
    return request(`/yst-pur/com/districts/bypcode/country`, {
      method: 'get'
    });
  };
  render() {
    return (
      <Selection
        {...this.props}
        onChange={this.props.onChange}
        request={this.onRequest}
      />
    );
  }
}
export default CountrySelection;
