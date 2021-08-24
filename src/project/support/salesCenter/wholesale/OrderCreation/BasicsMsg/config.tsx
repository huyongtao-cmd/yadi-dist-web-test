import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'aaaa',
    required: true,
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '仓库',
    name: 'bbbb',
    required: true,
    span: 6,
    formOption: { type: '$select', props: { placeholder: '请选择' } }
  },
  {
    title: '业务类型',
    name: 'bbbb',
    required: true,
    span: 6,
    formOption: { type: '$select', props: { placeholder: '请选择' } }
  },
  {
    title: '付款方式',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$select', props: { placeholder: '请选择' } }
  },
  {
    title: '客户名称',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$select', props: { placeholder: '请选择' } }
  },
  {
    title: '联系人',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '联系电话',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '送货地址',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  },
  {
    title: '日期',
    name: 'docDate',
    span: 6,
    formOption: { type: '$datePicker', props: { placeholder: '请选择时间' } }
  },
  {
    title: '备注',
    name: 'bbbb',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } }
  }
];

export { getFormItems };
