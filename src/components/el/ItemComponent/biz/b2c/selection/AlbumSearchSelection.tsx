import Selection from '../../../Selection';
import { Select } from 'antd';
import React from 'react';
import request from '@/utils/request';
const { Option } = Select;
interface Props {
  value?: any;
  onChange?: Function;
  transfer?: null;
  style?: object;
  allowClear?: boolean;
}
interface State {
  value: any;
  dataSource: any;
}
// 在此处组装所有的数据
class AlbumSearchSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataSource: []
    };
  }
  async componentDidMount() {
    await this.onRequest('');
  }
  onSearch = async (value = '') => {
    await this.onRequest(value);
  };
  // 请求数据方法
  onRequest = (value) => {
    request(`/yd-user/itm/album/query`, {
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
    this.setState({
      value
    });
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  render() {
    return (
      <Selection
        {...this.props}
        transfer={{
          label: 'name',
          value: 'id'
        }}
        onChange={this.onChange}
        value={this.state.value || this.props.value}
        request={() => {
          return request(`/yd-user/itm/album/query`, {
            method: 'get'
          });
        }}
      />
    );
  }
}
export default AlbumSearchSelection;
