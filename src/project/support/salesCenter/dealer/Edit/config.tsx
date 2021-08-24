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
const getBaseConfig = (type, formDataBase) => {
  let form: ElFormProps = {
    items: [
      {
        title: '所属组织',
        name: 'buObj',
        formOption: {
          type: '$yd-support-org-tree',
          props: {
            placeholder: '请选择',
            showColumn: 'buName',
            currentPid: type !== 'add' ? Object.keys(formDataBase).includes('pid') && formDataBase?.pid : undefined
            // disabled: type != 'add'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '经销商编号',
        name: 'buCode',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '经销商名称',
        name: 'buName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '经销商简称',
        name: 'buAbbr',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '经销商类型',
        name: 'cat',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'CRM', udc: 'CUST_TYPE5' }
        }
      },
      {
        title: '对应区域',
        name: 'buRegion',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'CRM', udc: 'CUST_REGION' }
        }
      }
    ]
  };
  setFormDisabledByType(form, type == 'view');
  return form;
};

export { getBaseConfig };
