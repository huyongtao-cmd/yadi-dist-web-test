//顾客弹窗
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
class CustomerPopSelection extends React.Component<Props, State> {
  static defaultProps = {
    paramData: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null // 通过ref获取inputValue   popupSelection.state.inputValue
    };
  }
  componentDidMount() { }
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  onRequest = async (data) => {
    console.log(data, 'datadata');
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    return request(`/yd-sale/crmCust/searchCustomer`, {
      method: 'post',
      query: {
        ...data,
        orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData,
        keyword: 'GK',
        storeIds
      },
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          overLayWidth={800}
          rowKey='lineNo'
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
              title: '所属门店',
              dataIndex: 'storeName',
              align: 'center',
              width: 120
            },
            // {
            //   title: '所属经销商',
            //   dataIndex: 'buName',
            //   align: 'center',
            //   width: 120
            // },
            {
              title: '顾客账号',
              dataIndex: 'custCode',
              align: 'center',
              width: 120
            },
            {
              title: '顾客名称',
              dataIndex: 'custName',
              align: 'center',
              width: 120
            },
            {
              title: '手机号',
              dataIndex: 'reprCertMobile',
              align: 'center',
              width: 120
            },
            {
              title: '性别',
              dataIndex: 'vipGenderName',
              align: 'center',
              width: 120
            },
            {
              title: '身份证号',
              dataIndex: 'reprCertNo',
              align: 'center',
              width: 120
            },
            {
              title: '职业',
              dataIndex: 'vipJob',
              align: 'center',
              width: 120
            },
            {
              title: '顾客等级',
              dataIndex: 'vipLevel',
              align: 'center',
              width: 120
            },
            {
              title: '注册时间',
              dataIndex: 'createTime',
              align: 'center',
              width: 120
            },
            // {
            //   title: '账户状态',
            //   dataIndex: 'custStatus',
            //   align: 'center',
            //   width: 120
            // }
          ]}
          searchFormProps={{
            items: [
              {
                title: '顾客名称',
                name: 'custName',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '手机号',
                name: 'reprCertMobile',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '身份证号',
                name: 'reprCertNo',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '性别',
                name: 'vipGender',
                span: 6,
                formOption: {
                  type: '$udc', props: {
                    placeholder: '请输入',
                    prefixStr: '/yd-system',
                    domain: 'ORG',
                    udc: 'EMP_GENDER',
                  }
                }
              },
              {
                title: '所属门店',
                name: 'storeId',
                span: 6,
                formOption: {
                  type: '$yd-mg-select-store',
                  props: {
                    placeholder: '请选择门店',
                  }
                },
              },
              // {
              //   title: '所属经销商',
              //   name: 'buId',
              //   span: 6,
              //   formOption: {
              //     type: '$yd-mg-select-distributor',
              //     props: {
              //       // placeholder: '自己',
              //     }
              //   }
              // },
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
export default CustomerPopSelection;
