import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import {
  filledColumnsConfig,
  filledColumnsEditAbleConfig
} from '@/utils/tableHelper';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

// 基础配置
const getBaseConfig = ({ type }) => {
  let form: ElFormProps = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
    items: [
      {
        title: '所属组织',
        name: 'buObj',
        formOption: {
          type: '$support-org-tree',
          props: {
            placeholder: '请选择',
            showColumn: 'buName',
            disabled: type === 'view'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '员工姓名',
        name: 'empName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '员工编号',
        name: 'empCode',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '绑定用户',
        name: 'userObj',
        formOption: {
          type: '$support-pop-user',
          props: {
            placeholder: '请选择',
            disabled: type === 'view',
            showColumn: 'username'
          }
        }
      },
      {
        title: '性别',
        name: 'empGender',
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ORG',
            udc: 'EMP_GENDER',
            disabled: type === 'view'
          }
        }
      },
      {
        title: '出生日期',
        name: 'birthDate',
        formOption: {
          type: '$datePicker',
          props: {
            format: 'YYYY-MM-DD',
            placeholder: '请输入',
            disabled: type === 'view'
          }
        }
      },
      {
        title: '证件类型',
        name: 'idType',
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ORG',
            udc: 'EMP_ID_TYPE',
            disabled: type === 'view'
          }
        }
      },
      {
        title: '证照号码',
        name: 'idNo',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view'
          }
        }
      }
    ]
  };
  return form;
};
const getWorkPostConfig = (): Array<ElEditTableColumns> => {
  let columns: Array<ElEditTableColumns> = [
    {
      title: '组织',
      dataIndex: 'buObj',
      cellRender: (value) => {
        return value?.buName;
      },
      field: (form) => {
        return '$support-pop-bu';
      }
    },
    {
      title: '岗位',
      dataIndex: 'buObj',
      cellRender: (value) => {
        return value?.buName;
      },
      field: (form) => {
        return '$support-pop-bu';
      }
    }
  ];

  filledColumnsEditAbleConfig(columns);
  filledColumnsConfig(columns);
  return columns;
};
export { getBaseConfig, getWorkPostConfig };
