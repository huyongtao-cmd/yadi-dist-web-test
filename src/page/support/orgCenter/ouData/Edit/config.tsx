import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import { ElFormItemProps } from '@/components/el/ElForm';
import * as service from './service';

// 基础配置
const getBaseConfig = (type, status): Array<ElFormItemProps> => [
  {
    title: '公司编号',
    name: 'ouCode',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || (status != '' && status != 'DRAFT')
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '类型',
    name: 'ouType',
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'ORG',
        udc: 'OU_TYPE',
        disabled: type === 'view' || status === 'CLOSED'
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '公司名称',
    name: 'ouName',
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
    title: '公司简称',
    name: 'ouAbbr',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '状态',
    name: 'ouStatusName',
    formOption: {
      type: '$text',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '法人公司',
    name: 'legalOuNames',
    formOption: {
      type: '$support-pop-ou',
      props: {
        placeholder: '请选择法人公司',
        disabled: type === 'view' || (status != '' && status != 'DRAFT')
      }
    }
  },
  {
    title: '排序号',
    name: 'sortNo',
    formOption: {
      type: '$inputNumber',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '法人姓名',
    name: 'reprName',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '工商登记号',
    name: 'icRegisterNo',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '创建日期',
    name: 'createTime',
    formOption: {
      type: '$text'
    }
  },
  {
    title: '创建人',
    name: 'creator',
    formOption: {
      type: '$text'
    }
  }
];

const getFinancialConfig = (type, status): Array<ElFormItemProps> => [
  {
    title: '默认币种',
    name: 'ouCurr',
    formOption: {
      type: '$select',
      props: {
        placeholder: '请选择',
        request: async () => {
          return await service.getCurrAll();
        },
        disabled: type === 'view' || status === 'CLOSED',
        transfer: {
          label: 'currName',
          value: 'currCode'
        }
      }
    }
  },
  {
    title: '纳税人类型',
    name: 'taxpayerType',
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'ORG',
        udc: 'TAXPAYER_TYPE',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '纳税人识别号',
    name: 'taxerCode',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
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

export { getBaseConfig, getFinancialConfig, getClassCodeConfig };
