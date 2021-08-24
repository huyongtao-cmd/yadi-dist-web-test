// @ts-nocheck
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ContentLoading from './ContentLoading';
import { getCurrentUserMenu, getCurrentUserCurrentPageAction } from './service';
import MultiTabMobx from '@/store/multiTab';
import AuthMobx from '@/store/auth';
import AppStore from '@/store';
import { pathToRegexp } from 'path-to-regexp';
import {
  CacheRoute,
  CacheSwitch,
  dropByCacheKey,
  refreshByCacheKey
} from 'ylwbl-cache-route';
interface State {
  authMenuList: Array<any>;
  routeList: Array<any>;
}
// 目前使用了react-router-cache-route用于多tab缓存
// 此块整体思路为首先展平有component的路由,防止父级路由卸载导致子路由组件缓存丢失
// 然后使用CacheRoute进行缓存
// 需要缓存的路由在meta中添加keepAlive: true 即可
// 手动清除缓存 todo
class Authorized extends React.Component<any, State> {
  multiTabStore: any;
  authMobx: any;
  constructor(props) {
    super(props);
    this.state = {
      authMenuList: [],
      routeList: []
    };
    this.multiTabStore = MultiTabMobx;
    this.authMobx = AuthMobx;
  }

  componentDidMount() {
    const { location, history } = this.props;
    let routerList = this.multiTabStore.updateRouter();
    // this.redirectRoutes(routerList);
    this.multiTabStore.saveHistory(history);
    if (location.pathname !== '/') {
      this.multiTabStore.add(location.pathname);
    }
    // console.log(redirectRoutes);

    // 是否开启页面权限
    this.getCurrentUserMenu();
  }
  getCurrentUserMenu = async () => {
    const res = await getCurrentUserMenu();
    if (res.success) {
      this.setState(
        {
          authMenuList: res.data
        },
        () => {
          this.getRouteList(this.props.routes, this.state.authMenuList);
        }
      );
      this.authMobx.saveAuthMenuList(res.data);
    }
  };
  authRoute = (route: any, callBack) => {
    const { authMenuList } = this.state;
    const { location } = this.props;
    let page = authMenuList.find((j) => {
      if (j.code === route.name) {
        return true;
      }
    });
    if (page) {
      if (!!pathToRegexp(route.path).exec(location.pathname)) {
        if (callBack) {
          callBack(page.id);
        }
      }
      return true;
    }
    return false;
  };
  getCurrentUserCurrentPageAction = async (menuId) => {
    const res = await getCurrentUserCurrentPageAction(menuId);
    if (res.success) {
      this.authMobx.saveAuthActionList(res.data);
    }
  };
  generateRoutes = (routes, authMenuList) => {
    let routeList = [];
    const generateRoutes = (routes, authMenuList) => {
      if (Array.isArray(routes)) {
        routes
          .filter(
            (v) =>
              v.meta.noAuth ||
              this.authRoute(v, (menuId) =>
                this.getCurrentUserCurrentPageAction(menuId)
              )
          )
          .forEach((v) => {
            if (v.component) {
              routeList.push(
                <CacheRoute
                  {...v}
                  key={v.name}
                  push={this.push}
                  refresh={this.refresh}
                  store={{ AppStore, MultiTabMobx, AuthMobx }}
                  cacheKey={v.name}
                  exact={!!v.component}
                  when={() => {
                    return !!v.meta.keepAlive;
                  }}
                />
              );
            }
            if (v.routes) {
              {
                generateRoutes(v.routes, authMenuList);
              }
            }
          });
      }
    };
    generateRoutes(routes, authMenuList);
    return routeList;
  };
  push = async (path: string, needClearCache?: () => boolean) => {
    const needClear = !needClearCache || (needClearCache && needClearCache());
    if (needClear) {
      const matchRoute = this.state.routeList.find((v) => {
        let temp = pathToRegexp(v.props.path).exec(path);
        return temp;
      });
      if (matchRoute) {
        await dropByCacheKey(matchRoute.props.name);
        this.props.history.push(path);
      } else {
        this.props.history.push(path);
      }
    } else {
      this.props.history.push(path);
    }
  };
  refresh = (cacheKey: string) => {
    refreshByCacheKey(cacheKey);
  };
  getRouteList = (routes, authMenuList) => {
    let routeList = [];
    const generateRoutes = (routes, authMenuList) => {
      if (Array.isArray(routes)) {
        routes
          .filter(
            (v) =>
              v.meta.noAuth ||
              this.authRoute(v, (menuId) =>
                this.getCurrentUserCurrentPageAction(menuId)
              )
          )
          .forEach((v) => {
            if (v.component) {
              routeList.push(
                <CacheRoute
                  {...v}
                  key={v.name}
                  push={this.push}
                  refresh={this.refresh}
                  store={{ AppStore, MultiTabMobx, AuthMobx }}
                  cacheKey={v.name}
                  exact={!!v.component}
                  when={() => {
                    return !!v.meta.keepAlive;
                  }}
                />
              );
            }
            if (v.routes) {
              {
                generateRoutes(v.routes, authMenuList);
              }
            }
          });
      }
    };
    generateRoutes(routes, authMenuList);
    this.setState(
      {
        routeList
      },
      () => {
        // this.redirectRoutes(routes);
      }
    );
  };
  redirectRoutes = (routeList) => {
    const { authMenuList } = this.state;
    const { location } = this.props;
    const matchRoute = routeList.find(
      (v) => v.path && pathToRegexp(v.path).test(location.pathname)
    );
    const isExist =
      !!matchRoute ||
      ['/login', '/err', '/erra', '/dashboard', '/', '/404', '/403'].includes(
        location.pathname
      );

    const isPermed =
      ['/login', '/err', '/erra', '/dashboard', '/', '/404', '/403'].includes(
        location.pathname
      ) ||
      authMenuList.some((v) => {
        return (
          v.meta.noAuth ||
          (matchRoute && matchRoute.name === v.code) ||
          (matchRoute && matchRoute.meta.noAuth)
        );
      });
    if (isExist) {
      // do nothing
      if (!isPermed) {
        window.location.replace('/403');
      }
    } else {
      //
      window.location.replace('/404');
    }
  };
  componentWillReceiveProps(nextProps) {
    // console.log('...componentWillReceiveProps...', this.props);
    // console.log('...componentWillReceiveProps...', nextProps);
    //如果点击的是路由跳转，不是快速定位
    //先判断是否点击的是锚点
    if (!nextProps.location.hash.includes('#')) {
      if (this.props.location.key !== nextProps.location.key) {
        this.multiTabStore.add(nextProps.location.pathname);
      }
    }
  }

  render() {
    return (
      <CacheSwitch>
        <Redirect exact from='/' to='/dashboard' />
        <React.Suspense fallback={<ContentLoading />}>
          {/* <Route path='/404' component={Err404} /> */}
          {/* {this.state.routeList} */}
          {this.generateRoutes(this.props.routes, this.state.authMenuList)}
        </React.Suspense>
      </CacheSwitch>
    );
  }
}
export default withRouter(Authorized);
