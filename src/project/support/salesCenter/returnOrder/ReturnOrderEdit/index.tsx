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
import { SaveWhite } from '@/components/el/ElIcon';
//图标 --- end

//组件 --- start
import BaseForm from './BaseForm/index';
import ClientForm from './ClientForm/index';
import CustomerForm from './CustomerForm/index';
import OrderTable from './OrderTable/index';
import { asserts } from '@/utils';
// import { null } from 'mathjs';
// import { null } from 'mathjs';
//组件 --- end

interface State {
  areaRef: any;
  baseFormRef: FormInstance;
  clientFormRef: FormInstance;
  customerFormRef: FormInstance;
  orderTableRef: any;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  docType: string;
  formData1: { [key: string]: any };
  formData2: { [key: string]: any };
  formData3: { [key: string]: any };
  orderDetail: Array<any>;
  isLS: boolean;
}

export default class ReturnOrderCreate extends Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      areaRef: null,
      baseFormRef: null, //基本信息组件的ref
      clientFormRef: null, //客户信息的ref
      customerFormRef: null, //顾客信息的ref
      orderTableRef: null, //订单明细组件的ref
      pageLoading: false, //加载状态
      deleteFlags: [],
      docType: 'D', //销售类型
      isLS: false,
      // 回显数据 -- start
      formData1: {},
      formData2: {},
      formData3: {},
      orderDetail: [],
      //回显数据 -- end
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: true });
    const res = await service.findIdOne(this.props.match.params.id);
    this.setState({ pageLoading: false });

    const { data } = res;
    let types = '';
    let relateDocNo = '';
    let id = '';
    console.log(data.docNo, 'ssss')
    if (data.docNo.indexOf("LS") == 0 || data.docType === 'D') {
      relateDocNo = data.docNo;
      id = '';
      types = 'D';
      this.setState({ isLS: true });
    } else if (data.docNo.indexOf("PF") == 0) {
      types = 'E';
      relateDocNo = data.docNo;
      id = '';
      this.setState({ isLS: false });
    } else {
      types = data.docType;
      relateDocNo = data.relateDocNo;
      id = data.id;
      this.setState({ isLS: false });
    }

    let contPerson, tel, detailAddr;
    if (data.orgAddrAddressVos && data.orgAddrAddressVos != null) {
      if (data.orgAddrAddressVos.length > 0) {
        contPerson = data.orgAddrAddressVos[0].contPerson;
        tel = data.orgAddrAddressVos[0].tel;
        detailAddr = data.orgAddrAddressVos[0].detailAddr;
      }
    }

    // 基本信息
    const formData1 = {
      storeId: data.storeId + '', // 后台返回id为数字  前端 只有字符串才可以根据id 显示name
      whId: data.whId,
      docType: types,
      payMethod: data.payMethod,
      es1: data.es1,
      // docTime: data.docTime,
      docTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      remark: data.remark,
      docNo: data.docNo,
      custName: data,
      id: id, // 有id 不需要新增加一行  从其他单过来的 需要新增  不可以覆盖
      relateDocNo: relateDocNo
    }

    // 顾客信息
    const formData2 = {
      ...data.crmCustVO,
      custName: {
        id: data.crmCustVO?.id,
        custName: data.crmCustVO?.custName,
        custCode: data.crmCustVO?.custCode
      },
    }

    // 客户信息
    const formData3 = {
      custCode: data,
      // orgAddrAddressVos: [],
      custName: data.custName,
      custId: data.custId,
      recvAddrNo: data.recvAddrNo,
      contPerson: contPerson,
      tel: tel,
      detailAddr: detailAddr,
    }

    // 明细
    let orderDetail = data.salSoDVOList.map((item) => ({
      ...item,
      brand: item.brand,
      uom: {
        udcVal: item?.uom,
        valDesc: item?.uomName
      }, // 单位
      // price: price,
      itemName: {
        id: item?.id,
        itemId: item?.itemId,
        itemName: item?.itemName,
        itemCode: item?.itemCode,
        brand: item.brand,
        brandName: item.brandName,
      },
    }));
    console.log(orderDetail, 'orderDetail')
    this.setState({
      docType: types,
      formData1,
      formData2,
      formData3,
      orderDetail
    });

  }

  // 保存
  save = async () => {
    this.setState({ pageLoading: true });
    const {
      baseFormRef,
      clientFormRef,
      customerFormRef,
      orderTableRef
    } = this.state;
    await orderTableRef.quitEditState(); //退出可编辑状态
    if (orderTableRef.getRows().length == 0) {
      this.setState({
        pageLoading: false
      });
      return ElNotification({
        type: 'warning',
        message: '订单明细未填写'
      });
    } else {
      console.log(this.paramsData(), ';;;;;')
      let params = await this.paramsData();
      const res = await service.save({ ...params, flag: 'save' });
      this.setState({ pageLoading: false });
      if (res.success) {
        ElNotification({
          type: 'success',
          message: res.message || res.msg || '操作成功！'
        });
        // this.props.history.push('/salesCenter/saleorder/search');
        this.props.push('/salesCenter/returninquiry/returnsearch')

      } else {
        ElNotification({
          type: 'error',
          message: res.message || res.msg || '操作失败！'
        });
      }
    }
  };

  async paramsData() {
    const {
      baseFormRef,
      clientFormRef,
      customerFormRef,
      orderTableRef,
      formData1,
      docType
    } = this.state;
    await orderTableRef.quitEditState(); //退出可编辑状态
    // 获取每个组件里的值 --- start
    let baseFormRefValue = await baseFormRef.validateFields();
    // 下面两个根据销售类型渲染其中一个
    let clientFormRefValue = await clientFormRef?.validateFields();
    let customerFormRefValue = await customerFormRef?.validateFields();
    let orderTableValues = await orderTableRef.validateTableRows();
    console.log(customerFormRefValue, 'customerFormRefValue877777')
    // 传参前的处理 --- start
    // 基本信息处理
    let baseInfo = {};
    if (docType == 'D' || docType == 'E') {
      baseInfo = {
        ...baseFormRefValue,
        id: formData1.id,
        storeId: baseFormRefValue.storeId * 1, // storeId 后台接受数字格式
        docTime: dayjs(baseFormRefValue.docTime).format('YYYY-MM-DD HH:mm:ss') //处理时间
      };
    } else {
      baseInfo = {
        ...baseFormRefValue,
        // id: formData1.id,
        storeId: baseFormRefValue.storeId * 1, // storeId 后台接受数字格式
        docTime: dayjs(baseFormRefValue.docTime).format('YYYY-MM-DD HH:mm:ss') //处理时间
      };
    }

    //订单明细处理
    let salSoDCreateParamList = orderTableValues.data;
    //订单明细处理
    // let salSoDCreateParamList = orderTableValues.data;
    // let salSoDCreateParamList = orderTableValues.data.map((item) => ({
    //   ...item,
    //   uom: item?.uom.udcVal,
    //   // uom: {
    //   //   udcVal: item?.uom,
    //   //   valDesc: item?.uomName
    //   // },
    //   itemName: item.itemName?.itemName,
    // }));
    let tableData = orderTableValues?.data?.map((item) => ({
      ...item,
      uom: item?.uom.udcVal,
      itemName: item?.itemName.itemName,
      itemCode: item?.itemName.itemCode,
      itemId: item?.itemName.itemId,
    }));
    console.log(tableData, 'tableDatatableDatatableData')
    // console.log(clientFormRefValue.custCode.hasOwnProperty('custId'), 'pppppp')

    // 传参前的处理 --- end
    let params = {};
    if (this.state.docType == 'D') { // 顾客信息
      // custid  custname 
      // 处理结果合并
      params = {
        ...baseInfo,
        custName: customerFormRefValue?.custName.custName,
        custId: customerFormRefValue?.custName.id,
        salSoDCreateParamList: tableData
      };
    } else { // 客户信息
      // custid  custname  地址号
      console.log(!("custId" in clientFormRefValue.custCode), 'pppppp')
      params = {
        ...baseInfo,
        custName: clientFormRefValue?.custCode.custName,
        custId: ("custId" in clientFormRefValue.custCode) ? clientFormRefValue.custCode.custId : clientFormRefValue.custCode.id,
        recvAddrNo: clientFormRefValue?.custCode.recvAddrNo,
        salSoDCreateParamList: tableData
      };
    }
    return params;

  }

  // 提交
  submit = async () => {
    this.setState({ pageLoading: true });
    const {
      baseFormRef,
      clientFormRef,
      customerFormRef,
      orderTableRef
    } = this.state;
    await orderTableRef.quitEditState(); //退出可编辑状态
    if (orderTableRef.getRows().length == 0) {
      this.setState({
        pageLoading: false
      });
      return ElNotification({
        type: 'warning',
        message: '订单明细未填写'
      });
    } else {
      let params = await this.paramsData();
      console.log(params, ';;;;;')
      const res = await service.submit({ ...params, flag: 'submit' });
      this.setState({ pageLoading: false });
      if (res.success) {
        ElNotification({
          type: 'success',
          message: res.message || res.msg || '操作成功！'
        });
        this.props.push('/salesCenter/returninquiry/returnsearch')

        // this.props.history.push('/salesCenter/saleorder/search');
      } else {
        ElNotification({
          type: 'error',
          message: res.message || res.msg || '操作失败！'
        });
      }
    }
  };

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

  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    })
  }

  // 切换顾客信息 或者 客户信息
  setdoctype = (data) => {
    // 接收到子组件穿过来的参数data  改变页面的值
    this.setState({
      docType: data
    });
  }

  onBack = () => {
    this.props.push('/salesCenter/returninquiry/returnsearch');
  }


  render() {
    const { orderDetail, orderTableRef, pageLoading, isLS, formData2 } = this.state;
    return (
      <ElPage spinning={pageLoading}>
        <ElRowContainer
          position='top'
          onBack={this.onBack}
          blocks={[
            // {
            //   key: 'save',
            //   text: '保存',
            //   icon: <SaveBlue />,
            //   location: 'left',
            //   handleClick: this.save
            // },
            {
              key: 'submit',
              text: '提交',
              icon: <SaveWhite />,
              location: 'left',
              handleClick: this.submit
            }
          ]}
        />
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.baseFormRef}
            onRef={this.getBaseFormRef}
            formData1={this.state.formData1}
            orderTableRef={orderTableRef}
            setdoctype={this.setdoctype} // 定义一个方法接收子组件传参
            handleLoading={this.handleLoading}
            isLS={this.state.isLS}
          ></BaseForm>
        </ElCard>

        {this.state.docType == 'D' && Object.keys(formData2).includes('id') && asserts.isExist(formData2.id) && (
          <ElCard title='顾客信息'>
            <CustomerForm
              formRef={this.state.customerFormRef}
              onRef={this.getCustomerForm}
              formData2={this.state.formData2}
              isLS={this.state.isLS}
            >
            </CustomerForm>
          </ElCard>
        )}
        {this.state.docType !== 'D' &&
          <ElCard title='客户信息'>
            <ClientForm formRef={this.state.clientFormRef} onRef={this.getClientFormRef} formData3={this.state.formData3}></ClientForm>
          </ElCard>
        }
        <ElCard title='订单明细'>
          <OrderTable
            formRef={this.state.baseFormRef}
            data={orderDetail}
            onRef={this.getOrderTableRef}
            orderTableRef={orderTableRef}
            setDeleteFlags={this.setDeleteFlags}
            isLS={this.state.isLS}
          ></OrderTable>
        </ElCard>
      </ElPage>
    );
  }
}
