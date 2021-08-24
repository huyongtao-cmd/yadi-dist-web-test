
import { ElFormItemProps } from '@/components/el/ElForm';
const getFormItems = (data, mark, that, extraData): Array<ElFormItemProps> => [
  {
    title: '付款方式',
    name: 'payType',
    span: 24,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择付款方式',
        prefixStr: '/yst-system',
        domain: 'PUR',
        udc: 'PAY_TYPE',
        disabled: mark == 'generate' ? false : true,
      }
    }
  },
  {
    title: '可推付款金额',
    name: 'canPayAmount',
    span: 24,
    formOption: {
      type: '$input', props: {
        disabled: mark == 'generate' ? true : false,
      }
    }
  },
  {
    title: '本次支付金额',
    name: 'totalAmount',
    span: 24,
    rules: [{ required: true, message: '必填！' },
    (formInstance) => ({
      validator(_, value) {
        const canPayAmount = formInstance.getFieldValue('canPayAmount');
        if (value > canPayAmount)
          return Promise.reject(new Error('本次支付金额不可大于可推付金额'));
        else
          return Promise.resolve();
      }
    })
    ],
    formOption: {
      type: '$inputNumber', props: {
        precision: 2,
        min: 0,
        max: extraData?.settleEntityAddrNo
      }
    }
  },
  {
    title: '我方银行账号',
    name: 'weAccount',
    span: 24,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$fin-item-bankAccount',
      props: {
        placeholder: '请选择我方银行账号',
        disabled: mark == 'generate' ? false : true,
        showColumn: 'bankAcc',
        paramData: { addrNo: extraData?.settleEntityAddrNo }
      }
    },
  },
  {
    title: '我方银行账户',
    name: 'weAccountName',
    span: 24,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input', props: {
        disabled: mark == 'generate' ? true : false,
      }
    }
  },
  {
    title: '收款方开户行',
    name: 'accountName',
    span: 24,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input', props: {
        disabled: mark == 'generate' ? true : false,
      }
    }
  },
  {
    title: '收款账户',
    name: 'account',
    span: 24,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input', props: {
        disabled: mark == 'generate' ? true : false,
      }
    }
  },
  {
    title: '支付备注',
    name: 'remark',
    span: 24,
    formOption: {
      type: '$input', props: {
        disabled: mark == 'generate' ? false : true,
      }
    }
  }
];

export { getFormItems };
