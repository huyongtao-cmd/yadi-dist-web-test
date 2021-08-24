import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const NewDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
dayjs.locale('zh-cn');
interface Props {
  value?: [string, string];
  onChange?: Function;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  placeholder?: [string, string];
  format?: string;
  disabled?: [boolean, boolean];
  showTime?: Object | boolean;
}

interface State {
  value: any;
}
const { RangePicker } = NewDatePicker;
class RangerPicker extends React.Component<Props, State> {
  static defaultProps = {
    picker: 'date',
    placeholder: ['请选择开始日期', '请选择结束日期'],
    format: 'YYYY-MM-DD'
  };
  constructor(props) {
    super(props);
    this.state = {
      value: ['', '']
    };
  }
  static getDerivedStateFromProps(props) {
    // 接收日期时间戳
    if (Array.isArray(props.value) && props.value.length === 2) {
      const day0 = dayjs(props.value[0]);
      const day1 = dayjs(props.value[1]);
      if (day0.isValid() && day1.isValid()) {
        return { value: [day0, day1] };
      } else {
        return { value: ['', ''] };
      }
    }
    return null;
  }
  onChange = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
    // 简单粗暴不再提供date对象,如果外部需要使用此对象,获取dateString后再进行format操作即可
    if (this.props.onChange) {
      this.props.onChange(dateString);
    }
  };
  render() {
    return (
      <RangePicker
        locale={locale}
        format={this.props.format}
        style={{ width: '100%' }}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.onChange}
        picker={this.props.picker}
        disabled={this.props.disabled}
        showTime={this.props.showTime}
      />
    );
  }
}
export default RangerPicker;
