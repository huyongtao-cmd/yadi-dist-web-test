import React from 'react';
import { Affix, Button, PageHeader as AntdPageHeader, Space } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import { ButtonProps } from 'antd/lib/button';
import { withRouter } from 'react-router-dom';
import './style.less';
import { omit } from 'ramda';

export interface BlockFunctionProps {
  (): React.ReactNode;
}
interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
}
interface Props extends PageHeaderProps {
  title?: string;
  blocks?: ActionButtonProps[];
  className?: string;
  headerClassName?: string;
  history?: History;
}

class ElPageHeader extends React.Component<Props, {}> {
  render() {
    return (
      <Affix className='el-page-header'>
        <AntdPageHeader
          className={this.props.headerClassName}
          ghost={false}
          title={<span className='block'>{this.props.title}</span>}
          {...omit(
            ['title', 'blocks', 'className', 'headerClassName', 'history'],
            this.props
          )}
          extra={
            Array.isArray(this.props.blocks) ? (
              <Space>
                {this.props.blocks.map((v) => {
                  const {
                    text,
                    key,
                    disabled,
                    hidden,
                    handleClick,
                    ...rest
                  } = v;
                  return (
                    <Button
                      {...rest}
                      key={key}
                      disabled={disabled}
                      hidden={hidden}
                      onClick={() => handleClick()}
                    >
                      {text}
                    </Button>
                  );
                })}
              </Space>
            ) : null
          }
        />
      </Affix>
    );
  }
}
export default withRouter(ElPageHeader);
