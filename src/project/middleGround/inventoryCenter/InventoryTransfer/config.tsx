import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { Link } from 'react-router-dom';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// import { Checkbox } from 'antd';
import { ExportBlue, SubmitBlue, AddBlue } from '@/components/el/ElIcon';

// 搜索字段
const getTableSearchFormItems = (
  oWhRef,
  iWhRef,
  outSelectChange,
  inSelectChange
): Array<ElFormItemProps> => [
    {
      title: '调出门店',
      name: 'oouId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-store',
        props: { placeholder: '请选择', onSelectChange: outSelectChange }
      }
    },
    {
      title: '调出仓库',
      name: 'owhId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-wh',
        props: {
          placeholder: '请选择',
          onRef: oWhRef
        }
      }
    },
    {
      title: '调入门店',
      name: 'iouId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-inStore',
        props: { placeholder: '请选择', onSelectChange: inSelectChange }
      }
    },
    {
      title: '调入仓库',
      name: 'iwhId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-inWh',
        props: {
          placeholder: '请选择',
          onRef: iWhRef
        }
      }
    },
    {
      title: '调拨单号',
      name: 'docNo',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    {
      title: '日期',
      name: 'ioDate',
      span: 6,
      formOption: {
        type: '$rangePicker'
      }
    },
    {
      title: '状态',
      // name: 'fressType',
      name: 'docStatus',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'INV',
          udc: 'INV_DOC_STATUS'
        }
      }
    },
    {
      title: '商品名称',
      name: 'itemName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    }
  ];

// 表单字段
const getTableColumns = (that): Array<ElSearchTableColumns> => [
  // {
  //   title: '序号',
  //   width: 100,
  //   align: 'center',
  //   dataIndex: 'lineNo',
  //   render: (value, record, index) => {
  //     return index + 1;
  //   }
  // },
  {
    title: '调拨单号',
    dataIndex: 'docNo',
    width: 120,
    align: 'center',
    render: (value, record) => {
      const href = `/inventory/inventorytransfer/view/${record.docStatus}/${record.id}`;
      const linkTo = () => {
        that.props.push(href)
      }
      return <a onClick={linkTo}>{value}</a>;
    }
  },
  {
    title: '调出门店',
    dataIndex: 'oouidName',
    width: 120,
    align: 'center'
  },
  {
    title: '调出仓库',
    dataIndex: 'owhName',
    width: 120,
    align: 'center'
  },
  {
    title: '调入门店',
    dataIndex: 'iouidName',
    width: 120,
    align: 'center'
  },
  {
    title: '调入仓库',
    dataIndex: 'iwhName',
    width: 120,
    align: 'center'
  },
  // {
  //   title: '商品名称',
  //   dataIndex: 'itemName',
  //   width: 100,
  //   align: 'center',
  //   render: (value) => {
  //     return <p style={{whiteSpace: 'pre', margin: 0}}>{value}</p>
  //   }
  // },
  // {
  //   title: '商品编码',
  //   dataIndex: 'itemCode',
  //   width: 100,
  //   align: 'center'
  // },
  // {
  //   title: '颜色',
  //   dataIndex: 'itemType5',
  //   width: 100,
  //   align: 'center'
  // },
  // {
  //   title: '单位',
  //   dataIndex: 'uomName',
  //   width: 100,
  //   align: 'center'
  // },
  {
    title: '调拨总数',
    // dataIndex: 'avalQty', //对
    dataIndex: 'qty', //对
    width: 100,
    align: 'center',
    render: (value, record) => <span>{parseInt(value || 0)}</span>
  },
  {
    title: '状态',
    dataIndex: 'docStatusName',
    width: 120,
    align: 'center'
  }
];

// table按钮
const getTableActionButtons = (create, confirm, exports): Array<ActionButtonProps> => [
  {
    key: 'create',
    text: '新增',
    location: 'left',
    handleClick: create,
    icon: <AddBlue />,
    authCode: 'inventoryTransferAdd'
  },
  {
    key: 'confirm',
    text: '确认',
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    handleClick: confirm,
    icon: <SubmitBlue />
  },
  {
    key: 'exports',
    text: '导出',
    location: 'left',
    handleClick: exports,
    icon: <ExportBlue />,
    authCode: 'inventoryTransferExport'
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
