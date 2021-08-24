//公司选择
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
class OuPopupSelection extends React.Component<Props, State> {
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
                      id: '18101',
                      code: '18101',
                      name: '大昌行食品(上海)有限公司'
                    },
                    {
                      id: '18102',
                      code: '18102',
                      name: '大昌三昶(上海)商贸有限公司'
                    },
                    {
                      id: '18103',
                      code: '18103',
                      name: '大昌行食品(上海)有限公司华南分公司'
                    },
                    {
                      id: '18104',
                      code: '18104',
                      name: '上海慎昌贸易有限公司'
                    },
                    {
                      id: '18105',
                      code: '18105',
                      name: '上海慎昌贸易有限公司南京分公司'
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
              title: '公司编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '公司名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          columns={[
            {
              title: '公司编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '公司名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '公司编码',
                name: 'code',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '公司名称',
                name: 'name',
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
export default OuPopupSelection;
