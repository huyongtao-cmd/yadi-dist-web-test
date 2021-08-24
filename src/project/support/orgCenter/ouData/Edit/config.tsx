import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ElEditTableColumns,
  ActionButtonProps
} from '@/components/el/ElEditTable';
import { Switch } from 'antd';
import * as service from './service';

// 基础配置
const getBaseConfig = (type, status): Array<ElFormItemProps> => [
  {
    title: '公司编号',
    name: 'ouCode',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || (status != '' && status != 'DRAFT')
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '类型',
    name: 'ouType',
    formOption: {
      type: '$udc',
      props: {
        placeholder: '请选择',
        prefixStr: '/yd-system',
        domain: 'ORG',
        udc: 'BU_TYPE',
        disabled: type === 'view' || status === 'CLOSED'
      }
    },
    rules: [{ required: true, message: '必填！' }]
  },
  {
    title: '公司名称',
    name: 'ouName',
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
    title: '公司简称',
    name: 'ouAbbr',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '状态',
    name: 'ouStatusName',
    formOption: {
      type: '$text',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '法人公司',
    name: 'legalOuNames',
    formOption: {
      type: '$support-pop-ou',
      props: {
        placeholder: '请选择法人公司',
        disabled: type === 'view' || (status != '' && status != 'DRAFT')
      }
    }
  },
  {
    title: '排序号',
    name: 'sortNo',
    formOption: {
      type: '$inputNumber',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '法人姓名',
    name: 'reprName',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '工商登记号',
    name: 'icRegisterNo',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '创建日期',
    name: 'createTime',
    formOption: {
      type: '$text'
    }
  },
  {
    title: '创建人',
    name: 'creator',
    formOption: {
      type: '$text'
    }
  }
];

const getFinancialConfig = (type, status): Array<ElFormItemProps> => [
  {
    title: '默认币种',
    name: 'ouCurr',
    formOption: {
      type: '$select',
      props: {
        placeholder: '请选择',
        request: async () => {
          return await service.getCurrAll();
        },
        disabled: type === 'view' || status === 'CLOSED',
        transfer: {
          label: 'currName',
          value: 'currCode'
        }
      }
    }
  },
  {
    title: '纳税人类型',
    name: 'taxpayerType',
    formOption: {
      type: '$udc',
      props: {
        prefixStr: '/yd-system',
        domain: 'ORG',
        udc: 'TAXPAYER_TYPE',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  },
  {
    title: '纳税人识别号',
    name: 'taxerCode',
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        disabled: type === 'view' || status === 'CLOSED'
      }
    }
  }
];
const getAddressTableColumns = (
  type,
  that,
  status
): Array<ElEditTableColumns> => [
  {
    title: '地址类型',
    width: 100,
    dataIndex: 'addressTypeNames',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    rule: { required: true, message: '请选择地址类型' },
    cellRender: (value) => value?.valDesc,
    field: () => {
      return {
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ORG',
            udc: 'ADDRESS_TYPE',
            disabled: type === 'view',
            selectRecord: true
          }
        },
        name: 'addressTypeNames',
        rules: [{ required: true, message: '必填！' }]
      };
    }
  },
  {
    title: '默认',
    width: 60,
    dataIndex: 'defaultFlag',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    cellRender: (value) => <Switch defaultChecked={value} disabled={true} />,
    field: () => {
      return {
        formOption: {
          type: '$switch',
          props: {
            defaultValue: true,
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ],
            disabled: type === 'view'
          }
        },
        name: 'defaultFlag'
      };
    }
  },
  {
    title: '联系人',
    width: 100,
    dataIndex: 'cont_person',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          disabled: type === 'view'
        },
        name: 'cont_person'
      };
    }
  },
  {
    title: '手机',
    width: 100,
    dataIndex: 'mobile',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$inputNumber',
          disabled: type === 'view'
        },
        name: 'mobile'
      };
    }
  },
  {
    title: '电话',
    width: 100,
    dataIndex: 'tel',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$inputNumber',
          disabled: type === 'view'
        },
        name: 'tel'
      };
    }
  },
  {
    title: '传真',
    width: 100,
    dataIndex: 'fax',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          disabled: type === 'view'
        },
        name: 'fax'
      };
    }
  },
  {
    title: '邮箱',
    width: 100,
    dataIndex: 'email',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            type: 'email',
            disabled: type === 'view'
          }
        },
        name: 'email'
      };
    }
  },
  {
    title: '国家',
    width: 100,
    dataIndex: 'country',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view'
          }
        },
        name: 'country'
      };
    }
  },
  {
    title: '省/市/区',
    width: 120,
    dataIndex: 'regionNames',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    cellRender: (value, column) => {
      let name = [];
      Array.isArray(value) &&
        value.length > 0 &&
        value.forEach((a) => {
          if (a.label) {
            name.push(a.label);
          }
        });
      return name.join('/');
    },
    field: () => {
      return {
        formOption: {
          type: '$support-cascader-region',
          props: {
            level: 3,
            disabled: type === 'view' || status === 'CLOSED',
            selectRecord: true
          }
        },
        name: 'regionNames'
      };
    }
  },
  {
    title: '详细地址',
    width: 260,
    dataIndex: 'detailAddr',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'detailAddr'
      };
    }
  }
];
const getTableActionButtons = (
  type,
  buttonType,
  actionButton: Function,
  status
): Array<ActionButtonProps> => [
  {
    text: '新增',
    key: 'create',
    handleClick: () => {
      actionButton('create', buttonType);
    },
    location: 'left',
    disabled: type === 'view' || status === 'CLOSED'
  },
  {
    text: '删除',
    key: 'delete',
    handleClick: (data) => {
      actionButton('delete', buttonType, data);
    },
    location: 'left',
    minSelection: 1,
    disabled: type === 'view' || status === 'CLOSED'
  }
];
const getBankTableColumns = (type, status): Array<ElEditTableColumns> => [
  {
    title: '账户类型',
    width: 100,
    dataIndex: 'accTypeNames',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    rule: { required: true, message: '请选择账户类型' },
    cellRender: (value) => value?.valDesc,
    field: () => {
      return {
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'ORG',
            udc: 'ADDR_BANKACC_TYPE',
            disabled: type === 'view' || status === 'CLOSED',
            selectRecord: true
          }
        },
        name: 'accTypeNames'
      };
    }
  },
  {
    title: '默认',
    width: 60,
    dataIndex: 'defaultFlag',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    cellRender: (value) => <Switch defaultChecked={value} disabled={true} />,
    field: () => {
      return {
        formOption: {
          type: '$switch',
          props: {
            defaultValue: true,
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ],
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'defaultFlag'
      };
    }
  },
  {
    title: '开户行',
    width: 100,
    dataIndex: 'bankName',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'bankName'
      };
    }
  },
  {
    title: '支行',
    width: 100,
    dataIndex: 'branchName',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'branchName'
      };
    }
  },
  {
    title: '账号',
    width: 100,
    dataIndex: 'bankAcc',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$inputNumber',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'bankAcc'
      };
    }
  },
  {
    title: '户名',
    width: 100,
    dataIndex: 'holderName',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'holderName'
      };
    }
  },
  {
    title: '币种',
    width: 100,
    dataIndex: 'currNames',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    cellRender: (value) => value?.currName,
    field: () => {
      return {
        formOption: {
          type: '$select',
          props: {
            placeholder: '请选择',
            request: async () => {
              return await service.getCurrAll();
            },
            selectRecord: true,
            transfer: {
              label: 'currName',
              value: 'currCode'
            }
          }
        },
        name: 'currNames'
      };
    }
  }
];
const getCardTableColumns = (type, status): Array<ElEditTableColumns> => [
  {
    title: '证照编号',
    width: 100,
    dataIndex: 'qualifyNo',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'qualifyNo'
      };
    }
  },
  {
    title: '证照类型',
    width: 60,
    dataIndex: 'qualifyTypeNames',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    rule: { required: true, message: '请选择证照类型' },
    cellRender: (value) => value?.valDesc,
    field: () => ({
      name: 'qualifyTypeNames',
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择证照类型',
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'ADDR_QUALIFY_TYPE',
          disabled: type === 'view' || status === 'CLOSED',
          selectRecord: true
        }
      }
    })
  },
  {
    title: '证照状态',
    width: 100,
    dataIndex: 'qualifyStatusNames',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    cellRender: (value) => value?.valDesc,
    field: () => {
      return {
        formOption: {
          type: '$udc',
          props: {
            prefixStr: '/yd-system',
            domain: 'COM',
            udc: 'STATUS_ACTIVEORNO',
            disabled: type === 'view' || status === 'CLOSED',
            selectRecord: true
          }
        },
        name: 'qualifyStatusNames'
      };
    }
  },
  {
    title: '生效日期',
    width: 100,
    dataIndex: 'validFrom',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$datePicker',
          props: {
            format: 'YYYY-MM-DD HH:mm:ss',
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'validFrom'
      };
    }
  },
  {
    title: '失效日期',
    width: 100,
    dataIndex: 'validTo',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$datePicker',
          props: {
            format: 'YYYY-MM-DD HH:mm:ss',
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'validTo'
      };
    }
  },
  // {
  //   title: '经营范围',
  //   width: 100,
  //   dataIndex: 'range',
  //   editable: true,
  //   align: 'center',
  //   field: () => {
  //     return {
  //       formOption: {
  //         type: '$input'
  //       },
  //       name: 'range'
  //     };
  //   }
  // },
  // {
  //   title: '附件',
  //   width: 100,
  //   dataIndex: 'file',
  //   editable: true,
  //   align: 'center',
  //   field: () => {
  //     return {
  //       formOption: {
  //         type: '$input'
  //       },
  //       name: 'file'
  //     };
  //   }
  // },
  {
    title: '备注',
    width: 100,
    dataIndex: 'remark',
    editable: type != 'view' && status != 'CLOSED',
    align: 'center',
    field: () => {
      return {
        formOption: {
          type: '$input',
          props: {
            disabled: type === 'view' || status === 'CLOSED'
          }
        },
        name: 'remark'
      };
    }
  }
];
const getClassCodeConfig = (type, status): ElFormProps => {
  let items = [];

  for (let index = 0; index < 10; index++) {
    let name = 'cat';
    let udc = 'OU_CAT';
    if (index !== 0) {
      name += `${index + 1}`;
      udc += `${index + 1}`;
    }
    items.push({
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
  return {
    items: items
  };
};

export {
  getBaseConfig,
  getFinancialConfig,
  getAddressTableColumns,
  getTableActionButtons,
  getBankTableColumns,
  getCardTableColumns,
  getClassCodeConfig
};
