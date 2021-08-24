
import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { ElFormProps } from '@/components/el/ElForm';
import { ElFormItemProps } from '@/components/el/ElForm';
import { ElEditTableColumns, ActionButtonProps } from '@/components/el/ElEditTable';
import { Switch } from 'antd'
import * as service from '../service';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';

// 基础配置
const getBaseConfig = (): Array<ElFormItemProps> => [
  {
    title: '地址薄编号',
    name: 'addrNo',
    formOption: {
      type: '$text'
    }
  },
  {
    title: '类型',
    name: 'addrTypeName',
    formOption: {
      type: '$text'
    }
  },
  {
    title: '地址薄名称',
    name: 'addrName',
    formOption: {
      type: '$text'
    }
  }
];
export {
  getBaseConfig
};
