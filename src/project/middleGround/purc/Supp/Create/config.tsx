import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SaveBlue, SaveWhite } from '@/components/el/ElIcon';
import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '供应商编码',
    name: 'suppCode',
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input',
      props: { 
        placeholder: '系统生成',
        maxLength: 20,
        disabled: true
      }
    }
  },
  {
    title: '供应商名称',
    name: 'suppName',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 30 } }
  },
  {
    title: '类型',
    name: 'suppType',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择供应商类型',
        domain: 'PUR',
        udc: 'SUPP_TYPE',
        prefixStr: '/yd-system'
      }
    }
  },
  // {
  //   title: '所属经销商',
  //   name: 'buId',
  //   span: 6,
  //   rules: [{ required: true, message: '必填！' }],
  //   formOption: {
  //     type: '$yd-mg-select-bu',
  //     props: {
  //       placeholder: '请选择'
  //     }
  //   }
  // },
  {
    title: '联系人',
    name: 'invPicName',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 20 } }
  },
  {
    title: '电话',
    name: 'invTel',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 11 } }
  },
  {
    title: '手机号',
    name: 'invPicPhone',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 11 } }
  },
  {
    title: '地址',
    name: 'invAddress',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 30 } }
  },
  {
    title: '开户银行',
    name: 'suppBank',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 30 } }
  },
  {
    title: '银行账户',
    name: 'bankAccount',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', maxLength: 30 } }
  },
  {
    title: '合作时间',
    name: 'date',
    span: 6,
    formOption: { type: '$rangePicker', props: {} }
  }
];

const getActionButtons = (handleSave): Array<ActionButtonProps> => [
  {
    text: '保存',
    key: 'save',
    icon: <SaveWhite />,
    handleClick: handleSave
  }
];

export { getActionButtons, getFormItems };
