import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SubmitWhite } from '@/components/el/ElIcon';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { Input, InputNumber } from 'antd';

// 表单字段
const getTableColumns = (
  type,
  handleChangeScore
): Array<ElSearchTableColumns> => {
  let columns: Array<ElSearchTableColumns> = [
    {
      title: '项目',
      align: 'center',
      dataIndex: 'category2',
      width: 60
    },
    {
      title: '类别',
      width: 40,
      align: 'center',
      dataIndex: 'category'
    },
    {
      title: '序号',
      width: 20,
      align: 'center',
      dataIndex: 'sortNo'
    },
    {
      title: '检查内容',
      width: 150,
      align: 'left',
      dataIndex: 'content'
    },
    {
      title: '分值',
      width: 40,
      align: 'center',
      dataIndex: 'qscore'
    }
  ];

  if (type === 'C') {
    columns.push({
      title: '自检得分',
      width: 40,
      align: 'center',
      dataIndex: 'selfTestScore',
      render: (value, record, index) => {
        let score;
        if (type === 'C') {
          if (record.parentType == 'B' || record.parentType == 'C') {
            score = record.zjscore;
          }
        }
        return (
          <InputNumber
            style={{ width: '100%' }}
            disabled={record.parentType === 'C' || record.testType === 'C'}
            min={0}
            value={score}
            max={record.qscore}
            onChange={(e) => handleChangeScore('C', record, e)}
          />
        );
      }
    });
  }

  if (type === 'B') {
    columns.push({
      title: '自检得分',
      width: 40,
      align: 'center',
      dataIndex: 'selfTestScore',
      render: (value, record, index) => {
        return (
          <InputNumber
            style={{ width: '100%' }}
            disabled={record.parentType === 'C'}
            min={0}
            value={record.score}
            max={record.qscore}
            onChange={(e) => handleChangeScore('C', record, e)}
          />
        );
      }
    });
  }

  if (type === 'C') {
    columns.push({
      title: '复检得分',
      width: 40,
      align: 'center',
      dataIndex: 'retestScore',
      render: (value, record, index) => {
        return (
          <InputNumber
            style={{ width: '100%' }}
            disabled={record.parentType === 'A'}
            min={0}
            value={record.score}
            max={record.qscore}
            onChange={(e) => handleChangeScore('C', record, e)}
          />
        );
      }
    });
  }

  return columns;
};

export { getTableColumns };
