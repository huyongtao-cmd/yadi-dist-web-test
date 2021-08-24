import React, { Component } from 'react';
import { ElEditTableColumns } from "@/components/el/ElEditTable";

const getTableColumns = (): Array<ElEditTableColumns> => [
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
    title: '品牌',
    dataIndex: 'brandName',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'brandName'
      }
    },
  },
  {
    title: '商品类型',
    dataIndex: 'itemTypeName',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'itemTypeName'
      }
    },
  },
  {
    title: '库存数',
    dataIndex: 'accQty1',
    width: 140,
    editable: false,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'accQty1'
      }
    },
    cellRender: (value, record, text) => { return <span>{value}</span> }
  },
  {
    title: '实际数量',
    dataIndex: 'factQty',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$inputNumber',
        },
        name: 'factQty'
      }
    }
  },
  {
    title: '盈亏数',
    dataIndex: 'diffQty',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$inputNumber',
        },
        name: 'diffQty'
      }
    },
    cellRender: (text) => { return <span style={{ color: text > 0 ? 'green' : text < 0 ? 'red' : 'black' }}>{text}</span> }
  },
  {
    title: '类型',
    dataIndex: 'lineType',
    width: 140,
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$inputNumber',
        },
        name: 'lineType'
      }
    }
  },
  {
    title: '单位',
    width: 120,
    dataIndex: 'uomName',
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$input',
        },
        name: 'uomName'
      };
    },
  },
  {
    title: '备注',
    width: 200,
    dataIndex: 'remark',
    editable: true,
    field: () => {
      return {
        formOption: {
          type: '$textArea',
          props: { autoSize: { minRows: 1, maxRows: 3 } }
        },
        name: 'remark'
      };
    }
  }
];

export { getTableColumns };