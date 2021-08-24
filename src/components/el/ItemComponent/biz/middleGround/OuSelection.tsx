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
  value: 'id',
  label: 'name'
};
// 在此处组装所有的数据
class OuSelection extends React.Component<Props> {
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
    return request(`/yst-pur/org/ous/select`, {
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
export default OuSelection;
