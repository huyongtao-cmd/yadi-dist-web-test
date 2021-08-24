import React from 'react';
import { Link } from 'react-router-dom';
import { Statistic } from '@/components/el/ItemComponent';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import dayjs from 'dayjs';
import { asserts } from '@/utils';
import {
  SubmitBlue,
  AddBlue,
  DeleteRed,
  ExportBlue,
  EditBlue
} from '@/components/el/ElIcon';
import AuthMobx from '@/store/auth';
import { Modal } from 'antd';

export function checkAuth(authCode, authActionList) {
  if (authCode) {
    if (
      Array.isArray(authActionList) &&
      authActionList.some((v) => v.code === authCode)
    ) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}


// SearchTable搜索表单
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
        props: {
          placeholder: '请选择',
          onSelectChange
        }
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
      title: '供应商',
      name: 'suppIdList',
      span: 6,
      formOption: {
        type: '$yd-mg-pop-supp',
        props: {
          showColumn: 'suppName',
          multiple: true,
          allowClear: true,
          placeholder: '请选择'
        }
      }
    },
    {
      title: '状态',
      name: 'docStatus',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'PUR',
          udc: 'PUR_ORDER_STATUS'
        }
      }
    },
    {
      title: '订单日期',
      name: 'docTime',
      span: 6,
      formOption: { type: '$rangePicker' }
    },
    {
      title: '采购单号',
      name: 'docNo',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      }
    },
    {
      title: '发货单号',
      name: 'suppDocNo',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      }
    },
    {
      title: '制单人',
      name: 'createUserId',
      span: 6,
      formOption: {
        type: '$yd-mg-select-user',
        props: {
          placeholder: '请选择'
        }
      }
    }
  ];

// table搜索表单
const getTableColumns = (that): Array<ElSearchTableColumns> => {
  const isClick = AuthMobx.authActionList.some((v: any) => v.code === 'purcOrderDetail');
  // console.log(isClick, 'isClickisClick')
  return [
    {
      title: '序号',
      dataIndex: 'no',
      align: 'center',
      width: 50,
      render: (value, record, index) => {
        return index + 1;
      }
    },
    {
      title: '采购单号',
      dataIndex: 'docNo',
      align: 'center',
      width: 160,
      render: (value, record) => {
        // const href = `/purc/order/index/view/${record.id}`;
        // todo 详情页面展示车架号  需要通过单号查询 record.id
        const href = `/purc/order/index/view/${record.docNo}`;
        const linkTo = () => {
          // console.log(checkAuth('purcOrderDetail', AuthMobx.authActionList));
          if (checkAuth('purcOrderDetail', AuthMobx.authActionList)) {
            that.props.push(href)
          } else {
            Modal.info({
              title: '',
              content: '您没有查看采购单详情页面的权限！'
            })
          }
        }
        return <a onClick={linkTo}>{value}</a>;
      }
    },
    {
      title: '发货单号',
      dataIndex: 'suppDocNo',
      align: 'center',
      width: 120
    },
    {
      title: '门店',
      dataIndex: 'buName',
      align: 'center',
      width: 200
    },
    {
      title: '仓库',
      dataIndex: 'whName',
      align: 'center',
      width: 200
    },
    {
      title: '供应商',
      dataIndex: 'suppName',
      align: 'center',
      ellipsis: true,
      width: 200
    },
    {
      title: '总数量',
      dataIndex: 'qty',
      align: 'center',
      width: 100
    },
    {
      title: '总价格',
      dataIndex: 'amt',
      align: 'center',
      width: 100
    },
    {
      title: '已入库数量',
      dataIndex: 'acceptQty',
      align: 'center',
      width: 100
    },
    {
      title: '未入库数量',
      dataIndex: 'yuQty',
      align: 'center',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'docStatusName',
      align: 'center',
      width: 120
    },
    {
      title: '订单来源',
      dataIndex: 'poSource',
      align: 'center',
      width: 120
    },
    {
      title: '制单人',
      dataIndex: 'createUserName',
      align: 'center',
      width: 120
    },
    {
      title: '订单日期',
      dataIndex: 'docTime',
      align: 'center',
      width: 120,
      render: (value) =>
        asserts.isExist(value) ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    // {
    //   title: '操作',
    //   dataIndex: 'remark',
    //   align: 'center',
    //   ellipsis: true,
    //   width: 120
    // }
  ];
};

// table按钮
const getTableActionButtons = (
  handleAdd,
  handleSync,
  handleExport,
  handleIn,
  handleEdit
): Array<ActionButtonProps> => [
    {
      key: 'add',
      text: '新增',
      location: 'left',
      handleClick: handleAdd,
      icon: <AddBlue />,
      authCode: 'purcOrderListAdd',
    },
    {
      key: 'edit',
      text: '编辑',
      location: 'left',
      handleClick: handleEdit,
      minSelection: 1,
      maxSelection: 1,
      icon: <EditBlue />,
      authCode: 'purcOrderListEdit'
    },
    // {
    //   key: 'sync',
    //   text: '同步',
    //   location: 'left',
    //   handleClick: handleSync,
    //   icon: <AddBlue />
    // },
    {
      key: 'invIn',
      text: '入库',
      location: 'left',
      maxSelection: 1,
      minSelection: 1,
      handleClick: handleIn,
      icon: <SubmitBlue />,
      authCode: 'purcOrderListInvIn'
    },
    {
      key: 'export',
      text: '导出',
      location: 'right',
      handleClick: handleExport,
      icon: <ExportBlue />
    }
  ]

export { getTableSearchFormItems, getTableColumns, getTableActionButtons };
