import React from 'react';
const options = [
  { value: true, label: '是' },
  { value: false, label: '否' }
];
const getTableFormItems: any = (type, that) => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  items: [
    {
      title: '是否安装',
      name: 'installFlag',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$radio',
        props: {
          disabled: type === 'view',
          options: options,
          onChange: (e) => {
            that.changedFields(e, 'installFlag');
          }
        }
      }
    },
    {
      title: '退换货承诺',
      name: 'returnExchangeFlag',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$radio',
        props: {
          disabled: type === 'view',
          options: options,
          onChange: (e) => {
            that.changedFields(e, 'returnExchangeFlag');
          }
        }
      }
    },
    {
      title: '是否保修',
      name: 'warrantyFlag',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$radio',
        props: {
          disabled: type === 'view',
          defaultValue: true,
          options: options,
          onChange: (e) => {
            that.changedFields(e, 'warrantyFlag');
          }
        }
      }
    },
    {
      title: '保修时长',
      name: 'warrantyPeriod',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view' || !that.state.formData.warrantyFlag
        }
      }
    },
    {
      title: '保修时长单位',
      name: 'warrantyPeriodUnit',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view' || !that.state.formData.warrantyFlag,
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'GUARANTEE_PERIOD_UNIT'
        }
      }
    }
  ]
});

export { getTableFormItems };
