//商品选择
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
  componentDidMount() {}
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  onRequest = async (data) => {
    console.log(data,'datadata');
    return request(`/yd-pur/supp/findPage`, {
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
              title: '供应商名称',
              dataIndex: 'suppName',
              align: 'center',
              width: 150
            },
            {
              title: '供应商编码',
              dataIndex: 'suppCode',
              align: 'center',
              width: 100
            },
            {
              title: '类型',
              dataIndex: 'suppTypeName',
              align: 'center',
              width: 100
            },
            {
              title: '地址',
              dataIndex: 'registerAddress',
              align: 'center',
              width: 120
            },
            {
              title: '联系人',
              dataIndex: 'invPicName',
              align: 'center',
              width: 120
            }
          ]}
          columns={[
            { title: '供应商名称', dataIndex: 'suppName' },
            { title: '供应商编码', dataIndex: 'suppCode' }
          ]}
          searchFormProps={{
            items: [
              {
                title: '供应商编码',
                name: 'suppCode',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '供应商名称',
                name: 'suppName',
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
