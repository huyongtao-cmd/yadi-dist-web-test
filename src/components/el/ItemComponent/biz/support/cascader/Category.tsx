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
  disabled?: boolean;
}
interface State {
  options: any;
  value: any;
  loading: boolean;
  num: number;
}

class CategoryCascader extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      loading: false,
      value: null,
      num: 0
    };
  }
  async componentDidMount() {
    const res = await requests(`/yd-user/itm/itmItemCate/searchTree`, {
      method: 'get'
    });
    let newTreeData = [];
    if (res && res.success) {
      newTreeData = JSON.parse(
        JSON.stringify(res.data)
          .replace(/itemCateName/g, 'label')
          .replace(/itemCateCode/g, 'value')
          .replace(/treeNodes/g, 'children')
          .replace(/"status":"DISABLE"/g, '"disabled": true')
      );
    }
    this.setState({
      options: newTreeData
    });
  }

  //改变事件
  onChange = (value) => {
    const { onChange } = this.props;
    this.setState({
      value
    });
    onChange && onChange(value);
  };

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Cascader
          // defaultValue={defaultValue}
          value={defaultValue || value}
          options={this.state.options}
          disabled={this.props.disabled || this.state.loading}
          size='large'
          allowClear
          style={{ width: '100%' }}
          onChange={this.onChange}
          changeOnSelect={changeOnSelect}
          placeholder={placeholder || '请选择商品分类'}
        />
        {!!text && <div className='text'>{text}</div>}
      </div>
    );
  }
}

export default CategoryCascader;
