import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buName',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '出库类型',
    name: 'docType',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '出库日期',
    name: 'docTime',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '出库单号',
    name: 'docNo',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '前置单号',
    name: 'relateDocNo',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '制单人',
    name: 'createUserId',
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
