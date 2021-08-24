import React from 'react';
import { Input, Radio, Form } from 'antd';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { ImgUpload } from '@/components/el/ItemComponent';
// import { getItemCodeList, getItemTypeList } from './service';
import { filledFormConfig, filledColumnsConfig } from '@/utils/tableHelper';
import { Link } from 'react-router-dom';

const statusList = [
  {
    label: '启用',
    value: '0'
  },
  {
    label: '禁用',
    value: '1'
  }
];

const getTableSearchFormItems = (): ElFormProps => {
  let form: ElFormProps = {
    items: [
      {
        title: '组织',
        name: 'buCodeNameLike',
        formOption: {
          type: '$input',
          props: {
            placeholder: '组织编号、名称、简称'
          }
        }
      },
      {
        title: '所属公司',
        name: 'ouObj',
        formOption: {
          type: '$support-pop-ou',
          props: {
            placeholder: '请选择'
          }
        }
      },
      {
        title: '组织类型',
        name: 'buType',
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            domain: 'ORG',
            prefixStr: '/yd-system',
            udc: 'BU_TYPE'
          }
        }
      },
      {
        title: '组织状态',
        name: 'buStatus',
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            domain: 'ORG',
            prefixStr: '/yd-system',
            udc: 'BU_STATUS'
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
      title: '组织编号',
      align: 'center',
      dataIndex: 'buCode',
      render: (text, column) => {
        const linkTo = () => {
          that.props.push(`/orgCenter/orgData/orgList/detail/view/${column.id}`)
        }
        return (
          <a onClick={linkTo}>{text}</a>
        );
      }
    },
    {
      title: '组织名称',
      align: 'center',
      dataIndex: 'buName'
    },
    {
      title: '所属公司',
      // width: 100,
      align: 'center',
      dataIndex: 'ouName'
    },
    {
      title: '组织简称',
      align: 'center',
      dataIndex: 'buAbbr'
    },
    {
      title: '组织类型',
      align: 'center',
      dataIndex: 'buTypeName'
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

export { getTableSearchFormItems, getTableColumns };
