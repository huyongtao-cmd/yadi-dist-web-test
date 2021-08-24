import { ElFormItemProps } from '@/components/el/ElForm';
import dayjs from 'dayjs';

const getFormItems = (whRef, flags, empList, handleChangeEs1): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'storeId',
    rules: [{ required: true, message: '必填！' }],
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        showColumn: 'name',
        placeholder: '请选择门店',
        disabled: flags,
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        // selectRecord: true,
        // showColumn: 'whName',
        placeholder: '请选择',
        ref: whRef,
        disabled: flags,
        isCreate: true
        // options: [
        //   { label: '仓库01', value: '01' },
        //   { label: '仓库02', value: '02' },
        //   { label: '仓库03', value: '03' }
        // ]
      }
    },
  },
  // {
  //   title: '仓库',
  //   name: 'whId',
  //   rules: [{ required: true, message: '必填！' }],
  //   span: 6,
  //   formOption: {
  //     type: '$yd-mg-select-wh',
  //     props: {
  //       selectRecord: true,
  //       showColumn: 'whName',
  //       placeholder: '请选择仓库',
  //       ref: whRef
  //     }
  //   }
  // },
  {
    title: '销售类型',
    name: 'docType',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'RETAIL_TYPE',
        // disabled: true
      }
    }
  },
  // {
  //   title: '销售类型',
  //   name: 'docType',
  //   rules: [{ required: true, message: '必填！' }],
  //   span: 6,
  //   formOption: {
  //     type: '$select',
  //     props: {
  //       placeholder: '请选择',
  //       options: [
  //         { label: '零售', value: 'A' },
  //         { label: '以旧换新', value: 'B' }
  //       ]
  //     }
  //   }
  // },
  {
    title: '付款方式',
    name: 'payMethod',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'PAY_METHOD'
      }
    }
  },
  {
    title: '日期',
    name: 'docTime',
    span: 6,
    formOption: {
      type: '$datePicker',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '参保方式',
    name: 'es1',
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'WHETHER_INSURED',
        onChange: handleChangeEs1
      }
    }
  },
  {
    title: '制单人',
    name: 'es3',
    span: 6,
    formOption: {
      type: '$select',
      props: {
        placeholder: '请选择',
        options: empList,
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
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '发票类型',
    name: 'es6',  // todo
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'INV',
        udc: 'INVOICE',
        disabled: true
      }
    }
  },
  {
    title: '发票抬头',
    name: 'es7',  // todo
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: true
      }
    }
  },
  {
    title: '税号',
    name: 'es8',  // todo
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: true
      }
    }
  },
];

export { getFormItems };
