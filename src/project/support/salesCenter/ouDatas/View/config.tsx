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
          type: '$text',
          props: {
            placeholder: '请选择',
            disabled: true
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '客户名称',
        name: 'custName',
        formOption: {
          type: '$text',
          props: {
            placeholder: '请选择',
            disabled: true
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '客户类型',
        name: 'custTypeName',
        span: 6,
        formOption: {
          type: '$text',
          props: {
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '所属经销商',
        name: 'buId',
        span: 6,
        formOption: {
          type: '$yd-mg-select-distributor',
          props: {
            disabled: true
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
    ]
  };
  setFormDisabledByType(form, type == 'view');
  return form;
};

export { getBaseConfig };
