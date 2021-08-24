// 币种汇率
import React from 'react';
import { Input, Select, Row, Col } from 'antd';
import requests from '@/utils/request';
const { Option } = Select;

interface Props {
  value: any;
  toCurr?: string;
  label?: string; //展示字段
  valueKey?: string; //值字段
  rowKey?: string; // rowKey
  otherLabel?: string;
  otherValueKey?: string;
  otherRowKey?: string;
  onChange: Function;
  disabled: boolean;
}
interface State {
  optionList: Array<any>;
  otherOptionList: Array<any>;
  purtype: any; //订单类型
  zerovalType: any; //免值标记
  purtypeName: any;
  zerovalTypeName: any;
}

class MgPurrTypeSelection extends React.Component<any, State> {
  static defaultProps = {
    label: 'valDesc', //udcVal
    valueKey: 'udcVal',
    rowKey: 'udcVal',
    otherLabel: 'valDesc', //udcVal
    otherValueKey: 'udcVal',
    otherRowKey: 'udcVal'
  };
  constructor(props) {
    super(props);
    this.state = {
      optionList: [],
      otherOptionList: [],
      purtype: '',
      zerovalType: '',
      purtypeName: '',
      zerovalTypeName: ''
    };
  }

  componentDidMount() {
    this.initData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        purtype: nextProps && nextProps?.value[0],
        zerovalType: nextProps && nextProps?.value[1],
        purtypeName: nextProps && nextProps?.value[2],
        zerovalTypeName: nextProps && nextProps?.value[3]
      });
    }
  }

  request = () => {
    return requests('/yst-pur/sys/codes/combo/PUR/PO_TYPE2', {
      ///yst-pur/sys/codes/combo/PUR/PR_TYPE2
      method: 'GET'
    });
  };

  otherReuest = () => {
    return requests('/yst-pur/sys/codes/combo/COM/ZEROVAL_TYPE', {
      method: 'GET'
    });
  };

  //请求数据
  initData = async () => {
    let res = await this.request();
    let otherRes = await this.otherReuest();
    if (res.success) {
      this.setState({ optionList: res.data });
    }
    if (otherRes.success) {
      this.setState({ otherOptionList: otherRes.data });
    }
  };

  onChange = async (value, record) => {
    if (this.props.onChange) {
      await this.setState({
        purtype: value,
        purtypeName: record?.children
      });
    }
    console.log(this.state.purtype, '-----订单类型');
    this.props.onChange([
      this.state.purtype,
      this.state.zerovalType,
      this.state.purtypeName,
      this.state.zerovalTypeName
    ]);
  };
  otherOnChange = async (value, record) => {
    if (this.props.onChange) {
      await this.setState({
        zerovalType: value,
        zerovalTypeName: record?.children
      });
    }
    this.props.onChange([
      this.state.purtype,
      this.state.zerovalType,
      this.state.purtypeName,
      this.state.zerovalTypeName
    ]);
  };

  render() {
    const { optionList, otherOptionList } = this.state;
    const {
      label,
      otherLabel,
      valueKey,
      otherValueKey,
      rowKey,
      otherRowKey
    } = this.props;
    return (
      <Input.Group compact>
        <Select
          value={this.props.value && this.props.value[0]}
          allowClear
          style={{ width: '50%' }}
          onChange={this.onChange}
          disabled={this.props.disabled}
        >
          {optionList.map((row) => (
            <Option value={row[valueKey]} key={row[rowKey]}>
              {row[label]}
            </Option>
          ))}
        </Select>
        <Select
          value={this.props.value && this.props.value[1]}
          allowClear
          style={{ width: '50%' }}
          onChange={this.otherOnChange}
          disabled={this.props.disabled || this.props.isEdit ? true : false}
        >
          {otherOptionList.map((row) => (
            <Option value={row[otherValueKey]} key={row[otherRowKey]}>
              {row[otherLabel]}
            </Option>
          ))}
        </Select>
        {/* <Input
          style={{ width: '50%' }}
          value={this.props.value && this.props.value[1]}
          //   disabled
        /> */}
      </Input.Group>
    );
  }
}

export default MgPurrTypeSelection;
