import Selection from '../../../Selection';
import React from 'react';
import request from '@/utils/request';
interface Props {
  value?: any;
  onChange?: Function;
  transfer?: null;
  [props: string]: any;
}
interface State {
  value: any;
  dataSource: any;
}
// 在此处组装所有的数据
class BrandSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataSource: []
    };
  }
  async componentDidMount() {
    // await this.onRequest('');
  }
  onSearch = async (value = '') => {
    await this.onRequest(value);
  };
  // 请求数据方法
  onRequest = (value) => {
    request(`/yd-user/itm/brand/query`, {
      method: 'get',
      query: {
        keyword: value
      }
    }).then((res) => {
      if (res && res.success) {
        this.setState({
          dataSource: res.data
        });
      }
    });
  };
  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };
  render() {
    const { placeholder = '请选择品牌', value } = this.props;
    return (
      <Selection
        {...this.props}
        placeholder={placeholder}
        transfer={{
          label: 'name',
          value: 'id'
        }}
        onChange={this.onChange}
        value={value}
        request={() => {
          return request(`/yd-user/itm/brand/query`, {
            method: 'get'
          });
        }}
      />
    );
  }
}
export default BrandSelection;
