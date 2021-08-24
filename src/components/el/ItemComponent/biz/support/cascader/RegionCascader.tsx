import { Cascader as AntdCascader } from 'antd';
import * as React from 'react';
import { clone } from 'ramda';
import requests from '@/utils/request';
interface Props {
  value?: any;
  onChange?: Function;
  level?: string | number;
  disabled?: boolean;
  selectRecord?: boolean;
}
interface State {
  options: any[];
  value: Array<string> | Array<number>;
  selectedValue: any;
}
class RegionCascader extends React.Component<Props, State> {
  static defaultProps = {
    selectRecord: false
  };
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null,
      selectedValue: ''
    };
  }
  findChildrenById = (code: number | string) => {
    return requests(`/yd-user/com/area/pid/${code}`, {
      method: 'get'
    });
  };
  componentDidMount() {
    const { value } = this.props;
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
    const { level } = this.props;
    const { success = false, data = [] } = await this.findChildrenById(0);
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
  };
  getData = async (selectedOptions) => {
    const { level } = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const { success, data } = await this.findChildrenById(
      targetOption.areaCode
    );
    targetOption.loading = false;
    targetOption.children =
      level && Number(targetOption.areaLevel) === Number(level) - 1
        ? data.map((v) => {
            return { ...v, isLeaf: true };
          })
        : data;
    const { options } = this.state;
    this.setState({
      options: clone(options)
    });
  };
  static getDerivedStateFromProps({ value, selectRecord }, { selectedValue }) {
    if (selectRecord) {
      let newValue;
      newValue = value && value.map((item) => item.value);
      if (newValue !== selectedValue) {
        return {
          selectedValue: newValue
        };
      }
      return null;
    } else {
      if (value !== selectedValue) {
        return {
          selectedValue: value
        };
      }
      return null;
    }
  }
  onChange = (value, selectedOptions) => {
    if (this.props.selectRecord) {
      const record = selectedOptions.map((item) => ({
        label: item.areaName,
        value: item.areaCode
      }));
      if (this.props.onChange) {
        this.props.onChange(record, selectedOptions);
      }
    } else {
      if (this.props.onChange) {
        this.props.onChange(value, selectedOptions);
      }
    }
  };
  render() {
    const { options, value, selectedValue } = this.state;

    return (
      <AntdCascader
        value={selectedValue}
        options={options}
        loadData={this.getData}
        onChange={this.onChange}
        changeOnSelect
        disabled={this.props.disabled}
        fieldNames={{ label: 'areaName', value: 'areaCode' }}
      />
    );
  }
}
export default RegionCascader;
