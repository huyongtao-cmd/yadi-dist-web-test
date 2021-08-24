import React from 'react';
import { Radio, Form } from 'antd';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Link } from 'react-router-dom';

// 查询条件组
const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '顾客账号：',
      name: 'custCode',
      span: 8,
      // rules: [
      //   { pattern:new RegExp(/^(?!\s)(?!.*\s$)/), message: '不能输入空格' }
      // ],
      formOption: {
        type: '$input',
        props: { placeholder: '请输入会员ID/账户' }
      }
    },
    {
      title: '顾客名称：',
      name: 'custName',
      span: 8,
      formOption: {
        type: '$input',
        props: { placeholder: '请输入' }
      }
    },
    {
      title: '注册时间：',
      name: 'registerDate',
      span: 8,
      formOption: { type: '$datePicker', props: { placeholder: '请选择时间' } }
    },
    {
      title: '证件类型',
      name: 'reprCertType',
      span: 8,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'SAL',
          udc: 'CUST_ID_TYPE',
          // disabled: flag
        }
      }
    },
    {
      title: '证件号码：',
      name: 'reprCertNo',
      span: 8,
      rules: [
        {
          // pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          // message: '请输入合法的身份证号'
        }
      ],
      formOption: {
        type: '$input',
        props: { placeholder: '请输入' }
      }
    },
    {
      title: '手 机 号：',
      name: 'reprCertMobile',
      span: 8,
      rules: [
        { pattern: /^1[3456789]\d{9}$/, message: '请填写正确手机号' }
      ],
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
        }
      }
    },
    {
      title: '所属门店',
      name: 'storeId',
      span: 8,
      formOption: {
        type: '$yd-mg-select-store',
        props: {
          placeholder: '请选择门店',
        }
      }
    },
    // {
    //   title: '所属经销商',
    //   name: 'buId',
    //   span: 8,
    //   formOption: {
    //     type: '$yd-mg-select-distributor',
    //     props: {
    //       placeholder: '请选择',
    //     }
    //   }
    // },
  ]
};
// 按钮组
const getTableActionButtons = (
  handleClick: Function
): Array<ActionButtonProps> => [
    {
      text: '新增顾客',
      key: 'add',
      disabled: false,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        // console.log('新增selectedRowKeys 后边是空的')
        handleClick(selectedRowKeys, 'add');
      },
      authCode: 'customSearchListAdd'
    },
    // {
    //   text: '编辑',
    //   key: 'edit',
    //   minSelection: 1,
    //   maxSelection: 1,
    //   disabled: false,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) => {
    //     handleClick(selectedRowKeys, 'edit');
    //   }
    // },
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
  ];
// tab组
const getTableColumns = (that): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'ouCode',
    width: 50,
    render: (ouCode, column, index) => {
      return index + 1;
    }
  },
  // {
  //   title: '所属经销商',
  //   align: 'center',
  //   dataIndex: 'buName',
  // },
  {
    title: '所属门店',
    align: 'center',
    dataIndex: 'storeName',
  },
  {
    title: '顾客账号',
    align: 'center',
    dataIndex: 'custCode',
    render: (text, column) => {
      // console.log(column, 'column')
      const { custCode, id, storeId } = column || {}
      console.log(custCode, id, 'custCode-column')
      const linkTo = () => {
        that.props.push(`/salesCenter/custom/view/${custCode}/${storeId}`)
      }
      return <a onClick={linkTo}>{text}</a>;
    }
  },
  {
    title: '顾客名称',
    align: 'center',
    dataIndex: 'custName'
  },
  {
    title: '证件类型',
    align: 'center',
    dataIndex: 'reprCertTypeName'
  },
  // {
  //   title: '证件号码',
  //   align: 'center',
  //   dataIndex: 'reprCertNo'
  // },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'reprCertMobile'
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'vipGenderName'
  },
  {
    title: '职业',
    align: 'center',
    dataIndex: 'vipJob'
  },
  {
    title: '注册时间',
    align: 'center',
    dataIndex: 'registerDate'
  },
  {
    title: '地址',
    align: 'center',
    dataIndex: 'registerAddress'
  },
  {
    title: '顾客等级',
    align: 'center',
    dataIndex: 'custLevelName'
  }
];

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
