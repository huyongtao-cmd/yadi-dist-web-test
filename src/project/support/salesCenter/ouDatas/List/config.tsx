/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-25 11:25:32
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 17:49:12
 */
import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  EditBlue,
  AuditBlue,
  CancelRed,
  SubmitBlue,
  ExportBlue
} from '@/components/el/ElIcon';
import { Link } from 'react-router-dom';

// table
const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'ouCode',
    width: 160,
    render: (text, column, index) => {
      return index + 1;
    }
  },
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'custName'
  },
  {
    title: '客户编码',
    // width: 100,
    align: 'center',
    dataIndex: 'custCode',
    render: (text, column) => {
      const linkTo = () => {
        that.props.push(`/salesCenter/ouDatas/detail/detail/${column.custCode}`)
      }
      return <a onClick={linkTo}>{text}</a>;
    }
  },
  {
    title: '类型',
    // width: 100,
    align: 'center',
    dataIndex: 'custTypeName'
  },
  {
    title: '手机号',
    // width: 100,
    align: 'center',
    dataIndex: 'mobile',
    render: (text, column, index) => {
      // console.log(column.orgAddrDetailDTO?.orgAddrAddressVos, 'column.orgAddrDetailDTO.orgAddrAddressVos')
      // return index;
      if (column.orgAddrDetailDTO?.orgAddrAddressVos != null && column.orgAddrDetailDTO?.orgAddrAddressVos?.length > 0) {
        return column.orgAddrDetailDTO?.orgAddrAddressVos[0]?.mobile;
      }
    }
  },
  {
    title: '电话',
    // width: 100,
    align: 'center',
    dataIndex: 'tel',
    render: (text, column, index) => {
      if (column.orgAddrDetailDTO?.orgAddrAddressVos != null && column.orgAddrDetailDTO.orgAddrAddressVos?.length > 0) {
        return column.orgAddrDetailDTO?.orgAddrAddressVos[0]?.tel;
      }
    }
  },
  {
    title: '合作时间',
    // width: 100,
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '所属经销商',
    // width: 100,
    align: 'center',
    dataIndex: 'buName',
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '客户编码',
      name: 'custCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    {
      title: '客户名称',
      name: 'custName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    // {
    //   title: '客户类型',
    //   name: 'custType',
    //   formOption: {
    //     type: '$select',
    //     props: {
    //       options: [
    //         { label: '配件', value: 'B' },
    //         { label: '整车', value: 'A' },
    //         { label: '整车和配件', value: 'C' },
    //       ]
    //     }
    //   },
    //   // rules: [{ required: true, message: '必填！' }]
    // },
    {
      title: '客户类型',
      name: 'custType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'CRM',
          udc: 'CUST_TYPE'
        }
      }
    },
    {
      title: '所属经销商',
      name: 'buId',
      span: 6,
      // formOption: {
      //   type: '$input',
      //   props: {
      //     placeholder: '请输入',
      //     disabled: type === 'view' || status === 'CLOSED'
      //   }
      // },
      formOption: {
        type: '$yd-mg-select-distributor',
        props: {
          // placeholder: '自己',
          // disabled: true
        }
      }
      // formOption: {
      //   type: '$udc',
      //   props: {
      //     placeholder: '请选择',
      //     prefixStr: '/yd-system',
      //     domain: 'ORG',
      //     udc: 'OU_TYPE'
      //   }
      // }
    },
    {
      title: '电话',
      name: 'tel',
      span: 6,
      // rules: [
      //   {
      //     pattern: /^((d{3,4})|d{3,4}-|s)?d{7,14}$/,
      //     message: '请输入正确电话号'
      //   }
      // ],
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    {
      title: '手机号',
      name: 'mobile',
      span: 6,
      // rules: [{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }],
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    }
  ]
};
const getTableActionButtons = (create, edit, imports): Array<ActionButtonProps> => [
  {
    text: '新建',
    key: 'create',
    handleClick: create,
    location: 'left',
    icon: <AddBlue />,
    authCode: 'ouDatasListAdd'
  },
  {
    text: '编辑',
    key: 'edit',
    handleClick: edit,
    location: 'left',
    minSelection: 1,
    maxSelection: 1,
    icon: <EditBlue />,
    authCode: 'ouDatasListEdit'
  },
  // {
  //   text: '导入',
  //   key: 'import',
  //   disabled: false,
  //   location: 'left',
  //   handleClick: imports,
  //   authCode: 'ouDatasListImport'
  // },
  // {
  //   text: '更新状态',
  //   key: 'update',
  //   handleClick: update,
  //   location: 'left',
  //   minSelection: 1,
  //   maxSelection: 1,
  //   icon: <EditBlue />
  // }
];
// const getTableActionButtons = (
//   handleClick: Function
// ): Array<ActionButtonProps> => [
//     {
//       text: '新建',
//       key: 'add',
//       disabled: false,
//       location: 'left',
//       handleClick: ({ selectedRowKeys, selectedRows }) => {
//         handleClick(selectedRowKeys, 'add');
//       }
//     },
//     {
//       text: '编辑',
//       key: 'edit',
//       minSelection: 1,
//       maxSelection: 1,
//       disabled: false,
//       location: 'left',
//       handleClick: ({ selectedRowKeys, selectedRows }) => {
//         console.log(selectedRowKeys, 'selectedRowKeys')
//         handleClick(selectedRowKeys, 'edit');
//       }
//     },
// {
//   text: '确认',
//   key: 'sure',
//   minSelection: 1,
//   disabled: false,
//   location: 'left',
//   handleClick: ({ selectedRowKeys, selectedRows }) => {
//     handleClick(selectedRowKeys, 'sure');
//   }
// },
// {
//   text: '停用',
//   key: 'stop',
//   minSelection: 1,
//   disabled: false,
//   location: 'left',
//   needConfirm: true,
//   confirmText: '您确定要停用吗？',
//   handleClick: ({ selectedRowKeys, selectedRows }) => {
//     handleClick(selectedRowKeys, 'stop');
//   }
// },
// {
//   text: '强行停用',
//   key: 'forceStop',
//   minSelection: 1,
//   disabled: false,
//   location: 'left',
//   needConfirm: true,
//   confirmText: '您确定强行停用吗？',
//   handleClick: ({ selectedRowKeys, selectedRows }) => {
//     handleClick(selectedRowKeys, 'forceStop');
//   }
// }
// ];

export { getTableSearchFormItems, getTableActionButtons, getTableColumns };
