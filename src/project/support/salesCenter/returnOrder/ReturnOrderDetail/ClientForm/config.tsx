import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '客户名称',
    name: 'custName',
    required: true,
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入' } }
  },
  {
    title: '联系人',
    name: 'contPerson',
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入' } }
  },
  {
    title: '联系电话',
    name: 'tel',
    span: 6,
    formOption: { type: '$text', props: { placeholder: '请输入' } }
  }
];

export { getFormItems };
