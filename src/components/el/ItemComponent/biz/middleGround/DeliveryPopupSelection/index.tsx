//供应商发货单选择
import React from 'react';
import { message } from 'antd';
import PopupSelection from '../../../PopupSelection';
import { omit } from 'ramda';
import request from '@/utils/request';
interface Props {
  value?: any;
  onChange?: Function;
  paramData?: any;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class DeliveryPopupSelection extends React.Component<Props, State> {
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
  onRequest = async (data) => {
    return request(`/yst-inv/pur/purSs/search`, {
      method: 'post',
      query: {
        ...data,
        orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData
      }
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          overLayWidth={600}
          rowKey='id'
          tableProxy={{
            request: this.onRequest,
            errCallBack: (res) => {
              message.error(res.msg || '操作失败');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          modalTableColumns={[
            {
              title: '供应商发货单编号',
              dataIndex: 'docNo',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商发货单状态',
              dataIndex: 'docStatusName',
              align: 'center',
              width: 140
            },
            {
              title: '来源订单编号', // 采购单单号
              dataIndex: 'relateDocNo',
              align: 'center',
              width: 140
            },
            {
              title: '供应商编号',
              dataIndex: 'suppCode',
              align: 'center',
              width: 120
            },
            {
              title: '供应商名称',
              dataIndex: 'suppName',
              align: 'center',
              width: 120,
              ellipsis: true
            }
          ]}
          columns={[
            {
              title: '供应商发货单编号',
              dataIndex: 'docNo',
              width: 160,
              align: 'center'
            },
            {
              title: '供应商发货单状态',
              dataIndex: 'docStatusName',
              align: 'center',
              width: 140
            },
            {
              title: '来源订单编号', // 采购单单号
              dataIndex: 'relateDocNo',
              align: 'center',
              width: 140
            },
            {
              title: '供应商编号',
              dataIndex: 'suppCode',
              align: 'center',
              width: 120
            },
            {
              title: '供应商名称',
              dataIndex: 'suppName',
              align: 'center',
              width: 120,
              ellipsis: true
            },
            {
              title: '公司编号',
              dataIndex: 'ouCode',
              align: 'center',
              width: 80
            },
            {
              title: '收货仓库编码',
              dataIndex: 'whCode',
              width: 120,
              align: 'center'
            },
            {
              title: '收货仓库名称',
              dataIndex: 'whName',
              align: 'center',
              // ellipsis: true,
              width: 160
            },
            {
              title: '收货仓库地址',
              dataIndex: 'recvAddr',
              align: 'center',
              ellipsis: true,
              width: 240
            },
            {
              title: '发货总数量',
              dataIndex: 'qty',
              align: 'center',
              width: 120
            },
            {
              title: '发货日期',
              dataIndex: 'shipmentDate',
              width: 120,
              align: 'center'
            },
            {
              title: '预计到货日期',
              width: 120,
              dataIndex: 'etaDate',
              align: 'center'
            },
            {
              title: '越库标识',
              dataIndex: 'crosswhFlag',
              width: 120,
              align: 'center',
              render: (value) =>
                value || value === 0 ? (value ? '否' : '是') : '-'
            },
            {
              title: '供应商送货单号',
              dataIndex: 'suppDocNo',
              width: 120,
              align: 'center'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '供应商发货单编号',
                name: 'docNo',
                span: 6,
                formOption: { type: '$input', props: {} }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          {...omit(
            ['searchFormProps', 'columns', 'modalTableColumns', 'tableProxy'],
            this.props
          )}
        />
      </>
    );
  }
}
export default DeliveryPopupSelection;
