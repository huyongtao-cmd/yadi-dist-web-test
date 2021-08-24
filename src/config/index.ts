import React from 'react';

// import UserCenterRouters from './routes/UserCenter';
import SysRouters from './routes/sys'; // 系统路由
import Yadi from './routes/OrgCenter/index1'; // 雅迪路由

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { title: '首页', hidden: true, keepAlive: true, noAuth: true },
    component: React.lazy(() => import('@/project/Dashboard'))
  },
  {
    path: '/403',
    name: 'err403',
    meta: { title: '403', hidden: true, noAuth: true },
    component: React.lazy(() => import('@/page/errPage/Err403'))
  },
  ...Yadi,
  ...SysRouters
];
export default routes;
