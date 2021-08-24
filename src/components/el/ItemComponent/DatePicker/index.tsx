import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import 'antd/lib/date-picker/style';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const NewDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
dayjs.locale('zh-cn');
interface Props {
  value?: any;
  onChange?: Function;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  showTime?: Object | boolean;
  disabledDateTime?: Function;
  disabledDate?: Function;
}

interface State {
  value: any;
}

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    picker: 'date',
    placeholder: '请选择日期',
    format: 'YYYY-MM-DD'
  };
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  static getDerivedStateFromProps(props) {
    // 接收日期时间戳
    if (typeof props.value === 'string') {
      const day = dayjs(props.value);
      if (day.isValid()) {
        return { value: day };
      } else {
        return { value: '' };
      }
    }
    return null;
  }

  onChange = (date: Dayjs, dateString: string) => {
    // 简单粗暴不再提供date对象,如果外部需要使用此对象,获取dateString后再进行format操作即可
    if (this.props.onChange) {
      this.props.onChange(dateString);
    }
  };
  render() {
    return (
      <NewDatePicker
        locale={locale}
        format={this.props.format}
        style={{ width: '100%' }}
        placeholder={this.props.placeholder}
        value={this.state.value}
        disabledDate={(e) => {
          if (this.props?.disabledDate) {
            return this.props?.disabledDate(e);
          }
          return false;
        }}
        disabledTime={(e) => {
          if (this.props?.disabledDateTime) {
            return this.props?.disabledDateTime(e);
          }
          return false;
        }}
        onChange={this.onChange}
        picker={this.props.picker}
        disabled={this.props.disabled}
        showTime={this.props.showTime}
      />
    );
  }
}
export default DatePicker;
