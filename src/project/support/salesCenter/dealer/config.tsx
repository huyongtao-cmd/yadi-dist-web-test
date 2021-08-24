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
// import { getTableColumns as getOrgTableColumns } from '@/page/support/orgCenter/orgData/List/config';
import { Link } from 'react-router-dom';

const getTableSearchFormItems = (): ElFormProps => {
  let form: ElFormProps = {
    items: [
      {
        title: '经销商',
        name: 'buCodeNameLike',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入编号或者名称'
          }
        }
      },
      {
        title: '类型',
        name: 'cat',
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            domain: 'CRM',
            prefixStr: '/yd-system',
            udc: 'CUST_TYPE5'
          }
        }
      }
    ]
  };

  filledFormConfig(form);
  return form;
};

// 从@/page/support/orgCenter/orgData/List/config复制的。产品总是改代码，只好复制了
const getOrgTableColumns = (that): Array<ElSearchTableColumns> => {
  let columns: Array<ElSearchTableColumns> = [
    {
      title: '组织编号',
      align: 'center',
      dataIndex: 'buCode',
      render: (value, record) => {
        const linkTo = () => {
          that.props.push(`/orgCenter/orgData/detail/view/${record.id}`)
        }
        return <a onClick={linkTo}>{value}</a>;
      }
    },
    {
      title: '组织名称',
      align: 'center',
      dataIndex: 'buName'
    },
    {
      title: '所属组织',
      // width: 100,
      align: 'center',
      dataIndex: 'pidName'
    },
    {
      title: '组织简称',
      align: 'center',
      dataIndex: 'buAbbr'
    },
    {
      title: '组织类型',
      align: 'center',
      dataIndex: 'catName'
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'buStatusName'
    }
  ];

  filledColumnsConfig(columns);
  return columns;
};

const getTableColumns = (that): Array<ElSearchTableColumns> => {
  let src = getOrgTableColumns(that);
  let col = src.find((a) => a.dataIndex == 'buCode');
  col.title = '经销商编号';
  col.render = (text, row) => {
    const linkTo = () => {
      // 2021.06.24 更改菜单配置
      // that.props.push(`/orgCenter/mainData/dealer/detail/view/${row.id}`)
      that.props.push(`/mainData/dealer/detail/view/${row.id}`)
    }
    return <a onClick={linkTo}>{text}</a>;
  };
  src.find((a) => a.dataIndex == 'buName').title = '经销商名称';
  src.find((a) => a.dataIndex == 'buAbbr').title = '经销商简称';
  src.find((a) => a.dataIndex == 'catName').title = '类型';
  src.find((a) => a.dataIndex == 'buStatusName').title = '状态';
  return src;
};
export { getTableSearchFormItems, getTableColumns };
