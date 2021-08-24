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
  isCreate: any;
}
const defaultTransfer: TransferProps = {
  value: 'id',
  label: 'name'
};
// 在此处组装所有的数据
class UserSelection extends React.Component<Props,any> {
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
      selectRef:null,
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
    const data = await request(`/yd-system/sys/users/q`, {
      method: 'post',
      query: { current: 1, size: 999999, enabled: true, orders: [{asc: false, column: "createTime"}] }
    });
    const newData = data.data?.records?.map((item)=> ({ ...item, name: item.firstName }));
    const param = { 
      ...data,
      data: newData
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
      selectRef:ref
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
export default UserSelection;
