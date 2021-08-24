import React from 'react';
import ElForm from '@/components/el/ElForm';
import { Radio } from 'antd';
import { ElFormItemProps } from '@/components/el/ElForm';

interface Props {
  onRef: Function;
  formData: { [key: string]: any };
}
class BasicForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  //基础信息
  getFormItems = (): Array<ElFormItemProps> => [
    {
      title: '收款结算单号',
      name: 'receiveSettleNo',
      // rules: [{ required: true, message: '必填' }],
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '销售主体',
      name: 'settleEntityName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '销售组织',
      name: 'settleOrgName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '组织类型',
      name: 'orgTypeName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '业务员',
      name: 'salesManName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },

    {
      title: '下单渠道',
      name: 'orderChannelName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '订单类型',
      name: 'businessType2Name',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '订单编号',
      name: 'salOrderNumber',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '是否入账',
      name: 'recorded',
      formOption: {
        type: '$radio',
        props: {
          disabled: true,
          options: [
            { label: '是', value: true },
            { label: '否', value: false }
          ],
        }
      }
    },
    {
      title: '客户编码',
      name: 'contactCode',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '客户名称',
      name: 'contactName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '客户属性',
      name: 'contactTypeName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '收款单类型',
      name: 'receiveTypeName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '是否预收',
      name: 'preReceiveFlag',
      formOption: {
        type: '$radio',
        props: {
          disabled: true,
          options: [
            { label: '是', value: true },
            { label: '否', value: false }
          ],
        }
      }
    },
    {
      title: '收款日期',
      name: 'processTime',
      formOption: {
        type: '$datePicker',
        props: {
          disabled: true,
          format: 'YYYY-MM-DD',
        }
      }
    },
    {
      title: '收款总金额',
      name: 'totalAmount',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '核对状态',
      name: 'flowHookStateName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '核对日期',
      name: 'flowHookDate',
      formOption: {
        type: '$datePicker',
        props: {
          disabled: true,
          format: 'YYYY-MM-DD',
        }
      }
    },
    {
      title: '核销状态',
      name: 'verifyStateName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '单据状态',
      name: 'stateName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    // {
    //   title: '前端收款单号',
    //   name: 'frontReceiveNumber',
    //   formOption: {
    //     type: '$input',
    //     props: {
    //       disabled: true,
    //     }
    //   }
    // },
    // {
    //   title: '退款类型',
    //   name: 'refundTypeName',
    //   formOption: {
    //     type: '$input',
    //     props: {
    //       disabled: true,
    //     }
    //   }
    // },
    // {
    //   title: '商户名称',
    //   name: 'refundTypeName',
    //   formOption: {
    //     type: '$input',
    //     props: {
    //       disabled: true,
    //     }
    //   }
    // },
    {
      title: '拒绝理由',
      name: 'rejectReason',
      formOption: {
        type: '$textArea',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '备注',
      name: 'remack',
      formOption: {
        type: '$textArea',
        props: {
          disabled: true,
        }
      }
    },
  ];

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          labelCol: { span: 7 },
          wrapperCol: { span: 17 },
          items: this.getFormItems()
          // onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default BasicForm;
