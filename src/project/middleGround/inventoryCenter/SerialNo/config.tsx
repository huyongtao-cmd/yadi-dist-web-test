import React, { Component } from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// SearchTable搜索表单
const getTableSearchFormItems = (storeRef, whRef, onSelectChange): Array<ElFormItemProps> => [
  {
    title: '车架号',
    name: 'serialNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
      }
    }
  },
  {
    title: '商品编码',
    name: 'itemCode',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        // showColumn: 'itemCode'
      }
    }
  },
  {
    title: '门店',
    name: 'buId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: { placeholder: '请选择', onRef: storeRef, onSelectChange }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        placeholder: '请选择', onRef: whRef
      }
    }
  },
  {
    title: '状态',
    name: 'serialStatus',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'INVSERIAL_STATUS'
      }
    }
  }
];

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '车架号',
    dataIndex: 'serialNo',
    width: 100,
    align: 'center'
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    width: 100,
    align: 'center'
  },
  {
    title: '商品编号',
    dataIndex: 'itemCode',
    width: 100,
    align: 'center'
  },
  {
    title: '商品类型',
    dataIndex: 'itemTypeName',
    width: 100,
    align: 'center'
  },
  {
    title: '单位',
    dataIndex: 'uomName',
    width: 100,
    align: 'center'
  },
  {
    title: '经销商',
    dataIndex: 'buName',
    width: 100,
    align: 'center'
  },
  {
    title: '门店',
    dataIndex: 'storeName',
    width: 100,
    align: 'center'
  },
  {
    title: '仓库',
    dataIndex: 'whName',
    width: 100,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'serialStatusName',
    width: 100,
    align: 'center'
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: 100,
    align: 'center'
  },
  {
    title: '开票状态',
    dataIndex: 'es2Name',
    width: 100,
    align: 'center'
  },
];

// table按钮
const getTableActionButtons = (imports, exports): Array<ActionButtonProps> => [
  // {
  //   key: 'edit',
  //   text: '修改',
  //   location: 'left',
  //   // minSelection: 1,
  //   // maxSelection: 1,
  //   handleClick: edit
  // },
  {
    key: 'import',
    text: '导入',
    location: 'left',
    handleClick: imports,
    authCode: 'inventorySerialNoImport'
  },
  {
    key: 'exports',
    text: '导出',
    location: 'left',
    handleClick: exports,
    authCode: 'inventorySerialNoExport'
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
