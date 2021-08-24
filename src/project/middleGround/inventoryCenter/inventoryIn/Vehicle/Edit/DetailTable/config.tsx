import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
import { Statistic } from '@/components/el/ItemComponent';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '序号',
      width: 110,
      dataIndex: 'payPlanNo'
    },
    {
      title: '车型名称',
      width: 120,
      dataIndex: 'payType',
      editable: true,
      rule: {
        required: true
      },
      // selectMapping: () => {},
      // field: () => {
      //   return {
      //     formOption: {
      //       type: '$udc',
      //       props: {
      //         prefixStr: '/yst-pur',
      //         domain: 'PUR',
      //         udc: 'PO_PAY_TYPE',
      //         selectRecord: true
      //       }
      //     },
      //     name: 'payType'
      //   };
      // },
      // cellRender: (value) => value && value.valDesc
    },
    {
      title: '整车编码',
      width: 200,
      dataIndex: 'ouCode'
    },
    {
      title: '单据数量',
      width: 200,
      dataIndex: 'ouName'
    },
    {
      title: '含税单价',
      width: 200,
      dataIndex: 'suppCode'
    },
    {
      title: '税率选择',
      width: 200,
      dataIndex: 'suppName'
    },
    {
      title: '入库数量',
      width: 160,
      dataIndex: 'paymentTermName'
    },
    {
      title: '单位',
      width: 140,
      dataIndex: 'planPayDate',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: { type: '$datePicker' },
          name: 'planPayDate'
        };
      }
    },
    {
      title: '含税金额',
      width: 180,
      dataIndex: 'planPayAmt',
      editable: true,
      align: 'right',
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$inputNumber',
            props: {
              min: 0,
              max: 9999999,
              precision: 2,
              style: { width: '100%' }
            }
          },
          name: 'planPayAmt'
        };
      },
      cellRender: (value) => <Statistic value={value} precision={2} />
    },
    {
      title: '车型系列',
      width: 120,
      dataIndex: 'currName'
    },
    {
      title: '品牌',
      width: 140,
      dataIndex: 'docNo'
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
};

const getTableActionButtons = (
  handleAdd,
  handleRemove
): Array<ActionButtonProps> => [
  {
    key: 'add',
    text: '新增',
    icon: <AddBlue />,
    location: 'left',
    handleClick: handleAdd
  },
  {
    key: 'remove',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    minSelection: 1,
    needConfirm: true,
    confirmText: '确认要删除选中的数据吗？',
    handleClick: handleRemove
  }
];

export { getTableColumns, getTableActionButtons };
