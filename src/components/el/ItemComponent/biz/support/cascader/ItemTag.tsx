import { Cascader } from 'antd';
import * as React from 'react';
import requests from '@/utils/request';

interface Props {
  onChange?: Function;
  defaultValue?: string[] | number[];
  disabled?: boolean;
  options?: string[] | number[];
}

interface State {
  options: any;
  value: Array<string> | Array<number>;
  defaultValue: Array<string> | Array<number>;
}

class ItemTagCascader extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null,
      defaultValue: []
    };
  }

  async componentDidMount() {
    this.setState({ options: this.props.options }, () => {
      this.setState({ defaultValue: this.props.defaultValue });
    });
  }
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }

  findChildrenById = async (id: number | string) => {
    const res = await requests(`/yd-user/itm/tag/tree`, {
      method: 'get'
    });
    if (res && res.success) {
      var newTreeData = JSON.parse(
        JSON.stringify(res.data)
          .replace(/tagName/g, 'label')
          .replace(/tagCode/g, 'value')
          .replace(/treeNodes/g, 'children')
      );
    }
    return newTreeData;
  };
  onChange = (value, selectedOptions) => {
    const { onChange } = this.props;
    this.setState(
      {
        value
      },
      () => {
        if (onChange) {
          onChange(value, selectedOptions);
        }
      }
    );
  };

  render() {
    const { options, value, defaultValue } = this.state;
    return (
      <Cascader
        options={options}
        disabled={this.props.disabled}
        defaultValue={['10002', '11111']}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
export default ItemTagCascader;
