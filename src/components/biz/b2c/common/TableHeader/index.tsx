import React from 'react';
import { Card, Space, Button } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { CardProps } from 'antd/lib/card';
import { ButtonProps } from 'antd/lib/button';
import './styles.less';
console.log('styles');

interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
}

interface TableHeaderProps extends CardProps {
  blocks?: ActionButtonProps[];
}

class TableHeader extends React.Component<TableHeaderProps, {}> {
  render() {
    const { title } = this.props;
    return (
      <Card
        size='small'
        className='tableHeader'
        style={{ width: '100%' }}
        title={
          <>
            <UnorderedListOutlined />
            <span style={{ marginLeft: 6, fontSize: 14 }}>
              {title || '数据列表'}
            </span>
          </>
        }
        extra={
          Array.isArray(this.props.blocks) ? (
            <Space>
              {this.props.blocks?.map((v) => {
                const {
                  text,
                  type,
                  key,
                  disabled,
                  hidden,
                  icon,
                  handleClick
                } = v;
                return (
                  <Button
                    key={key}
                    type={type || 'default'}
                    disabled={disabled}
                    hidden={hidden}
                    icon={icon}
                    onClick={() => handleClick()}
                    className='action-button'
                  >
                    {text}
                  </Button>
                );
              })}
            </Space>
          ) : null
        }
      />
    );
  }
}
export default TableHeader;
