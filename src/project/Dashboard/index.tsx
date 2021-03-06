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
        message: res.msg || res.data || '???????????????'
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
        title: '????????????????????????????????????????????????',
        detail: '???????????????',
        date: '2021-01-20'
      },
      {
        key: 2,
        title: '????????????????????????????????????????????????',
        detail: '???????????????',
        date: '2021-01-20'
      },
      {
        key: 3,
        title: '????????????????????????????????????????????????',
        detail: '???????????????',
        date: '2021-01-20'
      },
      {
        key: 4,
        title: '????????????????????????????????????????????????',
        detail: '???????????????',
        date: '2021-01-20'
      }
    ];

    return (
      <div className='outer'>
        <div className='inner'>
          <Row className='line1Row' align='top' gutter={[rowGutter, rowGutter]}>
            <Col span={firstColSpan}>
              {/* ???????????????????????????????????????????????????????????????????????? */}
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
                title='????????????'
                img={ContainerLined}
                extraImgs={[{ key: 0, icon: <SyncOutlined /> }]}
              >
                <div className='myToDoItemContainer'>
                  <ToDoItem title='???????????????'></ToDoItem>
                  <ToDoItem title='???????????????'></ToDoItem>
                </div>
                <div className='myToDoItemContainer'>
                  <ToDoItem title='?????????????????????'></ToDoItem>
                </div>
              </QuickEnterCard>
            </Col>
            <Col className='' span={colSpan}>
              <Row gutter={[rowGutter, 32]}>
                <Col>
                  <InfoCard
                    img={totalImg}
                    title='??????????????????'
                    info={this.state.dayQty || 0}
                  ></InfoCard>
                </Col>
                <Col>
                  <InfoCard
                    img={todayImg}
                    title='??????????????????'
                    rmb='???'
                    info={dayAmt || 0}
                  ></InfoCard>
                </Col>
                <Col>
                  <InfoCard
                    img={yesterdayImg}
                    title='??????????????????'
                    info={monthQty || 0}
                  ></InfoCard>
                </Col>
                <Col>
                  <InfoCard
                    img={last7Img}
                    title='??????????????????'
                    rmb='???'
                    info={monthAmt || 0}
                  ></InfoCard>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <QuickEnterCard
                className='notice'
                title='????????????'
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
