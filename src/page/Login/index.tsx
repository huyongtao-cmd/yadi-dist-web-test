import React from 'react';
import { Tabs, Form, Input, Checkbox, Button, message } from 'antd';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import * as service from './service';
import './style.less';

const { TabPane } = Tabs;

interface State {
  loading: boolean;
  captchaLoading: boolean;
  isShow: boolean;
  answer: string;
  captcha: { [props: string]: any };
}

@inject('store')
@observer
class Login extends React.Component<{ [props: string]: any }, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      captchaLoading: false,
      captcha: {},
      isShow: false,
      answer: ''
    };
  }

  componentDidMount() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('BuIdList');
    this.getCaptcha();
  }

  //调用接口
  getCaptcha = async () => {
    this.setState({ captchaLoading: true });
    const res: any = await service.getCaptcha();
    console.log(res);
    if (res.success) {
      // const resAnswer = await service.getAnswer(res.data?.uuid);
      // console.log(resAnswer);
      this.setState({ captcha: res.data });
    } else {
      message.error(res.msg);
    }
    this.setState({ captchaLoading: false });
  };
  login = async (params) => {
    this.setState({ loading: true });
    const res: any = await service.login({
      ...params,
      captcha: '1',
      capuid: this.state.captcha.uuid
    });
    console.log(res);
    this.setState({ loading: false });
    if (res.access_token) {
      localStorage.setItem('Authorization', 'bearer ' + res.access_token);
      // 浏览器本地缓存token
      let userRes = await service.getCurrent();
      // 全局数据栈缓存用户信息
      if (userRes.success) {
        console.log(userRes);
        this.props.store.updatePrincipal(userRes.data && userRes.data);
        //跳转至首页
        this.props.history.push(
          // process.env.NODE_ENV !== 'development'
          //   ? process.env.REACT_APP_BASE_URL + '/dashboard'
          '/dashboard',
          { replace: true }
        );
        //获取当前权限的门店和经销商信息
        let buRes = await service.getBu();
        if (buRes.success) {
          localStorage.setItem(
            'BuIdList',
            JSON.stringify(buRes.data && buRes.data)
          );
        }
        let inBuRes = await service.getInBu();
        if (inBuRes.success) {
          localStorage.setItem(
            'inBuIdList',
            JSON.stringify(inBuRes.data && inBuRes.data)
          );
        }
      } else {
        // localStorage.removeItem('Authorization');
        // location.replace(
        //   process.env.NODE_ENV !== 'development'
        //     ? process.env.REACT_APP_BASE_URL + '/login'
        //     : '/login'
        // );
      }
    } else {
      // 重新获取验证码
      this.getCaptcha();
      message.error(res.msg || res.error_description || '未知错误');
    }
  };

  // 页面交互事件处理
  handleRefreshCaptcha = () => {
    this.getCaptcha();
  };
  handleLogin = (values) => {
    this.login(values);
  };
  handleValidateFail = ({ errorFields }) => {
    message.error(errorFields[0].errors[0]);
  };

  render() {
    return (
      <div className={'container'}>
        <div className={'content'}>
          <i className={'img'} />
          <div>
            <div className={'title'}>雅迪进销存管理系统</div>
            <Tabs className={'tabs'} tabBarGutter={72} size='large'>
              <TabPane tab='账号密码登录' key='1'>
                <Form
                  className={'form'}
                  onFinish={this.handleLogin}
                  onFinishFailed={this.handleValidateFail}
                  initialValues={{
                    username: '',
                    password: ''
                  }}
                >
                  <Form.Item
                    name='username'
                    required
                    rules={[{ required: true, message: '请输入账户名' }]}
                  >
                    <Input
                      prefix={<UserOutlined className={'icon'} />}
                      className={'input'}
                      placeholder='账户名'
                      autoComplete='off'
                    />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    required
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className={'icon'} />}
                      className={'input'}
                      placeholder='密码'
                      autoComplete='off'
                    />
                  </Form.Item>
                  {/* <Form.Item
                  name='captcha'
                  required
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input
                    className={'captchaInput'}
                    placeholder='验证码'
                    autoComplete='off'
                    addonAfter={
                      <div
                        onClick={this.handleRefreshCaptcha}
                        style={{ width: 80 }}
                      >
                        {this.state.captchaLoading ? (
                          <LoadingOutlined />
                        ) : (
                          <img
                            src={this.state.captcha && this.state.captcha.img}
                            alt='captcha'
                            className={'captcha'}
                          />
                        )}
                      </div>
                    }
                  />
                </Form.Item> */}
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className={'input'}
                      loading={this.state.loading}
                    >
                      登录
                    </Button>
                    {this.state.isShow ? (
                      <div id='answer'>{this.state.answer}</div>
                    ) : (
                      ''
                    )}
                  </Form.Item>
                </Form>
              </TabPane>
              {/* <TabPane tab='手机号登录' key='2' /> */}
            </Tabs>
          </div>
          {/* <span className={'footer'}>
            Copyright© 2021 云时通产品研发技术部出品{' '}
            <a href='https://beian.miit.gov.cn/#/Integrated/recordQuery'>
              沪ICP备18031690号-1
            </a>
          </span> */}
        </div>
      </div >
    );
  }
}
export default Login;
