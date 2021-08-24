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
class WhAreaSelection extends React.Component<Props,any> {
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
    console.log(data,'datadata');
    this.setState({
      option: data
    })
  }
  onRequest = async () => {
    // const data = await request(`/yd-inv/Provider/inv/invWhDtt`, {
    //   method: 'post',
    //   query: { current: 1, size: 999999 }
    // });
    // const newData = data.data?.records.map((item)=> ({ ...item, name: item.whName }))
    // console.log(data,'datadatadata');
    const param = {
      success: true,
      data: []
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
export default WhAreaSelection;
