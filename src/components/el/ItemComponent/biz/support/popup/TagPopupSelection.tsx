//商品选择
import PopupSelection from '../../../PopupSelection';
import React from 'react';
import { ElNotification } from '@/components/el';
import requests from '@/utils/request';

interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class TagPopupSelection extends React.Component<Props, State> {
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
              paramData.status = 'ENABLE';
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              return requests('/yd-user/itm/tag/list', {
                method: 'post',
                query: paramData
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
              title: '标签编码',
              width: 100,
              dataIndex: 'tagCode'
            },
            {
              title: '标签名称',
              width: 100,
              dataIndex: 'tagName'
            },
            {
              title: '标签描述',
              width: 100,
              dataIndex: 'tagDesc'
            }
          ]}
          columns={[
            {
              title: '标签编码',
              width: 100,
              dataIndex: 'tagCode'
            },
            {
              title: '标签名称',
              width: 100,
              dataIndex: 'tagName'
            },
            {
              title: '标签描述',
              width: 100,
              dataIndex: 'tagDesc'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '标签',
                name: 'tagCodeName',
                span: 8,
                formOption: {
                  type: '$input',
                  props: { placeholder: '标签名称/编码' }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          value={this.props.value}
          onChange={this.props.onChange}
          overLayWidth={600}
          showColumn='tagName'
          {...this.props}
        />
      </>
    );
  }
}
export default TagPopupSelection;
