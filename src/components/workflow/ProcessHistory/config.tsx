import React from 'react';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { Tag } from 'antd';
import { ACTION_TYPE } from '../constance';
import DateFormatter from '../DateFormatter';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '日期时间',
    align: 'center',
    dataIndex: 'time',
    render: (value) => {
      return <DateFormatter dateString={value} />;
    }
  },
  {
    title: '任务节点',
    align: 'center',
    dataIndex: 'taskName'
  },
  {
    title: '任务负责人',
    align: 'center',
    dataIndex: 'taskLeaders',
    render: (value: string) => {
      if (!value) {
        return <Tag color='#f50'>当前任务节点无处理人,请联系管理员</Tag>;
      } else {
        return value;
      }
    }
  },
  {
    title: '任务当前处理人',
    align: 'center',
    dataIndex: 'taskHandler'
  },
  {
    title: '任务最终处理人',
    align: 'center',
    dataIndex: 'userName'
  },
  {
    title: '操作类型',
    dataIndex: 'type',
    render: (text, row) => {
      if (!text) {
        text = 'TODO';
      }
      return ACTION_TYPE[text];
    }
  },
  {
    title: '意见',
    dataIndex: 'message'
  }
];
export { getTableColumns };
