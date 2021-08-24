//商品选择
import PopupSelection from '../../PopupSelection';
import React from 'react';
import { ElNotification } from '@/components/el';

interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class ItemPopupSelection extends React.Component<Props, State> {
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
          tableProxy={{
            request: (paramData) => {
              console.log(paramData);
              return Promise.resolve({
                success: true,
                data: {
                  total: 2,
                  records: [
                    {
                      id: '2273',
                      itemCode: 'C1790000009',
                      itemName: '蹦蹦威化夹心黑巧克力制品(30*15g)',
                      brandName: '蹦蹦威',
                      packageSpec: '10x100g',
                      uomName: 'EA-个',
                      uom: 'EA'
                    },
                    {
                      id: '2',
                      itemCode: 'C5070000002',
                      itemName: '家乐氏品客酸乳酪洋葱味薯片110G',
                      brandName: '家乐氏',
                      packageSpec: '10x100g',
                      uomName: 'EA-个',
                      uom: 'EA'
                    }
                  ]
                }
              });
            },
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
              title: '商品名称',
              width: 100,
              dataIndex: 'itemName'
            },
            {
              title: '商品编码',
              width: 100,
              dataIndex: 'itemCode'
            },
            {
              title: '品牌编码',
              width: 100,
              dataIndex: 'ouCode1333'
            },
            {
              title: '品牌名称',
              width: 100,
              dataIndex: 'ouCode2'
            }
          ]}
          columns={[
            {
              title: '商品编码',
              width: 100,
              dataIndex: 'itemCode'
            },
            {
              title: '商品名称',
              width: 100,
              dataIndex: 'itemName'
            },
            {
              title: '品牌编码',
              width: 100,
              dataIndex: 'brandCode'
            },
            {
              title: '品牌名称',
              width: 100,
              dataIndex: 'brandName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '商品编码',
                name: 'itemCode',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '商品名称',
                name: 'itemName',
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
export default ItemPopupSelection;
