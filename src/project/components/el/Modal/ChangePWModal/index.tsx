import React, { useRef, useState } from 'react';
import { Button, Form, Input, Modal as AntdModal, Spin } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { isNil, isEmpty } from 'ramda';
import { ElForm, ElNotification } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { zeros } from 'mathjs';
import { LockOutlined } from '@ant-design/icons';
import { changePW } from './service';
import store from '@/store';
import app from '@/utils/appCommon';

interface ChangePWModalProps extends ModalProps {
  loading?: boolean;
}

const ChangePWModal = ({
  visible,
  onCancel = () => {}
}: ChangePWModalProps) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({ loading: false });
  const modalCancel = (e) => {
    onCancel(e);
    form.resetFields();
  };
  const onOK = async () => {
    const values = await form.validateFields();
    if (values.currentPassword == values.new1) {
      ElNotification({ type: 'warning', message: '新旧密码不能相同' });
      return;
    }
    if (values.new1 != values.new2) {
      ElNotification({ type: 'warning', message: '新密码2次输入不一致' });
      return;
    }

    const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d!#@*&.]{8,}$/;
    if (!pattern.test(values.new1)) {
      ElNotification({
        type: 'warning',
        message: '密码规则：英文大小写+数字，8位以上'
      });
      return;
    }
    const data = {
      currentPassword: values.currentPassword,
      userId: store.principal['id'],
      newPassword: values.new1
    };
    setState({ loading: true });
    const res = await changePW(data);
    setState({ loading: false });
    app.ShowMsg(res);
    if (res.success) {
      modalCancel(null);
    }
  };

  return (
    <AntdModal
      width='50%'
      title='修改密码'
      visible={visible}
      onCancel={modalCancel}
      onOk={onOK}
    >
      <Spin spinning={state.loading}>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          labelCol={{ style: { width: 100 } }} // 默认值
          onFinish={onOK}
          form={form}
        >
          <Form.Item
            label='旧密码'
            name='currentPassword'
            required
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input.Password
              className={'input'}
              placeholder='请输入旧密码'
              autoComplete='off'
            />
          </Form.Item>

          <Form.Item
            label='新密码'
            name='new1'
            required
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password autoComplete='off' placeholder='请输入新密码' />
          </Form.Item>
          <Form.Item
            label='重复新密码'
            name='new2'
            required
            rules={[{ required: true, message: '再次输入新密码' }]}
          >
            <Input.Password autoComplete='off' placeholder='请输入新密码' />
          </Form.Item>
        </Form>
      </Spin>
    </AntdModal>
  );
};

export default ChangePWModal;
