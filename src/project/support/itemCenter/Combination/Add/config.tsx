import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';

const getBasicFormItems = (): Array<ElFormItemProps> => [
  {
    title: '组合商品编码',
    name: 'itemComboCode',
    span: 6,
    wrapperCol: { span: 0 },
    formOption: {
      type: '$input',
      props: { disabled: true, placeholder: '加载中' }
    }
  },
  {
    title: '组合商品名称',
    name: 'itemComboName',
    span: 6,
    wrapperCol: { span: 0 },
    formOption: {
      type: '$input',
      props: {}
    },
    rules: [
      {
        required: true,
        message: '必填！'
      }
    ]
  },
  {
    title: '组合商品别名',
    name: 'itemComboOtherName',
    span: 6,
    wrapperCol: { span: 0 },
    formOption: {
      type: '$input',
      props: {}
    },
    rules: [
      {
        required: true,
        message: '必填！'
      }
    ]
  },
  {
    title: '组合商品类别',
    name: 'itemComboType',
    span: 6,
    wrapperCol: { span: 0 },
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'ITM',
        udc: 'COMBO_ITEM_TYPE'
      }
    },
    rules: [
      {
        required: true,
        message: '必填！'
      }
    ]
  }
];

export { getBasicFormItems };
