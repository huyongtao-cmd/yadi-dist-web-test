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
      title: '销售结算单号',
      name: 'salSettleNumber',
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
      title: '销售业务员',
      name: 'salesManName',
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
      title: '销售结算日期',
      name: 'processTime',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '结算类型',
      name: 'settleTypeName',
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
      title: '结算总金额',
      name: 'totalAmount',
      // rules: [{ required: true, message: '必填' }],
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '结算税额',
      name: 'taxAmount',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '币种',
      name: 'currencyName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    // {
    //   title: '运费',
    //   name: 'freightFee',
    //   formOption: {
    //     type: '$input',
    //     props: {
    //       disabled: true,
    //     }
    //   }
    // },
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
    // {
    //   title: '是否预售',
    //   name: 'presaleFlag',
    //   formOption: {
    //     type: '$radio',
    //     props: {
    //       disabled: true,
    //       options: [
    //         { label: '是', value: true },
    //         { label: '否', value: false }
    //       ],
    //     }
    //   }
    // },
    {
      title: '创建人',
      name: 'creator',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '审核人',
      name: 'approverName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '审核日期',
      name: 'approveTime',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
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
    //   title: '退货类型',
    //   name: 'refundTypeName',
    //   formOption: {
    //     type: '$input',
    //     props: {
    //       disabled: true,
    //     }
    //   }
    // },
    {
      title: 'ERP单据号',
      name: 'erpNumber',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '传ERP时间',
      name: 'erpTransferDate',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: 'ERP凭证号',
      name: 'erpReturnVoucher',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '传ERP状态',
      name: 'erpTransferStateName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
        }
      }
    },
    {
      title: '拒绝原因',
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
      name: 'remark',
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
