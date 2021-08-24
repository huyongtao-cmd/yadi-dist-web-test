//公司选择
import React from 'react';
import { message } from 'antd';
import requests from '@/utils/request';
import PopupSelection from '../../../PopupSelection';
import { omit } from 'ramda';
interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class BuPopupSelection extends React.Component<Props, State> {
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
  render() {
    return (
      <>
        <PopupSelection
          showColumn='buName'
          overLayWidth={600}
          rowKey='id'
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              return await requests('/yd-user/org/orgBu/list', {
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
