import React from 'react';
import { Card } from 'antd';
import AuthMobx from '@/store/auth';
import routes from '@/config/index';
import { observer } from 'mobx-react';
import QuickEnterCard from './QuickEnterCard';
import { withRouter } from 'react-router-dom';

import goodsImg from '@/assets/img/icon/yadi/goodsImg.png';
import procurementImg from '@/assets/img/icon/yadi/procurementImg.png';
import userImg from '@/assets/img/icon/yadi/userImg.png';
import statisticalImg from '@/assets/img/icon/yadi/statisticalImg.png';
import SMSImg from '@/assets/img/icon/yadi/SMSImg.png';
import accountImg from '@/assets/img/icon/yadi/accountImg.png';
import outboundImg from '@/assets/img/icon/yadi/outboundImg.png';
import newProductImg from '@/assets/img/icon/yadi/newProductImg.png';

interface Props {
  history: any;
}
interface State {
  // openKeys: Array<string>;
}
@observer
class QuickEnter extends React.Component<Props, State> {
  // authMobx: any;

  quickData: any = [
    {
      title: '商品管理',
      img: goodsImg,
      menuName: 'bikeDoc',
      goto: '商品档案列表'
    },
    {
      title: '采购管理',
      img: procurementImg,
      menuName: 'purcOrderIndex',
      goto: '采购订单查询'
    },
    {
      title: '员工管理',
      img: userImg,
      menuName: 'empList',
      goto: '员工列表'
    },
    {
      title: '零售开单',
      img: statisticalImg,
      menuName: 'retailOrderCreate',
      goto: '零售单创建'
    },
    {
      title: '批发开单',
      img: SMSImg,
      menuName: 'wholeOrderCreate',
      goto: '批发单创建'
    },
    {
      title: '库存查询',
      img: accountImg,
      menuName: 'inventorySearchIndex',
      goto: '库存查询'
    },
    {
      title: '车架号管理',
      img: outboundImg,
      menuName: 'inventorySerialnoIndex',
      goto: '车架号查询界面'
    },
    {
      title: '盘点管理',
      img: newProductImg,
      menuName: 'inventoryCheckIndex',
      goto: '盘点单查询'
    },
    {
      title: '调拨管理',
      img: newProductImg,
      menuName: 'inventoryTransferIndex',
      goto: '调拨单查询'
    }
  ];
  constructor(props: Props) {
    super(props);
  }

  _findInTree = (roots, comper) => {
    for (let index = 0; index < roots.length; index++) {
      const element = roots[index];
      if (comper(element)) {
        return element;
      }
      if (element.routes != null) {
        let target = this._findInTree(element.routes, comper);
        if (target != null) {
          return target;
        }
      }
    }

    return null;
  };

  authMenufilter = (v) => {
    if (AuthMobx.authMenuList.some((j: any) => j.code === v.menuName)) {
      return true;
    }
    return false;
  };
  buildQuickData() {
    // 根据权限过滤
    let realMenu = this.quickData.filter(this.authMenufilter);
    // 填充goto
    realMenu.forEach((a) => {
      const menu = this._findInTree(routes, (b) => {
        return a.menuName == b.name;
      });
      if (menu) {
        a.goto = menu.path;
      }
    });
    return realMenu.map((a) => (
      <div
        key={a.title}
        onClick={() => {
          this.props.history.push(a.goto);
        }}
      >
        <Card.Grid className='cardGridItem'>
          <img src={a.img} />
          <p>{a.title}</p>
        </Card.Grid>
      </div>
    ));
  }
  render() {
    return (
      <QuickEnterCard className='yunying' title='运营快捷入口'>
        {this.buildQuickData()}
      </QuickEnterCard>
    );
  }
}
export default withRouter(QuickEnter);
