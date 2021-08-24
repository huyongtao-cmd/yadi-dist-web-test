import React from 'react';
import './style.less';
import { Card, Row, Col, Carousel, Badge, List } from 'antd';
import InfoCard from './components/InfoCard';
import QuickEnterCard from './components/QuickEnterCard';
import totalImg from '@/assets/img/icon/yadi/group16.png';
import todayImg from '@/assets/img/icon/yadi/group15.png';
import yesterdayImg from '@/assets/img/icon/yadi/group14.png';
import last7Img from '@/assets/img/icon/yadi/group9.png';
import bander1 from '@/assets/img/bander/bander1.png';
import bander2 from '@/assets/img/bander/bander2.png';
import bander3 from '@/assets/img/bander/bander3.png';
import AnnouncementLined from '@/assets/img/icon/yadi/icon-AnnouncementLined-blue.svg';
import ContainerLined from '@/assets/img/icon/yadi/icon-ContainerLined-blue.svg';

import { SyncOutlined } from '@ant-design/icons';
import ToDoItem from './components/QuickEnterCard/ToDoItem';
import NoticeCard from './components/NoticeCard';
import AuthMobx from '@/store/auth';
import ElSideMenu from '../layout/ElSideMenu';
import QuickEnter from './components/QuickEnter';
import * as service from './service';
import { ElNotification } from '@/components/el';

interface Props {
  history: any;
}


interface State {
  dayAmt: any,
  dayQty: any,
  monthAmt: any,
  monthQty: any
}
export default class Dashboard extends React.Component<Props, State> {
  store: any;
  rowGutter;
  colSpan;
  firstColSpan;
  constructor(props) {
    super(props);
    this.rowGutter = 16;
    this.colSpan = 12;
    this.firstColSpan = 24;
    this.state = {
      dayAmt: 0,
      dayQty: 0,
      monthAmt: 0,
      monthQty: 0
    }
  }

  async componentDidMount() {
    let buRes = await service.getBu();
    let buIdList = [];
    if (buRes.success) {
      buIdList = buRes.data.records
    }
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      storeIds
    }
    const res = await service.getNums(data);
    if (res.success) {
      const { dayAmt, dayQty, monthAmt, monthQty } = res.data;
      this.setState({
        dayAmt,
        dayQty,
        monthAmt,
        monthQty,
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  }

  render() {
    const rowGutter = this.rowGutter;
    const colSpan = this.colSpan;
    const firstColSpan = this.firstColSpan;
    const { dayAmt, dayQty, monthAmt, monthQty } = this.state;

    const data = [
      {
        key: 1,
        title: '系统通知：系统将于进行升级请注…',
        detail: '产品研发部',
        date: '2021-01-20'
      },
      {
        key: 2,
        title: '系统通知：系统将于进行升级请注…',
        detail: '产品研发部',
        date: '2021-01-20'
      },
      {
        key: 3,
        title: '系统通知：系统将于进行升级请注…',
        detail: '产品研发部',
        date: '2021-01-20'
      },
      {
        key: 4,
        title: '系统通知：系统将于进行升级请注…',
        detail: '产品研发部',
        date: '2021-01-20'
      }
    ];

    return (
      <div className='outer'>
        <div className='inner'>
          <Row className='line1Row' align='top' gutter={[rowGutter, rowGutter]}>
            <Col span={firstColSpan}>
              {/* 这里必须封装组件，否则在权限更改时，不会触发重绘 */}
              <QuickEnter></QuickEnter>
            </Col>
            {/* <Col span={colSpan}>
              <div className='banderRoot'>
                <Carousel autoplay dots={{ className: 'banderDots' }}>
                  <div className='banderImg'>
                    <img src={bander1} alt='' />
                  </div>
                  <div className='banderImg'>
                    <img src={bander2} alt='' />
                  </div>
                  <div className='banderImg'>
                    <img src={bander3} alt='' />
                  </div>
                </Carousel>
              </div>
            </Col> */}
            <Col className='myToDo' span={colSpan}>
              <QuickEnterCard
                title='我的待办'
                img={ContainerLined}
                extraImgs={[{ key: 0, icon: <SyncOutlined /> }]}
              >
                <div className='myToDoItemContainer'>
                  <ToDoItem title='待入库单据'></ToDoItem>
                  <ToDoItem title='待出库单据'></ToDoItem>
                </div>
                <div className='myToDoItemContainer'>
                  <ToDoItem title='未完成销售订单'></ToDoItem>
                </div>
              </QuickEnterCard>
            </Col>
            <Col className='' span={colSpan}>
              <Row gutter={[rowGutter, 32]}>
                <Col>
                  <InfoCard
                    img={totalImg}
                    title='今日整车销量'
                    info={this.state.dayQty || 0}
                  ></InfoCard>
                </Col>
                <Col>
                  <InfoCard
                    img={todayImg}
                    title='今日销售金额'
                    rmb='￥'
                    info={dayAmt || 0}
                  ></InfoCard>
                </Col>
                <Col>
                  <InfoCard
                    img={yesterdayImg}
                    title='当月整车销量'
                    info={monthQty || 0}
                  ></InfoCard>
                </Col>
                <Col>
                  <InfoCard
                    img={last7Img}
                    title='当月销售总额'
                    rmb='￥'
                    info={monthAmt || 0}
                  ></InfoCard>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <QuickEnterCard
                className='notice'
                title='公告消息'
                img={AnnouncementLined}
              >
                <Row align='top' gutter={[rowGutter, rowGutter]}>
                  {data.map((a) => {
                    return (
                      <Col key={a.key} span={12}>
                        <NoticeCard
                          title={a.title}
                          detail={a.detail}
                          time={a.date}
                        ></NoticeCard>
                      </Col>
                    );
                  })}
                </Row>
              </QuickEnterCard>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
