import React from "react";
import { Select } from "antd";
import { path } from "ramda";
interface Props {
  request?: any;
  options?: Array<any>;
  data?: string;
  mode?: "multiple" | "tags";
  disabledValue?: Array<string>;
  disabled?: boolean;
  transfer?: {
    label: string;
    value: string;
  };
}
interface State {
  dataSource: Array<any>;
  loading: boolean;
}

class SearchSelection extends React.Component<Props, State> {
  static defaultProps = {
    disabledValue: [],
    data: "data",
    disabled: false,
    request: () => {
      return Promise.resolve({
        data: [
          { label: 1, value: 1 },
          { label: 2, value: 2 },
        ],
      });
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
    };
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
        loading: true,
      });
      const res = await this.props.request("");
      const data: Array<any> = path(this.props.data.split('.'), res);
      this.setState({
        dataSource: [...data],
        loading: false,
      });
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
            v["value"].indexOf(value) > -1 ||
            v["label"].indexOf(value) > -1
          ) {
            return v;
          }
        }
      });
      this.setState({
        dataSource: data,
      });
    } else {
      this.setState({
        loading: true,
      });
      const res = await this.props.request(value);
      this.setState({
        dataSource: res[this.props.data] ? res[this.props.data] : [],
        loading: false,
      });
    }
  };
  render() {
    return (
      <Select
        disabled={this.state.loading || this.props.disabled}
        allowClear
        maxTagCount={4}
        mode={this.props.mode}
        onSearch={this.onSearch}
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
export default SearchSelection;
