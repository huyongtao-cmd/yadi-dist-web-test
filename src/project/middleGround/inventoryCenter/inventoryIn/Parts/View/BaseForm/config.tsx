import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: { disabled: true }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$yd-mg-select-wh', props: { disabled: true } }
  },
  {
    title: '入库类型',
    name: 'docType',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'I_TYPE',
        disabled: true
        // options: [{
        //   label: '采购入库',
        //   value: 'A'
        // }]
      }
    }
  },
  // {
  //   title: '库位',
  //   name: 'name',
  //   span: 6,
  //   formOption: { type: '$input', props: { disabled: true } }
  // },
  {
    title: '供应商',
    name: 'suppName',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '到货日期',
    name: 'recvDate',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$datePicker', props: { disabled: true } }
  },
  {
    title: '前置单号',
    name: 'relateDocNo',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '入库单号',
    name: 'docNo',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '制单人',
    name: 'creator',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  }
];

export { getFormItems };
