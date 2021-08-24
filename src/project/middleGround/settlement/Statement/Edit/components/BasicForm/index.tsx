// 基本信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { Radio } from 'antd';
import { ElFormItemProps } from '@/components/el/ElForm';
import './index.less';
interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  type: any,
}
interface State {
  // formRef: any
}
class BasicForm extends React.Component<Props, State> {
  formRef: any
  constructor(props) {
    super(props);
    this.state = {
      // formRef: ''
    }

  }

  componentDidMount() {}

  //基础信息
  getFormItems = (): Array<ElFormItemProps> => [
    {
      title: '单据编号',
      name: 'purSettleCode',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
          placeholder: '请输入'
        }
      }
    },
    {
      title: '结算主体',
      name: 'settleEntityName',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '来源方式',
      name: 'createModeName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
          placeholder: '请输入'
        }
      }
    },
    {
      title: '创建人',
      name: 'creator',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '附件数',
      name: 'attCount',
      formOption: {
        type: '$input',
        props: {
          placeholder: '',
          disabled: true,
        }
      }
    },
    {
      title: '部门',
      name: 'deptName',
      formOption: {
        type: '$input',
        props: {
          placeholder: '',
          disabled: true,
        }
      }
    },
    {
      title: '汇率',
      name: 'exchangeRate',
      formOption: {
        type: '$input',
        props: {
          placeholder: '',
          disabled: true,
        }
      }
    },
    {
      title: '凭证号',
      name: 'docuNo',
      formOption: {
        type: '$input',
        props: {
          placeholder: '',
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
          placeholder: '请输入'
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
          placeholder: '请输入'
        }
      }
    },
    {
      title: '业务日期',
      name: 'processTime',
      formOption: {
        type: '$datePicker',
        props: {
          format: 'YYYY-MM-DD',
          placeholder: '请选择',
          disabled: true,
        }
      }
    },
    {
      title: '审核人',
      name: 'approveUser',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '总金额',
      name: 'totalAmount',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '税额',
      name: 'taxAmount',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '关联对账单号',
      name: 'relationNumber',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '应付报账单号',
      name: 'reimburseNo',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '币种',
      name: 'currName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
          placeholder: '请输入'
        }
      }
    },
    {
      title: '总金额(本位币)',
      name: 'totalAmountBase',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '创建时间',
      name: 'createTime',
      formOption: {
        type: '$datePicker',
        props: {
          placeholder: '请选择时间',
          format: 'YYYY-MM-DD',
          disabled: true,
        }
      }
    },
    {
      title: '审核时间',
      name: 'approveDate',
      formOption: {
        type: '$datePicker',
        props: {
          placeholder: '请输入',
          format: 'YYYY-MM-DD',
          disabled: true,
        }
      }
    },
    {
      title: '往来对象名称',
      name: 'contactName',
      formOption: {
        type: '$input',
        props: {
          disabled: true,
          placeholder: '请输入'
        }
      }
    },
    {
      title: '发票差异',
      name: 'invoiceDiff',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: true,
        }
      }
    },
    {
      title: '报账', // 标志
      name: 'reimburseFlag',
      formOption: {
        type: '$radio',
        props: {
          options: [
            {label: '是', value: true},
            {label: '否', value: false}
          ],
          disabled: true,
        }
      }
    },
    {
      title: '第三方', // 标志
      name: 'payFlag',
      formOption: {
        type: '$radio',
        props: {
          options: [
            {label: '是', value: true},
            {label: '否', value: false}
          ],
          disabled: true,
        }
      }
    },
    {
      title: '备注',
      name: 'remark',
      span: 24,
      className: "reamrk",
      formOption: {
        type: '$textArea',
        props: {
          placeholder: '',
          maxLength: 250,
          disabled: true,
        }
      },
    }
  ];

  render() {

    return (
      <ElForm
        onRef={(ref) => { this.formRef = ref }}
        data={this.props.formData}
        formProps={{
          labelCol: { span: 7 },
          wrapperCol: { span: 17 },
          items: this.getFormItems(),
          className: "basic-form",
          // onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default BasicForm;
