import React from 'react';
import { Layout, Dropdown, Menu, Input } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  FullscreenOutlined,
  BellOutlined,
  FullscreenExitOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined
} from '@ant-design/icons';
import screenfull from 'screenfull';
import store from '@/store';
import ChangePWModal from '@/project/components/el/Modal/ChangePWModal';
// import { Link } from 'react-router-dom';
// import { history } from 'react-router-dom';

const { Header } = Layout;
const { Item, Divider } = Menu;

interface Props {
  menuVisible: boolean;
  onOpen: any;
  onClose: any;
  // history?: history,
}
interface State {
  isFullscreen: boolean;
  changePWVis: boolean;
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
        <UserOutlined />
        <a style={{ display: 'inline' }} onClick={changePW}>
          修改密码
        </a>
      </Item>
      {/* <Item key='settings'>
        <SettingOutlined />
        <span>个人设置</span>
      </Item> */}
      <Divider />
      <Item key='logout'>
        <LogoutOutlined />
        <a
          style={{ display: 'inline' }}
          onClick={() =>
            location.replace(
              process.env.NODE_ENV !== 'development'
                ? process.env.REACT_APP_BASE_URL + '/login'
                : '/login'
            )
          }
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
        <UserOutlined className='avatar' />
        <span className='username'>{store.principal['username']}</span>
      </div>
    </Dropdown>
  );
};

class ElHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFullscreen: false,
      changePWVis: false
    };
  }
  fullScreen = () => {
    if (screenfull.isEnabled) {
      this.setState({ isFullscreen: !this.state.isFullscreen });
      screenfull.toggle();
    }
  };
  componentDidMount() {}
  toggleMenu = () => {
    if (this.props.menuVisible) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
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
        <div className='Menu' onClick={this.toggleMenu}>
          <MenuOutlined />
          <span className='menu-text'>菜单</span>
        </div>
        <div className='Logo'>
          {/* <div className='LogoName'>中燃后台业务管理系统</div> */}
          <div className='LogoName'></div>
        </div>
        <div className='Search'>
          <Input suffix={<SearchOutlined />} />
        </div>
        <div className='Icon'>
          <BellOutlined />
          <FullscreenOutlined
            hidden={this.state.isFullscreen}
            onClick={this.fullScreen}
          />
          <FullscreenExitOutlined
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
