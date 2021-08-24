//新增顾客
import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import { history } from 'react-router-dom';
import * as service from './service';
import { ElForm, ElNotification } from '@/components/el';
import { getEditForm } from './config';
import {
  getCategoryById,
  searchUserOrgBu
} from './service';
import dayjs from 'dayjs';
// import { null } from 'mathjs';
// import { null } from 'mathjs';

interface Props {
  modalVisible?: boolean;
  closeModal?: Function;
  tableRef: any,
  data: any;
}

interface State {
  loading?: boolean;
  [props: string]: any;
}

export default class EditModal extends PureComponent<Props, State> {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formRef: null,
      userSaveLoading: false,
      tableRef: [],
    };
  }
  componentDidMount() { }


  // 确定
  save = async () => {
    this.setState({
      loading: true
    })
    const { formRef } = this.state;
    if (formRef) {
      // console.log(formRef, 'formRef',)
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
      // console.log(formData, 'formData')
      const data = {
        ...formData,
        // 新增的时候到秒 后台做处理
        // registerDate: dayjs(formData.registerDate).format('YYYY-MM-DD') || dayjs(Date.now()).format('YYYY-MM-DD'), // 注册日期
        registerDate: formData.registerDate != null ? dayjs(formData.registerDate).format('YYYY-MM-DD') : null, // 注册日期
        vipBirthDate: formData.registerDate != null ? dayjs(formData.vipBirthDate).format('YYYY-MM-DD') : null, //出生日期
        // orders: [
        //   {
        //     asc: false,
        //     column: 'createTime'
        //   }
        // ]
      };
      // console.log(data, 'data')
      const res = await getCategoryById(data);
      this.setState({
        loading: false
      })
      // console.log(res, '/createCustomer')
      if (res.success) {
        if (res.success == false) {
          ElNotification({
            type: 'success',
            message: res.msg
          });
        } else {
          ElNotification({
            type: 'success',
            message: res.msg
          });
          // 请求成功 隐藏弹框
          if (!this.state.userSaveLoading) {
            this.props.closeModal();
          }
          this.props.tableRef.getTableData();
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

  // 取消
  closeModal = () => {
    this.props.closeModal();
  };

  onValuesChange = async (changedFields) => {
    // let reprCertNos = this.state.formRef.getFieldValue('reprCertNo');
    // let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // if (changedFields.reprCertType) {
    //   if (changedFields.reprCertType === 'ID_CARD') {
    //     if (reprCertNos != undefined) {
    //       if (reg.test(reprCertNos)) {
    //       } else {
    //         ElNotification({
    //           type: 'error',
    //           message: '请输入合法的身份证号'
    //         });
    //       }
    //     }
    //   }
    // }
    // let reprCertNos = changedFields;
    // let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // if (changedFields.reprCertNo) {
    //   let reprCertType = this.state.formRef.getFieldValue('reprCertType');
    //   if (reprCertType === 'ID_CARD') {
    //     if (!reg.test(changedFields.reprCertNo)) {
    //       ElNotification({
    //         type: 'error',
    //         message: '请输入合法的身份证号'
    //       });
    //     }
    //   }
    // }
  }

  afterClose = () => { };

  onRef = (formRef) => this.setState({ formRef });

  render() {
    const { modalVisible } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        width='60%'
        visible={this.props.modalVisible}
        okText='确定'
        title='新增顾客'
        onCancel={this.closeModal}
        onOk={this.save}
        okButtonProps={{
          loading: this.state.userSaveLoading
        }}
      >
        <ElForm data={this.props.data}
          onRef={this.onRef}
          // formProps={getEditForm(this.props.data)} 

          // />
          formProps={{
            items: getEditForm(this.props.data),
            onValuesChange: this.onValuesChange
          }}
        />

      </Modal>
    );
  }
}
