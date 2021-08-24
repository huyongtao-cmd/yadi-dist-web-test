//供应商
import React from 'react';
import { message } from 'antd';
import PopupSelection from '../../../PopupSelection';
import { omit } from 'ramda';
import request from '@/utils/request';
interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class RMAPopupSelection extends React.Component<Props, State> {
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
    return request(`/yst-pur/pur/rma/search`, {
      method: 'post',
      query: { ...data, orders: [{ asc: false, column: 'createTime' }] }
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
              title: '采购退货RMA编号',
              dataIndex: 'docNo',
              width: 100,
              align: 'center'
            },
            {
              title: '采购退货RMA状态',
              dataIndex: 'docStatusName',
              width: 90,
              align: 'center'
            },
            {
              title: '供应商编号',
              dataIndex: 'suppCode',
              width: 80,
              align: 'center'
            },
            {
              title: '供应商名称',
              dataIndex: 'suppName',
              width: 140,
              align: 'center',
              ellipsis: true
            },
            {
              title: '公司编号',
              dataIndex: 'ouCode',
              width: 80,
              align: 'center'
            },
            {
              title: '仓库编号',
              dataIndex: 'whCode',
              width: 80,
              align: 'center'
            },
            {
              title: '仓库名称',
              dataIndex: 'whName',
              width: 120,
              align: 'center',
              ellipsis: true
            },
            {
              title: '退货总金额',
              dataIndex: 'netAmt',
              width: 80,
              align: 'right'
            },
            {
              title: '币种',
              dataIndex: 'ouCurr',
              width: 60,
              align: 'center'
            },
            {
              title: '发起人',
              dataIndex: 'docEmpId',
              width: 80,
              align: 'center'
            },
            {
              title: '发起日期',
              dataIndex: 'docDate',
              width: 100,
              align: 'center'
            }
          ]}
          columns={[
            {
              title: '采购退货RMA编号',
              dataIndex: 'docNo',
              width: 100,
              align: 'center'
            },
            {
              title: '采购退货RMA状态',
              dataIndex: 'docStatusName',
              width: 90,
              align: 'center'
            },
            {
              title: '供应商编号',
              dataIndex: 'suppCode',
              width: 80,
              align: 'center'
            },
            {
              title: '供应商名称',
              dataIndex: 'suppName',
              width: 140,
              align: 'center',
              ellipsis: true
            },
            {
              title: '公司编号',
              dataIndex: 'ouCode',
              width: 80,
              align: 'center'
            },
            {
              title: '仓库编号',
              dataIndex: 'whCode',
              width: 80,
              align: 'center'
            },
            {
              title: '仓库名称',
              dataIndex: 'whName',
              width: 120,
              align: 'center',
              ellipsis: true
            },
            {
              title: '退货总金额',
              dataIndex: 'netAmt',
              width: 80,
              align: 'right'
            },
            {
              title: '币种',
              dataIndex: 'ouCurr',
              width: 60,
              align: 'center'
            },
            {
              title: '发起人',
              dataIndex: 'docEmpId',
              width: 80,
              align: 'center'
            },
            {
              title: '发起日期',
              dataIndex: 'docDate',
              width: 100,
              align: 'center'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '采购退货RMA号',
                name: 'docNo',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入采购退货RMA号' }
                }
              }
              // {
              //   title: '公司',
              //   name: 'ou',
              //   span: 6,
              //   formOption: {
              //     type: '$mg-pop-ou-purc',
              //     props: { placeholder: '请选择公司' }
              //   }
              // },
              // {
              //   title: '供应商',
              //   name: 'supp',
              //   span: 6,
              //   formOption: {
              //     type: '$mg-pop-supp',
              //     props: { placeholder: '请选择供应商' }
              //   }
              // }
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
export default RMAPopupSelection;
