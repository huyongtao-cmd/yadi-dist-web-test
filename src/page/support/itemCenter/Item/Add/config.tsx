import React from 'react';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';

const statusList = [
  {
    label: '启用',
    value: '0'
  },
  {
    label: '禁用',
    value: '1'
  }
];

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id'
  },
  {
    title: '商品编码',
    align: 'center',
    dataIndex: ''
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: ''
  },
  {
    title: '商品别名',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '商品条码',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '商品类型',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '品类名称',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '商品品牌',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '是否启用序列号',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '是否启用批次号',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '有效管理标识',
    // width: 100,
    align: 'center',
    dataIndex: ''
  },
  {
    title: '状态',
    // width: 100,
    align: 'center',
    dataIndex: ''
  }
];

const getTableFormItems: any = (type) => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  items: [
    {
      title: '商品编码',
      name: 'itemCode',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: { placeholder: '系统自动生成', disabled: true }
      }
    },
    {
      title: '商品品类',
      name: 'itemCatePath',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$support-category-cascader',
        props: { placeholder: '请选择商品品类', disabled: true }
      },
      rules: [{ required: true, message: '请选择商品品类' }]
    },
    {
      title: '商品名称',
      name: 'itemName',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: { disabled: type === 'view' }
      },
      rules: [{ required: true, message: '商品名称必填' }]
    },
    {
      title: '商品别名',
      name: 'itemName2',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: { disabled: type === 'view' }
      }
    },
    {
      title: '商品条码',
      name: 'barCode',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入条码',
          disabled: type === 'view'
        }
      }
    },
    {
      title: '商品类型',
      name: 'itemType',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'ITEM_TYPE'
        }
      },
      rules: [{ required: true, message: '商品类型必填' }]
    },
    {
      title: '商品品牌',
      name: 'brand',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$support-item-brand',
        props: { disabled: type === 'view' }
      },
      rules: [{ required: true, message: '商品品牌必选' }]
    }
  ]
});

export { getTableColumns, getTableFormItems };
