import { Cascader, message } from 'antd';
import React from 'react';
import requests from '@/utils/request';
import CascaderProps from 'antd/lib/cascader';
import { ReloadOutlined } from '@ant-design/icons';
interface Props {
  onChange?: (value: any, selectedOptions?: any) => void;
  defaultValue?: Array<any>;
  type?: String;
  group?: any;
  text?: any;
  value?: any;
  mark?: any;
  changeOnSelect?: boolean;
  placeholder?: string;
  Reload?: boolean;
}
interface State {
  options: any;
  value: any;
  loading: boolean;
  num: number;
}

class ClassifyCascader extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      loading: false,
      value: null,
      num: 0
    };
  }
  componentDidMount() {
    this.setCategoryFn();
  }
  async setCategoryFn() {
    try {
      if (this.state.num > 10) {
        return;
      }
      this.setState({
        loading: true,
        num: this.state.num + 1
      });
      let res;
      console.log(this.props.mark);
      this.props.mark === undefined &&
        (res = await requests('/yd-user/itm/category', {
          method: 'get'
        }));
      this.props.mark !== undefined &&
        (res = await requests('/yd-user/itm/category', {
          method: 'get',
          query: { mark: this.props.mark }
        }));
      if (res.success) {
        if (!!this.props.group) {
          console.log('componentDidMount==>', this.props.group);
          res.data.forEach((item) => {
            this.recursion(item, this.props.group, 1);
          });
        }
        this.setState({
          options: res.data
        });
      } else {
        message.error(res.msg || res.data);
      }
      this.setState({
        loading: false
      });
    } catch (error) {
      console.log('error', error);
      this.setState({
        loading: false
      });
    }
  }
  // 递归调用树状数据接口
  recursion = (data, group = 1, baseGroup) => {
    let result = baseGroup;
    if (!data) {
      return;
    }
    if (group === result) {
      delete data.children;
      return;
    }
    if (data.children && data.children.length > 0) {
      result += 1;
      data.children.forEach((item) => {
        this.recursion(item, group, result);
      });
    }
    return;
  };

  //改变事件
  onChange = (value, selectedOptions) => {
    const { onChange } = this.props;
    console.log('selectedOptions', selectedOptions);
    this.setState({
      value
    });
    onChange && onChange(value, selectedOptions);
  };
  filter(inputValue, path) {
    console.log(inputValue, path);
    return path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }
  render() {
    // const { value } = this.state;
    const {
      type,
      defaultValue,
      changeOnSelect,
      text,
      value,
      placeholder
    } = this.props;

    return (
      <div>
        <Cascader
          // defaultValue={defaultValue}
          value={defaultValue || value}
          options={this.state.options}
          disabled={type === 'edit' || this.state.loading}
          fieldNames={{ value: 'id', label: 'name' }}
          size='large'
          allowClear
          style={{ width: '100%' }}
          onChange={this.onChange}
          changeOnSelect={changeOnSelect}
          showSearch={{
            filter: (inputValue, path) => {
              return this.filter(inputValue, path);
            }
          }}
          // onPopupVisibleChange={(e) => {
          //   //点击刷新数据
          //   if (
          //     this.props.Reload !== undefined &&
          //     (this.state.loading || !e || !this.props.Reload)
          //   ) {
          //     return;
          //   }
          //   this.setCategoryFn();
          // }}
          placeholder={placeholder || '请选择商品分类'}
        />
        {!!text && <div className='text'>{text}</div>}

        {/* {this.props.Reload !== undefined && (
          <ReloadOutlined
            style={{
              marginLeft: '5px',
              color: 'rgba(0,0,0,0.2)'
            }}
            className='reloadName'
            onClick={(e) => {
              if (this.state.loading) {
                return;
              }
              console.log(888888, e);
              this.setCategoryFn();
            }}
          />
        )} */}
      </div>
    );
  }
}

export default ClassifyCascader;
