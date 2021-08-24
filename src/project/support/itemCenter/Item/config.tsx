import React from 'react';
import { Radio, Form } from 'antd';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Link } from 'react-router-dom';

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
    title: '商品编码',
    align: 'center',
    dataIndex: 'itemCode'
    // render: (text, column) => {
    //   return <Link to={`/itemCenter/item/view/view/${column.id}`}>{text}</Link>;
    // }
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'itemName'
  },
  {
    title: '商品别名',
    // width: 100,
    align: 'center',
    dataIndex: 'itemName2'
  },
  {
    title: '商品条码',
    // width: 100,
    align: 'center',
    dataIndex: 'barCode'
  },
  {
    title: '商品类型',
    // width: 100,
    align: 'center',
    dataIndex: 'itemTypeName'
  },
  {
    title: '品类名称',
    // width: 100,
    align: 'center',
    dataIndex: 'itemCatePathName'
  },
  {
    title: '商品品牌',
    // width: 100,
    align: 'center',
    dataIndex: 'brandName'
  },
  {
    title: '是否启用序列号',
    // width: 100,
    align: 'center',
    dataIndex: 'snFlag',
    render: (val) => {
      return val ? '是' : '否';
    }
  },
  {
    title: '是否启用批次号',
    // width: 100,
    align: 'center',
    dataIndex: 'lotFlag',
    render: (val) => {
      return val ? '是' : '否';
    }
  },
  {
    title: '效期管理标识',
    // width: 100,
    align: 'center',
    dataIndex: 'guaranteeFlag',
    render: (val) => {
      return val ? '是' : '否';
    }
  },
  {
    title: '状态',
    // width: 100,
    align: 'center',
    dataIndex: 'itemStatusName'
  }
];

const getTableSearchFormItems: ElFormProps = {
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
      title: '商品品牌',
      name: 'brandNames',
      span: 6,
      formOption: {
        type: '$support-item-brand',
        props: { placeholder: '请选择' }
      }
    },
    {
      title: '商品状态',
      name: 'itemStatus',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'ITEM_STATUS'
        }
      }
    },
    {
      title: '是否启用批次',
      name: 'lotFlag',
      span: 6,
      formOption: {
        type: '$checkbox',
        props: {
          options: [{ label: '', value: true }]
        }
      }
    },
    {
      title: '是否启用序列号',
      name: 'snFlag',
      span: 6,
      formOption: {
        type: '$checkbox',
        props: {
          options: [{ label: '', value: true }]
        }
      }
    },
    {
      title: '效期管理标识',
      name: 'guaranteeFlag',
      span: 6,
      formOption: {
        type: '$checkbox',
        props: {
          options: [{ label: '', value: true }]
        }
      }
    }
  ]
};

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
