import React, { ReactNode } from 'react';
import { Statistic as AntdStatistic } from 'antd';
import { StatisticProps } from 'antd/lib/statistic/Statistic';
import { asserts } from '@/utils';
import './style.less';

interface Props extends StatisticProps {
  value?: any;
  precision?: number;
  prefix?: ReactNode;
}

class Statistic extends React.Component<Props, {}> {
  static defaultProps = {
    precision: 2
  };
  render() {
    return asserts.isExist(this.props.value) ? (
      <AntdStatistic
        {...this.props}
        precision={this.props.precision}
        prefix={this.props.prefix}
      />
    ) : (
      '-'
    );
  }
}
export default Statistic;
