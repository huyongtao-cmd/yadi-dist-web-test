//地址
import React from 'react';
import { Link } from 'react-router-dom';
import { ElFormItemProps, ElFormProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';

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
      label: '审核中',
      value: 'approve'
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
      title: '地址簿编号',
      name: 'addrNo',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '地址簿名称',
      name: 'addrName',
      span: 6,
      formOption: { type: '$input', props: { placeholder: '请输入' } }
    },
    {
      title: '地址簿类型',
      name: 'addrType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'ADDR_TYPE'
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
    icon: <AddBlue />,
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
    icon: <EditBlue />,
    handleClick: () => {
      that.editHandle();
    }
  }
];

const getTableColumns = (thit): Array<ElSearchTableColumns> => [
  {
    title: '地址簿编号',
    width: 100,
    align: 'left',
    dataIndex: 'addrNo',
    render: (value, record) => {
      const linkTo = () => {
        thit.props.push(`/orgCenter/addr/view/${record.id}`)
      }
      return <a onClick={linkTo}>{value}</a>;
    }
  },
  {
    title: '地址簿类型',
    width: 100,
    align: 'left',
    dataIndex: 'addrTypeName'
  },
  {
    title: '地址簿名称',
    width: 100,
    align: 'left',
    dataIndex: 'addrName'
  },
  {
    title: '创建人',
    width: 100,
    align: 'left',
    dataIndex: 'createUserName'
  },
  {
    title: '创建时间',
    width: 100,
    align: 'left',
    dataIndex: 'createTime'
  }
];

export {
  getTableSearchFormItems,
  getTableActionButtons,
  getTableColumns,
  dictMap
};
