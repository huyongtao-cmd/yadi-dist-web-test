import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (oareaRef, iareaRef): Array<ElFormItemProps> => [
  {
    title: '调出门店',
    name: 'oouId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择'
      }
    }
  },
  {
    title: '调出仓库',
    name: 'owhId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        ref: oareaRef,
        placeholder: '请选择',
        isCreate: true
      }
    }
  },
    {
    title: '调入门店',
    name: 'iouId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-inStore',
      props: {
        placeholder: '请选择'
      }
    }
  },
  {
    title: '调入仓库',
    name: 'iwhId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-inWh',
      props: {
        ref: iareaRef,
        placeholder: '请选择'
      }
    }
  },
  {
    title: '日期',
    name: 'applyDate',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$datePicker', props: {} }
  },
  {
    title: '备注',
    name: 'remark',
    span: 12,
    formOption: { type: '$input', props: {} }
  }
];

export { getFormItems };
