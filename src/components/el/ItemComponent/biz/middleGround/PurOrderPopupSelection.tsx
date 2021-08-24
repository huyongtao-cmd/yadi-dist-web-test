//销售订单选择
import PopupSelection from '../../PopupSelection';
import React from 'react';
import requests from '@/utils/request';
import { ElNotification } from '@/components/el';
interface Props {
  value?: any;
  onChange?: Function;
  paramData?: any;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class PurOrderPopupSelection extends React.Component<Props, State> {
  static defaultProps = {
    paramData: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null // 通过ref获取inputValue   popupSelection.state.inputValue
    };
  }
  componentDidMount() {}
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };

  tableQuery = () => {
    // console.log('tableQuery');
  };

  // 分页查询requests
  getList = (data: any) => {
    return requests('/yst-pur/pur/purPo/search', {
      method: 'post',
      query: {
        ...data,
        orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData
      }
    });
  };

  // 分页请求
  request = (formData) => {
    const param = {
      ...formData,
      orders: [{ asc: false, column: 'createTime' }]
    };
    return this.getList(param);
  };
  // 分页查询失败回调
  errCallBack = (res) => {
    console.log('res', res);
    ElNotification({
      type: 'error',
      message: res.message || res.data || '操作失败！'
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          rowKey='id'
          tableProxy={{
            request: this.request,
            successCallBack: () => {},
            errCallBack: this.errCallBack,
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          modalTableColumns={[
            {
              title: '采购单编号',
              dataIndex: 'docNo',
              width: 160,
              align: 'center'
            },
            {
              title: '采购单类型',
              dataIndex: 'docType2Name',
              width: 160,
              align: 'center'
            },
            {
              title: '采购单状态',
              dataIndex: 'docStatusName',
              width: 160,
              align: 'center'
            },
            {
              title: '采购来源',
              dataIndex: 'poSourceName',
              width: 160,
              align: 'center'
            },
            {
              title: '审批状态',
              dataIndex: 'apprStatusName',
              width: 160,
              align: 'center'
            },
            {
              title: '审批当前节点',
              dataIndex: 'docStatusName19',
              width: 160,
              align: 'center'
            },
            {
              title: '订单日期',
              dataIndex: 'docTime',
              width: 160,
              align: 'center'
            },
            {
              title: '公司编号',
              dataIndex: 'ouCode',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商编号',
              dataIndex: 'suppCode',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商名称',
              dataIndex: 'suppName',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商订单号',
              dataIndex: 'suppDocNo',
              width: 160,
              align: 'center'
            },
            {
              title: '收货仓库编码',
              dataIndex: 'whCode',
              width: 160,
              align: 'center'
            },
            {
              title: '收货仓库名称',
              dataIndex: 'whName',
              width: 160,
              align: 'center'
            },
            {
              title: '收货仓库地址',
              dataIndex: 'recvAddr',
              width: 160,
              align: 'center'
            },
            {
              title: '订单总数量',
              dataIndex: 'qty',
              width: 160,
              align: 'center'
            },
            // {
            //   title: '采购员',
            //   dataIndex: 'empName',
            //   width: 160,
            //   align: 'center'
            // },
            // {
            //   title: '收货总数量',
            //   dataIndex: 'acceptQty',
            //   width: 160,
            //   align: 'center'
            // },
            {
              title: '订单总金额(未税)',
              dataIndex: 'currAmt',
              width: 160,
              align: 'center'
            },
            {
              title: '订单总金额(含税)',
              dataIndex: 'amt',
              width: 160,
              align: 'center'
            },
            {
              title: '税额',
              dataIndex: 'taxAmt',
              width: 160,
              align: 'center'
            },
            {
              title: '本币总金额(未税)',
              dataIndex: 'netAmt',
              width: 160,
              align: 'center'
            },
            {
              title: '本币总金额(含税)',
              dataIndex: 'currNetAmt',
              width: 160,
              align: 'center'
            },
            {
              title: '税率',
              dataIndex: 'taxRate',
              width: 160,
              align: 'center'
            },
            {
              title: '币种',
              dataIndex: 'currCode',
              width: 160,
              align: 'center'
            },
            {
              title: '汇率',
              dataIndex: 'currRate',
              width: 160,
              align: 'center'
            },
            {
              title: '支付条款',
              dataIndex: 'paymentTerm',
              width: 160,
              align: 'center'
            },
            {
              title: '运输方式',
              dataIndex: 'transTypeName',
              width: 160,
              align: 'center'
            },
            // {
            //   title: '到达港口',
            //   dataIndex: 'recvPortName',
            //   width: 160,
            //   align: 'center'
            // },
            {
              title: '取消日期',
              dataIndex: 'cancelTime',
              width: 160,
              align: 'center'
            }
          ]}
          columns={[
            {
              title: '采购单编号',
              dataIndex: 'docNo',
              width: 160,
              align: 'center'
            },
            {
              title: '采购单状态',
              dataIndex: 'docStatusName',
              width: 160,
              align: 'center'
            },
            {
              title: '订单日期',
              dataIndex: 'docTime',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商编号',
              dataIndex: 'suppCode',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商名称',
              dataIndex: 'suppName',
              width: 160,
              align: 'center'
            },
            {
              title: '收货仓库编码',
              dataIndex: 'whCode',
              width: 160,
              align: 'center'
            },
            {
              title: '收货仓库名称',
              dataIndex: 'whName',
              width: 160,
              align: 'center'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '品牌',
                name: 'brands',
                span: 6,
                formOption: {
                  type: '$mg-pop-item',
                  props: { placeholder: '请选择品牌（可多选）' }
                }
              },
              {
                title: '采购订单编号',
                name: 'docNo',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入采购订单编号' }
                }
              },
              {
                title: '采购单类型',
                name: 'docType2',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: {
                    placeholder: '请选择',
                    prefixStr: '/yst-pur',
                    domain: 'PUR',
                    udc: 'PO_TYPE2'
                  }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          value={this.props.value}
          onChange={this.props.onChange}
          overLayWidth={600}
          {...this.props}
        />
      </>
    );
  }
}
export default PurOrderPopupSelection;
