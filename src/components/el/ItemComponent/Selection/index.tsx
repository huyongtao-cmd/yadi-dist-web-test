import React from 'react';
import { Select } from 'antd';
import { omit, path } from 'ramda';
interface Props {
  request?: any;
  options?: Array<any>;
  data?: string;
  mode?: 'multiple' | 'tags';
  disabledValue?: Array<string>;
  disabled?: boolean;
  transfer?: {
    label: string;
    value: string;
  };
  value?: any;
  onChange?: Function;
  onSelectChange?: Function;
  allowClear?: boolean;
  placeholder?: string;
  multiple?: boolean;
  selectRecord?: boolean;
}
interface State {
  dataSource: Array<any>;
  loading: boolean;
  selectedValue: any;
}

class Selection extends React.Component<Props, State> {
  static defaultProps = {
    rowKey: 'id',
    showSearch: true,
    disabledValue: [],
    data: 'data',
    disabled: false,
    allowClear: true,
    multiple: false,
    mode: 'tags',
    selectRecord: false,
    request: () => {
      return Promise.resolve({
        data: []
      });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
      selectedValue: undefined
    };
  }
  static getDerivedStateFromProps(
    { value, selectRecord, transfer, multiple },
    { selectedValue }
  ) {
    if (selectRecord) {
      let newValue;
      if (multiple) {
        newValue = value && value.map((item) => item[transfer.value]);
      } else {
        newValue = value && value[transfer.value];
      }
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
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    // 如果直接传入数据源,就不再走请求了
    if (Array.isArray(this.props.options)) {
      this.setState({ dataSource: this.props.options });
    } else {
      this.setState({
        loading: true
      });
      const res = await this.props.request();
      if (res.success) {
        this.setState({
          dataSource: Array.from(path(this.props.data.split('.'), res)),
          loading: false
        });
      }
    }
  };
  onSearch = async (value: string) => {
    if (Array.isArray(this.props.options)) {
      const data = this.props.options.filter((v) => {
        if (this.props.transfer) {
          if (
            v[this.props.transfer.label].indexOf(value) > -1 ||
            v[this.props.transfer.value].indexOf(value) > -1
          ) {
            return v;
          }
        } else {
          if (
            v['value'].indexOf(value) > -1 ||
            v['label'].indexOf(value) > -1
          ) {
            return v;
          }
        }
      });
      this.setState({
        dataSource: data
      });
    }
  };
  onChange = (value) => {
    if (this.props.selectRecord) {
      let record;
      if (this.props.multiple) {
        record = this.state.dataSource.filter(
          (item) => value.indexOf(item[this.props.transfer.value]) !== -1
        );
      } else {
        record = this.state.dataSource.find(
          (item) => item[this.props.transfer.value] === value
        );
      }
      if (this.props.onChange) {
        this.props.onChange(record);
      }
      this.props.onSelectChange && this.props.onSelectChange(record);
    } else {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
      this.props.onSelectChange && this.props.onSelectChange(value);
    }
  };
  render() {
    const { allowClear, multiple, options } = this.props;
    // console.log(this.state.dataSource);
    return (
      <Select
        {...omit(['disabledValue', 'selectRecord', 'request'], this.props)}
        disabled={this.state.loading || this.props.disabled}
        allowClear={allowClear}
        maxTagCount={3}
        maxTagTextLength={5}
        mode={multiple ? this.props.mode : null}
        optionFilterProp={options ? 'label' : 'children'}
        // onSearch={this.onSearch}
        value={this.state.selectedValue}
        onChange={this.onChange}
        // filterOption={(input, option) => {
        //   return String(option.label).indexOf(String(input)) >= 0;
        // }}
      >
        {Array.isArray(this.state.dataSource) &&
          this.state.dataSource.map((v) => {
            return this.props.transfer ? (
              <Select.Option
                key={v[this.props.transfer.value]}
                value={v[this.props.transfer.value]}
                disabled={this.props.disabledValue.indexOf(v.value) > -1}
              >
                {v[this.props.transfer.label]}
              </Select.Option>
            ) : (
              <Select.Option
                key={v.value}
                value={v.value}
                disabled={this.props.disabledValue.indexOf(v.value) > -1}
              >
                {v.label}
              </Select.Option>
            );
          })}
      </Select>
    );
  }
}
export default Selection;
