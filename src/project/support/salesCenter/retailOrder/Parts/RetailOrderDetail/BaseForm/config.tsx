import { ElFormItemProps } from '@/components/el/ElForm';
import dayjs from 'dayjs';

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '订单号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '门店',
    name: 'storeName',
    required: true,
    span: 6,
    formOption: {
      type: '$text',
      props: {
        showColumn: 'name',
        placeholder: '请选择门店',
        disabled: true
      }
    }
  },
  {
    title: '仓库',
    name: 'whName', //详情用whName
    required: true,
    span: 6,
    formOption: {
      type: '$text',
      props: {
        // showColumn: 'name',
        placeholder: '请选择仓库',
        disabled: true
      }
    }
  },
  {
    title: '销售类型',
    name: 'docTypeName',
    required: true,
    span: 6,
    formOption: {
      type: '$text',
      props: {
        // placeholder: '请选择',
        // options: [
        //   { label: '正常零售', value: 'A' },
        //   { label: '以旧换新', value: 'B' }
        // ],
        disabled: true
      }
    }
  },
  {
    title: '付款方式',
    name: 'payMethodName',
    span: 6,
    formOption: {
      type: '$text',
      props: { disabled: true }
    }
  },
  {
    title: '日期',
    name: 'docTime',
    span: 6,
    formOption: {
      type: '$text',
      props: { placeholder: '请输入', disabled: true }
    }
  },
  {
    title: '参保方式',
    name: 'es1Name',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '制单人',
    name: 'empName',
    span: 6,
    formOption: {
      type: '$text',
      props: {
        disabled: true
      }
    }
  },
  {
    title: '备注',
    name: 'remark',
    span: 6,
    formOption: {
      type: '$text',
      props: { placeholder: '请输入', disabled: true }
    }
  }
];

export { getFormItems };
