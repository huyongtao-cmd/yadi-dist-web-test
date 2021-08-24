//顾客信息
import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '顾客姓名',
    name: 'custName',
    required: true,
    span: 6,
    formOption: {
      type: '$text',
      props: { placeholder: '请输入', disabled: true }
    }
  },
  {
    title: '手机号码',
    name: 'reprCertMobile',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请输入',
        disabled: true
      }
    },
    rules: [
      {
        required: true,
        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
        message: '请输入合法的手机号码'
      }
    ],
    validateTrigger: 'onBlur'
  },
  {
    title: '证件类型',
    name: 'reprCertTypeName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请选择',
        disabled: true
      }
    },
  },
  {
    title: '证件号码',
    name: 'reprCertNo',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请输入身份证号',
        disabled: true
      }
    },
    // rules: [
    //   {
    //     required: true,
    //     pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    //     message: '请输入合法的身份证号'
    //   }
    // ],
    // validateTrigger: 'onBlur'
  },
  // {
  //   title: '性别',
  //   name: 'vipGender',
  //   span: 6,
  //   formOption: {
  //     type: '$udc',
  //     props: {
  //       placeholder: '请选择',
  //       prefixStr: '/yd-system',
  //       domain: 'ORG',
  //       udc: 'EMP_GENDER',
  //       disabled: true
  //     }
  //   }
  // },
  {
    title: '性别',
    name: 'vipGenderName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '生日',
    name: 'vipBirthDate',
    span: 6,
    formOption: { type: '$text', props: { disabled: true } }
  },
  {
    title: '地址',
    name: 'registerAddress',
    span: 6,
    formOption: {
      type: '$text',
      props: { disabled: true }
    }
  },
  {
    title: '年龄段',
    name: 'es7Name',
    span: 6,
    formOption: {
      type: '$text',
      props: { disabled: true }
    }
  },
  // {
  //   title: '所属经销商',
  //   name: 'buName',
  //   span: 6,
  //   formOption: {
  //     type: '$text',
  //     props: { disabled: true }
  //   }
  // }
];

export { getFormItems };
