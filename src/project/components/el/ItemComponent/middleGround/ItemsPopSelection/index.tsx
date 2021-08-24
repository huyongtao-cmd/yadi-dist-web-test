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
  beforeConfirm: any;
  multiple?: any;
}
interface State {
  popupSelection: any;

}
// 在此处组装所有的数据
class ItemsPopupSelection extends React.Component<Props, State> {
  static defaultProps = {
    paramData: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null, // 通过ref获取inputValue   popupSelection.state.inputValue
    };
  }
  componentDidMount() { }
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  onRequest = async (data) => {
    return request(`/yd-inv/invStk/findItemPage`, {
      method: 'post',
      query: {
        ...data,
        itemStatus: "ENABLE",
        orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData
      }
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          beforeConfirm={this.props.beforeConfirm}
          overLayWidth={800}
          multiple
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
              title: '商品编码',
              dataIndex: 'itemCode',
              fixed: 'left',
              width: 150
            },
            {
              title: '商品名称',
              dataIndex: 'itemName',
              width: 300,
              render: (value) => {
                return <p style={{ whiteSpace: 'pre', margin: 0 }}>{value}</p>
              }
            },
            {
              title: '商品类型',
              dataIndex: 'itemTypeName',
              width: 120
            },
            // {
            //   title: '商品规格',
            //   dataIndex: 'packageSpec',
            //   width: 120
            // },
            {
              title: '单位',
              dataIndex: 'uomName',
              width: 100
            },
            {
              title: '库存数',
              dataIndex: 'ohQty',
              width: 100
            },
            {
              title: '品牌编码',
              dataIndex: 'brand',
              width: 120
            },
            {
              title: '商品品牌',
              dataIndex: 'brandName',
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
                title: '商品编码',
                name: 'itemCode',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入商品编码' }
                }
              },
              {
                title: '商品名称',
                name: 'itemName',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入商品名称' }
                }
              },
              {
                title: '商品小类',
                name: 'itemType2',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE2' }
                }
              },
              {
                title: '商品层级',
                name: 'itemType3',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: { prefixStr: '/yd-system', domain: 'ITM', udc: 'ITEM_TYPE3' }
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
export default ItemsPopupSelection;
