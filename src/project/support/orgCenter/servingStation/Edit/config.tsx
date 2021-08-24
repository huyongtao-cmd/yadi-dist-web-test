import { ElFormItemProps, ElFormProps } from '@/components/el/ElForm';
import {
  filledFormConfig,
  filledColumnsConfig,
  filledColumnsEditAbleConfig,
  setFormDisabledByType,
  getOptionsYN,
  getCellRenderYN
} from '@/project/utils/tableHelper';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

// 基础配置
const getBaseConfig = (type) => {
  let form: ElFormProps = {
    items: [
      {
        title: '所属经销商',
        name: 'buObj',
        formOption: {
          type: '$yd-support-org-tree',
          props: {
            placeholder: '请选择',
            showColumn: 'buName',
            disabled: type != 'add'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '维修站编号',
        name: 'storeCode',
        formOption: {
          type: '$my_input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '维修站名称',
        name: 'storeName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '营业时间段',
        name: 'openTimeSpan',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '门店类型',
        name: 'storeType',
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ORG',
            udc: 'STORE_TYPE',
            disabled: true
          } // 默认值 B
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '绑定门店',
        name: 'storeId',
        formOption: {
          type: '$yd-mg-select-inStore',
          props: {
            placeholder: '请选择',
            // disabled: type != 'add'
          }
        }
      },
      {
        title: '备注',
        name: 'remark',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      }
    ]
  };
  setFormDisabledByType(form, type == 'view');
  return form;
};

// 工位
const getPostConfig = (): Array<ElEditTableColumns> => {
  let columns: Array<ElEditTableColumns> = [
    {
      title: '工位编号',
      // width: 100,
      dataIndex: 'buCode',
      field: (form) => {
        return '$input';
      }
    },
    {
      title: '工位名称',
      dataIndex: 'buName',
      field: (form) => {
        return '$input';
      }
    },
    {
      title: '状态',
      dataIndex: 'buStatusObj',
      cellRender: (text) => text?.valDesc,
      field: () => {
        return {
          formOption: {
            type: '$udc',
            props: {
              prefixStr: '/yd-system',
              domain: 'ORG',
              selectRecord: true,
              udc: 'BU_STATUS',
              filterValue: ['DRAFT', 'CLOSING']
            }
          }
        };
      }
    }
  ];

  filledColumnsEditAbleConfig(columns);
  filledColumnsConfig(columns);
  return columns;
};

const getClassCodeConfig = (type, status) => {
  let form: ElFormProps = {
    items: [],
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }
  };

  for (let index = 0; index < 10; index++) {
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
export { getBaseConfig, getPostConfig, getClassCodeConfig };
