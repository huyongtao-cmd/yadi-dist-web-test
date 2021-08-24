import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.less';
import MultiTab from './MultiTab';
// import routes from "@/config/route"
import routes from '@/config/index';
import Authorized from './Authorized';
import ElHeader from './ElHeader';
import ElMenu from './ElMenu';

// todo  import routes from config
const { Content } = Layout;
interface State {
  menuVisible: boolean;
}
interface Props {}
class ElLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }
  onClose = () => {
    this.setState({ menuVisible: false });
  };
  onOpen = () => {
    this.setState({ menuVisible: true });
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
          />
          <MultiTab />
          <Content id='el-content'>
            <ElMenu
              routes={routes}
              menuVisible={this.state.menuVisible}
              onOpen={this.onOpen}
              onClose={this.onClose}
            />
            <div className='el-content'>
              <Authorized routes={routes} />
            </div>
          </Content>
        </Layout>
      </Router>
    );
  }
}
export default ElLayout;
