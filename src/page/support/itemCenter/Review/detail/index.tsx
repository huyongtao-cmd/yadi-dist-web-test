/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 10:59:42
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-24 11:00:12
 */
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Table, Button, Dropdown, Menu, Modal, Spin, Row, Col } from 'antd';
import { ElNotification } from '@/components/el';
import ElCard from '@/components/el/ElCard';
import dayjs from 'dayjs'

import PropTypes from 'prop-types';

import ReviewModal from '../Modal';
import { getTableColumns as getItemTableColumns } from '../../Item/config';

import * as service from '../service'

import './style.less'

interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  reviewModalVisible: boolean;
  id: string | number;
  formData: any;
  formRef: any;
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      reviewModalVisible: false,
      formData: {
        // show: true,
        // brandMaker: true
      },
      id: this.props.match.params?.id,
      formRef: '',//存放审核弹框的ref
      isAccept: true
    };
  }
  componentDidMount() {
    //编辑页面
    this.setState({
      loading: true
    });
    service.getReviewDetail(this.state.id)
      .then((res) => {
        if (res && res.success) {
          this.setState({
            formData: res.data
            // loading: false
          });
        }
        this.setState({
          loading: false
        });
      })
      .catch((e) => {
        this.setState({
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.setState({
      formData: {}
    });
  }

  getDetailTableColums(type: string) {
    return getItemTableColumns()
  }

  // 设置审核弹框显隐
  setModalVisible = (visible: boolean) => {
    this.setState({
      reviewModalVisible: visible
    });
  };

  handleReview = (data, isAccept) => {
    this.setState({
      isAccept: isAccept,
      formData: data.map(item => ({
        ...item,
        approve: isAccept
      })),
      reviewModalVisible: true
    })
  }

  handleOk = (values) => {
    const createTime = dayjs().format('YYYY-MM-DD');
    const params = values.rows.map(item => ({
      approve: item.approve,
      comment: values?.comment,
      createTime: createTime,
      createUserName: item.createUserName,
      itmItmId: item.id,
    }));

    service.review(params).then(res => {
      if (res && res.success) {
        this.setModalVisible(false);
        ElNotification({
          type: 'success',
          message: res?.msg
        })
        //TODO close page
      } else {
        this.setModalVisible(false);
      }
    });
  };

  //给审核弹框赋值ref
  getFormRef = (formRef) => {
    this.setState({
      formRef: formRef
    })
  }

  render() {
    const { loading, reviewModalVisible, formData, formRef, isAccept } = this.state

    return (
      <>
        <Spin spinning={loading}>
          <div style={{ padding: '8px' }}>
            <Button
              type='primary'
              key='approve'
              onClick={() => {
                this.handleReview([formData], true)
              }}
              className='action-button'
            >
              审批
        </Button>
            <Button
              type='primary'
              key='reject'
              onClick={() => {
                this.handleReview([formData], false)
              }}
              className='action-button'
            >
              拒绝
        </Button>
          </div>

          <ElCard
            title='审核申请信息'
          >
            <Row>
              <Col span={8} key='applyType'>
                审核类型：{formData.applyType}
              </Col>
              <Col span={8} key='applyId'>
                单据号：{formData.applyId}
              </Col>
              <Col span={8} key='dateTime'>
                申请时间：{formData.dateTime}
              </Col>
            </Row>

          </ElCard>
          <ElCard
            title='审核明细信息'
          >
            <Table
              bordered
              size='small'
              pagination={false}
              columns={this.getDetailTableColums('applyType')}
              dataSource={formData.list || []}
            />
          </ElCard>
          {reviewModalVisible && (
            <ReviewModal
              formData={[formData]}
              visible={reviewModalVisible}
              getFormRef={this.getFormRef}
              formRef={formRef}
              onCancel={() => this.setModalVisible(false)}
              onOk={this.handleOk}
              // handleApproveChange={this.handleApproveChange}
              isAccept={isAccept}
            />
          )}
        </Spin>
      </>
    )
  }
}
