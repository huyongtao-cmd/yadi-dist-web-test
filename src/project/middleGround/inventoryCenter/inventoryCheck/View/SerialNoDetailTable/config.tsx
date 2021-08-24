import React, { Component } from 'react';
import { ElEditTableColumns } from "@/components/el/ElEditTable";

const getTableColumns = (): Array<ElEditTableColumns> => [
  {
    title: '车架号',
    dataIndex: 'serialNo',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'serialNo'
      }
    },
  },
  {
    title: '商品编码',
    dataIndex: 'itemCode',
    width: 200,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'itemCode'
      }
    },
    cellRender: (text) => text
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    width: 200,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'itemName'
      }
    },
    cellRender: (text) => text
  },
  {
    title: '盘点状态',
    dataIndex: 'result',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'result'
      }
    },
  },
];

export { getTableColumns };