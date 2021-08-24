import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import {
  filledFormConfig,
  filledColumnsConfig,
  setFormDisabledByType,
  filledColumnsEditAbleConfig,
  getOptionsYN,
  getCellRenderYN
} from '@/project/utils/tableHelper';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Image } from 'antd';
import AppStore from '@/store';
import { Disablable } from '@antv/x6';

// 基础配置
const getBaseConfig = (type, disabled, handleSelectItemType, itemType2Disabled) => {
  let form: ElFormProps = {
    items: [
      // {
      //   title: '商品类型',
      //   name: 'itemType',
      //   formOption: {
      //     type: '$udc',
      //     props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE' }
      //   }
      // },
      {
        title: '商品编码',
        name: 'itemCode',
        rules: [{ required: true, message: '必填！' }],
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
            // disabled: true
          }
        }
      },
      {
        title: '商品名称',
        name: 'itemName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '商品品牌',
        name: 'brand',
        formOption: {
          type: '$yd-mg-select-brand1',
          props: {
            // customUrl: '/yd-user/itm/itmBrandYd/list',
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '产地',
        name: 'origin',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ORIGIN' }
        }
      },
      {
        title: '颜色',
        name: 'itemType5',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '商品大类',
        name: 'itemType',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE', onChange: handleSelectItemType }
        }
      },
      {
        title: '商品小类',
        name: 'itemType2',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE2', disabled: !!itemType2Disabled }
        }
      },
      {
        title: '配件分类编码',
        name: 'itemType4',
        formOption: {
          type: '$input',
          props: { placeholder: '请输入', disabled: !!itemType2Disabled }
        }
      },
      {
        title: '是否启用',
        name: 'partStatus',
        formOption: {
          type: '$switch',
          props: { disabled: !!itemType2Disabled }
        }
      },
      {
        title: '单位',
        name: 'uom',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'COM', udc: 'UOM' }
        }
      },
      {
        title: '商品层级',
        name: 'itemType3',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE3' }
        }
      }
      // {
      //   title: '经销商',
      //   name: 'buObj',
      //   formOption: {
      //     type: '$support-pop-bu',
      //     props: {
      //       keywords: 'buCodeNameLike',
      //       placeholder: '请输入',
      //       showColumn: 'buName'
      //     }
      //   }
      // }
    ]
  };

  if (type == 'view') {
    disabled = true;
  }
  setFormDisabledByType(form, disabled);
  return form;
};

const getPriceConfig = (type) => {
  let form: ElFormProps = {
    items: [
      {
        title: '采购价',
        name: 'purPrice',
        formOption: {
          type: '$inputNumber',
          props: { min: 0, precision: 2 }
        }
      },
      {
        title: '批发价',
        name: 'whSalePrice',
        formOption: {
          type: '$inputNumber',
          props: { min: 0, precision: 2 }
        }
      },
      {
        title: '零售价',
        name: 'retailPrice',
        formOption: {
          type: '$inputNumber',
          props: { min: 0, precision: 2 }
        }
      },
      {
        title: '指导价',
        name: 'guidePrice',
        formOption: {
          type: '$inputNumber',
          props: { min: 0, precision: 2 }
        }
      },
      {
        title: '成本价',
        name: 'costPrice',
        formOption: {
          type: '$inputNumber',
          props: { min: 0, precision: 2 }
        }
      }
    ]
  };
  setFormDisabledByType(form, type == 'view');
  return form;
};

const getImgTableColumns = (that = null): Array<ElEditTableColumns> => {
  let columns: Array<ElEditTableColumns> = [
    {
      title: '序号',
      align: 'center',
      width: 100,
      cellRender: (value, column, index) => {
        return index + 1;
      }
    },
    {
      title: '图片',
      // width: 100,
      align: 'center',
      dataIndex: 'fileId',
      cellRender: (text, record) => {
        console.error('23w3f', AppStore.urlPrefix);
        return (
          <Image
            width={48}
            height={36}
            preview={true}
            src={AppStore.urlPrefix.replace('{picId}', text)}
          />
        );
      }
    },
    {
      title: '图片尺寸',
      dataIndex: 'imgSize'
    },
    {
      title: '图片大小',
      dataIndex: 'fileSize'
    }
  ];

  // filledColumnsEditAbleConfig(columns);
  filledColumnsConfig(columns);
  return columns;
};
export { getBaseConfig, getPriceConfig, getImgTableColumns };
