import { ElFormProps } from '@/components/el/ElForm';

// 基础配置
const getBaseConfig = (type, status) => {
  let form: ElFormProps = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
    items: [
      {
        title: '组织编号',
        name: 'buCode',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view' || status != 'DRAFT'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '组织简称',
        name: 'buAbbr',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view' || status === 'CLOSED'
          }
        }
      },
      {
        title: '组织名称',
        name: 'buName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '类型',
        name: 'buTypeName',
        formOption: {
          type: '$text',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '状态',
        name: 'buStatusName',
        formOption: {
          type: '$text',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '所属公司',
        name: 'ouName',
        formOption: {
          type: '$text',
          props: {
            placeholder: '请选择'
          }
        }
      },
      {
        title: '创建日期',
        name: 'createTime',
        formOption: {
          type: '$text',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '创建人',
        name: 'creator',
        formOption: {
          type: '$text',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '排序号',
        name: 'sortNo',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入',
            disabled: type === 'view' || status === 'CLOSED'
          }
        }
      }
    ]
  };
  return form;
};

const getClassCodeConfig = (type, status) => {
  let form: ElFormProps = {
    items: [],
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }
  };

  for (let index = 0; index < 30; index++) {
    let name = 'cat';
    let udc = 'BU_CAT';
    if (index !== 0) {
      name += `${index + 1}`;
      udc += `${index + 1}`;
    }
    form.items.push({
      title: `类别码${index + 1}`,
      name: name,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: udc,
          disabled: type === 'view' || status === 'CLOSED'
        }
      }
    });
  }

  return form;
};
export { getBaseConfig, getClassCodeConfig };
