//供应商
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
class SupplierPopupSelection extends React.Component<Props, State> {
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
          tableProxy={{
            request: (paramData) => {
              return Promise.resolve({
                success: true,
                data: {
                  total: 5,
                  records: [
                    {
                      id: '10080025',
                      code: '10080025',
                      name: '枫树屋枫树糖浆供应商'
                    },
                    {
                      id: '10080026',
                      code: '10080026',
                      name: '美国杂货供应商-阳光少女'
                    },
                    {
                      id: '10080027',
                      code: '10080027',
                      name: '百事食品(中国)有限公司'
                    },
                    {
                      id: '10080028',
                      code: '10080028',
                      name: '卡利芙-加州农场奶制品公司'
                    },
                    {
                      id: '10080029',
                      code: '10080029',
                      name: 'LAK得乐思-雷克威奶酪公司'
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
              title: '供应商编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '供应商名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          columns={[
            {
              title: '供应商编码',
              width: 100,
              dataIndex: 'code'
            },
            {
              title: '供应商名称',
              width: 100,
              dataIndex: 'name'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '供应商编码',
                name: 'code',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '供应商名称',
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
export default SupplierPopupSelection;
