import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '客户名称',
    name: 'custCode',
    span: 6,
    formOption: {
      type: '$yd-mg-sale-whC',
      props: {
        placeholder: '请输入',
        showColumn: 'custName'
      }
    }
  },
  {
    title: '联系人',
    name: 'contPerson',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', disabled: true } }
  },
  {
    title: '联系电话',
    name: 'tel',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入', disabled: true } }
  },
  // {
  //   title: '地址',
  //   name: 'detailAddr',
  //   span: 6,
  //   formOption: { type: '$input', props: { placeholder: '请输入', disabled: true } }
  // }
];

export { getFormItems };
