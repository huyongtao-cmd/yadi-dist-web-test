import React from 'react';
import cls from 'classnames';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import './style.less';

export interface BizCardProps extends CardProps {
  blockClass?: string;
}

const ElCard = ({
  blockClass, // 有颜色修改需求的时候，注入class来做修改即可。或者通过 className 来做内部覆盖
  // 下面的都还是 antd card 本身就有的接口。我们做的事情，是title外面包了一层div用来加色块
  title,
  className,
  ...props
}: BizCardProps) => (
  <Card
    className={cls(['card', className])}
    title={<div className={cls('block', blockClass)}>{title}</div>}
    {...props}
  />
);

/**
 * 可以利用 defaultProps 来做一些缺省设置
 */

ElCard.defaultProps = {
  bordered: false,
  size: 'small'
};

export default ElCard;
