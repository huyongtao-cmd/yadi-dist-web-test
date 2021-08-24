import { ElFormItemProps } from "@/components/el/ElForm";

const getFormItems = (type, whRef, getInvDisabled): Array<ElFormItemProps> => [
  {
    title: '盘点单编号',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$text',
    },
    hidden: !type    // todo
  },
  {
    title: '门店',
    name: 'buId',
    span: 6,
    rules: [{ required: true, message: '必填' }],
    formOption: {
      type: '$yd-mg-select-store',
      props: {
        placeholder: '请选择',
        selectRecord: true,
        disabled: !!type || !!getInvDisabled
      }
    }
  },
  {
    title: '仓库',
    name: 'whId',
    span: 6,
    rules: [{ required: true, message: '必填' }],
    formOption: {
      type: '$yd-mg-select-wh',
      props: {
        ref: whRef,
        placeholder: '请选择',
        disabled: !!type || !!getInvDisabled,
        isCreate: true
      }
    }
  },
  {
    title: '创建时间',
    name: 'createTime',
    span: 6,
    formOption: {
      type: '$text',
    },
    hidden: !type
  },
  {
    title: '盘点范围',
    name: 'docMode',
    span: 6,
    rules: [{ required: true, message: '必填' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        udc: 'INVENTORY_AREA',
        prefixStr: '/yd-system',
        disabled: !!type || !!getInvDisabled
      }
    }
  },
  {
    title: '盘点类型',
    name: 'docMethod',
    span: 6,
    rules: [{ required: true, message: '必填' }],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        udc: 'INVENTORY_TYPE',
        prefixStr: '/yd-system',
        disabled: !!type || !!getInvDisabled
      }
    }
  },
  {
    title: '盘点周期',
    name: 'docType',
    span: 6,
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        domain: 'INV',
        udc: 'INVENTORY_CYCLE',
        prefixStr: '/yd-system',
        disabled: !!type || !!getInvDisabled
      }
    }
  },
  {
    title: '盘点单状态',
    name: 'docStatusName',
    span: 6,
    formOption: {
      type: '$text',
    },
    hidden: !type
  },
  {
    title: '制单人',
    name: 'createUserName',
    span: 6,
    formOption: {
      type: '$text',
    },
    hidden: !type
  },
  {
    title: '备注',
    name: 'remark',
    span: 12,
    formOption: {
      type: '$input',
      props: {
        disabled: !!type || !!getInvDisabled
      }
    }
  },
]

export { getFormItems };