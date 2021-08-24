import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import dayjs from 'dayjs';

const getTableColumns = (delteBand): Array<ElSearchTableColumns> => [
  {
    title: '自检单号',
    align: 'center',
    dataIndex: 'inspectionId'
  },
  {
    title: '门店名称',
    align: 'center',
    dataIndex: 'storeName'
  },
  {
    title: '自检单类型',
    align: 'center',
    dataIndex: 'selfTestTypeName'
  },
  {
    title: '自检单状态',
    align: 'center',
    dataIndex: 'testTypeName' // todo
  },
  {
    title: '年月',
    align: 'center',
    dataIndex: 'timeVersion'
  },
  {
    title: '次数',
    align: 'center',
    dataIndex: 'frequency'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    render: (value, record, index) => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  {
    title: '自检分数',
    align: 'center',
    dataIndex: 'selfTestScore'
  },
  {
    title: '复检分数',
    align: 'center',
    dataIndex: 'retestScore'
  },
  {
    title: '最终分数',
    align: 'center',
    dataIndex: 'finalScore'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '门店',
      name: 'storeId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-store',
        props: {
          placeholder: '请选择'
        }
      }
    },
    {
      title: '自检单类型名称',
      name: 'selfTestTypeName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          prefixStr: '/yd-system',
          domain: 'TEST',
          udc: 'TYPE'
        }
      }
    },
    {
      title: '单据状态',
      name: 'testType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'TEST',
          udc: 'TYPE'
        }
      }
    },
    {
      title: '单号',
      name: 'inspectionId',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    {
      title: '年月',
      name: 'timeVersion',
      span: 6,
      formOption: {
        type: '$datePicker',
        props: {
          picker: 'month',
          format: 'YYYY/M'
        }
      }
    },
    {
      title: '次数',
      name: 'frequency',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    }
  ]
};

export { getTableSearchFormItems, getTableColumns };
