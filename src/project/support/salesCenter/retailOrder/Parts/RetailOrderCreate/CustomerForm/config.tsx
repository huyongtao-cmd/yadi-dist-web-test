//顾客信息
import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (onBlur, reprCertNoOnBlur, flag, formRef): Array<ElFormItemProps> => [
  {
    title: '手机号码',
    name: 'reprCertMobile',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        onBlur: onBlur
      }
    },
    // validateTrigger: 'onBlur'
  },
  {
    title: '顾客姓名',
    name: 'custName',
    span: 6,
    formOption: {
      type: '$input',
      props: { showColumn: 'custName', placeholder: '请输入' }
      // type: '$yd-mg-customer',
      // props: { showColumn: 'custName', placeholder: '请输入' }
    }
  },
  {
    title: '证件类型',
    name: 'reprCertType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'CUST_ID_TYPE',
      }
    },
  },
  {
    title: '证件号码',
    name: 'reprCertNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        onBlur: reprCertNoOnBlur
        // disabled: flag
      }
    },
    // validateTrigger: 'onBlur'
  },
  {
    title: '性别',
    name: 'vipGender',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'ORG',
        udc: 'EMP_GENDER',
        // disabled: flag
      }
    }
  },
  {
    title: '生日',
    name: 'vipBirthDate',
    span: 6,
    formOption: {
      type: '$datePicker',
      props: { placeholder: '请输入', }
    }
  },
  {
    title: '地址',
    name: 'registerAddress',
    span: 6,
    rules: [
      // { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' },
      { min: 0, max: 100, message: '长度限制100个字符' }
    ],
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        // disabled: flag
      }
    },
  },
  {
    title: '年龄段',
    name: 'es7',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'AGE_STRUCTURE',
      }
    },
  }
];

export { getFormItems };
