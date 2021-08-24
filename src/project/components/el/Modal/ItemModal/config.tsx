import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { Statistic, Percentage } from '@/components/el/ItemComponent';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import dayjs from 'dayjs';
import { asserts } from '@/utils';

// SearchTable搜索表单
const getTableSearchFormItems = (): Array<ElFormItemProps> => [
  {
    title: '商品编码',
    name: 'itemCode',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入商品编码' }
    }
  },
  {
    title: '商品名称',
    name: 'itemName',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入商品名称' }
    }
  },
  {
    title: '商品小类',
    name: 'itemType2',
    span: 6,
    formOption: {
      type: '$udc',
      props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE2' }
    }
  },
  {
    title: '商品层级',
    name: 'itemType3',
    span: 6,
    formOption: {
      type: '$udc',
      props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE3' }
    }
  }
];

// table搜索表单
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '商品编码',
    dataIndex: 'itemCode',
    fixed: 'left',
    width: 150
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    width: 300,
    render: (value) => {
      return <p style={{ whiteSpace: 'pre', margin: 0 }}>{value}</p>
    }
  },
  {
    title: '商品类型',
    dataIndex: 'itemTypeName',
    width: 120
  },
  // {
  //   title: '商品规格',
  //   dataIndex: 'packageSpec',
  //   width: 120
  // },
  {
    title: '单位',
    dataIndex: 'uomName',
    width: 100
  },
  {
    title: '库存数',
    dataIndex: 'ohQty',
    width: 100
  },
  {
    title: '品牌编码',
    dataIndex: 'brand',
    width: 120
  },
  {
    title: '商品品牌',
    dataIndex: 'brandName',
    width: 120
  }
];

export { getTableSearchFormItems, getTableColumns };
