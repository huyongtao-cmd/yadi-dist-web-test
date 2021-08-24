import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
// import dayjs from 'dayjs';
const getEditForm = (): ElFormProps => {
  return {
    items: [
      {
        title: '手机号',
        name: 'reprCertMobile',
        span: 8,
        rules: [
          { required: true, message: '手机号必填！' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法手机号' }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '顾客等级',
        name: 'custLevel',
        span: 8,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yd-system',
            domain: 'CRM',
            udc: 'CUST_LEVEL'
          }
        }
      },
      {
        title: '注册时间',
        name: 'registerDate',
        span: 8,
        formOption: {
          type: '$datePicker',
          props: {
            placeholder: '请选择时间'
          }
        }
      },
      {
        title: '顾客名称',
        name: 'custName',
        span: 8,
        rules: [
          { required: true, message: '必填！' },
          { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '请填写'
          }
        }
      },
      {
        title: '性别',
        name: 'vipGender',
        span: 8,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            prefixStr: '/yd-system',
            domain: 'ORG',
            udc: 'EMP_GENDER'
          }
        }
      },
      {
        title: '出生日期',
        name: 'vipBirthDate',
        span: 8,
        formOption: {
          type: '$datePicker',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '证件类型',
        name: 'reprCertType',
        span: 8,
        formOption: {
          type: '$udc',
          props: {

            placeholder: '请选择',
            prefixStr: '/yd-system',
            domain: 'SAL',
            udc: 'CUST_ID_TYPE',
            // disabled: flag
          }
        },
        rules: [
          {
            required: true,
          }
        ]
      },
      {
        title: '证件号码',
        name: 'reprCertNo',
        span: 8,
        rules: [
          {
            required: true,
            message: '必填'
          },
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
          }
        }
      },
      {
        title: '职业',
        name: 'vipJob',
        span: 8,
        rules: [
          { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '地址',
        name: 'registerAddress',
        span: 8,
        rules: [
          { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符' }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '所属门店',
        name: 'storeId',
        span: 8,
        formOption: {
          type: '$yd-mg-select-store',
          props: {
            placeholder: '请选择门店',
            // ref: formRef,
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      // {
      //   title: '所属经销商',
      //   name: 'buId',
      //   span: 12,
      //   formOption: {
      //     type: '$yd-mg-select-distributor',
      //     props: {
      //       placeholder: '请选择',
      //       // disabled: true
      //     }
      //   },
      //   rules: [{ required: true, message: '必填！' }]
      // },
    ]
  };
};
export { getEditForm };
