import { ElFormItemProps, ElFormProps } from '@/components/el/ElForm';
import {
  filledFormConfig,
  filledColumnsConfig,
  filledColumnsEditAbleConfig,
  getOptionsYN,
  getCellRenderYN
} from '@/project/utils/tableHelper';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

// 基础配置
const getBaseConfig = ({ type, onSwitchChange, needCreateUser, roleList }) => {
  let userConfig: Array<ElFormItemProps> = [
    {
      title: '创建登陆账号',
      name: 'needCreateUser',
      formOption: {
        type: '$switch',
        events: {
          onSwitchChange: onSwitchChange
        }
      }
    },
    {
      title: '用户名',
      name: 'mobile', //sysUserName
      formOption: {
        type: '$my-text',
        props: {
          disabled: true,
          placeholder: '请使用手机号登录'
        }
      }
    },
    {
      title: '角色配置',
      name: 'roleIds',
      formOption: {
        type: '$select',
        props: {
          disabled: !needCreateUser,
          placeholder: '角色配置',
          options: roleList,
          multiple: true
        }
      }
    }
  ];
  if (type !== 'add') {
    // 编辑时，不可修改用户属性
    userConfig.splice(
      userConfig.findIndex((a) => a.title == '创建登陆账号'),
      1
    );
    // userConfig.splice(
    //   userConfig.findIndex((a) => a.title == '角色配置'),
    //   1
    // );
    // userConfig.splice(
    //   userConfig.findIndex((a) => a.title == '是否创建登陆账号'),
    //   1
    // );
    userConfig.splice(
      userConfig.findIndex((a) => a.title == '用户名'),
      1
    );
  }


  let form: ElFormProps = {
    items: [
      {
        title: '所属组织',
        name: 'buObj',
        formOption: {
          type: '$yd-support-org-tree',
          props: {
            keywords: 'buCodeNameLike',
            placeholder: '请输入',
            showColumn: 'buName'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '员工姓名',
        name: 'empName',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: true, message: '必填！' }]
      },
      {
        title: '手机号',
        name: 'mobile', //sysUserName
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        },
        rules: [{ required: needCreateUser, message: '必填！' }]
      },
      {
        title: '性别',
        name: 'empGender',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ORG', udc: 'EMP_GENDER' }
        }
      },
      {
        title: '出生日期',
        name: 'birthDate',
        formOption: {
          type: '$datePicker',
          props: {
            format: 'YYYY-MM-DD',
            placeholder: '请输入'
          }
        }
      },
      {
        title: '证件类型',
        name: 'idType',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ORG', udc: 'EMP_ID_TYPE' }
        }
      },
      {
        title: '证件号码',
        name: 'idNo',
        formOption: {
          type: '$input',
          props: {
            placeholder: '请输入'
          }
        }
      },
      {
        title: '岗位',
        name: 'empType',
        formOption: {
          type: '$udc',
          props: { prefixStr: '/yd-system', domain: 'ORG', udc: 'EMP_TYPE' }
        }
      },
      {
        title: '员工编号',
        name: 'empCode',
        formOption: {
          type: '$my-text',
          props: {
            placeholder: '自动生成'
          }
        }
      },
      ...userConfig
    ]
  };
  return form;
};

const getWorkPostConfig = (): Array<ElEditTableColumns> => {
  let columns: Array<ElEditTableColumns> = [
    {
      title: '组织',
      dataIndex: 'buObj',
      cellRender: (value) => {
        return value?.buName;
      },
      field: (form) => {
        return '$yd-support-pop-bu';
      }
    }
  ];

  filledColumnsEditAbleConfig(columns);
  filledColumnsConfig(columns);
  return columns;
};
export { getBaseConfig, getWorkPostConfig };
