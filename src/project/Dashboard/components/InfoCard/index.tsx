import React from 'react';
import cls from 'classnames';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import './style.less';
import '../../style.less';

//process.env.NODE_ENV !== 'development'

export interface InfoCardProps extends CardProps {
  img?: any;
  title?: string;
  info?: string;
  rmb?: string;
}

interface State extends InfoCardProps { }
class InfoCard extends React.Component<InfoCardProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      img: props.img,
      title: props.title,
      info: props.info,
      rmb: props.rmb
    };
  }
  render() {
    let { img, title, info, rmb } = this.props;
    return (
      <div className='baseCard InfoCard'>
        <div className='cardContainer'>
          <img className='inline cardImg' src={img} alt='加载中...' />
          <div className='inline cardText'>
            <div className='info'>
              <span>{rmb}</span>
              {info}
            </div>
            <div className='infoTitle'>{title}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoCard;
