//销售退货
import React, { Component } from 'react';
import MultiTabMobx from '@/store/multiTab';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';

// 公共组件 --- start
import {
  ElCard,
  ElPage,
  ElRowContainer,
  ElNotification
} from '@/components/el';
//公共组件 --- end

//图标 --- start
import { SaveBlue } from '@/components/el/ElIcon';
//图标 --- end

//组件 --- start
import BaseForm from './BaseForm/index';
import ClientForm from './ClientForm/index';
import CustomerForm from './CustomerForm/index';
import OrderTable from './OrderTable/index';
import { asserts, maths } from '@/utils';
import { Modal } from 'antd';
import CheckCodeModal from '../checkCodeModal';
//组件 --- end
export default class ReturnOrderDetail extends Component<any, any> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      baseFormRef: null, //基本信息组件的ref
      clientFormRef: null, //客户信息的ref
      customerFormRef: null, //顾客信息的ref
      orderTableRef: null, //订单明细组件的ref
      pageLoading: false, //加载状态
      deleteFlags: [],
      docType: 'D', //销售类型
      // 回显数据 -- start
      baseFormRefValue: {},
      customerFormRefValue: {},
      customerFormRefValue2: {},
      orderTableRefValue: [],
      nums: 0,
      allamt: 0,
      //回显数据 -- end
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: true });
    const res = await service.findIdOne(this.props.match.params.id);
    console.log(res, 'res')
    this.setState({ pageLoading: false });
    const { data } = res;
    let types = '';
    console.log(data.docNo, 'ssss')
    if (data.docNo.indexOf("LS") == 0) {
      types = 'D';
    } else if (data.docNo.indexOf("PF") == 0) {
      types = 'E';
    } else {
      types = data.docType;
    }
    // if (data.docType == 'A' || data.docType == 'B') {
    //   types = 'D';
    // } else if (data.docType == 'C') {
    //   types = 'E';
    // } else {
    //   types = data.docType;
    // }
    let contPerson, tel, detailAddr;
    if (data.orgAddrAddressVos && data.orgAddrAddressVos != null) {
      if (data.orgAddrAddressVos.length > 0) {
        // custContactName
        console.log(data.orgAddrAddressVos, 'data.orgAddrAddressVos')
        contPerson = data.orgAddrAddressVos[0].contPerson;
        tel = data.orgAddrAddressVos[0].tel;
        detailAddr = data.orgAddrAddressVos[0].detailAddr;
      }
    }
    // 基本信息回显
    let baseFormRefValue = {
      storeName: data.storeName,
      whName: data.whName,
      docType: types,
      docTypeName: data.docTypeName,
      payMethodName: data.payMethodName,
      es1Name: data.es1Name,
      docTime: data.docTime,
      remark: data.remark,
      docNo: data.docNo,
      relateDocNo: data.relateDocNo,
      contPerson: contPerson,
      tel: tel,
      detailAddr: detailAddr,
    };
    // 顾客信息回显(顾客信息和客户信息在一张表中)
    let customerFormRefValue = data.crmCustVO || {};
    let customerFormRefValue2 = {
      custCode: data,
      // orgAddrAddressVos: [],
      custName: data.custName,
      custId: data.custId,
      recvAddrNo: data.recvAddrNo,
      contPerson: contPerson,
      tel: tel,
      detailAddr: detailAddr,
    }
    // 订单明细回显
    let orderTableRefValue = data.salSoDVOList.map(item => { return { ...item, noQty: maths.sub(item.qty || 0, item.shippedQty || 0) } });
    console.log(orderTableRefValue, 'orderTableRefValue')
    this.setState({
      nums: data.qty,
      allamt: data.amt,
      docType: types,
      baseFormRefValue,
      customerFormRefValue,
      customerFormRefValue2,
      orderTableRefValue
    });
  }
  // save = async () => {
  //   console.log('保存');
  //   const {
  //     baseFormRef,
  //     clientFormRef,
  //     customerFormRef,
  //     orderTableRef
  //   } = this.state;
  //   await orderTableRef.quitEditState(); //退出可编辑状态
  //   // 获取每个组件里的值 --- start
  //   let baseFormRefValue = await baseFormRef.validateFields();
  //   // 下面两个根据销售类型渲染其中一个
  //   let clientFormRefValue = await clientFormRef?.validateFields();
  //   let customerFormRefValue = await customerFormRef?.validateFields();
  //   let orderTableValues = await orderTableRef.validateTableRows();
  //   console.log(
  //     baseFormRefValue,
  //     clientFormRefValue,
  //     customerFormRefValue,
  //     orderTableValues,
  //     'valuesvaluesvaluesvalues'
  //   );
  //   //获取每个组件里的值 --- end

  //   // 传参前的处理 --- start
  //   // 基本信息处理
  //   let baseInfo = {
  //     ...baseFormRefValue,
  //     docNo: '', //传空
  //     docTime: dayjs(baseFormRefValue.docTime).format('YYYY-MM-DD HH:mm:ss') //处理时间
  //   };

  //   // 顾客信息和客户信息是放在一张表中的
  //   let crmCustCreateParam = {
  //     ...clientFormRefValue, //客户信息
  //     ...customerFormRefValue, //顾客信息
  //     vipBirthDate: dayjs(customerFormRefValue?.vipBirthDate).format(
  //       'YYYY-MM-DD HH:mm:ss'
  //     )
  //   };

  //   //订单明细处理
  //   let salSoDCreateParamList = orderTableValues.data;
  //   // 传参前的处理 --- end

  //   // 处理结果合并
  //   let params = {
  //     ...baseInfo,
  //     crmCustCreateParam,
  //     salSoDCreateParamList
  //   };

  //   const res = await service.save(params);
  //   if (res.success) {
  //     ElNotification({
  //       type: 'success',
  //       message: res.message || res.msg || '操作成功！'
  //     });
  //     // this.props.history.push('/salesCenter/saleorder/search');
  //   } else {
  //     ElNotification({
  //       type: 'error',
  //       message: res.message || res.msg || '操作失败！'
  //     });
  //   }
  // };

  // 获取基本信息的ref
  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
    });
  };
  // 获取客户信息的ref
  getClientFormRef = (ref) => {
    this.setState({
      clientFormRef: ref
    });
  };
  // 获取顾客信息的ref
  getCustomerForm = (ref) => {
    this.setState({
      customerFormRef: ref
    });
  };
  // 获取订单明细的ref
  getOrderTableRef = (ref) => {
    this.setState({
      orderTableRef: ref
    });
  };
  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };
  // 基本信息的字段改变监听事件
  // onValuesChange = (changedValues: any, allValues: any) => {
  //   console.log(changedValues, allValues, 'hello');
  //   // A代表正常零售，B代表以旧换新
  //   if (changedValues.docType == 'D') {
  //     this.setState({
  //       docType: 'D'
  //     });
  //   } else if (changedValues.docType == 'E') {
  //     this.setState({
  //       docType: 'E'
  //     });
  //   }
  // };

  checkSerialNos = () => {
    const { orderTableRefValue } = this.state;
    console.log(orderTableRefValue, 'dataSourcedataSource');
    const filterData = orderTableRefValue.filter(item => item.itemType === 'ALL')
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={filterData} />,
      okText: '确认',
      icon: null
    })
  }

  render() {
    const {
      baseFormRefValue,
      customerFormRefValue,
      customerFormRefValue2,
      orderTableRefValue,
      orderTableRef,
      pageLoading
    } = this.state;
    console.log(orderTableRefValue, customerFormRefValue, 'orderTableRefValue');
    return (
      <ElPage spinning={pageLoading}>
        <ElRowContainer
          position='top'
          blocks={[
            // {
            //   // key: 'save',
            //   // text: '保存',
            //   // icon: <SaveBlue />,
            //   location: 'left',
            //   // handleClick: this.save
            // },
            {
              key: 'checkSerialNos',
              text: '查看条码',
              handleClick: this.checkSerialNos,
            },
          ]}
        />
        <ElCard title='基本信息'>
          <BaseForm
            data={baseFormRefValue}
            onRef={this.getBaseFormRef}
          ></BaseForm>
        </ElCard>
        {this.state.docType == 'D' && Object.keys(customerFormRefValue).includes('custCode') && asserts.isExist(customerFormRefValue.custCode) && (
          <ElCard title='顾客信息'>
            <CustomerForm
              onRef={this.getCustomerForm}
              data={customerFormRefValue}
            ></CustomerForm>
          </ElCard>
        )}
        {
          this.state.docType !== 'D' && (
            <ElCard title='客户信息'>
              <ClientForm
                onRef={this.getClientFormRef}
                data={customerFormRefValue2}
              ></ClientForm>
            </ElCard>
          )
        }
        <ElCard title='订单明细'>
          <OrderTable
            nums={this.state.nums}
            allamt={this.state.allamt}
            data={orderTableRefValue}
            onRef={this.getOrderTableRef}
            orderTableRef={orderTableRef}
            setDeleteFlags={this.setDeleteFlags}
          ></OrderTable>
        </ElCard>
      </ElPage>
    );
  }
}
