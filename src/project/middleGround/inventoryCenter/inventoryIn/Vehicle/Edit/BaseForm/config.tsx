import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'docNo',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$input',
      props: { placeholder: '请选择采购单编号' }
    }
  },
  {
    title: '仓库',
    name: 'ouName',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$input', props: { threshold: 30 } }
  },
  {
    title: '入库类型',
    name: 'suppName',
    span: 6,
    formOption: { type: '$input', props: { threshold: 30 } }
  },
  {
    title: '库位',
    name: 'name',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '供应商',
    name: 'suppId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$input', props: {} }
  },
  {
    title: '到货日期',
    name: 'date',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$datePicker', props: {} }
  },
  {
    title: '前置单号',
    name: 'phone',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '入库单号',
    name: 'dizhi',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '制单人',
    name: 'emp',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: { type: '$input', props: {} }
  }
];

export { getFormItems };
