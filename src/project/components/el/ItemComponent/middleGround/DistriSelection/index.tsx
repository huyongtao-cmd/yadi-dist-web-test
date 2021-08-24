import Selection from '@/components/el/ItemComponent/Selection';
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
  onRef?: Function;
}
const defaultTransfer: TransferProps = {
  value: 'id',
  label: 'buName'
};
// 在此处组装所有的数据
class BuSelection extends React.Component<Props, any> {
  static defaultProps = {
    disabled: false,
    multiple: false,
    allowClear: true,
    transfer: defaultTransfer,
    selectRecord: false
  };
  constructor(props) {
    super(props);
    this.state = {
      selectRef: null,
      option: undefined
    };
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  setList = (data) => {
    this.setState({
      option: data
    })
  }
  onRequest = async () => {
    const data = await request(`/yd-user/agent/list`, {
      method: 'post',
      query: { current: 1, size: 999999, buType: 'DEALER' }
    });
    const newData = data.data?.records?.map((item) => ({ ...item, name: item.buName }));
    const filterData = newData && newData.filter((item) => item.buStatus === 'ACTIVE');
    const param = {
      ...data,
      data: filterData
    };
    return param;
  };

  // onChange = () => {
  //   console.log('11111',this.state.selectRef);
  //   // this.setState({
  //   //   option: [{
  //   //     value:'11111',
  //   //     label:'2'
  //   // }]
  //   // })
  // }
  selectRef = (ref) => {
    this.setState({
      selectRef: ref
    })
  }
  render() {
    return (
      <Selection
        {...this.props}
        options={this.state.option}
        onChange={this.props.onChange}
        // onSelectChange={this.onChange}
        ref={this.selectRef}
        request={this.onRequest}
      />
    );
  }
}
export default BuSelection;
