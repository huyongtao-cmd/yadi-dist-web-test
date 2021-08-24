/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-25 11:25:32
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 17:49:12
 */
import React from 'react';
import { Input, Radio, Form } from 'antd';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { ImgUpload } from '@/components/el/ItemComponent';
// import { getItemCodeList, getItemTypeList } from './service';
import {
  filledFormConfig,
  filledColumnsConfig
} from '@/project/utils/tableHelper';
import { Link } from 'react-router-dom';

const getTableSearchFormItems = (): ElFormProps => {
  let form: ElFormProps = {
    items: [
      {
        title: '维修站',
        name: 'storeCodeOrNameLike',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入编号或名称'
          }
        }
      },
      {
        title: '所属组织',
        name: 'buObj', //pid
        formOption: {
          type: '$yd-support-org-tree',
          props: {
            keywords: 'buCodeNameLike',
            placeholder: '请输入',
            showColumn: 'buName'
          }
        }
      }
    ]
  };

  filledFormConfig(form);
  return form;
};

const getTableColumns = (that): Array<ElSearchTableColumns> => {
  let columns: Array<ElSearchTableColumns> = [
    {
      title: '维修站编号',
      dataIndex: 'storeCode',
      render: (value, record) => {
        // 2021.06.24  修改路由配置 去掉 /orgCenter
        const linkTo = () => {
          that.props.push(`/mainData/servingStation/detail/view/${record.id}`)
        }
        return <a onClick={linkTo}>{value}</a>;
      }

    },
    {
      title: '维修站名称',
      dataIndex: 'storeName'
    },
    {
      title: '所属组织',
      dataIndex: 'pidName'
    },
    {
      title: '营业时间段',
      dataIndex: 'openTimeSpan'
    },
    {
      title: '状态',
      dataIndex: 'storeStatusName'
    }
  ];

  filledColumnsConfig(columns);
  return columns;
};
export { getTableSearchFormItems, getTableColumns };
