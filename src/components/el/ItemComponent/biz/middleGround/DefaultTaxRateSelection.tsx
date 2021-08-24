import Selection from '../../Selection';
import React from 'react';
import request from '@/utils/request';
interface TransferProps {
  value: string;
  label: string;
}
interface Props {
  value?: any;
  onChange?: Function;
  transfer?: null;
  [props: string]: any;
}
const defaultTransfer: TransferProps = {
  value: 'taxRateNo',
  label: 'taxRateDesc'
};
// 在此处组装所有的数据
class DefaultTaxRateSelection extends React.Component<Props> {
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
  componentDidMount() {}
  // 请求数据方法
  onRequest = async () => {
    return request(`/yst-pur/com/comTaxRate/q`, {
      method: 'post',
      query: {
        current: 1,
        size: 1000
      }
    });
  };
  render() {
    return (
      <Selection
        {...this.props}
        data='data.records'
        onChange={this.props.onChange}
        request={this.onRequest}
      />
    );
  }
}
export default DefaultTaxRateSelection;
