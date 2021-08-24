import React from 'react';
import cls from 'classnames';
import { Badge, Button, Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import './ToDoStyle.less';
import Arrow from '@/assets/img/icon/yadi/arrow.svg';

export interface ToDoItemProps extends CardProps {
  title?: string;
}

interface State extends ToDoItemProps {}
class ToDoItem extends React.Component<ToDoItemProps, State> {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    let { title } = this.state;

    return (
      <div className='item'>
        <div className='leftZone'>
          <div className='itemElement badgeBg'>10</div>
          <span className='itemElement' title={title}>
            {title}
          </span>
        </div>
        <img className='itemElement arrow' src={Arrow} />
      </div>
    );
  }
}

export default ToDoItem;
