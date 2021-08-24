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
  onChange: Function;
  disabled: boolean;
}
interface State {
  optionList: Array<any>;
}

class MgCurrencyRate extends React.Component<Props, State> {
  static defaultProps = {
    label: 'currName',
    valueKey: 'currCode',
    rowKey: 'id'
  };
  constructor(props) {
    super(props);
    this.state = {
      optionList: []
    };
  }

  componentDidMount() {
    this.initData();
  }

  request = () => {
    return requests('/yst-pur/com/comCurr/findAll', {
      method: 'GET'
    });
  };

  // changeReuest = (params) => {
  //   return requests('/yst-pur/com/comCurrRate/findCurrRatio', {
  //     method: 'POST',
  //     query: params
  //   });
  // };

  //请求数据
  initData = async () => {
    let res = await this.request();
    if (res.success) {
      this.setState({ optionList: res.data });
    }
  };

  // // 切换时的请求
  // selectRequest = async (value) => {
  //   if (value && this.props.toCurr) {
  //     const res = await this.changeReuest({
  //       fromCurr: value,
  //       toCurr: this.props.toCurr
  //     });
  //     if (res.success) {
  //       if (this.props.onChange) {
  //         this.props.onChange([value, res.data]);
  //       }
  //     } else {
  //       if (this.props.onChange) {
  //         this.props.onChange([value, null]);
  //       }
  //     }
  //   } else {
  //     if (this.props.onChange) {
  //       this.props.onChange([value, null]);
  //     }
  //   }
  // };

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange([value, null]);
    }
  };

  render() {
    const { optionList } = this.state;
    const { label, valueKey, rowKey } = this.props;
    return (
      <Input.Group compact>
        <Select
          value={this.props.value && this.props.value[0]}
          allowClear
          showSearch
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
        <Input
          style={{ width: '50%' }}
          value={this.props.value && this.props.value[1]}
          disabled
        />
      </Input.Group>
    );
  }
}

export default MgCurrencyRate;
