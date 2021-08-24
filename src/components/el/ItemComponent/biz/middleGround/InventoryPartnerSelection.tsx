// 库存合作伙伴
import PopupSelection from '../../PopupSelection';
import React, { Component } from 'react';
import requests from '@/utils/request';
import { ElNotification } from '@/components/el';

interface Props {
  value?: any;
  onChange?: Function;
  paramData?: any;
  destroyOnClose: boolean;
}
interface State {
  popupSelection: any;
}

// 在此处组装所有的数据
class InventoryPartnerSelection extends Component<Props, State> {
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
    console.log('tableQuery');
  };

  // 分页查询requests
  getList = (data: any) => {
    return requests('/yst-inv/inv/invWh/search', {
      method: 'post',
      query: {
        ...data,
        orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData
      }
    });
  };
  // 分页请求
  request = async (formData) => {
    console.log(formData, 'hhhh');
    const param = {
      ...formData
    };
    let res = await this.getList(param);
    console.log('this.getList(param)', res);
    return res;
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
              title: '库存合作伙伴编号',
              width: 100,
              dataIndex: 'pcode',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record.pcode}</span>;
              }
            },
            {
              title: '库存合作伙伴名称',
              width: 100,
              dataIndex: 'pname',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record.pname}</span>;
              }
            },
            {
              title: '库存合作伙伴类型',
              width: 100,
              dataIndex: 'ptype',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record.ptypeName}</span>;
              }
            }
          ]}
          // columns={[
          //   {
          //     title: '库存合作伙伴编号',
          //     width: 100,
          //     dataIndex: 'pcode',
          //     align: 'center',
          //     render: (...[, record]) => {
          //       return <span>{record.pcode}</span>;
          //     }
          //   },
          //   {
          //     title: '库存合作伙伴名称',
          //     width: 100,
          //     dataIndex: 'pname',
          //     align: 'center',
          //     render: (...[, record]) => {
          //       return <span>{record?.pname}</span>;
          //     }
          //   },
          //   {
          //     title: '库存合作伙伴类型',
          //     width: 100,
          //     dataIndex: 'ptype',
          //     align: 'center',
          //     render: (...[, record]) => {
          //       return <span>{record.ptypeName}</span>;
          //     }
          //   }
          // ]}
          searchFormProps={{
            items: [
              {
                title: '库存合作伙伴编号',
                name: 'pcode',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '库存合作伙伴名称',
                name: 'pname',
                span: 6,
                formOption: { type: '$input', props: {} }
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

export default InventoryPartnerSelection;
