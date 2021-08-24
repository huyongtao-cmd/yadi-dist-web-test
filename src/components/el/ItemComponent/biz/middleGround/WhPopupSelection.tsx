//库存选择
import PopupSelection from '../../PopupSelection';
import React from 'react';
import requests from '@/utils/request';
import { ElNotification } from '@/components/el';
interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class WhPopupSelection extends React.Component<Props, State> {
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

  tableQuery = () => {
    console.log('tableQuery');
  };

  // 分页查询requests
  getList = (data: any) => {
    return requests('/yst-inv/inv/invWh/search', {
      method: 'post',
      query: { ...data, orders: [{ asc: false, column: 'createTime' }] }
    });
  };

  // 分页请求
  request = async (formData) => {
    const param = {
      ...formData
    };
    let res = await this.getList(param);
    console.log('this.getList(param)', res);
    if (res.success) {
      const records = res.data.records?.map((item) => ({
        ...item,
        whName: item?.invWhRespVO?.whName,
        whCode: item?.invWhRespVO?.whCode
      }));
      res = {
        ...res,
        data: {
          ...res.data,
          records
        }
      };
    }
    return res;
  };
  // 分页查询失败回调
  errCallBack = (res) => {
    console.log('res', res);
    ElNotification({
      type: 'error',
      message: res.message || res.data || '操作失败！'
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          rowKey='id'
          tableProxy={{
            request: this.request,
            successCallBack: () => {},
            errCallBack: this.errCallBack,
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          modalTableColumns={[
            {
              title: '仓库编码',
              width: 100,
              dataIndex: 'whCode',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.whCode}</span>;
              }
            },
            {
              title: '仓库名称',
              width: 100,
              dataIndex: 'whName',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.whName}</span>;
              }
            },
            {
              title: '仓库类型',
              width: 100,
              dataIndex: 'whTypeName',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.whTypeName}</span>;
              }
            },
            {
              title: 'E1_BP编码',
              width: 100,
              dataIndex: 'outerCode'
            },
            {
              title: '公司编码',
              width: 100,
              dataIndex: 'ouCode',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.ouCode}</span>;
              }
            },
            {
              title: '公司名称',
              width: 160,
              ellipsis: true,
              dataIndex: 'ouName',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.ouName}</span>;
              }
            },
            {
              title: '功能库区',
              width: 100,
              dataIndex: 'deter2Name'
            },
            {
              title: 'E1库位',
              width: 100,
              dataIndex: 'outerCode2'
            }
          ]}
          columns={[
            {
              title: '仓库编码',
              width: 100,
              dataIndex: 'whCode',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.whCode}</span>;
              }
            },
            {
              title: '仓库名称',
              width: 200,
              dataIndex: 'whName',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.whName}</span>;
              }
            },
            {
              title: '仓库类型',
              width: 100,
              dataIndex: 'whTypeName',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.whTypeName}</span>;
              }
            },
            {
              title: 'E1_BP编码',
              width: 100,
              dataIndex: 'outerCode'
            },
            {
              title: '公司编码',
              width: 100,
              dataIndex: 'ouCode',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.ouCode}</span>;
              }
            },
            {
              title: '公司名称',
              width: 160,
              ellipsis: true,
              dataIndex: 'ouName',
              align: 'center',
              render: (...[, record]) => {
                return <span>{record?.invWhRespVO?.ouName}</span>;
              }
            },
            {
              title: '功能库区',
              width: 100,
              dataIndex: 'deter2Name'
            },
            {
              title: 'E1库位',
              width: 100,
              dataIndex: 'outerCode2'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '仓库名称',
                name: 'whName',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入仓库名称' }
                }
              },
              {
                title: '仓库类型',
                name: 'whType',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: {
                    placeholder: '请选择仓库类型',
                    prefixStr: '/yst-inv',
                    domain: 'INV',
                    udc: 'WH_TYPE'
                  }
                }
              },
              {
                title: '仓库编码',
                name: 'whCode',
                span: 6,
                formOption: {
                  type: '$input',
                  props: { placeholder: '请输入仓库编码' }
                }
              },
              {
                title: '公司',
                name: 'ouId',
                span: 6,
                formOption: {
                  type: '$mg-select-ou',
                  props: { placeholder: '请选择公司' }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          value={this.props.value}
          onChange={this.props.onChange}
          overLayWidth={600}
          {...this.props}
        />
      </>
    );
  }
}
export default WhPopupSelection;
