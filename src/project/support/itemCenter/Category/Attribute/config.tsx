
import React from 'react';
import ElSearchTable, {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { ElFormProps, ElFormItemProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue, DeleteRed } from '@/components/el/ElIcon';

const inputOptions = [
  { label: '手工录入', value: 1 },
  { label: '列表选择', value: 0 }
];

const checkOptions = [
  { label: '单选属性', value: 0 },
  { label: '复选属性', value: 1 }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '属性名称',
      name: 'catePropName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入属性名称'
        }
      }
    },
    {
      title: '属性编码',
      name: 'catePropCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          options: [],
          placeholder: '请输入属性编码'
        }
      }
    }
  ]
};

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'index',
    render: (value, column, index) => {
      return <span>{index + 1}</span>
    }
  },
  {
    title: '编码',
    align: 'center',
    dataIndex: 'catePropCode'
  },
  {
    title: '属性名称',
    align: 'center',
    dataIndex: 'catePropName'
  },
  {
    title: '商品品类',
    // width: 100,
    align: 'center',
    dataIndex: 'itemCateName'
  },
  {
    title: '单选/复选',
    // width: 100,
    align: 'center',
    dataIndex: 'isBox',
    render: (value) => {
      return value === 0 ? '单选' : '复选';
    }
  },
  {
    title: '录入方式',
    width: 120,
    align: 'center',
    dataIndex: 'isHand',
    render: (value) => {
      return value === 0 ? '列表选择' : '手动输入';
    }
  },
  {
    title: '是否必填',
    align: 'center',
    dataIndex: 'isMust',
    width: 120,
    render: (value) => {
      return value === 1 ? '是' : '否';
    }
  },
  {
    title: '属性值',
    width: 220,
    align: 'center',
    dataIndex: 'valueNames'
  }
];

const getTableActionButtons = ({
  type,
  handleAdd,
  handleEdit,
  handleDelete
}): Array<ActionButtonProps> => {
  return type === 'view'
    ? []
    : [
      {
        text: '新增',
        key: 'add',
        disabled: false,
        location: 'left',
        handleClick: handleAdd,
        icon: <AddBlue />
      },
      {
        text: '编辑',
        key: 'edit',
        minSelection: 1,
        maxSelection: 1,
        // disabled: false,
        location: 'left',
        icon: <EditBlue />,
        handleClick: ({ selectedRowKeys, selectedRows }) => {
          handleEdit(selectedRowKeys[0]);
        }
      },
      {
        text: '删除',
        key: 'delete',
        minSelection: 1,
        maxSelection: 1,
        icon: <DeleteRed />,
        location: 'left',
        needConfirm: true,
        confirmText: '您确定要删除吗？',
        handleClick: ({ selectedRowKeys, selectedRows }) => {
          handleDelete(selectedRowKeys);
        }
      }
    ];
};
const modalForm = (formData, type, that): Array<ElFormItemProps> => [
  {
    title: '属性名称',
    name: 'catePropName',
    span: 24,
    // wrapperCol: { span: 15 },
    formOption: {
      type: '$input',
      props: { placeholder: '请输入属性名称', disabled: type === 'view' }
    },
    rules: [{ required: true, message: '属性名称必填！' }]
  },
  {
    title: '属性编码',
    name: 'catePropCode',
    span: 24,
    // wrapperCol: { span: 15 },
    formOption: {
      type: '$input',
      props: { placeholder: '请输入属性编码', disabled: type === 'view' }
    },
    rules: [{ required: true, message: '属性编码必填！' }]
  },
  {
    title: '商品品类',
    name: 'itemCateCode',
    span: 24,
    formOption: {
      type: '$support-category-cascader',
      props: { placeholder: '请选择商品品类', disabled: type === 'view' }
    },
    rules: [{ required: true, message: '商品品类必选！' }]
  },
  {
    title: '录入方式',
    name: 'isHand',
    span: 24,
    // wrapperCol: { span: 8 },
    formOption: {
      type: '$radio',
      props: {
        options: inputOptions,
        disabled: type === 'view',
        defaultValue: formData.isHand,
        onChange: (e) => {
          const data = Object.assign({}, that.state.formData, { isHand: e.target.value });
          let attribute;
          that.setState({ formData: data }, () => {
            attribute = Object.assign({}, that.state.formData, { attribute: '' });
            if (that.state.formData.isHand === 0) {
              that.setState({
                formData: attribute
              })
            }
          });
        }
      }
    }
  },
  {
    title: '单选/复选',
    name: 'isBox',
    span: 24,
    // labelCol: { span: 0 },
    formOption: {
      type: '$radio',
      props: {
        options: checkOptions,
        disabled: that.state.formData.isHand != 0,
        defaultValue: formData.isBox
      }
    }
  },
  {
    title: '是否必填',
    name: 'isMust',
    span: 24,
    formOption: {
      type: '$radio',
      props: {
        options: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
        defaultValue: formData.isMust
      }
    }
  },
  {
    title: '属性值',
    name: 'attribute',
    span: 24,
    // wrapperCol: { span: 8 },
    formOption: {
      type: '$input',
      props: {
        placeholder: '值与值之间用中文“；”号隔开，以区分多个属性值',
        disabled: that.state.formData.isHand != 0
      }
    },
    rules: [{ required: that.state.formData.isHand === 0 }]
  }
];

export {
  getTableColumns,
  getTableSearchFormItems,
  getTableActionButtons,
  modalForm
};
