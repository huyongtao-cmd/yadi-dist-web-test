import React from 'react';
import { Input, Radio, InputNumber, Checkbox } from 'antd';
import {
  UdcSelection,
  Selection,
  DatePicker,
  RangePicker,
  Text,
  TextArea,
  Percentage,
  ImgUpload,
  Switch,
  AsyncInputSelect,
  FileUpload
} from '../ItemComponent';
import {
  ClassifyCascader,
  RegionCascader,
  BrandSelection, //商品品牌
  AlbumSearchSelection, //相册
  ItemAttrList, //商品属性----尺寸、颜色等
  DepartmentSelection //部门下拉
} from '../ItemComponent/biz/b2c';
import { ElImage } from '@/components/el';
// 供应链业务组件
import {
  BusinesshallSelection as MgBusinesshallSelection, //营业厅
  OuPopupSelection as MgOuPopupSelection, //公司
  ItemPopupSelection as MgItemPopupSelection, // 商品
  WhPopupSelection as MgWhPopupSelection, // 库存
  SupplierPopupSelection as MgSupplierPopupSelection, //供应商
  PurOrderPopupSelection as PurOrderPopupSelection, //销售订单
  BrandPopupSelection as MgBrandPopupSelection, // 品牌下拉
  CurrSelection as MgCurrSelection, // 币种下拉
  InventoryPartnerSelection as MgInvPartnerSelection, //库存合作伙伴
  MgCurrencyRate,
  PurrTypeSelection as MGPurrType,
  UserPopupSelection as MgUserPopupSelection,
  PaymentTermSelection as MgPaymentTermSelection,
  DistrictsSelect as MgDistrictsSelect,
  OuSelection as MgOuSelection,
  SuppPopupSelection as MgSuppPopupSelection,
  ItemPopupSelectionPurc as MgItemPopupSelectionPurc,
  BrandPopupSelectionPurc as MgBrandPopupSelectionPurc,
  BatchPopupSelection as MgBatchPopupSelection,
  RMAPopupSelection as RMAPopupSelection,
  InputExport as MgInputExport,
  DeliveryPopupSelection as DeliveryPopupSelection,
  CountrySelection as MgCountrySelection,
  TreeSelection,
  DefaultTaxRateSelection as MgDefaultTaxRateSelection
} from '../ItemComponent/biz/middleGround';

//支撑域业务组件
import {
  CategoryCascader, //商品品类
  ItemBrandPopup, //商品品牌
  ItemTagCascader, //商品标签
  SupportRegionCascader, //省市区
  BuPopupSelection, //组织
  AddressPopupSelection, //地址
  SupportOuPopupSelection, //公司
  UserPopupSelection, //用户
  OrgTreePopupSelection //组织树
} from '../ItemComponent/biz/support';
import { has, type } from 'ramda';
interface RegisterItem {
  type: string;
  render: Function;
}
let originRenderOptions = [
  {
    type: '$input',
    render: (props, events) => {
      return <Input {...props} {...events} autoComplete='off' />;
    }
  },
  {
    type: '$async-input-select',
    render: (props, events) => {
      return <AsyncInputSelect {...props} {...events} />;
    }
  },
  {
    type: '$inputNumber',
    render: (props, events) => {
      return (
        <InputNumber
          style={{ width: '100%' }}
          size='middle'
          {...props}
          {...events}
          autoComplete='off'
        />
      );
    }
  },
  {
    type: '$radio',
    render: (props, events) => {
      return (
        <Radio.Group {...props}>
          {props.options.map((v) => {
            <Radio key={v.value} value={v.value}>
              {v.label}
            </Radio>;
          })}
        </Radio.Group>
      );
    }
  },
  {
    type: '$img-show',
    render: (props, events) => {
      return <ElImage {...props} />;
    }
  },
  {
    type: '$checkbox',
    render: (props, events) => {
      return <Checkbox.Group {...props} />;
    }
  },
  {
    type: '$udc',
    render: (props, events) => {
      return <UdcSelection {...props} {...events} />;
    }
  },
  {
    type: '$select',
    render: (props, events) => {
      return (
        <Selection
          options={props ? props.options : undefined}
          request={props.request}
          {...props}
          {...events}
        />
      );
    }
  },
  {
    type: '$switch',
    render: (props, events) => {
      return <Switch {...props} {...events} />;
    }
  },
  {
    type: '$datePicker',
    render: (props, events) => {
      return <DatePicker {...props} />;
    }
  },
  {
    type: '$rangePicker',
    render: (props, events) => {
      return <RangePicker {...props} />;
    }
  },
  {
    type: '$text',
    render: (props, events) => {
      return <Text {...props} {...events} />;
    }
  },
  {
    type: '$textArea',
    render: (props, events) => {
      return <TextArea {...props} />;
    }
  },
  {
    type: '$percentage',
    render: (props, events) => {
      return <Percentage />;
    }
  },
  {
    type: '$img-upload',
    render: (props, events) => {
      return <ImgUpload {...props} />;
    }
  },
  // middleGround 业务组件
  {
    type: '$mg-pop-item',
    render: (props, events) => {
      return <MgItemPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-supp',
    render: (props, events) => {
      return <MgSupplierPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-ou',
    render: (props, events) => {
      return <MgOuPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-hall',
    render: (props, events) => {
      return <MgBusinesshallSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-wh',
    render: (props, events) => {
      return <MgWhPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-partner',
    render: (props, events) => {
      return <MgInvPartnerSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-brand',
    render: (props, events) => {
      return <MgBrandPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-select-curr',
    render: (props, events) => {
      return <MgCurrSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-currencyRate',
    render: (props, events) => {
      return <MgCurrencyRate {...props} {...events} />;
    }
  },
  {
    type: '$mg-purType',
    render: (props, events) => {
      return <MGPurrType {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-user',
    render: (props, events) => {
      return <MgUserPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-purOrder',
    render: (props, events) => {
      return <PurOrderPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-select-paymentTerm',
    render: (props, events) => {
      return <MgPaymentTermSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-disSelect',
    render: (props, events) => {
      return <MgDistrictsSelect {...props} {...events} />;
    }
  },
  {
    type: '$mg-select-ou',
    render: (props, events) => {
      return <MgOuSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-supp-purc',
    render: (props, events) => {
      return <MgSuppPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-item-purc',
    render: (props, events) => {
      return <MgItemPopupSelectionPurc {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-brand-purc',
    render: (props, events) => {
      return <MgBrandPopupSelectionPurc {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-batch',
    render: (props, events) => {
      return <MgBatchPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-rma',
    render: (props, events) => {
      return <RMAPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-inputExport',
    render: (props, events) => {
      return <MgInputExport {...props} {...events} />;
    }
  },
  {
    type: '$mg-pop-delivery',
    render: (props, events) => {
      return <DeliveryPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-select-country',
    render: (props, events) => {
      return <MgCountrySelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-select-tree',
    render: (props, events) => {
      return <TreeSelection {...props} {...events} />;
    }
  },
  {
    type: '$mg-select-defaultTaxRate',
    render: (props, events) => {
      return <MgDefaultTaxRateSelection {...props} {...events} />;
    }
  },
  // b2c 业务组件
  {
    type: '$b2c-selection-brand',
    render: (props, events) => {
      return <BrandSelection {...props} />;
    }
  },
  {
    type: '$b2c-selection-album',
    render: (props, events) => {
      return <AlbumSearchSelection {...props} />;
    }
  },
  {
    type: '$b2c-selection-department',
    render: (props, events) => {
      return <DepartmentSelection {...props} />;
    }
  },
  {
    type: '$b2c-selection-itemAttr',
    render: (props, events) => {
      return <ItemAttrList {...props} />;
    }
  },

  {
    type: '$b2c-cascader-classify',
    render: (props, events) => {
      return <ClassifyCascader {...props} />;
    }
  },
  {
    type: '$b2c-cascader-region',
    render: (props, events) => {
      return <RegionCascader {...props} />;
    }
  },
  {
    type: '$support-selection-brand',
    render: (props, events) => {
      return <BrandSelection {...props} />;
    }
  },
  {
    type: '$support-category-cascader',
    render: (props, events) => {
      return <CategoryCascader {...props} />;
    }
  },
  {
    type: '$support-item-brand',
    render: (props, events) => {
      return <ItemBrandPopup {...props} />;
    }
  },
  {
    type: '$support-item-tag',
    render: (props, events) => {
      return <ItemTagCascader {...props} />;
    }
  },
  {
    type: '$support-cascader-region',
    render: (props, events) => {
      return <SupportRegionCascader {...props} />;
    }
  },
  {
    type: '$support-pop-bu',
    render: (props, events) => {
      return <BuPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$support-pop-addr',
    render: (props, events) => {
      return <AddressPopupSelection {...props} {...events} />;
    }
  },
  {
    type: '$support-pop-user',
    render: (props, events) => {
      return <UserPopupSelection {...props} />;
    }
  },
  {
    type: '$support-pop-ou',
    render: (props, events) => {
      return <SupportOuPopupSelection {...props} />;
    }
  },
  {
    type: '$file-upload',
    render: (props, events) => {
      return <FileUpload {...props} />;
    }
  },
  {
    type: '$support-org-tree',
    render: (props, events) => {
      return <OrgTreePopupSelection {...props} />;
    }
  }
];
let cache = new Map();
const itemRegister = (renderOptions: Array<RegisterItem>) => {
  renderOptions.forEach((v) => {
    if (cache.get(v.type)) {
      console.error(
        `[ElError]: 重复的type => ${v.type}, 会导致前者的RenderItem被后者覆盖`
      );
    }
    cache.set(v.type, v.render);
  });
};
itemRegister(originRenderOptions);
// itemRegister([
//   {
//     type: '$input',
//     render: (props, events) => {
//       return <Input {...props} {...events}></Input>;
//     }
//   }
// ]);
const cacheRender = (type, props, events) => {
  return cache.get(type)(props, events);
};
const formRender = (obj, form) => {
  if (obj.formOption && obj.formOption.render) {
    return obj.formOption.render(form);
  }
  if (obj.formOption && obj.formOption.type) {
    if (cache.has(obj.formOption.type)) {
      return cacheRender(
        obj.formOption.type,
        obj.formOption.props,
        obj.formOption.events
      );
    }
    return <text style={{ color: 'red' }}>未找到对应的renderItem</text>;
  }
};
export default formRender;
export { itemRegister };
export type { RegisterItem };
