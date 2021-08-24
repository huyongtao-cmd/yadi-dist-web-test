import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { Link } from 'react-router-dom';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// import { Checkbox } from 'antd';
import { ExportBlue } from '@/components/el/ElIcon';

// 搜索字段
const getTableSearchFormItems = (
  whRef,
  onSelectChange
): Array<ElFormItemProps> => [
    {
      title: '门店',
      name: 'buId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-store',
        props: { placeholder: '请选择', onSelectChange }
      }
    },
    {
      title: '仓库',
      name: 'whIds',
      span: 6,
      formOption: {
        type: '$yd-mg-select-wh',
        props: {
          placeholder: '请选择',
          multiple: true,
          onRef: whRef
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
      title: '品牌',
      name: 'brand', //有
      span: 6,
      formOption: {
        type: '$yd-mg-select-brand',
        props: { placeholder: '请选择' }
      }
    },
    {
      title: '颜色',
      name: 'itemType5',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
          // prefixStr: '/yd-system',
          // domain: 'ITM',
          // udc: 'COLOR'
        }
      }
    },
    {
      title: '出入库类型',
      // name: 'fressType',
      name: 'ioCode',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'INV',
          udc: 'IO_TYPE'
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
      title: '商品大类',
      name: 'itemType',
      formOption: {
        type: '$udc',
        props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE' }
      }
    },
    {
      title: '商品小类',
      name: 'itemType2',
      formOption: {
        type: '$udc',
        props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE2' }
      }
    },
    // {
    //   title: '商品层级',
    //   name: 'itemType3',
    //   formOption: {
    //     type: '$udc',
    //     props: {
    //       prefixStr: '/yd-system',
    //       domain: 'ITM',
    //       udc: 'ITEM_TYPE3',
    //     }
    //   }
    // },
  ];

// 表单字段
const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    width: 100,
    align: 'center',
    dataIndex: 'lineNo',
    render: (value, record, index) => {
      return index + 1;
    }
  },
  {
    title: '单据号',
    dataIndex: 'srcDocNo',
    width: 120,
    align: 'center',
    render: (value, record) => {
      let href = '/inventory/inventorysearch/account';
      if (record.srcDocCls === 'IN') {
        // href = `/inventory/inventoryin/itemview/${record.srcDocDid}`;
        href = `/inventory/inventoryin/itemview/${record.srcDocId}`;
      }
      // if (record.ioCode === 'D') {
      //   href = `/salesCenter/retailorder/detail/inventorySearch/${record.srcDocId}`;
      // }
      // if (record.ioCode === 'D') {
      //   href = `/inventory/inventoryin/itemview/${record.srcDocDid}`;
      // }
      if (record.srcDocCls === 'OUT') {
        href = `/inventory/inventoryout/itemview/${record.srcDocId}`;
      }
      const linkTo = () => {
        that.props.push(href)
      }
      return <a onClick={linkTo}>{value}</a>;
    }
  },
  {
    title: '门店名称',
    dataIndex: 'name',
    width: 120,
    align: 'center'
  },
  {
    title: '仓库名称',
    dataIndex: 'whName',
    width: 120,
    align: 'center'
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    width: 100,
    align: 'center',
    render: (value) => {
      return <p style={{ whiteSpace: 'pre', margin: 0 }}>{value}</p>
    }
  },
  {
    title: '商品编码',
    dataIndex: 'itemCode',
    width: 100,
    align: 'center'
  },
  {
    title: '颜色',
    dataIndex: 'itemType5',
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
    title: '数量',
    // dataIndex: 'avalQty', //对
    dataIndex: 'qty', //对
    width: 100,
    align: 'center'
  },
  {
    title: '出入库类型',
    dataIndex: 'ioCodeName',
    width: 120,
    align: 'center'
  },
  {
    title: '品牌',
    dataIndex: 'brandName', //对
    width: 100,
    align: 'center'
  }
  // {
  //   title: '操作',
  //   dataIndex: 'brand', //对
  //   width: 100,
  //   align: 'center'
  // }
];

// table按钮
const getTableActionButtons = (exports): Array<ActionButtonProps> => [
  {
    key: 'exports',
    text: '导出',
    location: 'left',
    handleClick: exports,
    icon: <ExportBlue />,
    authCode: 'inventoryAccountExport'
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
