import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (areaRef, type): Array<ElFormItemProps> => [
  // {
  //   title: '门店',
  //   name: 'buId',
  //   span: 6,
  //   rules: [{ required: true, message: '必填！' }],
  //   formOption: {
  //     type: '$yd-mg-select-store',
  //     props: { placeholder: '', selectRecord: true }
  //   }
  // },
  {
    title: '门店',
    name: 'buId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
        disabled: type !== ':type'? true : false
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-wh', props: {
        ref: areaRef,
        placeholder: '请选择',
        disabled: type !== ':type'? true : false,
        isCreate: type !== ':type'? false : true
      }
    }
  },
  // {
  //   title: '出库类型',
  //   name: 'docType',
  //   span: 6,
  //   formOption: {
  //     type: '$udc',
  //     props: {
  //       placeholder: '请选择',
  //       prefixStr: '/yd-inv',
  //       domain: 'INV',
  //       udc: 'O_TYPE'
  //     }
  //   },
  //   rules: [{ required: true, message: '必填！' }]
  // },
  {
    title: '出库类型',
    name: 'docType',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        prefixStr: '/yd-system',
        udc: 'O_TYPE',
        disabled: type !== ':type' ? true : false
        // options: [{
        //   label: '采购入库',
        //   value: 'A'
        // }]
      }
    }
  },
  // {
  //   title: '库位',
  //   name: 'whLoc',
  //   span: 6,
  //   rules: [{ required: true, message: '必填！' }],
  //   formOption: {
  //     type: '$input',
  //     props: {
  //       ref: areaRef
  //     }
  //   }
  // },
  // {
  //   title: '库位',
  //   name: 'name',
  //   span: 6,
  //   formOption: { type: '$input', props: { disabled: true } }
  // },
  // {
  //   title: '供应商',
  //   name: 'suppId',
  //   span: 6,
  //   rules: [{ required: true, message: '必填！' }],
  //   formOption: { type: '$input', props: {} }
  // },
  {
    title: '出库日期',
    name: 'docTime',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: { type: '$datePicker', props: {} }
  },
  {
    title: '出库单号',
    name: 'no',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '前置单号',
    // name: 'relateDocNo',
    name: 'relateDocNo',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '制单人',
    name: 'createUserId',
    span: 6,
    formOption: {
      type: '$yd-mg-pop-user', props: {
        showColumn: 'firstName',
        disabled: true
      }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: { type: '$input', props: {} }
  }
];

export { getFormItems };
