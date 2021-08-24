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

const getTableSearchFormItems = (): ElFormProps => {
  let form: ElFormProps = {
    items: [
      {
        title: '员工姓名',
        name: 'empName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '所属组织',
        name: 'buObj', // empBuId、empBuTreeId、empBuTreeDId
        formOption: {
          type: '$yd-support-org-tree',
          props: {
            keywords: 'buCodeNameLike',
            placeholder: '请输入',
            showColumn: 'buName'
          }
        }
      },
      {
        title: '性别',
        name: 'empGender',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ORG', udc: 'EMP_GENDER' }
        }
      },
      {
        title: '手机号',
        name: 'mobile',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '岗位',
        name: 'empType',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ORG', udc: 'EMP_TYPE' }
        }
      }
    ]
  };

  filledFormConfig(form);
  return form;
};

const getTableColumns = (): Array<ElSearchTableColumns> => {
  let columns: Array<ElSearchTableColumns> = [
    {
      title: '员工编号',
      dataIndex: 'empCode'
    },
    {
      title: '员工姓名',
      dataIndex: 'empName'
    },
    {
      title: '所属组织',
      dataIndex: 'buName'
    },
    {
      title: '性别',
      dataIndex: 'empGenderName'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '岗位',
      dataIndex: 'empTypeName'
    },
    {
      title: '状态',
      dataIndex: 'empStatusName'
    },
    {
      title: '用户名',
      dataIndex: 'userName'
    }
  ];

  filledColumnsConfig(columns);
  return columns;
};
const getUserTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '用户账号',
    align: 'center',
    dataIndex: 'username'
  },
  {
    title: '用户姓名',
    align: 'center',
    dataIndex: 'firstName'
  },
  {
    title: '用户别名',
    // width: 100,
    align: 'center',
    dataIndex: 'lastName'
  },
  {
    title: '手机号码',
    // width: 100,
    align: 'center',
    dataIndex: 'mobile'
  },
  {
    title: '电子邮箱',
    // width: 100,
    align: 'center',
    dataIndex: 'email'
  },
  {
    title: '角色列表',
    // width: 100,
    align: 'center',
    dataIndex: 'roleNames'
  },
  {
    title: '是否激活',
    // width: 100,
    align: 'center',
    dataIndex: 'enabled',
    render: (value) => {
      return value ? '是' : '否';
    }
  }
];

const getUserTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '用户账号',
      name: 'username',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '用户账号'
        }
      }
    },
    {
      title: '用户姓名',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '用户姓名'
        }
      }
    },
    {
      title: '手机号码',
      name: 'mobile',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '手机号码'
        }
      }
    },
    {
      title: '电子邮箱',
      name: 'email',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '电子邮箱'
        }
      }
    }
  ]
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getUserTableColumns,
  getUserTableSearchFormItems
};
