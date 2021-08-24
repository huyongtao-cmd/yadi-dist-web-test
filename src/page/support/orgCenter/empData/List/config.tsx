
import React from 'react';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { filledFormConfig, filledColumnsConfig } from '@/utils/tableHelper';
import { Link } from 'react-router-dom';

const getTableSearchFormItems = (): ElFormProps => {
  let form: ElFormProps = {
    items: [
      {
        title: '员工',
        name: 'empCodeName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '所属组织',
        name: 'buObj',
        formOption: {
          type: '$support-org-tree',
          props: {
            placeholder: '请选择',
            showColumn: 'buName'
          }
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
      dataIndex: 'empCode',
      render: (text, column) => {
        return <Link to={`/orgCenter/empData/detail/view/${column.id}`}>{text}</Link>;
      }
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
      title: '状态',
      dataIndex: 'empStatusName'
    }
  ];

  filledColumnsConfig(columns);
  return columns;
};
export {
  getTableSearchFormItems,
  getTableColumns
};
