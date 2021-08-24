/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-03-03 21:43:42
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-03 21:45:24
 */
import React from 'react';
import {
  AddBlue,
  EditBlue,
  SubmitCyan,
  CloseRed,
  BatchBlue,
  CopyBlue,
  AuditBlue
} from '@/components/el/ElIcon';
import { ElFormItemProps, ElFormProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// 搜索表单
export const getTableSearchFormItems = (): ElFormProps => ({
  items: [
    {
      title: '组织树编号',
      name: 'buTreeCode',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '组织树名称',
      name: 'buTreeName',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '组织树类型',
      name: 'buTreeType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'BUTREE_TYPE'
        }
      }
    },
    {
      title: '组织树状态',
      name: 'buTreeStatus',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'BUTREE_STATUS'
        }
      }
    }
  ]
});

export const getTableActionButtons = ({
  handleAdd,
  handleEdit,
  handleSetStatus,
  handleNewVision,
  handleResume,
  handlePermissionEdit
}): Array<ActionButtonProps> => [
    {
      text: '新增',
      key: 'add',
      disabled: false,
      location: 'left',
      icon: <AddBlue />,
      handleClick: () => {
        handleAdd();
      },
      authCode: 'orgTreeListAdd'
    },
    {
      text: '编辑',
      key: 'edit',
      disabled: false,
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      icon: <EditBlue />,
      handleClick: () => {
        handleEdit();
      },
      authCode: 'orgTreeListEdit'
    },
    {
      text: '编辑权限',
      key: 'editPermission',
      disabled: false,
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      icon: <EditBlue />,
      handleClick: () => {
        handlePermissionEdit();
      }
    },
    {
      text: '确认',
      key: 'accept',
      disabled: false,
      location: 'left',
      // maxSelection: 1,
      minSelection: 1,
      icon: <SubmitCyan />,
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleSetStatus({
          ids: selectedRowKeys,
          status: 'ACTIVE'
        });
      }
    },
    {
      text: '停用',
      key: 'stop',
      disabled: false,
      location: 'left',
      // maxSelection: 1,
      minSelection: 1,
      icon: <CloseRed />,
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        handleSetStatus({
          ids: selectedRowKeys,
          status: 'CLOSED'
        });
      }
    },
    {
      text: '创建新版本',
      key: 'newVision',
      disabled: false,
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      icon: <BatchBlue />,
      handleClick: () => {
        handleNewVision();
      }
    },
    {
      text: '复制',
      key: 'copy',
      disabled: false,
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      icon: <CopyBlue />,
      handleClick: () => {
        // that.editHandle();
      }
    },
    {
      text: '查看履历',
      key: 'resume',
      disabled: false,
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      icon: <AuditBlue />,
      handleClick: () => {
        handleResume();
      }
    }
  ];
export const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '组织树类型',
    width: 100,
    align: 'left',
    dataIndex: 'buTreeTypeName'
  },
  {
    title: '组织树编号',
    width: 100,
    align: 'left',
    dataIndex: 'buTreeCode'
  },
  {
    title: '组织树名称',
    width: 100,
    align: 'left',
    dataIndex: 'buTreeName'
  },
  {
    title: '组织树状态',
    width: 100,
    align: 'left',
    dataIndex: 'buTreeStatusName'
  },
  {
    title: '当前版本',
    width: 100,
    align: 'left',
    dataIndex: 'nowVersion',
    render: (value) => {
      return `V${value}`;
    }
  },
  {
    title: '创建人',
    width: 100,
    align: 'left',
    dataIndex: 'creator'
  },
  {
    title: '创建时间',
    width: 100,
    align: 'left',
    dataIndex: 'createTime'
  }
];
