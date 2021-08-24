import React from 'react';
import { Space, Image } from 'antd';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Link } from 'react-router-dom';
import maths from '@/utils/maths';
import AppStore from '@/store';

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '审核类型',
      name: 'examineType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择审核类型',
          domain: 'INV',
          udc: 'TEMP_TYPE'
        }
      }
    },
    {
      title: '申请单号',
      name: 'applyId',
      span: 6,
      formOption: {
        type: '$input'
      }
    },
    {
      title: '申请时间',
      name: 'applyTime',
      span: 6,
      formOption: {
        type: '$rangePicker'
      }
    }
  ]
};
const getTableColumns = (handleExamine, that): Array<ElSearchTableColumns> => {
  return [
    {
      title: '序号',
      width: 10,
      dataIndex: 'id',
      align: 'center',
      // render: (value, record) => <Link to={`/item/addition/index/view/${record.id}`}>
      //   {value}
      // </Link>
    },
    {
      title: '申请编号',
      width: 100,
      dataIndex: 'applyId',
      align: 'center',
      render: (value, record) => <Link to={`/itemCenter/review/detail/${record.id}`}>
        {value}
      </Link>
    },
    {
      title: '审核类型',
      width: 100,
      dataIndex: 'id',
      align: 'center',
      // render: (value, record) => <Link to={`/item/addition/index/view/${record.id}`}>
      //   {value}
      // </Link>
    },
    {
      title: '申请单状态',
      width: 100,
      dataIndex: 'stateCheck',
      align: 'center',
      // render: (value, record) => <Link to={`/item/addition/index/view/${record.id}`}>
      //   {value}
      // </Link>
    },
    {
      title: '申请人',
      width: 100,
      dataIndex: 'stateCheck',
      align: 'center',
      // render: (value, record) => <Link to={`/item/addition/index/view/${record.id}`}>
      //   {value}
      // </Link>
    },
    {
      title: '申请时间',
      width: 100,
      dataIndex: 'dateTime',
      align: 'center',
      // render: (value, record) => <Link to={`/item/addition/index/view/${record.id}`}>
      //   {value}
      // </Link>
    },
    {
      title: '组织信息',
      width: 100,
      dataIndex: 'stateCheck',
      align: 'center',
      // render: (value, record) => <Link to={`/item/addition/index/view/${record.id}`}>
      //   {value}
      // </Link>
    },
    // {
    //   title: '商品图片',
    //   width: 100,
    //   dataIndex: 'picId',
    //   align: 'center',
    //   render: (text, record, index) => {
    //     return (
    //       <Image
    //         width={80}
    //         height={80}
    //         preview={false}
    //         // alt={record.imageName}
    //         // src='error'
    //         src={AppStore.urlPrefix.replace('{picId}', text)}
    //       />
    //     );
    //   }
    // },
    // {
    //   title: '商品名称',
    //   width: 100,
    //   dataIndex: 'name',
    //   align: 'center',
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ textAlign: 'left' }}>
    //         <div>{record.name}</div>
    //         <div>品牌：{record.itmBrandName}</div>
    //       </div>
    //     );
    //   }
    // },
    // {
    //   title: '价格/货号',
    //   width: 100,
    //   dataIndex: 'price',
    //   align: 'center',
    //   render: (text, record, index) => {
    //     return (
    //       <Space direction='vertical' align='start'>
    //         <div>价格：¥{maths.rounds(record.price, 2)}</div>
    //         <div>货号：{record.code}</div>
    //       </Space>
    //     );
    //   }
    // },
    // {
    //   title: '标签',
    //   width: 100,
    //   dataIndex: 'tags',
    //   align: 'center',
    //   render: (text, record, index) => {
    //     return (
    //       <Space direction='vertical' align='start'>
    //         <div>新品：{record.recommendNew ? '是' : '否'}</div>
    //         <div>推荐：{record.recommendRe ? '是' : '否'}</div>
    //         <div>上架：{record.shelf ? '是' : '否'}</div>
    //       </Space>
    //     );
    //   }
    // },
    // {
    //   title: '排序',
    //   width: 100,
    //   dataIndex: 'sortNo',
    //   align: 'center'
    // },
    // {
    //   title: '销量',
    //   width: 100,
    //   dataIndex: 'sales',
    //   align: 'center'
    // },
    // {
    //   title: '审核状态',
    //   width: 100,
    //   dataIndex: 'stateCheckName',
    //   align: 'center',
    //   render: (value, record) => {
    //     return (
    //       <>
    //         <div>{value}</div>
    //         <div>{['APPROVED', 'REJECTED'].includes(record.stateCheck) ? <a onClick={() => that.handleShowExamineModal(record)}>审核详情</a> : ''}</div>
    //       </>
    //
    //     )
    //   }
    // },
    // {
    //   title: '操作',
    //   width: 100,
    //   align: 'center',
    //   dataIndex: 'operation',
    //   render: (text, record, index) => {
    //     return (
    //       <Space size='large'>
    //         <Link to={`/item/addition/index/view/${record.id}`}>
    //           查看
    //         </Link>
    //         <a onClick={() => handleExamine(record)}>审核</a>
    //       </Space>
    //     );
    //   }
    // }
  ];
};
export { getTableSearchFormItems, getTableColumns };
