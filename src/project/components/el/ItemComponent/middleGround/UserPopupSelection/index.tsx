//人员选择
import React from 'react';
import { message } from 'antd';
import PopupSelection from '@/components/el/ItemComponent/PopupSelection';
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
    return request(`/yd-system/sys/users/q`, {
      method: 'post',
      query: {
        ...data,
        enabled: true,
        name: data.firstName,
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
              title: '账号',
              dataIndex: 'username',
              align: 'center',
              width: 120
            },
            {
              title: '姓名',
              dataIndex: 'firstName',
              align: 'center',
              width: 120
            },
            // {
            //   title: '职级',
            //   dataIndex: 'empLevel',
            //   align: 'center',
            //   width: 100
            // },
            // {
            //   title: '性别',
            //   dataIndex: 'empGender',
            //   align: 'center',
            //   width: 100
            // },
            {
              title: '电话',
              dataIndex: 'mobile',
              align: 'center',
              width: 120
            }
          ]}
          columns={[
            { title: '姓名', dataIndex: 'empName' },
            // { title: '编号', dataIndex: 'empCode' }
          ]}
          searchFormProps={{
            items: [
              {
                title: '姓名',
                name: 'firstName',
                span: 6,
                formOption: { type: '$input', props: {} }
              }
              // {
              //   title: '编号',
              //   name: 'empCode',
              //   span: 6,
              //   formOption: { type: '$input', props: {} }
              // }
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
