//编辑顾客详情
import React, { PureComponent } from 'react';
import { Modal } from 'antd';
// import { history} from 'react-router-dom';
import * as service from './service';
import { ElForm, ElNotification } from '@/components/el';
import { getEditForm } from './config';
import MultiTabMobx from '@/store/multiTab';
import {
  getCategoryByIdput,
} from './service';
import dayjs from 'dayjs';

interface Props {
  modalVisible?: boolean;
  closeModal?: Function;
  tableRef: any,
  data: any,
}

interface State {
  loading?: boolean;
  [props: string]: any;
}

export default class EditModal extends PureComponent<Props, State> {
  multiTabStore: any;
  static propTypes = {};
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      loading: false,
      formRef: null,
      userSaveLoading: false,
      tableRef: [],
    };
  }

  // 确定
  save = async () => {
    this.setState({
      loading: false
    });
    const id = this.props.data.id
    const { formRef } = this.state;
    if (formRef) {
      const formData = await formRef.validateFields();
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (formData.reprCertType === 'ID_CARD') {
        if (!reg.test(formData.reprCertNo)) {
          return ElNotification({
            type: 'error',
            message: '请输入合法的身份证号'
          });
        }
      }
      const data = {
        ...formData,
        // 编辑页面
        // registerDate: formData.registerDate != null ? dayjs(formData.registerDate).format('YYYY-MM-DD') || dayjs(Date.now()).format('YYYY-MM-DD') : null, // 注册日期
        registerDate: formData.registerDate != null ? dayjs(formData.registerDate).format('YYYY-MM-DD') : null, // 注册日期
        vipBirthDate: formData.vipBirthDate != null ? dayjs(formData.vipBirthDate).format('YYYY-MM-DD') : null, //出生日期
      };
      // console.log(data, 'vipBirthDate')
      let params = {
        ...data,
        id,
        orders: [
          {
            asc: false,
            column: 'createTime'
          }
        ]
      }
      // console.log(params, '////params')
      const res = await getCategoryByIdput(params);
      this.setState({
        loading: true
      });
      // console.log(res, 'res////')
      if (res.success) {
        ElNotification({
          type: 'success',
          message: res.msg
        });
        // 请求成功 隐藏弹框
        if (!this.state.userSaveLoading) {
          this.props.closeModal();
          this.multiTabStore.closeCurrentToPath('/salesCenter/custom/search');
        }
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
        if (!this.state.userSaveLoading) {
          this.props.closeModal();
        }
      }
    }
  };

  // handleBlur = (e) => {
  //   const reprCertType = this.state.formRef.getFieldValue('reprCertType');
  //   console.log(reprCertType, 'reprCertTypereprCertType');
  //   let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  //   if (reprCertType === 'ID_CARD') {
  //     if (!reg.test(e.target.value)) {
  //       ElNotification({
  //         type: 'error',
  //         message: '请输入合法的身份证号'
  //       });
  //     }
  //   }
  // }

  // 取消
  closeModal = () => {
    this.props.closeModal();
  };

  afterClose = () => { };

  onRef = (formRef) => this.setState({ formRef });
  render() {
    const { modalVisible } = this.props;
    return (
      <Modal
        width='60%'
        visible={this.props.modalVisible}
        okText='确定'
        title='编辑资料'
        onCancel={this.closeModal}
        onOk={this.save}
        okButtonProps={{
          loading: this.state.userSaveLoading
        }}
      >
        <ElForm
          onRef={this.onRef}
          data={this.props.data}
          formProps={{
            items: getEditForm().items,
          }}
        />
      </Modal>
    );
  }
}