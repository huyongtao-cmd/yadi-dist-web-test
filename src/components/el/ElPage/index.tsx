import React from 'react';
import { Spin } from 'antd';
import './styles.less';
interface Props {
  spinning?: boolean;
  children: React.ReactNode;
}

// todo
class ElPage extends React.Component<Props, {}> {
  static defaultProps = {
    spinning: false
  };
  render() {
    return (
      <Spin spinning={this.props.spinning} wrapperClassName='elPage'>
        {this.props.children}
      </Spin>
    );
  }
}
export default ElPage;
