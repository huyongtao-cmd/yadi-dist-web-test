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
class DepartmentSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
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
    request(`/yd-user/sys/roles/allEnable`, {
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
  render() {
    return (
      <Selection
        {...this.props}
        transfer={{
          label: 'name',
          value: 'id'
        }}
        mode='multiple'
        onChange={this.props.onChange}
        value={this.props?.value || []}
        request={() => {
          return request(`/yd-user/sys/roles/allEnable`, {
            method: 'get'
          });
        }}
      />
    );
  }
}
export default DepartmentSelection;
