import React from 'react';
const SysRouters = [
  {
    path: '/sys',
    name: 'sys',
    meta: { title: '系统设置' },
    routes: [
      {
        path: '/sys/numbering',
        name: 'numbering',
        meta: { title: '发号器设置' },
        routes: [
          {
            path: '/sys/numbering/rules',
            name: 'rules',
            meta: { title: '规则设置', keepAlive: true },
            component: React.lazy(() => import('@/page/sys/numbering/Rule'))
          },
          {
            path: '/sys/numbering/nextnum',
            name: 'nextnum',
            meta: { title: '下一编号', keepAlive: true },
            component: React.lazy(() => import('@/page/sys/numbering/NextNum'))
          }
        ]
      },
      {
        path: '/sys/administration',
        name: 'administration',
        meta: { title: '用户角色权限' },
        routes: [
          {
            path: '/sys/administration/users',
            name: 'users',
            meta: { title: '用户列表', keepAlive: true, },
            component: React.lazy(
              () => import('@/page/sys/administration/User')
            )
          },
          {
            path: '/sys/administration/roles',
            name: 'roles',
            meta: { title: '角色列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/sys/administration/Role')
            )
          },
          {
            path: '/sys/administration/permissions',
            name: 'permissions',
            meta: { title: '权限列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/sys/administration/Permission')
            )
          }
        ]
      },
      // {
      //   path: '/sys/metadata',
      //   name: 'metadata',
      //   meta: { title: '数据字典管理' },
      //   routes: [
      //     {
      //       path: '/sys/metadata/udc',
      //       name: 'udc',
      //       meta: { title: '分类码管理' },
      //       component: React.lazy(() => import('@/page/sys/metadata/Udc'))
      //     }
      //   ]
      // }
      {
        path: '/sys/metadata/udc',
        name: 'udc',
        meta: { title: '数据字典管理', keepAlive: true },
        component: React.lazy(() => import('@/page/sys/metadata/Udc'))
      }
    ]
  }
];

// 统一加keepAlive
// SysRouters.forEach((a1) => {
//   a1.routes.forEach((a2) => {
//     a2.routes.forEach((a3) => {
//       a3.meta.keepAlive = false;
//     });
//   });
// });

export default SysRouters;
