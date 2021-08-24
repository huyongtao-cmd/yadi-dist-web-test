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
class AddressPopupSelection extends React.Component<Props, State> {
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
              return await requests('/yd-user/org/addr/list', {
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
              title: '地址簿编号',
              width: 100,
              dataIndex: 'addrNo'
            },
            {
              title: '地址簿类型',
              width: 100,
              dataIndex: 'addrTypeName'
            },
            {
              title: '地址簿名称',
              width: 100,
              dataIndex: 'addrName'
            },
            {
              title: '创建人',
              width: 100,
              dataIndex: 'createUserName'
            },
            {
              title: '创建时间',
              width: 100,
              dataIndex: 'createTime'
            }
          ]}
          columns={[
            {
              title: '地址簿编号',
              width: 100,
              dataIndex: 'addrNo'
            },
            {
              title: '地址簿类型',
              width: 100,
              dataIndex: 'addrTypeName'
            },
            {
              title: '地址簿名称',
              width: 100,
              dataIndex: 'addrName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '地址簿编号',
                name: 'addrNo',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '地址簿名称',
                name: 'addrName',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '地址簿类型',
                name: 'addrType',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: {
                    prefixStr: '/yd-system',
                    domain: 'ORG',
                    udc: 'ADDR_TYPE'
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
export default AddressPopupSelection;
