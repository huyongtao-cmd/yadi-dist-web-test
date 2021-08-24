import React from 'react';
import { ElFormItemProps } from "@/components/el/ElForm";
import { AddBlue, EditBlue, ExportBlack, ImportBlue, InvalidRed } from "@/components/el/ElIcon";
import { ActionButtonProps, ElSearchTableColumns } from "@/components/el/ElSearchTable";
import { Link } from 'react-router-dom';

const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    title: '盘点单号',
    dataIndex: 'docNo',
    width: 160,
    align: 'center',
    render: (value, record) => {
      const href = `/inventory/inventoryCheck/view/${record.id}`;
      const linkTo = () => {
        that.props.push(href)
      }
      return <a onClick={linkTo}>{value}</a>;
    }
  },
  {
    title: '门店名称',
    dataIndex: 'storeName',
    width: 200,
    align: 'center'
  },
  {
    title: '仓库名称',
    dataIndex: 'whName',
    width: 200,
    align: 'center'
  },
  {
    title: '盘点单类型',
    dataIndex: 'docMethodName',
    width: 140,
    align: 'center'
  },
  {
    title: '盘点周期',
    dataIndex: 'docTypeName',
    width: 120,
    align: 'center'
  },
  {
    title: '盘点范围',
    dataIndex: 'docModeName',
    width: 120,
    align: 'center',
  },
  {
    title: '盘点单状态',
    dataIndex: 'docStatusName',
    width: 120,
    align: 'center'
  },
  {
    title: '盘点单备注',
    dataIndex: 'remark',
    width: 160,
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 140,
    align: 'center'
  },
  {
    title: '制单人',
    dataIndex: 'createUserName',
    width: 120,
    align: 'center'
  }
];

const getTableActionButtons = (create, approve, edit, invalid, exports): Array<ActionButtonProps> => [
  {
    text: '新建',
    key: 'create',
    handleClick: create,
    location: 'left',
    icon: <AddBlue />,
    authCode: 'inventoryCheckListCreate'
  },
  {
    text: '修改',
    key: 'edit',
    handleClick: edit,
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    icon: <EditBlue />,
    authCode: 'inventoryCheckListEdit'
  },
  {
    text: '作废',
    key: 'delete',
    handleClick: invalid,
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    icon: <InvalidRed />,
  },
  {
    text: '审核',
    key: 'approve',
    handleClick: approve,
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    icon: <ImportBlue />
  },
  {
    text: '导出',
    key: 'exports',
    icon: <ExportBlack />,
    handleClick: exports,
    location: 'left',
    authCode: 'inventoryCheckExport'
  },
  // {
  //   text: '库存调整',
  //   key: 'adjust',
  //   handleClick: invAdjust,
  //   location: 'left'
  // }
];


const getTableSearchFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '盘点范围',
    name: 'docMode',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'INVENTORY_AREA'
      }
    }
  },
  {
    title: '盘点类型',
    name: 'docMethod',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'INVENTORY_TYPE'
      }
    }
  },
  {
    title: '盘点单状态',
    name: 'docStatus',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'INVENTORY_STATUS'
      }
    }
  },
  {
    title: '盘点周期',
    name: 'docType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'INVENTORY_CYCLE'
      }
    }
  },
  {
    title: '制单人',
    name: 'createUserId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-user',
      props: {
        placeholder: '请选择',
      }
    }
  },
  {
    title: '盘点单号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        allowClear: true
      }
    }
  },
  {
    title: '创建日期',
    name: 'createTime',
    span: 6,
    formOption: { type: '$rangePicker' }
  },
]







export { getTableColumns, getTableActionButtons, getTableSearchFormItems };