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
class InWhSelection extends React.Component<Props, any> {
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
    const buIdList = JSON.parse(localStorage.getItem('inBuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const buId = this.props.isCreate ? storeIds[0] : undefined;
    const data = await request(`/yd-inv/inv/ydinvWh/search`, {
      method: 'post',
      query: { current: 1, size: 999999, storeIds, buId }
    });
    const newData = data.data?.records?.map((item) => ({ ...item, name: item.whName }));
    const filterData = newData && newData.filter((item) => item.whStatus === 'ACTIVE');
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
export default InWhSelection;
