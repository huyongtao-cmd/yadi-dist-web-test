import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (areaRef,id): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: { disabled: id? true : false }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { 
      type: '$yd-mg-select-wh', 
      props: {
        ref: areaRef,
        disabled: id? true : false,
        isCreate: id? false : true
      } 
    }
  },
  {
    title: '订单类型',
    name: 'docType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'PUR_ORDER_TYPE'
      }
    }
  },
  {
    title: '日期',
    name: 'docTime',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$datePicker', props: {} }
  },
  {
    title: '供应商',
    name: 'suppId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$yd-mg-pop-supp', props: {
      showColumn: 'suppName'
    } }
  },
  {
    title: '联系人',
    name: 'suppContactName',
    span: 6,
    formOption: { 
      type: '$input', 
      props: { disabled: true }
    }
  },
  {
    title: '联系电话',
    name: 'suppContactTel',
    span: 6,
    formOption: { 
      type: '$input', 
      props: { disabled: true }
    }
  },
  {
    title: '联系地址',
    name: 'registerAddress',
    span: 6,
    formOption: { 
      type: '$input', 
      props: { disabled: true }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 12,
    formOption: { type: '$input', props: {} }
  }
];

export { getFormItems };
