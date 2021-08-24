import { ElFormItemProps } from '@/components/el/ElForm';
import dayjs from 'dayjs';

const getFormItems = (areaRef, type, showWarehousing): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'buId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
        // disabled: true
        disabled: false
      }
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
        placeholder: '请选择',
        disabled: false,
        isCreate: true
      }
    }
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
        disabled: false
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
  //     type: '$yd-mg-select-wharea', 
  //     props: {
  //       ref: areaRef
  //     } 
  //   }
  // },
  {
    title: '供应商',
    name: 'suppId',
    span: 6,
    // rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-pop-supp',
      props: {
        showColumn: 'suppName',
        placeholder: '请选择',
        disabled: false
      }
    }
  },
  {
    title: '到货日期',
    name: 'recvDate',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$datePicker',
      props: {
        disabledDate: current => {
          return current && current >= dayjs();
        }
      }
    }
  },
  {
    title: '前置单号',
    name: 'docNo',
    span: 6,
    formOption: { type: '$input', props: { disabled: true } }
  },
  {
    title: '入库单号',
    name: 'po',
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
    span: 12,
    formOption: { type: '$input', props: {} }
  },
  {
    title: '一键入库',
    name: 'flag',
    span: 6,
    formOption: {
      type: '$checkbox',
      props: {
        disabled: true,
        options: [
          { label: '', value: true }
        ]
      }
    }
  }
];

export { getFormItems };
