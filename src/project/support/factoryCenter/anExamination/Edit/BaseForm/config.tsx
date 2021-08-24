import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '单号',
    name: 'inspectionId',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: true
      }
    }
  },
  {
    title: '门店',
    name: 'storeId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
        disabled: true
      }
    }
  },
  {
    title: '自检单类型名称',
    name: 'selfTestTypeName',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: true,
        prefixStr: '/yd-system',
        domain: 'TEST',
        udc: 'TYPE'
      }
    }
  },
  {
    title: '单据状态',
    name: 'testType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        disabled: true,
        prefixStr: '/yd-system',
        domain: 'TEST',
        udc: 'TYPE'
      }
    }
  },
  {
    title: '年月',
    name: 'timeVersion',
    span: 6,
    formOption: {
      type: '$datePicker',
      props: {
        placeholder: '请选择',
        disabled: true,
        format: 'YYYY/M'
      }
    }
  },
  {
    title: '次数',
    name: 'frequency',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: true
      }
    }
  }
];

export { getFormItems };
