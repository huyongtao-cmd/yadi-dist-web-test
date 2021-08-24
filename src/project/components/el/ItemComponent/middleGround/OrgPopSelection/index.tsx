//组织选择
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
class OrgPopupSelection extends React.Component<Props, State> {
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
  onRequest = async (data) => {
    return request(`/yd-inv/Provider/invBuDtt`, {
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
              title: '编码',
              dataIndex: 'code',
              width: 150
            },
            {
              title: '名称',
              dataIndex: 'name',
              width: 300
            },
            {
              title: '地址号',
              dataIndex: 'addrNo',
              width: 120
            }
          ]}
          columns={[
            { title: '商品编码', dataIndex: 'itemCode' },
            { title: '商品名称', dataIndex: 'itemName' },
            { title: '品牌编码', dataIndex: 'brand' },
            { title: '商品品牌', dataIndex: 'brandName' }
          ]}
          searchFormProps={{
            items: [
              {
                title: '编码',
                name: 'code',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入编码' }
                }
              },
              {
                title: '名称',
                name: 'name',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入名称' }
                }
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
export default OrgPopupSelection;
