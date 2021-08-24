import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '客户编码',
    name: 'aaaa',
    required: true,
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '客户名称',
    name: 'bbbb',
    required: true,
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '客户类型',
    name: 'bbbb',
    required: true,
    span: 6,
    formOption: { type: '$input', props: { placeholder: '整车和配件' } }
  },
  {
    title: '客户所属门店',
    name: 'bbbb',
    required: true,
    span: 6,
    formOption: { type: '$select', props: {} }
  },
  {
    title: '电话',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '手机号',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '地址',
    name: 'bbbb',
    span: 12,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '开户银行',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '银行账户',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '合作时间',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请选择' } }
  },
  {
    title: '到',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请选择' } }
  },
  {
    title: '省份',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '城市',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '联系人',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  }
];

export { getFormItems };
