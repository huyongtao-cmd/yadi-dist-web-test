import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { asserts } from '@/utils';
const getFormItems = (): Array<ElFormItemProps> => [
  // {
  //   title: '门店',
  //   name: 'storeName',
  //   span: 6,
  //   formOption: {
  //     type: '$yd-mg-select-store',
  //     props: {
  //       showColumn: 'name',
  //       placeholder: '请选择'
  //       // options: [
  //       //   { label: '门店01', value: '01' },
  //       //   { label: '门店02', value: '02' },
  //       //   { label: '门店03', value: '03' }
  //       // ]
  //     }
  //   }
  // },
  {
    title: '门店',
    name: 'storeName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        showColumn: 'storeName',
        placeholder: '请选择'
      }
    }
  },
  {
    title: '仓库',
    name: 'whName',
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$text',
      props: {
        placeholder: '请选择'
        // options: [
        //   { label: '仓库01', value: '01' },
        //   { label: '仓库02', value: '02' },
        //   { label: '仓库03', value: '03' }
        // ]
      }
    }
  },
  {
    title: '日期',
    name: 'docTime', // doc_time
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请选择' } }
  },
  {
    title: '前置单据',
    name: 'relateDocNo',
    span: 6,
    formOption: {
      type: '$text',
      props: { disabled: true, placeholder: '新建时没有前置单据' }
    }
  },
  {
    title: '销售类型',
    name: 'docTypeName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '付款方式',
    name: 'payMethodName', // pay_method
    span: 6,
    formOption: {
      type: '$text',
      props: {
        // prefixStr: '/yd-system',
        // domain: 'SAL',
        // udc: 'PAY_METHOD',
        placeholder: '请选择'
      }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入' } }
  },
  {
    title: '参保方式',
    name: 'es1Name',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请选择',
        // prefixStr: '/yd-system',
        // domain: 'SAL',
        // udc: 'WHETHER_INSURED'
      }
    }
  }
];

export { getFormItems };
