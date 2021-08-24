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
  label: 'name'
};
// 在此处组装所有的数据
class SuppSelection extends React.Component<Props,any> {
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

  setlist = (data) => {
    console.log(data,'datadata');
    this.setState({
      option: data
    })
  }
  // onRequest = async () => {
  //   return {
  //     success:true,
  //     data:[{
  //       id:'2',
  //       name:'22222'
  //   }]
  //   }
  // };
  onRequest = async () => {
    const data = await request(`/yd-inv/Provider/inv/invWhDtt`, {
      method: 'post',
      query: { current: 1, size: 999999 }
    });
    console.log(data,'datadatadata');
    const param = {
      ...data,
      data: data.data?.records
    };
    return param;
  };

  onChange = () => {
    console.log('11111',this.state.selectRef);
    // this.setState({
    //   option: [{
    //     value:'11111',
    //     label:'2'
    // }]
    // })
  }
  selectRef = (ref) => {
    this.setState({
      selectRef:ref
    })
  }
  render() {
    return (
      <Selection
        options={this.state.option}
        {...this.props}
        // onChange={this.props.onChange}
        // onSelectChange={this.onChange}
        ref={this.selectRef}
        request={this.onRequest}
      />
    );
  }
}
export default SuppSelection;
