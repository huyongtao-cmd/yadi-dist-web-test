import { ElFormItemProps, ElFormProps } from '@/components/el/ElForm';
import {
  filledFormConfig,
  filledColumnsConfig,
  filledColumnsEditAbleConfig,
  getOptionsYN,
  getCellRenderYN,
  setFormDisabledByType
} from '@/project/utils/tableHelper';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
// 基础配置
const getBaseConfig = (type) => {
  let form: ElFormProps = {
    items: [
      {
        title: '客户编号',
        name: 'custCode',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '客户名称',
        name: 'custName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      // {
      //   title: '客户类型',
      //   name: 'custType',
      //   formOption: {
      //     type: '$select',
      //     props: {
      //       options: [
      //         { label: '配件', value: 'B' },
      //         { label: '整车', value: 'A' },
      //         { label: '整车和配件', value: 'C' },
      //       ]
      //     }
      //   },
      //   rules: [{ required: true, message: '必填！' }]
      // },
      {
        title: '客户类型',
        name: 'custType',
        span: 6,
        rules: [{ required: true, message: '必填！' }],
        formOption: {
          type: '$udc',
          props: {
            placeholder: '请选择',
            domain: 'CRM',
            prefixStr: '/yd-system',
            udc: 'CUST_TYPE',
            // selectRecord: true
          }
        },
      },

      // {
      //   title: '仓库类型',
      //   name: 'whType',
      //   span: 6,
      //   rules: [{ required: true, message: '必填！' }],
      //   formOption: {
      //     type: '$udc',
      //     props: {
      //       placeholder: '请选择',
      //       domain: 'INV',
      //       prefixStr: '/yd-inv',
      //       udc: 'WH_TYPE',
      //       selectRecord: true
      //     }
      //   }
      // },

      // {
      //   title: '客户类型',
      //   name: 'custType',
      //   span: 6,
      //   formOption: {
      //     type: '$udc',
      //     props: {
      //       placeholder: '请选择',
      //       prefixStr: '/yd-system',
      //       domain: 'CRM',
      //       udc: 'CUST_TYPE'
      //     }
      //   }
      // },
      {
        title: '所属经销商',
        name: 'buId',
        span: 6,
        // formOption: {
        //   type: '$input',
        //   props: {
        //     placeholder: '请输入',
        //     disabled: type === 'view' || status === 'CLOSED'
        //   }
        // },
        formOption: {
          type: '$yd-mg-select-distributor',
          props: {
            // placeholder: '自己',
            // disabled: true
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      // {
      //   title: '所属经销商',
      //   name: 'ouId',
      //   // formOption: {
      //   //   type: '$input',
      //   //   props: {
      //   //     placeholder: '请输入',
      //   //     disabled: type === 'view' || status === 'CLOSED'
      //   //   }
      //   // },
      //   formOption: {
      //     type: '$input',
      //     props: {
      //       // placeholder: '自己',
      //       disabled: true
      //     }
      //   }
      //   // rules: [{ required: true, message: '必填！' }]
      // }
    ]
  };
  setFormDisabledByType(form, type == 'view');
  return form;
};

export { getBaseConfig };
