import React from 'react';
import {
  Drawer,
  Row,
  Col,
  List,
  Input,
  Anchor,
  AutoComplete,
  Menu
} from 'antd';
import { ElCard } from '@/components/el';
import {
  StarOutlined,
  StarFilled,
  CloseOutlined,
  RightOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import cls from 'classnames';
import Masonry from 'react-masonry-component';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AuthMobx from '@/store/auth';
import { observer } from 'mobx-react';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Link } = Anchor;
interface Props {
  routes: any;
  history: any;
}
interface State {
  openKeys: Array<string>;
}
@observer
class ElSideMenu extends React.Component<Props, State> {
  authMobx: any;
  rootSubmenuKeys: Array<any>;
  historyUnListen: Function;
  constructor(props: Props) {
    super(props);
    this.authMobx = AuthMobx;
    this.state = {
      openKeys: []
    };
  }
  componentDidMount() {
    this.historyUnListen = this.props.history.listen((location, action) => {
      this.onLocationChanged(location, action);
    });
    this.onLocationChanged(this.props.history.location);
  }
  componentWillUnmount() {
    if (this.historyUnListen) {
      this.historyUnListen();
    }
  }
  // location就是window.location的一个子集
  // action可能的值，"PUSH", "REPLACE", "POP"
  onLocationChanged(location, action = null) {
    // 完整路径，拆分成多级路径
    let pathArray = location.pathname.split('/');
    pathArray.splice(0, 1);
    let openKeysArray = [];
    let lastKey = '';
    pathArray.forEach((a) => {
      lastKey += '/' + a;
      openKeysArray.push(lastKey);
    });

    const rootKey = openKeysArray[0];
    // 若同根的子菜单之前是打开状态，则不变
    this.state.openKeys.forEach((a) => {
      if (a.indexOf(rootKey) >= 0) {
        openKeysArray.push(a);
      }
    });
    // this.onOpenChange(openKeysArray);
    this.setState({ openKeys: openKeysArray });
  }
  // 手风琴效果会用到
  onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  getMenuByFilter() {
    return this.props.routes.filter(this.authMenufilter);
  }
  authMenufilter = (v) => {
    if (
      !v.meta.hidden &&
      (v.meta.noAuth ||
        this.authMobx.authMenuList.some((j) => j.code === v.name))
    ) {
      return true;
    }
    return false;
  };

  // 三级菜单
  buildMenus1() {
    let array1 = [];
    array1.push(<Menu.Item key='/dashboard'>首页</Menu.Item>);
    let realMenu = this.getMenuByFilter();
    realMenu.forEach((m) => {
      if (m.meta.hidden) {
        return;
      }
      const key = m.path;
      let subMenu = (
        <SubMenu key={key} title={m.meta.title}>
          {this.buildMenus2(m)}
        </SubMenu>
      );

      array1.push(subMenu);
    });
    this.rootSubmenuKeys = array1.map((a) => a.key);
    return array1;
  }

  buildMenus2(parentRoute) {
    let array = [];
    if (parentRoute.routes == null) {
      return array;
    }
    parentRoute.routes.filter(this.authMenufilter).forEach((m) => {
      if (m.meta.hidden) {
        return;
      }
      const key = m.path;
      let subMenu = null;
      const secondList = this.buildMenus3(m, key);
      if (!Array.isArray(secondList)) {
        subMenu = <Menu.Item key={key}>{m.meta.title}</Menu.Item>;
      } else {
        if (m.name === 'inventoryserialno' || m.name === 'inventoryCheck' || m.name === 'administration' || m.name === 'numbering') {
          subMenu = (
            <SubMenu key={key} title={m.meta.title}>
              {this.buildMenus3(m, key)}
            </SubMenu>
          );
        } else {
          subMenu = (
            this.buildMenus3(m, key)
          );
        }
      }
      // subMenu = (
      //   <SubMenu key={key} title={m.meta.title}>
      //     {this.buildMenus3(m, key)}
      //   </SubMenu>
      // );
      array.push(subMenu);
    });
    return array;
  }
  buildMenus3(parentRoute, parentKey) {
    let array = [];
    if (parentRoute.routes == null) {
      return null;
    }
    parentRoute.routes.filter(this.authMenufilter).forEach((m) => {
      if (m.meta.hidden) {
        return;
      }
      const key = m.path;
      let subMenu = <Menu.Item key={key}>{m.meta.title}</Menu.Item>;

      array.push(subMenu);
    });
    return array;
  }

  navTo = (routeName) => {
    this.props.history.push(routeName);
  };
  onSelect = (param) => {
    const { item, key, keyPath, selectedKeys, domEvent } = param;
    this.navTo(key);
  };

  render() {
    const { openKeys } = this.state;
    return (
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={[this.props.history.location.pathname]}
        onSelect={this.onSelect}
      >
        {this.buildMenus1()}
      </Menu>
    );
  }
}
export default withRouter(ElSideMenu);
