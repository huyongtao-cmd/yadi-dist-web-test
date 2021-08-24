// 员工选择
import React from 'react';
import { message } from 'antd';
import PopupSelection from '../../PopupSelection';
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
  onRequest = async (data) => {
    return request(`/yst-pur/sys/users/q`, {
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
              title: '账号名称',
              width: 100,
              dataIndex: 'username'
            },
            {
              title: '用户姓氏',
              width: 100,
              dataIndex: 'lastName'
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
              title: '账号名称',
              width: 100,
              dataIndex: 'username'
            },
            {
              title: '用户姓氏',
              width: 100,
              dataIndex: 'lastName'
            },
            {
              title: '用户名称',
              width: 100,
              dataIndex: 'firstName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '账户名称',
                name: 'username',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入账号名称' }
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
export default UserPopupSelection;
