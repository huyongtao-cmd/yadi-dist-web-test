//公司选择（项目级重写）
import React from 'react';
import { message } from 'antd';
import requests from '@/utils/request';
import PopupSelection from '@/components/el/ItemComponent/PopupSelection';
import { omit } from 'ramda';
interface Props {
  value?: any;
  onChange?: Function;
  fixedQueryParam?: Object; // 查询时候的固定参数
}
interface State {
  popupSelection: any;
  fixedQueryParam: Object;
}
// 在此处组装所有的数据
class BuPopupSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null, // 通过ref获取inputValue   popupSelection.state.inputValue
      fixedQueryParam: props.fixedQueryParam || {}
    };
  }
  componentDidMount() {}
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          overLayWidth={600}
          rowKey='id'
          tableProxy={{
            request: async (paramData) => {
              paramData = { ...paramData, ...this.props.fixedQueryParam };
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              return await requests('/yd-user/serve/getStation', {
                method: 'post',
                query: paramData
              });
            },
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
              title: '组织编号',
              width: 100,
              dataIndex: 'buCode'
            },
            {
              title: '组织名称',
              width: 100,
              dataIndex: 'buName'
            }
          ]}
          columns={[
            {
              title: '组织编号',
              width: 100,
              dataIndex: 'buCode'
            },
            {
              title: '组织名称',
              width: 100,
              dataIndex: 'buName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '组织名称',
                name: 'buCodeNameLike',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '组织编号、名称、简称'
                  }
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
export default BuPopupSelection;
