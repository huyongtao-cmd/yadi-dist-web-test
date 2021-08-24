import { Cascader as AntdCascader } from 'antd';
import * as React from 'react';
import { clone } from 'ramda';
import { e, number } from 'mathjs';
interface Props {
  options?: any[];
  request?: Function;
  getData?: Function;
  value?: any;
  onChange?: Function;
  level?: string | number;
  disabled?: boolean;
  fieldNames?: any
}
interface State {
  options: any[];
  value: Array<string> | Array<number>;
}
class Cascader extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null
    };
  }
  componentDidMount() {
    const { options, value } = this.props;
    if (options) {
      this.setState({
        options
      });
    }
    this.getFirstOptions(value, () => {
      this.setState({
        value
      });
    });
  }
  componentWillReceiveProps(nextProps, prevState) {
    const { value } = nextProps;
    if (value && value !== this.state.value) {
      this.getFirstOptions(value, () => {
        this.setState({
          value
        });
      });
    }
  }
  checkDataLevel = (data: Array<unknown>, level: number) => {
    if (level && data.length > level) {
      return data.slice(0, level);
    }
    return data;
  };
  getFirstOptions = async (value, callBack?: Function) => {
    const { request, options, level } = this.props;
    if (request && !options) {
      const { success = false, data = [] } = await request(
        this.checkDataLevel(Array.isArray(value) ? value : [], Number(level)),
        level
      );
      if (success) {
        this.setState(
          {
            options: data
          },
          () => {
            if (callBack) {
              callBack();
            }
          }
        );
      }
    }
  };
  getData = async (selectedOptions) => {
    const { getData, level } = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    if (getData) {
      // const { value } = selectedOptions[0]; 原代码  陈英杰修改，只获取第0项的value，会出现一直请求同一级的区域

      targetOption.loading = true;
      // load options lazily
      const { success, data } = await getData(targetOption.value); // 陈英杰修改,直接拿数组最后一项的value去请求
      //   const { success, data } = await getData(value);原代码  陈英杰修改,直接拿数组最后一项的value去请求

      if (success) {
        targetOption.loading = false; // 陈英杰修改，loading效果关闭放到这里可以关闭loading
        targetOption.children =
          level && Number(targetOption.level) === Number(level) - 1
            ? data.map((v) => {
              return { ...v, isLeaf: true };
            })
            : data;
        const { options } = this.state;
        this.setState({
          options: clone(options)
        });
      }
      //  targetOption.loading = false;原代码 陈英杰修改，loading效果关闭放到setState后面会出现无法关闭loading的bug
    }
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
    const { options, value } = this.state;

    return (
      <AntdCascader
        value={value}
        options={options}
        loadData={this.getData}
        onChange={this.onChange}
        changeOnSelect
        disabled={this.props.disabled}
        fieldNames={this.props.fieldNames}
      />
    );
  }
}
export default Cascader;
