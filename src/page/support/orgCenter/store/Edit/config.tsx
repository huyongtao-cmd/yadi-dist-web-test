import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import { ElFormItemProps } from '@/components/el/ElForm';

// 基础配置
const getBaseConfig = (
  type,
  status,
  formDataBase,
  that
): Array<ElFormItemProps> => [
  {
    title: '所属组织',
    name: 'buObj',
    formOption: {
      type: '$support-org-tree',
      props: {
        placeholder: '请选择',
        disabled: type === 'view' || status === 'CLOSED' || type === 'edit',
        showColumn: 'buName'
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '门店编号',
    name: 'storeCode',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED' || type === 'edit'
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '门店名称',
    name: 'storeName',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '门店类型',
    name: 'storeType',
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'ORG',
        udc: 'STORE_TYPE',
        disabled: type === 'view' || status === 'CLOSED'
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '营业时间段',
    name: 'openTimeSpan',
    formOption: {
      type: '$input',
      props: {
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '备注',
    name: 'remark',
    formOption: {
      type: '$input',
      props: {
        placeholder: '备注',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  }
];

const getClassCodeConfig = (type, status): ElFormProps => {
  let items = [];

  for (let index = 0; index < 10; index++) {
    let name = 'cat';
    let udc = 'OU_CAT';
    if (index !== 0) {
      name += `${index + 1}`;
      udc += `${index + 1}`;
    }
    items.push({
      title: `类别码${index + 1}`,
      name: name,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: udc,
          disabled: type === 'view' || status === 'CLOSED'
        }
      }
    });
  }
  return {
    items: items
  };
};

export { getBaseConfig, getClassCodeConfig };
