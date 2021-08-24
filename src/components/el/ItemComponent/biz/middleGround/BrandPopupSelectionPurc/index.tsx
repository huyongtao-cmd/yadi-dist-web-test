//品牌选择
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
class BrandPopupSelection extends React.Component<Props, State> {
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
    return request(`/yst-pur/itm/itmBrand/search`, {
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
              title: '品牌编码',
              dataIndex: 'brandCode',
              fixed: 'left',
              width: 150
            },
            {
              title: '品牌名称',
              dataIndex: 'brandName',
              width: 300
            },
            {
              title: '品牌类型',
              dataIndex: 'brandType',
              width: 120
            }
          ]}
          columns={[
            { title: '品牌编码', dataIndex: 'brandCode' },
            { title: '品牌名称', dataIndex: 'brandName' }
          ]}
          searchFormProps={{
            items: [
              {
                title: '品牌编码',
                name: 'brandCode',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '品牌名称',
                name: 'brandName',
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
export default BrandPopupSelection;
