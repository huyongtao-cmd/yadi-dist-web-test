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
  value: 'ptCode',
  label: 'ptName'
};
// 在此处组装所有的数据
class PaymentTermSelection extends React.Component<Props> {
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
  onRequest = () => {
    return request(`/yst-pur/com/comPaymentTerm/list`, {
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
export default PaymentTermSelection;
