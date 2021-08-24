import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { getTagList } from './service'

const getClassifyFormItems = (formData, type): Array<ElFormItemProps> => [
  {
    title: ' 分类编码',
    name: 'tagCode',
    span: 24,
    formOption: {
      type: '$input',
      props: {
        disabled: formData.id ? true : false
      }
    },
    rules: [{ required: true, message: '分类编码必填！' }]
  },
  {
    title: ' 分类名称',
    name: 'tagName',
    span: 24,
    formOption: {
      type: '$input', props: {
        disabled: type === 'view'
      }
    },
    rules: [{ required: true, message: '分类名称必填！' }]
  },

  {
    title: '标签状态',
    name: 'status',
    span: 24,
    formOption: {
      type: '$radio',
      props: {
        size: 'default',
        disabled: type === 'view',
        options: type === 'view' ? [{ label: formData.status ? '启用' : '禁用', value: formData.status }] :
          [{ label: '启用', value: true }, { label: '禁用', value: false }]
      }
    },
    extra: type != 'view' && formData.tagType === 'GROUP' ? '禁用此分类，此标签分类下的所有标签都会禁用' : ''
  },
];

const getLabelFormItems = (formData, type): Array<ElFormItemProps> => [
  {
    title: ' 标签分类',
    name: 'pid',
    span: 24,
    formOption: {
      type: '$select',
      props: {
        request: async () => {
          return await getTagList(0)
        },
        transfer: {
          label: 'tagName',
          value: 'id'
        },
        disabled: type === 'view'
      }
    },
    rules: [{ required: true, message: '标签分类必填！' }]
  },
  {
    title: ' 标签编码',
    name: 'tagCode',
    span: 24,
    formOption: {
      type: '$input',
      props: {
        disabled: formData.id ? true : false
      },
    },
    rules: [{ required: true, message: '标签编码必填！' }]
  },
  {
    title: ' 标签名称',
    name: 'tagName',
    span: 24,
    formOption: {
      type: '$input', props: {
        disabled: type === 'view'
      }
    },
    rules: [{ required: true, message: '标签名称必填！' }]
  },
  {
    title: '标签状态',
    name: 'status',
    span: 24,
    formOption: {
      type: '$radio',
      props: {
        size: 'default',
        disabled: type === 'view',
        options: type === 'view' ? [{ label: formData.status ? '启用' : '禁用', value: formData.status }] :
          [{ label: '启用', value: true }, { label: '禁用', value: false }]
      }
    },
    extra: type != 'view' && formData.tagType === 'GROUP' ? '禁用此分类，此标签分类下的所有标签都会禁用' : ''
  },
  {
    title: ' 标签描述',
    name: 'tagDesc',
    span: 24,
    formOption: {
      type: '$textArea',
      props: {
        autoSize: { minRows: 4 },
        disabled: type === 'view'
      },
      events: {
        placeholder: '请输入内容'
      }
    }
  },

];

export { getClassifyFormItems, getLabelFormItems };
