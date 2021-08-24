import React from 'react';
import dayjs from 'dayjs';
import { asserts } from '@/utils';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  AddBlue,
  EditBlue,
  AuditBlue,
  CancelRed,
  SubmitBlue,
  ExportBlue
} from '@/components/el/ElIcon';
// import { Statistic } from '@/components/el/ItemComponent';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
const getTableColumns = (toDetail): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    dataIndex: 'docTypeName',
    width: 160,
    align: 'center',
    render: (text, record, index) => index + 1
  },
  {
    title: '仓库编号',
    dataIndex: 'whCode',
    width: 160,
    align: 'center'
    // render: (text, record) => <a onClick={() => toDetail(record)}>{text}</a>
  },
  {
    title: '仓库名称',
    dataIndex: 'whName',
    width: 160,
    align: 'center'
  },
  {
    title: '仓库类型',
    dataIndex: 'whTypeName',
    width: 200,
    ellipsis: true,
    align: 'center'
  },
  {
    title: '所属门店',
    dataIndex: 'buName',
    width: 160,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'whStatusName',
    width: 160,
    ellipsis: true,
    align: 'center'
  }
];

const getTableActionButtons = (create, edit, update): Array<ActionButtonProps> => [
  {
    text: '新建',
    key: 'create',
    handleClick: create,
    location: 'left',
    icon: <AddBlue />,
    authCode: 'warehousesettingListAdd'
  },
  {
    text: '编辑',
    key: 'edit',
    handleClick: edit,
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    icon: <EditBlue />,
    authCode: 'warehousesettingListEdit'
  },
  {
    text: '更新状态',
    key: 'update',
    handleClick: update,
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    icon: <EditBlue />
  }
];

//搜索表单
const getTableSearchFormItems = (): Array<ElFormItemProps> => [
  {
    title: '仓库',
    name: 'whName',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入名称/编号' }
    }
  },
  {
    title: '所属门店',
    name: 'buId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: { placeholder: '请选择' }
    }
  },
  {
    title: '仓库类型',
    name: 'whType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'WH_TYPE2'
      }
    }
  }
  // {
  //   title: '仓库编号',
  //   name: 'docStatus',
  //   span: 6,
  //   formOption: {
  //     type: '$input'
  //   }
  // },
  // {
  //   title: '仓管员',
  //   name: 'applyEmpId',
  //   span: 6,
  //   formOption: {
  //     type: '$input',
  //     props: {
  //       placeholder: ''
  //     }
  //   }
  // }
];

export { getTableColumns, getTableActionButtons, getTableSearchFormItems };
