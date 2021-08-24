//供应商
import React from 'react';
import { message } from 'antd';
import PopupSelection from '../../../PopupSelection';
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
class SuppPopupSelection extends React.Component<Props, State> {
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
    return request(`/yst-pur/pur/purSupp/suppSearch`, {
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
              title: '供应商编号',
              dataIndex: 'suppCode',
              width: 140,
              align: 'left'
            },
            {
              title: '供应商全称',
              dataIndex: 'suppName',
              align: 'left',
              width: 300
            },
            {
              title: '供应商简称',
              dataIndex: 'suppAbbr',
              align: 'center',
              width: 120
            },
            {
              title: '供应商类型',
              dataIndex: 'suppType2Name',
              align: 'center',
              width: 120
            },
            {
              title: '供应商性质',
              dataIndex: 'compPropName',
              align: 'center',
              width: 120
            },
            {
              title: '采购公司',
              dataIndex: 'ouName',
              width: 140,
              align: 'center'
            },
            {
              title: '供应商状态',
              dataIndex: 'suppStatusName',
              align: 'center',
              width: 120
            },
            {
              title: '默认税率',
              dataIndex: 'taxRateDesc',
              width: 120
            },
            {
              title: '法人代表',
              dataIndex: 'reprName',
              align: 'center',
              width: 120
            },
            {
              title: '供应商联系人',
              dataIndex: 'contPerson',
              align: 'center',
              width: 120
            },
            {
              title: '公司电话',
              dataIndex: 'mobile',
              align: 'center',
              width: 120
            },
            {
              title: '工商登记号',
              dataIndex: 'icRegisterNo',
              width: 120,
              align: 'center'
            },
            {
              title: '付款条款',
              dataIndex: 'paymentTerm',
              width: 120,
              align: 'center'
            },
            {
              title: '币种',
              dataIndex: 'currName',
              align: 'center',
              width: 160
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              ellipsis: true,
              align: 'center',
              width: 160
            }
          ]}
          columns={[
            { title: '供应商编号', dataIndex: 'suppCode' },
            { title: '供应商名称', dataIndex: 'suppName' }
          ]}
          searchFormProps={{
            items: [
              {
                title: '供应商编码',
                name: 'suppCode',
                span: 6,
                formOption: { type: '$input', props: {} }
              },
              {
                title: '供应商名称',
                name: 'suppName',
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
export default SuppPopupSelection;
