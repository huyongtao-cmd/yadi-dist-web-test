/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-25 11:25:32
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-01 14:29:11
 */
import React from 'react';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Image } from 'antd';
import AppStore from '@/store';

const getTableColumns = (delteBrand): Array<ElSearchTableColumns> => [
  {
    title: '编码',
    align: 'center',
    dataIndex: 'brandCode'
  },
  {
    title: '品牌名',
    align: 'center',
    dataIndex: 'brandName'
  },
  {
    title: '品牌英文名',
    // width: 100,
    align: 'center',
    dataIndex: 'brandEnName'
  },
  {
    title: '品牌首字母',
    // width: 100,
    align: 'center',
    dataIndex: 'brandInitial'
  },
  {
    title: '品牌logo',
    // width: 100,
    align: 'center',
    dataIndex: 'logoImgId',
    render: (text, record) => {
      return (
        <Image
          width={48}
          height={36}
          preview={false}
          src={AppStore.urlPrefix.replace('{picId}', text)}
        />
      );
    }
  },
  {
    title: '状态',
    // width: 100,
    align: 'center',
    dataIndex: 'status',
    render: (text, record) => {
      return text === 'ENABLE' ? '启用' : '禁用';
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '品牌',
      name: 'brandCodeName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入品牌名称/关键词'
        }
      }
    },
    {
      title: '状态',
      name: 'status',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择品牌状态',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'BRAND_STATUS'
        }
      }
    }
  ]
};

export { getTableSearchFormItems, getTableColumns };
