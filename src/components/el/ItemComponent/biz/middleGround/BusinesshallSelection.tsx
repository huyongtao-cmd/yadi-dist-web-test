//营业厅选择
import React from 'react';
import { message } from 'antd';
import PopupSelection from '../../PopupSelection';
import { omit } from 'ramda';
interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class BusinesshallSelection extends React.Component<Props, State> {
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
            request: (paramData) => {
              return Promise.resolve({
                success: true,
                data: {
                  total: 5,
                  records: [
                    {
                      id: '1',
                      code: 'Co120111',
                      name: '中国燃气营业厅(广州市从化区)'
                    },
                    {
                      id: '2',
                      code: 'Co120112',
                      name: '中国燃气营业厅(南宁市兴宁区)'
                    },
                    {
                      id: '3',
                      code: 'Co120113',
                      name: '中国燃气营业厅(钦州市钦南区)'
                    },
                    {
                      id: '4',
                      code: 'Co120114',
                      name: '中国燃气营业厅(玉林市玉州区)'
                    },
                    {
                      id: '5',
                      code: 'Co120115',
                      name: '中国燃气营业厅(柳州市柳北区)'
                    }
                  ]
                }
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
              title: '营业厅编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '营业厅名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          columns={[
            {
              title: '营业厅编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '营业厅名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '营业厅编码',
                dataIndex: 'code',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '营业厅名称',
                dataIndex: 'name',
                span: 6,
                formOption: { type: '$input', props: {} }
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
export default BusinesshallSelection;
