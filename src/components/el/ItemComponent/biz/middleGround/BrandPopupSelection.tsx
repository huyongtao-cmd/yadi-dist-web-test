//品牌选择
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
                      id: '1',
                      code: '24',
                      name: '斯托克'
                    },
                    {
                      id: '2',
                      code: 'MCV',
                      name: '麦维他'
                    },
                    {
                      id: '3',
                      code: '701',
                      name: '联合利华'
                    },
                    {
                      id: '4',
                      code: '735',
                      name: '骆驼'
                    },
                    {
                      id: '5',
                      code: 'EQU',
                      name: '怡口糖'
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
              title: '品牌编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '品牌名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          columns={[
            {
              title: '品牌编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '品牌名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '品牌编码',
                name: 'code',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '品牌名称',
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
