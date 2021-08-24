import { ElFormItemProps } from "@/components/el/ElForm";

const getFormItems = (): Array<ElFormItemProps> => [
  {
    title: '盘点单编号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '门店',
    name: 'storeName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '仓库',
    name: 'whName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '创建时间',
    name: 'createTime',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '盘点类型',
    name: 'docMethodName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '盘点周期',
    name: 'docTypeName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '盘点范围',
    name: 'docModeName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '盘点单状态',
    name: 'docStatusName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '制单人',
    name: 'createUserName',
    span: 6,
    formOption: {
      type: '$text',
    },
  },
  {
    title: '备注',
    name: 'remark',
    span: 12,
    formOption: {
      type: '$text',
    }
  },
]

export { getFormItems };