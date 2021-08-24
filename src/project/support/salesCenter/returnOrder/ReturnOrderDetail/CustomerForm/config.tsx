import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '顾客姓名',
    name: 'custName',
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入' } }
  },
  {
    title: '手机号码',
    name: 'reprCertMobile',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请输入',
      }
    },
  },
  {
    title: '证件类型',
    name: 'reprCertTypeName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '证件号码',
    name: 'reprCertNo',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请输入数字',
        // options: [{ label: '411623200010245229', value: '411623200010245229' }]
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
  {
    title: '性别',
    name: 'vipGenderName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        placeholder: '请选择',
        // prefixStr: '/yd-system',
        // domain: 'ORG',
        // udc: 'EMP_GENDER',
        disabled: true
      }
    }
  },
  {
    title: '生日',
    name: 'vipBirthDate',
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入' } }
  },
  {
    title: '地址',
    name: 'registerAddress',
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入数值(暂时)' } }
  }
];

export { getFormItems };
