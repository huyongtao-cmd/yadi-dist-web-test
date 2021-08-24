import React from 'react';
import cls from 'classnames';
import { Button, Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import './style.less';
import '../../style.less';
import { EllipsisOutlined, SettingFilled } from '@ant-design/icons';
import FunctionLined from '@/assets/img/icon/yadi/icon-FunctionLined-blue.svg';

export interface QuickEnterCardProps extends CardProps {
  title?: string;
  img?: string;
  extraImgs?: any; // 允许自定义图标，传自定义图标列表，不变的图标设置null/undefined
  className?: string;
}

interface State extends QuickEnterCardProps {}
class QuickEnterCard extends React.Component<QuickEnterCardProps, State> {
  constructor(props) {
    super(props);

    // 允许自定义图标
    let defaultImsg = [
      { key: 0, icon: <SettingFilled /> },
      { key: 1, icon: <EllipsisOutlined /> }
    ];
    let extraImgs = props.extraImgs || defaultImsg;
    for (let index = 0; index < defaultImsg.length; index++) {
      const a = defaultImsg[index];
      if (extraImgs[index] == null) {
        extraImgs[index] = a;
      }
    }
    let img = props.img || FunctionLined;
    this.state = { ...props, extraImgs, img };
  }

  render() {
    let { title, extraImgs, img, className } = this.state;

    return (
      <Card
        className={'baseCard QuickEnterCard' + ' ' + className}
        title={
          <div className='cardTitleZone'>
            <span className='cardTitle'>{title}</span>
          </div>
        }
        extra={
          <>
            <Button type='text' icon={extraImgs[0].icon}></Button>
            <Button type='text' icon={extraImgs[1].icon}></Button>
          </>
        }
      >
        <div className='ennterCardBody'>{this.props.children}</div>
      </Card>
    );
  }
}

export default QuickEnterCard;
