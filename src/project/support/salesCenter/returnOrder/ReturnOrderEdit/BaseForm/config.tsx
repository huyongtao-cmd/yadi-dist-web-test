import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { asserts } from '@/utils';
const getFormItems = (areaRef, isLS): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'storeId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        // showColumn: 'storeName',
        placeholder: '请选择',
        // disabled: isLS ? true : false,
        disabled: true,
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        placeholder: '请选择',
        ref: areaRef,
        disabled: true,
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
    formOption: { type: '$datePicker', props: { placeholder: '请选择', disabled: isLS ? true : false } }
  },
  {
    title: '前置单据',
    name: 'relateDocNo',
    span: 6,
    formOption: {
      type: '$input',
      props: { disabled: true, placeholder: '新建时没有前置单据' }
    }
  },
  {
    title: '销售类型',
    name: 'docType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'RETURN_TYPE',
        disabled: isLS ? true : false
        // disabled: true
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  // {
  //   title: '销售类型',
  //   name: 'docType',
  //   span: 6,
  //   formOption: {
  //     type: '$select',
  //     props: {
  //       placeholder: '请选择 ',
  //       options: [
  //         { label: '零售退货', value: 'D' },
  //         { label: '批发退货', value: 'E' }
  //       ],
  //       // defaultValue: 'D'
  //     }
  //   }
  // },
  {
    title: '付款方式',
    name: 'payMethod', // pay_method
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'PAY_METHOD',
        placeholder: '请选择',
        disabled: isLS ? true : false
      }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    rules: [
      // { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' },
      { min: 0, max: 255, message: '长度限制255个字符' }
    ],
    formOption: { type: '$input', props: { placeholder: '请输入', disabled: isLS ? true : false } }
  },
  {
    title: '参保方式',
    name: 'es1',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'WHETHER_INSURED',
        disabled: isLS ? true : false
      }
    }
  }
];

export { getFormItems };
