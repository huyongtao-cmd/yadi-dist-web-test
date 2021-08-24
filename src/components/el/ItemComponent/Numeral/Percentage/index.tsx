import React from 'react';
import { Statistic } from 'antd';
import { StatisticProps } from 'antd/lib/statistic/Statistic';
import { asserts } from '@/utils';
import './style.less';
interface Props extends StatisticProps {
  value?: any;
  precision?: number;
}

class Percentage extends React.Component<Props, {}> {
  static defaultProps = {
    precision: 2
  };
  render() {
    return asserts.isExist(this.props.value) ? (
      <Statistic
        {...this.props}
        precision={this.props.precision}
        suffix={`%`}
      />
    ) : (
      '-'
    );
  }
}
export default Percentage;
