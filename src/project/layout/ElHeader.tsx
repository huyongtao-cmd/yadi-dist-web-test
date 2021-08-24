import React from 'react';
import { Layout, Dropdown, Menu, Input, Card } from 'antd';
import {
  MenuWhite,
  FullscreenWhite,
  FullscreenexitWhite,
  SetBlack,
  UserBlack,
  SearchWhite,
  LogoutBlack,
  BellWhite
} from '@/components/el/ElIcon';
import QRCode from 'qrcode.react';
import screenfull from 'screenfull';
import store from '@/store';
import MultiTab from '@/layout/MultiTab';
import ChangePWModal from '@/project/components/el/Modal/ChangePWModal';
import requests from '@/utils/request';
import { ElNotification } from '@/components/el';

const { Header } = Layout;
const { Item, Divider } = Menu;

interface Props {
  menuVisible: boolean;
  onOpen: any;
  onClose: any;
  onMenuClick: any;
  // history?: history,
}
interface State {
  isFullscreen: boolean;
  changePWVis: boolean;
  androidTest: any;
  androidProd: any;
  iosTest: any;
  iosProd: any;
}



const UserAppQrCode = ({ androidTest, androidProd, iosTest, iosProd }) => {
  const dropDownMenu = (
    <Card.Grid className='userAppQrcode' style={{ background: '#fff', display: 'flex', padding: '26px 30px', borderRadius: '8px', boxShadow: '0 10px 14px rgba(51,51,51,.25)' }}>
      <div style={{ paddingRight: '20px' }}>
        <p>安卓手机下载</p>
        <QRCode
          id='qrCode'
          value={process.env.NODE_ENV !== 'development' ? androidProd[0] : androidTest[0]}
          size={90} // 二维码的大小
          fgColor='#000000' // 二维码的颜色
          style={{ margin: 'auto' }}
        // imageSettings={{ // 二维码中间的logo图片
        //   src: 'logoUrl',
        //   height: 60,
        //   width: 60,
        //   excavate: true, // 中间图片所在的位置是否镂空
        // }}
        />
      </div>
      <div style={{ paddingLeft: '20px' }}>
        <p>苹果手机下载</p>
        <QRCode
          id='qrCode'
          value={process.env.NODE_ENV !== 'development' ? iosProd[0] : iosTest[0]}
          size={90} // 二维码的大小
          fgColor='#000000' // 二维码的颜色
          style={{ margin: 'auto' }}
        // imageSettings={{ // 二维码中间的logo图片
        //   src: 'logoUrl',
        //   height: 60,
        //   width: 60,
        //   excavate: true, // 中间图片所在的位置是否镂空
        // }}
        />
      </div>
    </Card.Grid>

  );

  return (
    <Dropdown
      overlayStyle={{ zIndex: 1070 }}
      overlay={dropDownMenu}
      placement='bottomCenter'
    >
      <div className='User'>
        <span className='username'> 下载APP</span>
      </div>
    </Dropdown>
  );
}

const UserMenu = ({ onPW }) => {
  const handleClickMenu = ({ key }) => {
    // console.log('history', history);
    // const {history} = this.props;
    // switch (key) {
    //   case 'logout':
    //     history.push({
    //       pathname: 'login/logout',
    //     });
    //     break;
    //   case 'changePW':
    //     break;
    //   case 'settings':
    //     break;
    //   default:
    //     break;
    // }
  };

  const changePW = () => {
    onPW();
  };
  const dropDownMenu = (
    <Menu onClick={handleClickMenu}>
      <Item key='changePW'>
        <UserBlack />
        <a style={{ display: 'inline' }} onClick={changePW}>
          修改密码
        </a>
      </Item>
      <Item key='logout'>
        <LogoutBlack />
        <a
          style={{ display: 'inline' }}
          onClick={() => location.replace('/login')}
        >
          退出登录
        </a>
      </Item>
    </Menu>
  );
  return (
    <Dropdown
      overlayStyle={{ zIndex: 1070 }}
      overlay={dropDownMenu}
      placement='bottomRight'
    >
      <div className='User'>
        <UserBlack className='avatar' />
        <span className='username'>{store.principal['username'] || ''}</span>
      </div>
    </Dropdown>
  );
};

class ElHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFullscreen: false,
      changePWVis: false,
      androidTest: [],
      androidProd: [],
      iosTest: [],
      iosProd: []
    };
  }
  fullScreen = () => {
    if (screenfull.isEnabled) {
      this.setState({ isFullscreen: !this.state.isFullscreen });
      screenfull.toggle();
    }
  };

  getUrl = async () => {
    let androidTest = '';
    let androidProd = '';
    let iosTest = '';
    let iosProd = '';
    const res = await requests(
      `/yd-system/sys/codes/combo/APP/APPURL`,
      { method: 'get' }
    );
    if (res.success) {
      androidTest = res.data.filter(item => item.valDesc === 'androidTest').map(itm => itm.udcVal);
      androidProd = res.data.filter(item => item.valDesc === 'androidProd').map(itm => itm.udcVal);
      iosTest = res.data.filter(item => item.valDesc === 'iosTest').map(itm => itm.udcVal);
      iosProd = res.data.filter(item => item.valDesc === 'iosProd').map(itm => itm.udcVal);
      console.log(androidTest, androidProd, iosTest, iosProd);
      this.setState({
        androidTest,
        androidProd,
        iosTest,
        iosProd
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.message || res.data || '操作失败！'
      });
    }
  }

  componentDidMount() {
    this.getUrl();
  }
  toggleMenu = () => {
    if (this.props.menuVisible) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };
  onMenuClick = () => {
    this.props.onMenuClick();
  };
  onPW = () => {
    this.setState({ changePWVis: true });
  };
  onPWClose = () => {
    this.setState({ changePWVis: false });
  };
  render() {
    console.log('this.props', this.props, history);
    return (
      <Header>
        <div
          className='Menu'
          onDoubleClick={this.toggleMenu}
          onClick={this.onMenuClick}
        >
          <MenuWhite />
        </div>
        <div className='Logo'>
          {/* <div className='LogoName'>中燃后台业务管理系统</div> */}
          <div className='LogoName'></div>
        </div>
        <div className='Search'>
          <Input suffix={<SearchWhite />} />
        </div>
        <UserAppQrCode
          androidTest={this.state.androidTest}
          androidProd={this.state.androidProd}
          iosTest={this.state.iosTest}
          iosProd={this.state.iosProd}
        />
        <div className='Icon'>
          <BellWhite />
          <FullscreenWhite
            hidden={this.state.isFullscreen}
            onClick={this.fullScreen}
          />
          <FullscreenexitWhite
            hidden={!this.state.isFullscreen}
            onClick={this.fullScreen}
          />
        </div>
        <UserMenu onPW={this.onPW} />
        <ChangePWModal
          visible={this.state.changePWVis}
          onCancel={this.onPWClose}
        ></ChangePWModal>
      </Header>
    );
  }
}
export default ElHeader;
