import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.less';
import './styleBySide.less';
import MultiTab from './MultiTab';
// import routes from "@/config/route"
import routes from '@/config/index';
import Authorized from './Authorized';
import ElHeader from './ElHeader';
import ElMenu from './ElMenu';
import ElSideMenu from './ElSideMenu';
import Sider from 'antd/lib/layout/Sider';

// todo  import routes from config
const { Content } = Layout;
interface State {
  menuVisible: boolean;
  sideMenuVisible: boolean;
}
interface Props {}
class ElLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuVisible: false,
      sideMenuVisible: true
    };
  }
  onClose = () => {
    this.setState({ menuVisible: false });
  };
  onOpen = () => {
    this.setState({ menuVisible: true });
  };
  onMenuClick = () => {
    this.setState({ sideMenuVisible: !this.state.sideMenuVisible });
  };
  render() {
    return (
      <Router
        basename={
          process.env.NODE_ENV !== 'development'
            ? process.env.REACT_APP_BASE_URL
            : ''
        }
      >
        <Layout>
          <ElHeader
            menuVisible={this.state.menuVisible}
            onOpen={this.onOpen}
            onClose={this.onClose}
            onMenuClick={this.onMenuClick}
          />
          <Layout className='ant-layout-has-sider'>
            <Sider
              theme='light'
              style={{ display: this.state.sideMenuVisible ? 'unset' : 'none' }}
            >
              <ElSideMenu
                routes={routes}
                visible={this.state.sideMenuVisible}
              />
            </Sider>
            <Content id='el-content'>
              <ElMenu
                routes={routes}
                menuVisible={this.state.menuVisible}
                onOpen={this.onOpen}
                onClose={this.onClose}
              />
              <MultiTab />
              <div className='el-content' id='el-content-id'>
                <div id='el-content-bg'>
                  <Authorized routes={routes} />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default ElLayout;
