import { makeAutoObservable } from 'mobx';
import routers from '@/config/index';
import { dropByCacheKey, getCachingKeys, clearCache } from 'ylwbl-cache-route';
import { pathToRegexp } from 'path-to-regexp';

import { matchPath } from 'react-router';
class MultiTabMobx {
  history: any;
  tabList: Array<any> = [
    {
      path: '/dashboard',
      selectEd: true,
      url: '/dashboard',
      name: 'dashboard',
      meta: {
        title: '首页',
        hidden: true
      }
    }
  ];
  //全部的路由
  routersList: any;
  constructor() {
    //  自定绑定
    makeAutoObservable(this);
  }

  // 保存一次histroy对象
  saveHistory = (history) => {
    this.history = history;
  };
  //递归处理路由
  loopRouters = (route, data) => {
    route.map((row) => {
      data.push(row);
      if (row.routes && row.routes.length > 0) {
        this.loopRouters(row.routes, data);
      }
    });
    return data;
  };

  // 把项目路由处理成平级路由
  updateRouter = () => {
    this.routersList = this.loopRouters(routers, []);
    return this.routersList;
  };

  // 跳转到指定页面
  jumpCurrent = (pageItem) => {
    if (pageItem) {
      this.history &&
        this.history.push({
          pathname: pageItem.url
        });
    } else {
      throw '未传入路径';
    }
  };
  // 在路由里面查找当前路由地址
  findOneRoute = (pathname) => {
    let currentRoute = this.routersList
      .filter((route) => matchPath(pathname, route))
      .map((item) => Object.assign({}, matchPath(pathname, item), item))
      .filter((row, item) => {
        if (row.isExact) {
          return { ...row, ...item };
        }
      });
    if (!currentRoute[0]) {
      throw '未找到系统路由地址';
    }
    return currentRoute[0];
  };
  /*
    向tablist加入一个
    @param pageItem
  */
  add = (pathname) => {
    // this.tabList = this.tabList.concat([tempMenu]);
    let route = this.findOneRoute(pathname);
    this.tabList.map((row) => {
      row.selected = false;
    });
    //判断找到的路由地址 在之前的地址里是否存在
    let tempIndex = this.tabList.findIndex((row) => row.path === route.path);
    if (tempIndex === -1) {
      route.selected = true;
      // this.tabList = this.tabList.concat([route]);
      // tab页新开后放在第一页
      let newTabList = this.tabList;
      newTabList.splice(1, 0, route);
      this.tabList = newTabList;
    } else {
      this.tabList[tempIndex].selected = true;
    }
  };

  /*
    根据传入的参数删除tablelist里的数据
  */
  del = (pageItem) => {
    const cacheKeys = getCachingKeys();
    if (pageItem.name && cacheKeys.includes(pageItem.name)) {
      dropByCacheKey(pageItem.name);
    }
    let tempArry = [];
    this.tabList.map((row) => {
      if (row.path !== pageItem.path) {
        tempArry.push(row);
      }
    });
    this.tabList = tempArry;
    let prevRoute = this.tabList[this.tabList.length - 1];
    if (prevRoute) {
      //跳转到上一个页面
      this.jumpCurrent(prevRoute);
    }
  };

  //关闭全部 返回指定页面
  async closeAllTabs(pathname) {
    await clearCache();
    this.tabList = [];
    this.history.push({
      pathname: pathname
    });
  }

  //关闭当前路由地址跳转到下一个路由地址,第二个参数为一个record boolean的函数,如果return false,则不清缓存
  closeCurrentToPath = async (nextpath, needClearNextCache?: () => boolean) => {
    //查找当前路由 并删除
    let tempIndex = this.tabList.findIndex((row) => row.selected);
    if (tempIndex > -1) {
      const cacheKeys = getCachingKeys();
      const temp = this.tabList[tempIndex];
      const needClear =
        !needClearNextCache || (needClearNextCache && needClearNextCache());
      if (needClear) {
        const matchRoute = this.routersList.find((v) => {
          let temp = pathToRegexp(v.path).exec(nextpath);
          return temp;
        });
        if (matchRoute) {
          this.tabList.splice(tempIndex, 1);
          await dropByCacheKey(matchRoute.name);
          this.jumpCurrent({
            url: nextpath
          });
        } else {
          this.jumpCurrent({
            url: nextpath
          });
        }
      } else {
        this.tabList.splice(tempIndex, 1);
        this.jumpCurrent({
          url: nextpath
        });
      }
      if (temp.name && cacheKeys.includes(temp.name)) {
        await dropByCacheKey(temp.name);
        this.tabList.splice(tempIndex, 1);
        this.jumpCurrent({
          url: nextpath
        });
      }
    } else {
      this.jumpCurrent({
        url: nextpath
      });
    }
  };

  closeCurrentToNext = () => {
    let findRoute = this.tabList.find((row) => row.selected);
    findRoute && this.del(findRoute);
  };
}
export default new MultiTabMobx();
