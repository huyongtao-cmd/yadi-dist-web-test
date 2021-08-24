import React, { Component } from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// SearchTable搜索表单
const getTableSearchFormItems = (storeRef, whRef, onSelectChange): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
        onRef: storeRef,
        onSelectChange,
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

        onRef: whRef
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
        allowClear: true
        // showColumn: 'itemCode'
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
        placeholder: '请输入',
        allowClear: true
        // showColumn: 'itemCode'
      }
    }
  },
  {
    title: '车架号',
    name: 'serialNo',
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
    title: '关联单据类型',
    name: 'srcDocCls',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'SRC_DOC_CLS'
      }
    }
  },
  {
    title: '关联单据编号',
    name: 'srcDocNo',
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
    title: '关联单据日期',
    name: 'ioDates',
    span: 6,
    formOption: { type: '$rangePicker' }
  },
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
    title: '门店名称',
    dataIndex: 'storeName',
    width: 100,
    align: 'center'
  },
  {
    title: '仓库名称',
    dataIndex: 'whName',
    width: 100,
    align: 'center'
  },
  {
    title: '关联单据类型',
    dataIndex: 'srcDocClsName',
    width: 100,
    align: 'center'
  },
  {
    title: '关联单据编号',
    dataIndex: 'srcDocNo',
    width: 100,
    align: 'center'
  },
  {
    title: '单据日期',
    dataIndex: 'es5',
    width: 100,
    align: 'center'
  },
  {
    title: '出入库类型',
    dataIndex: 'ioCodeName',
    width: 100,
    align: 'center'
  },
  {
    title: '经销商',
    dataIndex: 'buName',
    width: 100,
    align: 'center'
  }
];

// table按钮
const getTableActionButtons = (exports): Array<ActionButtonProps> => [
  {
    key: 'exports',
    text: '导出',
    location: 'left',
    handleClick: exports,
    authCode: 'inventoryLifeCycleExport'
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
