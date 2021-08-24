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
class UserPopupSelection extends React.Component<Props, State> {
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
              paramData.enabled = true;
              return await requests('/yd-user/sys/users/q', {
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
              title: '用户账号',
              width: 100,
              dataIndex: 'username'
            },
            {
              title: '用户名称',
              width: 100,
              dataIndex: 'firstName'
            },
            {
              title: '手机号',
              width: 100,
              dataIndex: 'mobile'
            },
            {
              title: '电子邮箱',
              width: 100,
              dataIndex: 'email'
            }
          ]}
          columns={[
            {
              title: '用户账号',
              width: 100,
              dataIndex: 'username'
            },
            {
              title: '用户名称',
              width: 100,
              dataIndex: 'firstName'
            },
            {
              title: '手机号',
              width: 100,
              dataIndex: 'mobile'
            },
            {
              title: '电子邮箱',
              width: 100,
              dataIndex: 'email'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '用户账号',
                name: 'username',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '用户账号'
                  }
                }
              },
              {
                title: '用户名称',
                name: 'name',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '用户名称'
                  }
                }
              },
              {
                title: '手机号',
                name: 'mobile',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '手机号'
                  }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          showColumn='ouName'
          {...this.props}
        />
      </>
    );
  }
}
export default UserPopupSelection;
