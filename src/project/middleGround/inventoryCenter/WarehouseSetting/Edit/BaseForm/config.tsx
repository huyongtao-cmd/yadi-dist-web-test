// import React from "react";
import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '所属门店',
    name: 'buId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: { 
        placeholder: '请选择',
        selectRecord: true
      }
    } 
  },
  {
    title: '仓库编号',
    name: 'whCode',
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input',
      props: {
        placeholder: '系统生成',
        disabled: true
      }
    }
  },
  {
    title: '仓库名称',
    name: 'whName',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
      }
    }
  },
  {
    title: '仓库类型',
    name: 'whType',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'WH_TYPE2',
        selectRecord: true
      }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 12,
    formOption: {
      type: '$input',
      props: {}
    }
  }
];

export { getFormItems };
