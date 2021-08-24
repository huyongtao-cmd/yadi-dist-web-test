import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (isEdit): Array<ElFormItemProps> => [
  {
    title: '规则编码',
    name: 'ruleCode',
    span: 12,
    rules: [{ required: true, message: '请输入规则编码' }],
    formOption: {
      type: '$input',
      props: { disabled: isEdit == 'create' ? false : true }
    }
  },
  {
    title: '规则名称',
    name: 'ruleName',
    span: 12,
    rules: [{ required: true, message: '请输入规则名称' }],
    formOption: {
      type: '$input',
      props: {}
    }
  },
  {
    title: '规则分类码',
    name: 'ruleClass',
    span: 12,
    rules: [{ required: true, message: '请选择下一编号分类' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择下一编号分类',
        prefixStr: '/yd-system',
        domain: 'COM',
        udc: 'DOMAIN'
      }
    }
  },
  {
    title: '取号示例',
    name: 'sampleCode',
    span: 12,
    rules: [{ required: true, message: '请输入取号示例' }],
    formOption: {
      type: '$input',
      props: { disabled: isEdit == 'create' ? false : true }
    }
  }
];

export { getFormItems };
