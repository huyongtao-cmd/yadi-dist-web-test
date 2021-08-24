/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-25 11:25:32
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 17:49:12
 */
import React from 'react';
import { Input, Radio, Form } from 'antd';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { ImgUpload } from '@/components/el/ItemComponent';

const statusList = [
  {
    label: '启用',
    value: '0'
  },
  {
    label: '禁用',
    value: '1'
  }
];

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id',
    render: (value, column, index) => {
      return index + 1;
    }
  },
  {
    title: '商品类型',
    align: 'center',
    dataIndex: 'itemTypeName'
  },
  {
    title: '商品编码',
    align: 'center',
    dataIndex: 'itemCode'
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'itemName'
  },
  {
    title: '商品品牌',
    align: 'center',
    dataIndex: 'brandName'
  },
  {
    title: '颜色',
    align: 'center',
    dataIndex: 'itemType5'
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'uomName'
  },
  {
    title: '商品状态',
    align: 'center',
    dataIndex: 'itemStatusName'
  }
];

const getTableSearchFormItems = (): ElFormProps => ({
  items: [
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
      title: '商品编码',
      name: 'itemCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    {
      title: '商品类型',
      name: 'itemType',
      formOption: {
        type: '$udc',
        props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE' }
      }
    },
    {
      title: '商品状态',
      name: 'itemStatus',
      formOption: {
        type: '$udc',
        props: {
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'ITEM_STATUS',
          filterValue: ['APPROVING']
        }
      }
    },
    {
      title: '商品颜色',
      name: 'itemType5',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    }
  ]
});

const getTableFormItems: any = (formData) => ({
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
  items: [
    {
      title: '品牌名称',
      name: 'name',
      span: 24,
      wrapperCol: { span: 8 },
      rules: [{ required: true, message: '请填写品牌名称间' }],
      formOption: {
        type: '$input',
        props: {}
      }
    },
    {
      title: '品牌英文名',
      name: 'brandEnName',
      span: 24,
      wrapperCol: { span: 8 },
      formOption: {
        type: '$input',
        props: {}
      }
    },
    {
      title: '品牌中文名',
      name: 'brandName ',
      span: 24,
      wrapperCol: { span: 8 },
      formOption: {
        type: '$input',
        props: {}
      }
    },
    {
      title: '品牌首字母',
      name: 'brandInitial',
      span: 24,
      wrapperCol: { span: 8 },
      formOption: {
        type: '$input',
        props: {}
      }
    },
    {
      title: '品牌logo',
      name: 'logoId',
      span: 24,
      formOption: {
        type: '$img-upload',
        props: {
          fileListLen: 1,
          help: '只能上传jpg/png格式文件，文件不能超过50kb'
        }
      }
    },
    {
      title: '状态',
      name: 'status',
      span: 24,
      wrapperCol: { span: 18 },
      formOption: {
        render: () => {
          return (
            <Form.Item name='status'>
              <Radio.Group
                options={[
                  { value: '1', label: '启用' },
                  { value: '0', label: '禁用' }
                ]}
              />
            </Form.Item>
          );
        }
      }
    }
  ]
});

const getAddModalForm: any = () => ({
  wrapperCol: { span: 20 },
  items: [
    {
      title: '商品品类',
      name: 'itemCateCode',
      span: 24,
      formOption: {
        type: '$support-category-cascader',
        props: { placeholder: '请选择商品品类' }
      },
      rules: [{ required: true, message: '请选择商品品类' }]
    }
  ]
});

export {
  getTableSearchFormItems,
  getTableColumns,
  getTableFormItems,
  getAddModalForm
};
