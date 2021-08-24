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
class InStoreSelection extends React.Component<Props, any> {
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

  setlist = (data) => {
    console.log(data, 'datadata');
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
  //     }]
  //   }
  // };
  onRequest = async () => {
    // storeType: "A"
    const data = await request(`/yd-user/org/orgStore/listSpec`, {
      method: 'post',
      query: { current: 1, size: 999999, }
    });
    const newData = data.data?.records?.map((item) => ({ ...item, name: item.storeName }));
    const filterData = newData && newData.filter((item) => item.storeStatus === 'ACTIVE');
    const param = {
      ...data,
      data: filterData ? filterData : []
    };
    return param;
  };

  selectRef = (ref) => {
    this.setState({
      selectRef: ref
    })
  }
  render() {
    return (
      <Selection
        options={this.state.option}
        {...this.props}
        // onChange={this.props.onChange}
        onSelectChange={this.props.onSelectChange}
        ref={this.selectRef}
        request={this.onRequest}
      />
    );
  }
}
export default InStoreSelection;
