import { ElFormItemProps } from '@/components/el/ElForm';

const getFormItems = (areaRef): Array<ElFormItemProps> => [
  {
    title: '门店',
    name: 'storeId',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        showColumn: 'storeName',
        placeholder: '请选择门店'
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
        placeholder: '请选择仓库',
        ref: areaRef,
        isCreate: true
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
        udc: 'WHOLESALE_TYPE',
        // disabled: true
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  // {
  //   title: '销售类型',
  //   name: 'docType',
  //   span: 6,
  //   rules: [{ required: true, message: '必填！' }],
  //   formOption: {
  //     type: '$select',
  //     props: {
  //       options: [{ label: '批发', value: 'C' }]
  //     }
  //   }
  // },
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
        placeholder: '请选择'
      }
    }
  },
  {
    title: '二网客户',
    name: 'custCode',
    span: 6,
    rules: [{ required: true, message: '必填！' }],
    formOption: {
      type: '$yd-mg-sale-whC',
      props: {
        placeholder: '请输入',
        showColumn: 'custName'
      }
    }
  },
  {
    title: '联系人',
    name: 'contPerson',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '联系电话',
    name: 'tel',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '送货地址',
    name: 'detailAddr',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '日期',
    name: 'docTime',
    span: 6,
    formOption: {
      type: '$datePicker',
      props: {
        format: 'YYYY-MM-DD',
        placeholder: '请选择时间输入',
      },
    },
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: { type: '$input', props: { placeholder: '请输入' } },
    rules: [
      { pattern: new RegExp(/^(?!\s)(?!.*\s$)/), message: '首尾不能输入空格' },
      { min: 0, max: 255, message: '长度在 0 到 255 个字符' }
    ],
  }
];

export { getFormItems };
