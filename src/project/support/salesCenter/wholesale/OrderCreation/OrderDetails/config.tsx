import React from 'react';
import {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
// import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
// import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 150,
      dataIndex: 'id',
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'moqType'
        };
      }
    },
    {
      title: '商品名称',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '商品编码',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '库存数',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '数量',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '单位',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '价格',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '折扣比例',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '折扣金额',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '金额',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '车型系列',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '品牌',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'brandName'
        };
      }
    }
  ];
};

const getTableActionButtons = (add, del): Array<ActionButtonProps> => [
  {
    key: 'add',
    text: '新增',
    icon: <AddBlue />,
    location: 'left',
    handleClick: add
  },
  {
    key: 'remove',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    minSelection: 1,
    needConfirm: true,
    confirmText: '确认要删除选中的数据吗？',
    handleClick: del
  }
];

export { getTableColumns, getTableActionButtons };
