import React from 'react';
const OrgCenterRouters = [
  {
    path: '/orgCenter',
    name: 'orgCenter',
    meta: { title: '组织中心' },
    routes: [
      {
        path: '/orgCenter/addr',
        name: 'addr',
        meta: { title: '地址簿' },
        routes: [
          {
            path: '/orgCenter/addr/list',
            name: 'addrList',
            meta: { title: '地址列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/Address')
            )
          },
          // {
          //   path: '/orgCenter/addr/add',
          //   name: 'addrAdd',
          //   meta: { title: '添加地址' },
          //   component: React.lazy(
          //     () => import('@/page/support/orgCenter/Address/Add')
          //   )
          // },
          {
            path: '/orgCenter/addr/view/:id',
            name: 'addrDetail',
            meta: { title: '地址详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/Address/View')
            )
          }
        ]
      },
      // {
      //   path: '/orgCenter/orgCenterset',
      //   name: 'set',
      //   meta: { title: '仓库设置' },
      //   routes: [
      //     {
      //       path: '/orgCenter/orgCenterset/set/wh',
      //       name: 'setwh',
      //       meta: { title: '仓库设置' },
      //       component: React.lazy(() => import('@/page/Example/Example'))
      //     }
      //   ]
      // },
      {
        path: '/orgCenter/orgData',
        name: 'orgData',
        meta: { title: '组织主数据' },
        routes: [
          {
            path: '/orgCenter/orgData/orgList',
            name: 'orgList',
            meta: { title: '组织列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgData/List')
            )
          },
          {
            path: '/orgCenter/orgData/orgList/detail/:type/:id',
            name: 'orgEdit',
            meta: { title: '编辑组织', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgData/Edit')
            )
          }
        ]
      },
      {
        path: '/orgCenter/ouData',
        name: 'ouData',
        meta: { title: '公司主数据' },
        routes: [
          {
            path: '/orgCenter/ouData/list',
            name: 'ouList',
            meta: { title: '公司列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/ouData/List')
            )
          },
          {
            path: '/orgCenter/ouData/add/:type',
            name: 'createOu',
            meta: { title: '新建公司', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/ouData/Edit')
            )
          },
          {
            path: '/orgCenter/ouData/edit/:type/:id',
            name: 'editOu',
            meta: { title: '编辑公司', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/ouData/Edit')
            )
          },
          {
            path: '/orgCenter/ouData/detail/:type/:id',
            name: 'ouDetail',
            meta: { title: '公司详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/ouData/Edit')
            )
          }
        ]
      },
      {
        path: '/orgCenter/orgTree',
        name: 'orgTree',
        meta: { title: '组织树管理' },
        routes: [
          {
            path: '/orgCenter/orgTree/list',
            name: 'orgTreeList',
            meta: { title: '组织树列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgTree/List')
            )
          },
          {
            path: '/orgCenter/orgTree/add',
            name: 'orgTreeAdd',
            meta: { title: '组织树新增', keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgTree/Edit')
            )
          },
          {
            path: '/orgCenter/orgTree/permission/:id/:version',
            name: 'orgTreePermissionEdit',
            meta: { title: '组织树权限编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/OrgPermission')
            )
          },
          {
            path: '/orgCenter/orgTree/edit/:id/:version',
            name: 'orgTreeEdit',
            meta: { title: '组织树编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgTree/Edit')
            )
          },
          {
            path: '/orgCenter/orgTree/newVersion/:id/:version',
            name: 'orgTreeNewVersion',
            meta: { title: '创建组织树新版本', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgTree/Edit')
            )
          },
          {
            path: '/orgCenter/orgTree/resume/:id',
            name: 'orgTreeResume',
            meta: { title: '组织树履历', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/page/support/orgCenter/orgTree/Resume')
            )
          }
        ]
      },
      {
        path: '/orgCenter/mainData',
        name: 'mainData',
        meta: { title: '主数据' },
        routes: [
          {
            path: '/orgCenter/mainData/bikeDoc',
            name: 'bikeDoc',
            meta: { title: '商品档案列表', keepAlive: true },
            component: React.lazy(() => import('@/project/mainData/bikeDoc'))
          },
          {
            path: '/orgCenter/mainData/bikeDoc/detail/:type/:id',
            name: 'bikeDetail',
            meta: { title: '商品详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/mainData/bikeDoc/Edit')
            )
          },
          {
            path: '/orgCenter/mainData/servingStation/list',
            name: 'servingStation',
            meta: { title: '维修站列表', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/servingStation')
            )
          },
          {
            path: '/orgCenter/mainData/servingStation/detail/:type/:id',
            name: 'servingStationDetail',
            meta: { title: '维修站详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/servingStation/Edit')
            )
          },
          {
            path: '/orgCenter/mainData/dealer/list',
            name: 'dealer',
            meta: { title: '经销商列表', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/dealer')
            )
          },
          {
            path: '/orgCenter/mainData/dealer/detail/:type/:id',
            name: 'dealerDeail',
            meta: { title: '经销商详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/dealer/Edit')
            )
          },
          {
            path: '/orgCenter/mainData/empData/empList',
            name: 'empList',
            meta: { title: '员工列表', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/empData/empList')
            )
          },
          {
            path: '/orgCenter/mainData/empData/empList/detail/:type/:id',
            name: 'empEdit',
            meta: { title: '员工详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/empData/empList/Edit')
            )
          }
        ]
      },
      {
        path: '/orgCenter/store',
        name: 'store',
        meta: { title: '门店管理' },
        routes: [
          {
            path: '/orgCenter/store/list',
            name: 'storeList',
            meta: { title: '门店列表', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/store/List')
            )
          },
          {
            path: '/orgCenter/store/detail/:type/:id',
            name: 'storeEdit',
            meta: { title: '门店编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/orgCenter/store/Edit')
            )
          }
        ]
      }
    ]
  },
  {
    path: '/itemCenter',
    name: 'support-itemCenter',
    meta: { title: '商品中心' },
    routes: [
      {
        path: '/itemCenter/businessDirectory',
        name: 'support-itemCenter-businessDirectory',
        meta: { title: '商品经营目录' },
        routes: [
          {
            path: '/itemCenter/businessDirectory/index',
            name: 'support-itemCenter-businessDirectory-publish',
            meta: { title: '经营目录管理', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/itemCenter/BusinessDirectory')
            )
          }
        ]
      }
    ]
  },
  {
    path: '/salesCenter',
    name: 'salesCenter',
    meta: { title: '销售中心' },
    routes: [
      {
        path: '/salesCenter/custom',
        name: 'customerManage',
        meta: { title: '顾客管理' },
        routes: [
          {
            path: '/salesCenter/custom/search',
            name: 'customerSearch',
            meta: { title: '顾客查询', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/customer/List/index')
            )
          },
          {
            path: '/salesCenter/custom/view/:id/:buid',
            name: 'customeView',
            meta: { title: '顾客详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/customer/View/index')
            )
          }
        ]
      },
      {
        path: '/salesCenter/ouDatas',
        name: 'saleWholesale',
        meta: { title: '批发客户管理' },
        routes: [
          {
            path: '/salesCenter/ouDatas/list',
            name: 'ouLists',
            meta: { title: '批发客户查询', keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/ouDatas/List')
            )
          },
          // {
          //   path: '/salesCenter/wholesale/add',
          //   name: 'saleWholesaleAdd',
          //   meta: { title: '批发客户新增' },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/support/salesCenter/ouDatas/Edit'
          //       )
          //   )
          // }
          {
            path: '/salesCenter/ouDatas/add/:type',
            name: 'createOus',
            meta: { title: '批发客户新增', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/ouDatas/Edit')
            )
          },
          {
            path: '/salesCenter/ouDatas/edit/:type/:id',
            name: 'editOus',
            meta: { title: '批发客户编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/ouDatas/Edit')
            )
          },
          {
            path: '/salesCenter/ouDatas/detail/:type/:id',
            name: 'ouDetails',
            meta: { title: '批发客户详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/support/salesCenter/ouDatas/View')
            )
          }
        ]
      },
      {
        path: '/salesCenter/saleorder',
        name: 'saleOrder',
        meta: { title: '销售订单' },
        routes: [
          {
            path: '/salesCenter/saleorder/search',
            name: 'saleOrderSearch',
            meta: { title: '销售订单查询', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/saleOrder/OrderSearch/index'
                )
            )
          }
        ]
      },
      {
        path: '/salesCenter/returninquiry',
        name: 'returninquiry',
        meta: { title: '退货订单' },
        routes: [
          {
            path: '/salesCenter/returninquiry/returnsearch',
            name: 'returnsearch',
            meta: { title: '退货订单查询', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/returnInquiry/returnSearch/index'
                )
            )
          }
        ]
      },
      {
        path: '/salesCenter/retailorder',
        name: 'retailOrder',
        meta: { title: '零售单' },
        routes: [
          {
            path: '/salesCenter/retailorder/create',
            name: 'retailOrderCreate',
            meta: { title: '零售单创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/retailOrder/RetailOrderCreate'
                )
            )
          },
          {
            path: '/salesCenter/retailorder/detail/:type/:id',
            name: 'retailOrderDetail',
            meta: { title: '零售单详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/retailOrder/RetailOrderDetail'
                )
            )
          },
          {
            path: '/salesCenter/retailorder/edit/:id',
            name: 'retailOrderEdit',
            meta: { title: '零售单编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/retailOrder/RetailOrderCreate'
                )
            )
          }
        ]
      },
      {
        path: '/salesCenter/wholeorder',
        name: 'wholeOrder',
        meta: { title: '批发单' },
        routes: [
          {
            path: '/salesCenter/wholeorder/create',
            name: 'wholeOrderCreate',
            meta: { title: '批发单创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/wholeOrder/WholeOrderCreate'
                )
            )
          },
          {
            path: '/salesCenter/wholeorder/detail/:id',
            name: 'wholeOrderDetail',
            meta: { title: '批发单详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/wholeOrder/WholeOrderDetail'
                )
            )
          },
          {
            path: '/salesCenter/wholeorder/edit/:id',
            name: 'wholeOrderEdit',
            meta: { title: '批发单编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/wholeOrder/WholeOrderEdit'
                )
            )
          }
        ]
      },
      {
        path: '/salesCenter/returnorder',
        name: 'returnOrder',
        meta: { title: '退货单' },
        routes: [
          {
            path: '/salesCenter/returnorder/create',
            name: 'returnOrerCreate',
            meta: { title: '销售退货创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/returnOrder/ReturnOrderCreate'
                )
            )
          },
          {
            path: '/salesCenter/returnorder/detail/:id',
            name: 'returnOrerDetail',
            meta: { title: '销售退货详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/returnOrder/ReturnOrderDetail'
                )
            )
          },
          {
            path: '/salesCenter/returnorder/edit/:id',
            name: 'returnOrderEdit',
            meta: { title: '销售退货编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/support/salesCenter/returnOrder/ReturnOrderEdit'
                )
            )
          }
        ]
      }
    ]
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta: { title: '库存中心' },
    routes: [
      {
        path: '/inventory/inventoryserialno',
        name: 'inventoryserialno',
        meta: { title: '车架号列表' },
        routes: [
          {
            path: '/inventory/inventoryserialno/index',
            name: 'inventorySerialnoIndex',
            meta: { title: '车架号列表', keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/inventoryCenter/SerialNo')
            )
          },
          {
            path: '/inventory/inventoryserialno/lifeCycle',
            name: 'inventoryserialnoLifeCycle',
            meta: { title: '车架号生命周期查询', keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/inventoryCenter/SerialnoLifeCycle')
            )
          }
        ]
      },
      {
        path: '/inventory/inventorysearch',
        name: 'inventorysearch',
        meta: { title: '库存查询' },
        routes: [
          {
            path: '/inventory/inventorysearch/search',
            name: 'inventorySearchIndex',
            meta: { title: '库存查询', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventorySearch/Search'
                )
            )
          },
          {
            path: '/inventory/inventorysearch/account',
            name: 'inventorySearchAccount',
            meta: { title: '库存台账查询', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventorySearch/Account'
                )
            )
          }
        ]
      },
      {
        path: '/inventory/inventoryCheck',
        name: 'inventoryCheck',
        meta: { title: '库存盘点' },
        routes: [
          {
            path: '/inventory/inventoryCheck/index',
            name: 'inventoryCheckIndex',
            meta: { title: '盘点查询', keepAlive: true },
            component: React.lazy(
              () =>
                import('@/project/middleGround/inventoryCenter/inventoryCheck')
            )
          },
          {
            path: '/inventory/inventoryCheck/create',
            name: 'inventoryCheckCreate',
            meta: { title: '盘点单创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryCheck/Edit'
                )
            )
          },
          {
            path: '/inventory/inventoryCheck/edit/:id',
            name: 'inventoryCheckEdit',
            meta: { title: '盘点编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryCheck/Edit'
                )
            )
          },
          {
            path: '/inventory/inventoryCheck/view/:id',
            name: 'inventoryCheckView',
            meta: { title: '盘点明细', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryCheck/View'
                )
            )
          }
        ]
      },
      {
        path: '/inventory/inventoryin',
        name: 'inventoryIn',
        meta: { title: '商品入库' },
        routes: [
          // {
          //   path: '/inventory/inventoryin/vehicle/create',
          //   name: 'inventoryInVehicleCreate',
          //   meta: { title: '商品入库单创建' },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryIn/Vehicle/Edit'
          //       )
          //   )
          // },
          // {
          //   path: '/inventory/inventoryin/vehicle/edit/:id',
          //   name: 'inventoryInVehicleEdit',
          //   meta: { title: '整车入库单编辑', hidden: true },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryIn/Vehicle/Edit'
          //       )
          //   )
          // },
          // {
          //   path: '/inventory/inventoryin/vehicle/view/:id',
          //   name: 'inventoryInVehicleView',
          //   meta: { title: '整车入库单详情', hidden: true },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryIn/Vehicle/View'
          //       )
          //   )
          // },
          {
            path: '/inventory/inventoryin/item/create',
            name: 'inventoryInPartsCreate',
            meta: { title: '商品入库单创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryIn/Parts/Create'
                )
            )
          },
          {
            path: '/inventory/inventoryin/item/:type/:id',
            name: 'inventoryInPartsEdit',
            meta: { title: '商品入库单编辑', keepAlive: true, hidden: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryIn/Parts/Edit'
                )
            )
          },
          {
            path: '/inventory/inventoryin/itemview/:id',
            name: 'inventoryInPartsView',
            meta: { title: '商品入库单详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryIn/Parts/View'
                )
            )
          }
        ]
      },
      {
        path: '/inventory/inventoryout',
        name: 'inventoryOut',
        meta: { title: '商品出库' },
        routes: [
          // {
          //   path: '/inventory/inventoryout/vehicle/create',
          //   name: 'inventoryOutVehicleCreate',
          //   meta: { title: '整车出库单创建' },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Vehicle/Edit'
          //       )
          //   )
          // },
          // {
          //   path: '/inventory/inventoryout/vehicle/edit/:id',
          //   name: 'inventoryOutVehicleEdit',
          //   meta: { title: '整车出库单编辑', hidden: true },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Vehicle/Edit'
          //       )
          //   )
          // },
          // {
          //   path: '/inventory/inventoryout/vehicle/view/:id',
          //   name: 'inventoryOutVehicleView',
          //   meta: { title: '整车出库单详情', hidden: true },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Vehicle/View'
          //       )
          //   )
          // },
          {
            path: '/inventory/inventoryout/item/create',
            name: 'inventoryOutPartsCreate',
            meta: { title: '商品出库单创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryOut/Parts/Create'
                )
            )
          },
          {
            path: '/inventory/inventoryout/item/:type/:id',
            name: 'inventoryOutPartsEdit',
            meta: { title: '商品出库单编辑', keepAlive: true, hidden: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryOut/Parts/Edit'
                )
            )
          },
          {
            path: '/inventory/inventoryout/itemview/:id',
            name: 'inventoryOutVehicleView',
            meta: { title: '商品出库单详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/inventoryOut/Parts/View'
                )
            )
          }
          // {
          //   path: '/inventory/inventoryout/item/view/:id',
          //   name: 'inventoryOutVehicleView',
          //   meta: { title: '商品出库单详情' },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Vehicle/View'
          //       )
          //   )
          // }
          // {
          //   path: '/inventory/inventoryout/item/create',
          //   name: 'inventoryOutPartsCreate',
          //   meta: { title: '商品出库单创建' },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Parts/Edit'
          //       )
          //   )
          // },
          // {
          //   path: '/inventory/inventoryout/item/edit/:id',
          //   name: 'inventoryOutPartsEdit',
          //   meta: { title: '商品出库单编辑', hidden: true },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Parts/Edit'
          //       )
          //   )
          // },
          // {
          //   path: '/inventory/inventoryout/item/view/:id',
          //   name: 'inventoryOutPartsView',
          //   meta: { title: '商品出库单详情', hidden: true },
          //   component: React.lazy(
          //     () =>
          //       import(
          //         '@/project/middleGround/inventoryCenter/inventoryOut/Parts/View'
          //       )
          //   )
          // }
        ]
      },
      {
        path: '/inventory/inventorytransfer',
        name: 'inventorytransfer',
        meta: { title: '库存调拨' },
        routes: [
          {
            path: '/inventory/inventorytransfer/index',
            name: 'inventoryTransferIndex',
            meta: { title: '调拨单查询', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/InventoryTransfer'
                )
            )
          },
          {
            path: '/inventory/inventorytransfer/create',
            name: 'inventoryTransferCreate',
            meta: { title: '调拨单创建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/InventoryTransfer/Create'
                )
            )
          },
          {
            path: '/inventory/inventorytransfer/view/:type/:id',
            name: 'inventoryTransferView',
            meta: { title: '调拨单详情', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/InventoryTransfer/View'
                )
            )
          }
        ]
      },
      {
        path: '/inventory/warehousesetting',
        name: 'warehouseSetting',
        meta: { title: '仓库设置' },
        routes: [
          {
            path: '/inventory/warehousesetting/index',
            name: 'warehouseSettingIndex',
            meta: { title: '仓库查询', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/WarehouseSetting'
                )
            )
          },
          {
            path: '/inventory/warehousesetting/create',
            name: 'warehouseSettingCreate',
            meta: { title: '仓库新建', keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/WarehouseSetting/Edit'
                )
            )
          },
          {
            path: '/inventory/warehousesetting/edit/:id',
            name: 'warehouseSettingEdit',
            meta: { title: '仓库编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () =>
                import(
                  '@/project/middleGround/inventoryCenter/WarehouseSetting/Edit'
                )
            )
          }
        ]
      }
    ]
  },
  {
    path: '/purc',
    name: 'purc',
    meta: { title: '采购中心' },
    routes: [
      {
        path: '/purc/supp',
        name: 'purcSupp',
        meta: { title: '供应商管理' },
        routes: [
          {
            path: '/purc/supp/index',
            name: 'purcSuppIndex',
            meta: { title: '供应商查询', keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Supp')
            )
          },
          {
            path: '/purc/supp/create',
            name: 'purcSuppCreate',
            meta: { title: '供应商创建', keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Supp/Create')
            )
          },
          {
            path: '/purc/supp/index/:id',
            name: 'purcSuppEdit',
            meta: { title: '供应商编辑', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Supp/Create')
            )
          }
        ]
      },
      {
        path: '/purc/order',
        name: 'purcOrder',
        meta: { title: '采购订单' },
        routes: [
          {
            path: '/purc/order/index',
            name: 'purcOrderIndex',
            meta: { title: '采购订单查询', keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Order')
            )
          },
          {
            path: '/purc/order/index/create',
            name: 'purcOrderCreate',
            meta: { title: '采购订单创建', keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Order/Edit')
            )
          },
          {
            path: '/purc/order/index/edit/:id',
            name: 'purcOrderEdit',
            meta: { title: '采购订单编辑', hidden: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Order/Edit')
            )
          },
          {
            path: '/purc/order/index/view/:id',
            name: 'purcOrderView',
            meta: { title: '采购订单明细', hidden: true, keepAlive: true },
            component: React.lazy(
              () => import('@/project/middleGround/purc/Order/View')
            )
          }
        ]
      }
    ]
  }
];

// 统一加keepAlive
// OrgCenterRouters.forEach((a1) => {
//   a1.routes.forEach((a2) => {
//     a2.routes.forEach((a3) => {
//       a3.meta.keepAlive = false;
//     });
//   });
// });

export default OrgCenterRouters;
