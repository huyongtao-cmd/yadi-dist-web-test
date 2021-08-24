//标签管理
import React from 'react';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '标签编码',
    align: 'center',
    dataIndex: 'tagCode'
  },
  {
    title: '标签名称',
    align: 'center',
    dataIndex: 'tagName'
  },
  {
    title: ' 标签描述',
    dataIndex: 'tagDesc',
    align: 'center'
  },
  {
    title: '标签状态',
    align: 'center',
    dataIndex: 'statusName'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '标签',
      name: 'tagCodeName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入标签名称/编码'
        }
      }
    },
    {
      title: '状态',
      name: 'status',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择标签状态',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'TAG_STATUS'
        }
      }
    }
  ]
};

export { getTableSearchFormItems, getTableColumns };
