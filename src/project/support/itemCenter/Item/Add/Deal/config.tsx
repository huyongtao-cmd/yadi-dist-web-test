import React from 'react';

const getTableFormItems: any = (type) => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  items: [
    {
      title: '计量单位',
      name: 'uom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'COM',
          udc: 'UOM'
        }
      }
    },
    {
      title: '采购计量单位',
      name: 'purcUom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'COM',
          udc: 'UOM'
        }
      }
    },
    {
      title: '销售计量单位',
      name: 'saleUom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'COM',
          udc: 'UOM'
        }
      }
    },
    {
      title: '定价计量单位',
      name: 'pricingUom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'COM',
          udc: 'UOM'
        }
      }
    },
    {
      title: '税码',
      name: 'taxCode',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view',
          placeholder: '请输入税码'
        }
      }
    }
  ]
});

export { getTableFormItems };
