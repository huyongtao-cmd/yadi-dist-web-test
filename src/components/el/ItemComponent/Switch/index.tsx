import React from 'react';
import { Switch } from 'antd';

interface Props {
  value?: any;
  onChange?: Function;
  disabled?: boolean;
  loading?: boolean;
  size: 'default' | 'small';
  onSwitchChange?: Function;
}

class Statistic extends React.Component<Props, {}> {
  onChange = (checked) => {
    const { onChange, onSwitchChange } = this.props;
    if (onChange) {
      onChange(checked);
    }
    if (onSwitchChange) {
      onSwitchChange(checked);
    }
  };
  render() {
    const { disabled, loading, size } = this.props;
    return (
      <Switch
        {...this.props}
        disabled={disabled}
        loading={loading}
        size={size}
        checked={this.props.value}
        onChange={this.onChange}
      />
    );
  }
}
export default Statistic;
