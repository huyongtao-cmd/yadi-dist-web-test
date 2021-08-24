import React from 'react';
import { Tooltip } from 'antd';
import { asserts } from '@/utils';
interface Props {
  value?: any;
  className?: string;
  needTooltip?: false;
  threshold?: number;
}

class Text extends React.Component<Props, {}> {
  static defaultProps = {
    value: '',
    needTooltip: true,
    threshold: 30
  };
  render() {
    return (
      <>
        {asserts.isExist(this.props.value) &&
        String(this.props.value).length > this.props.threshold ? (
          <Tooltip placement='topLeft' title={String(this.props.value)}>
            <text className={this.props.className}>
              {`${String(this.props.value).slice(0, this.props.threshold)}...`}
            </text>
          </Tooltip>
        ) : (
          <text className={this.props.className}>
            {asserts.isExist(this.props.value) ? String(this.props.value) : ''}
          </text>
        )}
      </>
    );
  }
}
export default Text;
