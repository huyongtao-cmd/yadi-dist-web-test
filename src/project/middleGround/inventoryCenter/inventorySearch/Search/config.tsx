import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';

// import { Checkbox } from 'antd';
import { ExportBlue } from '@/components/el/ElIcon';

// 搜索字段
const getTableSearchFormItems = (storeRef, whRef, onSelectChange): Array<ElFormItemProps> => [
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
    title: '商品大类',
    name: 'itemType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'ITM',
        udc: 'ITEM_TYPE'
      }
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
  {
    title: '品牌',
    name: 'brand', //有
    span: 6,
    formOption: {
      type: '$yd-mg-select-brand',
      props: { placeholder: '请选择' }
    }
  },
  // {
  //   title: '车架号',
  //   name: 'serialNo',
  //   span: 6,
  //   formOption: {
  //     type: '$input',
  //     props: { placeholder: '请输入' }
  //   }
  // },
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
    title: '颜色',
    name: 'color',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    title: '产地',
    name: 'origin',
    span: 6,
    formOption: {
      type: '$udc',
      props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ORIGIN' }
    }
  },
  // {
  //   title: '经销商',
  //   name: 'dealerBuId',
  //   span: 6,
  //   formOption: {
  //     type: '$input',
  //     props: {
  //       placeholder: '请输入'
  //     }
  //   }
  // },
  // {
  //   title: '显示0库存',
  //   name: 'noStk', //对
  //   span: 6,
  //   formOption: {
  //     type: '$switch'
  //   }
  // }
];

// 表单字段
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    width: 60,
    align: 'center',
    dataIndex: 'no',
    render: (value, record, index) => {
      return index + 1;
    }
  },
  {
    title: '商品名称',
    dataIndex: 'itemName', //对
    width: 100,
    align: 'center',
    render: (value, record, index) => {
      return <p style={{ whiteSpace: 'pre', margin: 0 }}>{record.itmItem?.itemName}</p>
    }
  },
  {
    title: '商品编号',
    dataIndex: 'itemCode', //对
    width: 100,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.itemCode;
    }
  },
  {
    title: '商品大类',
    dataIndex: 'itemTypeName',
    width: 90,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.itemTypeName;
    }
  },
  {
    title: '商品小类',
    dataIndex: 'itemType2Name',
    width: 90,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.itemType2Name;
    }
  },
  {
    title: '颜色',
    dataIndex: 'color', //对
    width: 90,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.color;
    }
  },
  {
    title: '库存数量',
    dataIndex: 'ohQty', //对
    width: 100,
    align: 'center'
  },
  {
    title: '单位',
    dataIndex: 'uomName',
    width: 100,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.uomName;
    }
  },
  // {
  //   title: '经销商',
  //   dataIndex: 'dealerName',
  //   width: 120,
  //   align: 'center'
  // },
  {
    title: '产地',
    dataIndex: 'origin',
    width: 120,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.originName;
    }
  },
  {
    title: '品牌',
    dataIndex: 'brand', //对
    width: 100,
    align: 'center',
    render: (value, record, index) => {
      return record.itmItem?.brandName;
    }
  },
  {
    title: '门店名称',
    dataIndex: 'storeName', //对
    width: 150,
    align: 'center'
  },
  {
    title: '仓库名称',
    dataIndex: 'whName', //对
    width: 150,
    align: 'center'
  },
];

// table按钮
const getTableActionButtons = (imports, exports): Array<ActionButtonProps> => [
  {
    key: 'import',
    text: '导入',
    location: 'left',
    handleClick: imports,
    icon: <ExportBlue />
  },
  {
    key: 'exports',
    text: '导出',
    location: 'left',
    handleClick: exports,
    icon: <ExportBlue />,
    authCode: 'inventorySearchExport'
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
