import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (areaRef): Array<ElFormItemProps> => [
  {
    title: '顾客姓名',
    name: 'custName',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-customer',
      props: {
        showColumn: 'custName'
      }
    }
  },
  {
    title: '手机号码',
    name: 'reprCertMobile',
    span: 6,
    formOption: {
      type: '$input',
      props: { disabled: true }
    }
  },
  // {
  //   title: '手机号码',
  //   name: 'reprCertMobile',
  //   span: 6,
  //   formOption: {
  //     type: '$input',
  //     props: {
  //       placeholder: '请输入',
  //       // options: [{ label: '13233774828', value: '13233774828' }]
  //     }
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
  //       message: '请输入合法的手机号码'
  //     }
  //   ],
  //   validateTrigger: 'onBlur'
  // },
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
        disabled: true
      }
    },
    rules: [
      {
        required: true,
      }
    ]
  },
  // {
  //   title: '证件号码',
  //   name: 'reprCertNo',
  //   span: 6,
  //   formOption: {
  //     type: '$input',
  //     props: { disabled: true }
  //     // props: {
  //     //   placeholder: '请输入数字',
  //     //   // options: [{ label: '411623200010245229', value: '411623200010245229' }]
  //     // }
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       // pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  //       // message: '请输入合法的身份证号'
  //     }
  //   ],
  //   validateTrigger: 'onBlur'
  // },
  // {
  //   title: '所属门店',
  //   name: 'storeId',
  //   span: 6,
  //   formOption: {
  //     type: '$yd-mg-select-store',
  //     props: {
  //       placeholder: '请选择门店',
  //       disabled: true
  //       // ref: formRef,
  //     }
  //   },
  //   rules: [{ required: true, message: '必填！' }]
  // },
  // {
  //   title: '所属经销商',
  //   name: 'buId',
  //   span: 6,
  //   formOption: {
  //     type: '$yd-mg-select-distributor',
  //     props: {
  //       placeholder: '请选择',
  //       disabled: true
  //       // ref:,
  //     }
  //   },
  //   rules: [{ required: true, message: '必填！' }]
  // },
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
        disabled: true
      }
    }
  },
  {
    title: '生日',
    name: 'vipBirthDate',
    span: 6,
    formOption: { type: '$datePicker', props: { placeholder: '请输入', disabled: true } }
  },
  {
    title: '地址',
    name: 'registerAddress',
    span: 6,
    rules: [
      // { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' },
      { min: 0, max: 100, message: '长度限制100个字符' }
    ],
    formOption: { type: '$input', props: { disabled: true } }
  }
];

export { getFormItems };
