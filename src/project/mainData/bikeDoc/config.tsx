/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-25 11:25:32
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 17:49:12
 */
import React from 'react';
import { Input, Radio, Form } from 'antd';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { ImgUpload } from '@/components/el/ItemComponent';
// import { getItemCodeList, getItemTypeList } from './service';
import {
  filledFormConfig,
  filledColumnsConfig
} from '@/project/utils/tableHelper';
import { Link } from 'react-router-dom';

const getTableSearchFormItems = (): ElFormProps => {
  let form: ElFormProps = {
    items: [
      {
        title: '商品名称',
        name: 'itemName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '商品编码',
        name: 'itemCode',
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
          props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE' }
        }
      },
      {
        title: '商品小类',
        name: 'itemType2',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE2' }
        }
      },
      {
        title: '商品品牌',
        name: 'brand',
        formOption: {
          type: '$yd-mg-select-brand',
          props: {}
        }
      },
      {
        title: '商品状态',
        name: 'itemStatus',
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ITM',
            udc: 'ITEM_STATUS',
            filterValue: ['APPROVING']
          }
        }
      },
      {
        title: '商品层级',
        name: 'itemType3',
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ITM',
            udc: 'ITEM_TYPE3',
          }
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
        title: '颜色',
        name: 'itemType5',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
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

  filledFormConfig(form);
  return form;
};

const getTableColumns = (that): Array<ElSearchTableColumns> => {
  let columns: Array<ElSearchTableColumns> = [
    {
      title: '商品大类',
      dataIndex: 'itemTypeName'
    },
    {
      title: '商品小类',
      dataIndex: 'itemType2Name'
    },
    {
      title: '配件分类编码',
      dataIndex: 'itemType4'
    },
    {
      title: '是否启用',
      dataIndex: 'partStatus',
      render: (value, record) => {
        return <span>{value === '1' ? '是' : '否'}</span>;
      }
    },
    {
      title: '商品编码',
      dataIndex: 'itemCode',
      render: (value, record) => {
        // 2021年06.24 修改路由配置   去掉 /orgCenter
        const linkTo = () => {
          that.props.push(`/mainData/bikeDoc/detail/view/${record.id}`)
        }
        return <a onClick={linkTo}>{value}</a>;
      }
    },
    {
      title: '商品名称',
      dataIndex: 'itemName'
    },
    {
      title: '商品层级',
      dataIndex: 'itemType3Name',
    },
    {
      title: '商品品牌',
      dataIndex: 'brandName'
    },
    {
      title: '颜色',
      dataIndex: 'itemType5'
    },
    {
      title: '单位',
      dataIndex: 'uomName'
    },
    {
      title: '成本价',
      dataIndex: 'costPrice'
    },
    {
      title: '采购价',
      dataIndex: 'purPrice'
    },
    {
      title: '零售价',
      dataIndex: 'retailPrice'
    },
    {
      title: '批发价',
      dataIndex: 'whSalePrice'
    },
    {
      title: '指导价格',
      dataIndex: 'guidePrice'
    },
    // {
    //   title: '经销商',
    //   dataIndex: 'buName'
    // },
    {
      title: '状态',
      dataIndex: 'itemStatusName'
    }
  ];

  filledColumnsConfig(columns);
  return columns;
};
export { getTableSearchFormItems, getTableColumns };
