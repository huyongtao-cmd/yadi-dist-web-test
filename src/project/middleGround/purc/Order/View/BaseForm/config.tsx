import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buName',
    span: 6,
    formOption: {
      type: '$text',
      // props: { showColumn: 'docNo', placeholder: '请选择' }
    }
  },
  {
    title: '仓库',
    name: 'whName',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '订单类型',
    name: 'docTypeName',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '日期',
    name: 'docTime',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '供应商',
    name: 'suppName',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '联系人',
    name: 'suppContactName',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '联系电话',
    name: 'suppContactTel',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '联系地址',
    name: 'suppDetailAddr',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '备注',
    name: 'remark',
    span: 12,
    formOption: { type: '$text', props: {} }
  }
];

export { getFormItems };
