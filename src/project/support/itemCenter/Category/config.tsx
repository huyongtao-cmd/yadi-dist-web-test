import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';

const options = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
];

const addForm = (addType): Array<ElFormItemProps> => {
  if (addType === 'root') {
    return [
      {
        title: '品类编码',
        name: 'itemCateCode',
        span: 12,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入品类编码'
          }
        },
        rules: [{ required: true, message: '品类编码必填！' }]
      },
      {
        title: '品类名称',
        name: 'itemCateName',
        span: 12,
        formOption: {
          type: '$input',
          props: { placeholder: '请输入品类名称' }
        },
        rules: [{ required: true, message: '品类名称必填！' }]
      },
      {
        title: '状态',
        name: 'status',
        span: 12,
        formOption: {
          type: '$radio',
          props: {
            size: 'default',
            options: [
              { label: '启用', value: true },
              { label: '禁用', value: false }
            ]
          }
        }
      }
    ];
  } else {
    return [
      {
        title: '品类编码',
        name: 'itemCateCode',
        span: 12,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入品类编码'
          }
        },
        rules: [{ required: true, message: '品类编码必填！' }]
      },
      {
        title: '品类名称',
        name: 'itemCateName',
        span: 12,
        formOption: {
          type: '$input',
          props: { placeholder: '请输入品类名称' }
        },
        rules: [{ required: true, message: '品类名称必填！' }]
      },
      {
        title: '是否最小品类',
        name: 'itemCateIsBasic',
        span: 12,
        wrapperCol: { span: 16 },
        formOption: {
          type: '$radio',
          props: {
            options: options,
            disabled: true
          }
        }
      },
      {
        title: '状态',
        name: 'status',
        span: 12,
        formOption: {
          type: '$radio',
          props: {
            size: 'default',
            options: [
              { label: '启用', value: true },
              { label: '禁用', value: false }
            ]
          }
        }
      }
    ];
  }
};
const editForm = (formData, type): Array<ElFormItemProps> => {
  return [
    {
      title: '品类编码',
      name: 'itemCateCode',
      span: 12,
      formOption: {
        type: '$input',
        props: {
          disabled: true
        }
      },
      rules: [{ required: true, message: '品类编码必填！' }]
    },
    {
      title: '品类名称',
      name: 'itemCateName',
      span: 12,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入品类名称',
          disabled: type === 'view'
        }
      },
      rules: [{ required: true, message: '品类名称必填！' }]
    },
    {
      title: '是否最小品类',
      name: 'itemCateIsBasic',
      span: 12,
      formOption: {
        type: '$radio',
        props: {
          options:
            type === 'view'
              ? [
                  {
                    label: formData.itemCateIsBasic ? '是' : '否',
                    value: formData.itemCateIsBasic ? 1 : 0
                  }
                ]
              : options,
          disabled: true
        }
      }
    },
    {
      title: '状态',
      name: 'status',
      span: 12,
      hidden: type === 'edit',
      formOption: {
        type: '$radio',
        props: {
          size: 'default',
          options:
            type === 'view'
              ? [
                  {
                    label: formData.status ? '启用' : '禁用',
                    value: formData.status
                  }
                ]
              : [
                  { label: '启用', value: true },
                  { label: '禁用', value: false }
                ],
          disabled: type === 'view'
        }
      },
      extra:
        type != 'view' && formData.itemCateIsBasic === 0
          ? '禁用此品类，此品类下的所有品类都会禁用'
          : ''
    }
  ];
};
const editParamsForm = (formData, type): Array<ElFormItemProps> => {
  return [
    {
      title: '是否最小品类',
      name: 'itemCateIsBasic',
      span: 12,
      formOption: {
        type: '$radio',
        props: {
          options:
            type === 'view'
              ? [
                  {
                    label: formData.itemCateIsBasic ? '是' : '否',
                    value: formData.itemCateIsBasic ? 1 : 0
                  }
                ]
              : options,
          disabled: type === 'view'
        }
      }
    },
    {
      title: '是否启用序列号',
      name: 'snFlag',
      span: 12,
      formOption: {
        type: '$radio',
        props: {
          options:
            type === 'view'
              ? [
                  {
                    label: formData.snFlag ? '是' : '否',
                    value: formData.snFlag ? 1 : 0
                  }
                ]
              : options,
          disabled: type === 'view'
        }
      }
    },
    {
      title: '是否启用批次号',
      name: 'lotFlag',
      span: 12,
      formOption: {
        type: '$radio',
        props: {
          options:
            type === 'view'
              ? [
                  {
                    label: formData.lotFlag ? '是' : '否',
                    value: formData.lotFlag ? 1 : 0
                  }
                ]
              : options,
          disabled: type === 'view'
        }
      }
    },
    {
      title: '效期管理标识',
      name: 'guaranteeFlag',
      span: 12,
      formOption: {
        type: '$radio',
        props: {
          options:
            type === 'view'
              ? [
                  {
                    label: formData.guaranteeFlag ? '是' : '否',
                    value: formData.guaranteeFlag ? 1 : 0
                  }
                ]
              : options,
          disabled: type === 'view'
        }
      }
    },
    {
      title: '财务分类',
      name: 'financialType',
      span: 12,
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'FIN_TYPE'
        }
      }
    },
    {
      title: 'B端毛利控制率',
      name: 'bRate',
      span: 12,
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    },
    {
      title: 'C端毛利控制率',
      name: 'cRate',
      span: 12,
      formOption: {
        type: '$input',
        props: {
          disabled: type === 'view'
        }
      }
    }
  ];
};
const getEditTableColumns = (type): Array<ElSearchTableColumns> => {
  return [
    {
      title: '序号',
      width: 100,
      dataIndex: 'no',
      render: (text, record, index) => index + 1
    },
    {
      title: '标签名称',
      dataIndex: 'tagName'
    }
  ];
};
const getEditTableActionButtons = (
  addRow: Function,
  deleteRow: Function,
  type
): Array<ActionButtonProps> => {
  return [
    {
      text: '添加',
      key: '3',
      location: 'left',
      needConfirm: false,
      disabled: type === 'view',
      icon: <AddBlue />,
      handleClick: () => {
        addRow();
      }
    },
    {
      text: '删除',
      key: '1',
      needConfirm: false,
      location: 'left',
      minSelection: 1,
      icon: <DeleteRed />,
      disabled: type === 'view',
      handleClick: (index) => {
        deleteRow(index.selectedRowKeys);
      }
    }
  ];
};
const editCardForm = (type): Array<ElFormItemProps> => {
  return [
    {
      title: '证照类型',
      name: 'qualifyTypes',
      span: 12,
      formOption: {
        type: '$udc',
        props: {
          disabled: type === 'view',
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ITM',
          udc: 'QUALIFY_TYPE',
          multiple: true
        }
      }
    }
  ];
};
export {
  addForm,
  editForm,
  editParamsForm,
  getEditTableColumns,
  getEditTableActionButtons,
  editCardForm
};
