import React from 'react';
import cls from 'classnames';
import { Card, Col, Row } from 'antd';
import { CardProps } from 'antd/lib/card';
import './style.less';
import noticeImg from '@/assets/img/icon/yadi/noticeImg.png';

//process.env.NODE_ENV !== 'development'

export interface NoticeCardProps extends CardProps {
  img?: any;
  title?: string;
  detail?: string;
  time?: string;
}

interface State extends NoticeCardProps {}
class NoticeCard extends React.Component<NoticeCardProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      img: props.img || noticeImg,
      title: props.title,
      detail: props.detail,
      time: props.time
    };
  }
  render() {
    let { img, title, detail, time } = this.state;
    return (
      <div className='cardBase'>
        <div className='flex-row flex-align-center'>
          <img className='flex-fix img' src={img} alt='加载中...' />
          <div className='flex-auto textZone'>
            <div className='textTitle'>{title}</div>
            <div className='flex-row flex-content-between textInfo'>
              <div className=''>{detail}</div>
              <div className=''>{time}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeCard;
