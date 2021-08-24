import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (areaRef, type): Array<ElFormItemProps> => [
  {
    title: '调出门店',
    name: 'oouIdName',
    span: 6,
    formOption: {
      type: '$text'
    }
  },
  {
    title: '调出仓库',
    name: 'owhName',
    span: 6,
    formOption: {
      type: '$text'
    }
  },
    {
    title: '调入门店',
    name: 'iouIdName',
    span: 6,
    formOption: {
      type: '$text'
    }
  },
  {
    title: '调入仓库',
    name: 'iwhName',
    span: 6,
    formOption: {
      type: '$text'
    }
  },
  {
    title: '调拨单号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$text'
    }
  },
  {
    title: '状态',
    name: 'docStatusName',
    span: 6,
    formOption: {
      type: '$text'
    }
  },
  {
    title: '日期',
    name: 'applyDate',
    span: 6,
    formOption: { type: '$text', props: {} }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: { type: '$text', props: {} }
  }
];

export { getFormItems };
