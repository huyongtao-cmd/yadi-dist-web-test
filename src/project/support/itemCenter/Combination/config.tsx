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
  PlusOutlined,
  FormOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeliveredProcedureOutlined,
  FileDoneOutlined,
  ExportOutlined
} from '@ant-design/icons';
import { ElFormItemProps, ElFormProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { arrayExtensions } from 'mobx/dist/internal';
import { construct } from 'ramda';

type selectOptionItemValues = string | number;
interface selectOptionItem {
  label: string;
  value: selectOptionItemValues;
}

type selectOption = Array<selectOptionItem>;
const listToMap: any = (array: selectOption) => {
  let map = {};
  map = array.reduce((obj, item) => {
    obj[item.value] = item.label;
    return obj;
  }, {});
  return map;
};
interface dictListType {
  [props: string]: selectOption;
}
const dictList: dictListType = {
  status: [
    {
      label: '启用',
      value: '0'
    },
    {
      label: '禁用',
      value: '1'
    }
  ]
};

const dictMap = {
  status: listToMap(dictList.status)
};
const getDictName = (key, value) => {
  if (dictMap[key] && dictMap[key][value] !== undefined) {
    return dictMap[key][value];
  } else {
    return '-';
  }
};

// 搜索表单
const getTableSearchFormItems = (): ElFormProps => ({
  items: [
    {
      title: '组合商品编码',
      name: 'itemComboCode',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '组合商品名称',
      name: 'itemComboName',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '组合商品别名',
      name: 'itemComboOtherName',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '组合商品类别',
      name: 'itemComboType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'COMBO_ITEM_TYPE'
        }
      }
    },
    {
      title: '包含明细商品',
      name: 'itemNameLike',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '状态',
      name: 'status',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'COMBO_ITEM_STATUS'
        }
      }
    }
  ]
});

const getTableActionButtons = (that): Array<ActionButtonProps> => [
  {
    text: '新增',
    key: 'add',
    disabled: false,
    location: 'left',
    icon: <PlusOutlined />,
    handleClick: () => {
      that.newHandle();
    }
  },
  {
    text: '编辑',
    key: 'edit',
    disabled: false,
    location: 'left',
    maxSelection: 1,
    minSelection: 1,
    icon: <FormOutlined />,
    handleClick: () => {
      that.editHandle();
    }
  },
  // {
  //   text: '复制',
  //   key: 'copy',
  //   disabled: false,
  //   location: 'left',
  //   maxSelection: 1,
  //   minSelection: 1,
  //   icon: <CopyOutlined />,
  //   handleClick: () => {
  //     that.copyHandle();
  //   }
  // },
  {
    text: '停用',
    key: 'disable',
    disabled: false,
    location: 'left',
    icon: <CloseCircleOutlined />
  },
  {
    text: '启用',
    key: 'enable',
    disabled: false,
    location: 'left',
    icon: <CheckCircleOutlined />
  },
  {
    text: '批量导入',
    key: 'import',
    disabled: false,
    location: 'left',
    icon: <DeliveredProcedureOutlined />
  },
  {
    text: '模板下载',
    key: 'download',
    disabled: false,
    location: 'left',
    icon: <FileDoneOutlined />
  },
  {
    text: '提交审核',
    key: 'submit',
    disabled: false,
    location: 'left',
    icon: <CheckCircleOutlined />
  }
  // {
  //   text: '导出',
  //   key: 'export',
  //   disabled: false,
  //   location: 'left',
  //   icon: <ExportOutlined />
  // },
];

const getTableColumns = (thit): Array<ElSearchTableColumns> => [
  // {
  //   title: '序号',
  //   width: 60,
  //   align: 'center',
  //   dataIndex: 'indx'
  // },
  {
    title: '组合商品编码',
    width: 100,
    align: 'left',
    dataIndex: 'itemComboCode'
  },
  {
    title: '组合商品名称',
    width: 100,
    align: 'left',
    dataIndex: 'itemComboName'
  },
  {
    title: '组合商品别名',
    width: 100,
    align: 'left',
    dataIndex: 'itemComboOtherName'
  },
  {
    title: '组合商品类别',
    width: 100,
    align: 'left',
    dataIndex: 'itemComboTypeName'
  },
  // {
  //   title: '是否启用序列号',
  //   width: 100,
  //   align: 'left',
  //   dataIndex: 'isN'
  // },
  // {
  //   title: '是否启用批次号',
  //   width: 100,
  //   align: 'left',
  //   dataIndex: 'isP'
  // },
  // {
  //   title: '效期管理标识',
  //   width: 100,
  //   align: 'left',
  //   dataIndex: 'iden'
  // },
  // {
  //   title: '自动拆分',
  //   width: 100,
  //   align: 'left',
  //   dataIndex: 'autoSplit'
  // },
  {
    title: '创建时间',
    width: 100,
    align: 'left',
    dataIndex: 'createTime'
  },
  {
    title: '创建人',
    width: 100,
    align: 'left',
    dataIndex: 'creator'
  },
  {
    title: '状态',
    width: 100,
    align: 'left',
    dataIndex: 'statusName'
    // render: (value) => getDictName('status', value)
  }
];

export {
  getTableSearchFormItems,
  getTableActionButtons,
  getTableColumns,
  dictMap
};
