//客户弹框选择
import React from 'react';
import { message } from 'antd';
import PopupSelection from '@/components/el/ItemComponent/PopupSelection';
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
class ItemPopupSelection extends React.Component<Props, State> {
  static defaultProps = {
    paramData: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null // 通过ref获取inputValue   popupSelection.state.inputValue
    };
  }
  componentDidMount() { }
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  onRequest = async (data) => {
    console.log(data, '组件成功执行');
    const res = await request(`/yd-sale/crmCust/searchWholesaleCustomer`, {
      method: 'post',
      query: {
        ...data,
        orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData,
        // keyword:'KH'
      }
    });
    console.log(res, 'res组件成功执行')
    const att = res.data?.records?.map((item) => ({
      ...item,
      tel: item.orgAddrDetailDTO?.orgAddrAddressVos[0]?.tel,
      contPerson: item.orgAddrDetailDTO?.orgAddrAddressVos[0]?.contPerson,
      detailAddr: item.orgAddrDetailDTO?.orgAddrAddressVos[0]?.detailAddr,
    }))
    const obj = {
      success: true,
      data: {
        total: res.data?.total,
        records: att
      }
    }
    console.log(obj, '得到处理的额数据')
    return obj
  };
  render() {
    return (
      <>
        <PopupSelection
          overLayWidth={800}
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
              title: '客户名称',
              dataIndex: 'custName',
              align: 'center',
              width: 150
            },
            {
              title: '客户编码',
              dataIndex: 'custCode',
              align: 'center',
              width: 100
            },
            {
              title: '送货地址',
              dataIndex: 'detailAddr',
              align: 'center',
              width: 120
            },
            {
              title: '联系人',
              dataIndex: 'contPerson',
              align: 'center',
              width: 120
            },
            {
              title: '联系电话',
              dataIndex: 'tel',
              align: 'center',
              width: 120
            }
          ]}
          columns={[
            { title: '客户名称', dataIndex: 'custName' },
            { title: '客户编码', dataIndex: 'custCode' }
          ]}
          searchFormProps={{
            items: [
              {
                title: '客户名称',
                name: 'custName',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '客户编码',
                name: 'custCode',
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
export default ItemPopupSelection;
