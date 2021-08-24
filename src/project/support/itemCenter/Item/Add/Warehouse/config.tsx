import React from 'react';
import { Select } from 'antd';

const getTableFormItems: any = (type) => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  items: [
    {
      title: '是否启用批次',
      name: 'lotFlag',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$radio',
        props: {
          disabled: type === 'view',
          defaultValue: true,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ]
        }
      }
    },
    {
      title: '是否启用序列号',
      name: 'snFlag',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$radio',
        props: {
          disabled: type === 'view',
          defaultValue: true,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ]
        }
      }
    },
    {
      title: '效期管理标识',
      name: 'guaranteeFlag',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$radio',
        props: {
          disabled: type === 'view',
          defaultValue: true,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ]
        }
      }
    },
    {},
    {
      title: '包装规格',
      name: 'packageSpec',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view',
          placeholder: '请输入'
        }
      }
    },
    {
      title: '储存条件',
      name: 'storeCondition',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view',
          placeholder: '请输入'
        }
      }
    },
    {
      title: '运输条件',
      name: 'transCondition',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view',
          placeholder: '请输入'
        }
      }
    },
    {
      title: '保质期',
      name: 'guaranteePeriod',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '保质期单位',
      name: 'guaranteePeriodUnit',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'GUARANTEE_PERIOD_UNIT'
        }
      }
    },
    {
      title: '长',
      name: 'itemLength',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '宽',
      name: 'itemWidth',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '高',
      name: 'itemHeight',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '单位',
      name: 'dimensionUom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'LENGTH_UNIT'
        }
      }
    },
    {
      title: '体积',
      name: 'volume',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '体积单位',
      name: 'volumeUom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'VOLUME_UNIT'
        }
      }
    },
    {
      title: '毛重',
      name: 'grossWeight',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '净重',
      name: 'netWeight',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: '重量单位',
      name: 'weightUom',
      span: 6,
      wrapperCol: { span: 18 },
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'WEIGHT_UNIT'
        }
      }
    }
  ]
});

export { getTableFormItems };
