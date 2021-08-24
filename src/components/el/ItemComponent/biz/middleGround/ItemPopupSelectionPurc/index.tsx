//商品选择
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
    return request(`/yst-pur/itm/itmItem/search`, {
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
              title: '商品编码',
              dataIndex: 'itemCode',
              fixed: 'left',
              width: 150
            },
            {
              title: '商品名称',
              dataIndex: 'itemName',
              width: 300
            },
            {
              title: '商品类型',
              dataIndex: 'itemTypeName',
              width: 120
            },
            {
              title: '商品规格',
              dataIndex: 'packageSpec',
              width: 120
            },
            {
              title: '单位',
              dataIndex: 'purcUomName',
              width: 100
            },
            {
              title: '存储类型',
              dataIndex: 'storeModeName',
              width: 100
            },
            {
              title: '总帐级',
              dataIndex: 'finGlType',
              width: 100
            },
            {
              title: '商品品类',
              dataIndex: 'c1Code',
              width: 120
            },
            {
              title: '商品子品类',
              dataIndex: 'c2Code',
              width: 120
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
            },
            {
              title: '产品组',
              dataIndex: 'itemGroupName',
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
