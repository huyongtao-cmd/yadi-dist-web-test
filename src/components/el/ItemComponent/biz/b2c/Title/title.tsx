import React from 'react';
import { Affix } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';

import './style.less';

export interface BlockFunctionProps {
  (): React.ReactNode;
}

interface Props extends PageHeaderProps {
  title?: string;
  className?: string;
  headerClassName?: string;
  history?: History;
}

class Title extends React.Component<Props, {}> {
  render() {
    return (
      <Affix className='el-page-title'>
        <span className='block'>{this.props.title}</span>
      </Affix>
    );
  }
}
export default Title;
