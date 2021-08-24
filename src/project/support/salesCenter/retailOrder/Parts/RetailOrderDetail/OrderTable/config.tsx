import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 150,
      dataIndex: 'lineNo',
      // editable: true,
      align: 'center',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'lineNo'
        };
      },
      cellRender: (value, record, index) => index + 1
    },
    {
      title: '商品名称',
      width: 200,
      dataIndex: 'itemName',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: { showColumn: 'itemName' }
          },
          name: 'itemName'
        };
      }
    },
    {
      title: '商品编码',
      width: 150,
      dataIndex: 'itemCode',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'itemCode'
        };
      }
    },
    {
      title: '商品类型',
      width: 150,
      dataIndex: 'itemTypeName',
      align: 'left',
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'itemTypeName'
        };
      }
    },
    {
      title: '销售数量',
      width: 150,
      dataIndex: 'qty',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'qty'
        };
      }
    },
    {
      title: '单位',
      width: 150,
      dataIndex: 'uomName',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'uomName'
        };
      }
    },
    {
      title: '价格',
      width: 150,
      dataIndex: 'price',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'price'
        };
      }
    },
    {
      title: '折扣率(%)',
      width: 150,
      dataIndex: 'discRatio',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'discRatio'
        };
      }
    },
    {
      title: '优惠金额',
      width: 150,
      dataIndex: 'discAmt',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'discAmt'
        };
      }
    },
    {
      title: '金额',
      width: 150,
      dataIndex: 'amt',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'amt'
        };
      }
    },
    {
      title: '品牌',
      width: 150,
      dataIndex: 'brandName',
      align: 'left',
      // editable: true,
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
      title: '车架号',
      width: 150,
      dataIndex: 'serialNos',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'serialNos'
        };
      }
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      align: 'left',
      // editable: true,
      field: () => {
        return {
          formOption: {
            placeholder: '请选择',
            type: '$input',
            props: {}
          },
          name: 'remark'
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
    needConfirm: true,
    confirmText: '确定要删除吗？',
    minSelection: 1,
    handleClick: del
  }
];

export { getTableColumns, getTableActionButtons };
