import React from 'react';
import { itemRegister } from '@/components/el/ElForm/utils';
import { Input, Radio, InputNumber, Checkbox } from 'antd';
import {
  SuppSelection,
  WhSelection,
  StoreSelection,
  ItemPopSelection,
  ItemsPopSelection,
  SuppPopupSelection,
  UserPopupSelection,
  OrgPopupSelection,
  WhAreaSelection,
  SalekKehuname,
  CustomerPopSelection,
  BrandSelection,
  BrandSelectionByBu,
  Distributor,
  DistriSelection,
  UserSelection,
  InStoreSelection,
  InWhSelection
} from './ItemComponent/middleGround';
import BuPopupSelection from './ItemComponent/biz/support/popup/BuPopupSelection';
import Text from '@/project/components/el/ItemComponent/Text';

// 这里会在登录的时候执行一次的。所以放在这里，防止合并产品代码时被覆盖掉
import AppStore from '@/store';
import OrgTreePopupSelection from '@/project/components/el/ItemComponent/popup/OrgTreePopupSelection';
// AppStore.urlPrefix = `${process.env.REACT_APP_SERVER_HOST}/yd-user/com/file/v1/{picId}/download`;
AppStore.urlPrefix = `${window.location.origin}/yd-user/com/file/v1/{picId}/download`;
console.error('2f324342r523rt', process.env);

// 举例：$input
itemRegister([
  {
    type: '$asterisk_input',
    render: (props, events) => {
      return <div>***</div>;
    }
  },
  {
    type: '$my_input',
    render: (props, events) => {
      return <Input {...props} {...events} autoComplete='off' />;
    }
  },
  //供应商下拉
  {
    type: '$yd-mg-select-supp',
    render: (props, events) => {
      return <SuppSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //仓库下拉
  {
    type: '$yd-mg-select-wh',
    render: (props, events) => {
      return <WhSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //门店下拉
  {
    type: '$yd-mg-select-store',
    render: (props, events) => {
      return <StoreSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //调入门店下拉
  {
    type: '$yd-mg-select-inStore',
    render: (props, events) => {
      return <InStoreSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //调入仓库下拉
  {
    type: '$yd-mg-select-inWh',
    render: (props, events) => {
      return <InWhSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //商品弹框
  {
    type: '$yd-mg-pop-item',
    render: (props, events) => {
      return <ItemPopSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //商品弹框 （根据门店和仓库过滤由库存数的商品)
  {
    type: '$yd-mg-pop-items',
    render: (props, events) => {
      return <ItemsPopSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //供应商弹框
  {
    type: '$yd-mg-pop-supp',
    render: (props, events) => {
      return <SuppPopupSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //人员弹框
  {
    type: '$yd-mg-pop-user',
    render: (props, events) => {
      return <UserPopupSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //组织弹框
  {
    type: '$yd-mg-pop-org',
    render: (props, events) => {
      return <OrgPopupSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //库位下拉
  {
    type: '$yd-mg-select-wharea',
    render: (props, events) => {
      return <WhAreaSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //客户名称 弹框 Sales wholesale creation
  {
    type: '$yd-mg-sale-whC',
    render: (props, events) => {
      return <SalekKehuname {...props} {...events} autoComplete='off' />;
    }
  },
  //顾客弹框
  {
    type: '$yd-mg-customer',
    render: (props, events) => {
      return <CustomerPopSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //品牌下拉
  {
    type: '$yd-mg-select-brand',
    render: (props, events) => {
      return <BrandSelection {...props} {...events} autoComplete='off' />;
    }
  },
  //品牌下拉（根据经销商过滤）
  {
    type: '$yd-mg-select-brand1',
    render: (props, events) => {
      return <BrandSelectionByBu {...props} {...events} autoComplete='off' />;
    }
  },
  {
    type: '$yd-support-pop-bu',
    render: (props, events) => {
      return <BuPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$my-text',
    render: (props, events) => {
      return <Text {...props} {...events} />;
    }
  },
  // 所属经销商下拉
  {
    type: '$yd-mg-select-distributor',
    render: (props, events) => {
      return <Distributor {...props} {...events} />;
    }
  },
  // 所属经销商供应链下拉
  {
    type: '$yd-mg-select-bu',
    render: (props, events) => {
      return <DistriSelection {...props} {...events} />;
    }
  },
  // 制单人下拉
  {
    type: '$yd-mg-select-user',
    render: (props, events) => {
      return <UserSelection {...props} {...events} />;
    }
  },
  {
    type: '$yd-support-org-tree',
    render: (props, events) => {
      return <OrgTreePopupSelection {...props} />;
    }
  }
]);
