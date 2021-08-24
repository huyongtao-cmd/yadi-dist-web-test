import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '订单号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
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
        placeholder: '请选择门店',
        disabled: true
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        showColumn: 'whName',
        placeholder: '请选择仓库',
        disabled: true
      }
    }
  },
  {
    title: '销售类型',
    name: 'docType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'SAL_TYPE',
        disabled: true
      }
    }
  },
  {
    title: '付款方式',
    name: 'payMethod',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'SAL',
        udc: 'PAY_METHOD',
        placeholder: '请选择',
        disabled: true
      }
    }
  },
  {
    title: '二网客户',
    name: 'custName',
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
    title: '联系人',
    name: 'contPerson',
    span: 6,
    formOption: {
      type: '$input',
      props: { disabled: true }
    }
  },
  {
    title: '联系电话',
    name: 'tel',
    span: 6,
    formOption: {
      type: '$input',
      props: { disabled: true }
    }
  },
  {
    title: '送货地址',
    name: 'detailAddr',
    span: 6,
    formOption: {
      type: '$input',
      props: { disabled: true }
    }
  },
  {
    title: '日期',
    name: 'docTime',
    span: 6,
    formOption: {
      type: '$datePicker',
      props: { placeholder: '请选择时间', disabled: true }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: {
      type: '$input',
      props: { placeholder: '请输入', disabled: true }
    }
  }
];

export { getFormItems };
