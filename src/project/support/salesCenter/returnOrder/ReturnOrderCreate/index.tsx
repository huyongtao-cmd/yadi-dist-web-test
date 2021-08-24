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
import { SaveWhite, SubmitWhite } from '@/components/el/ElIcon';
//图标 --- end

//组件 --- start
import BaseForm from './BaseForm/index';
import ClientForm from './ClientForm/index';
import CustomerForm from './CustomerForm/index';
import OrderTable from './OrderTable/index';
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
  baseFormRefValue: any;
  clientFormRefValue: any;
  customerFormRefValue: any;
  orderTableValues: any;
  docType: string;
  formData: { [key: string]: any };
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
      // 回显数据 -- start
      baseFormRefValue: {},
      clientFormRefValue: {},
      customerFormRefValue: {},
      orderTableValues: [],
      formData: {}
      //回显数据 -- end
    };
  }

  componentDidMount() {
    this.getWareHouse();
  }

  //查询仓库
  getWareHouse = async () => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      buId: buIdList[0] && buIdList[0].id,
      storeIds
    }
    this.setState({ pageLoading: true })
    const res = await service.findOneInv(data);
    this.setState({ pageLoading: false })
    if (res.success) {
      const param = res.data.records?.map((item) => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
            //  ...item
          }
        }
      }).filter(Boolean);
      this.setState({
        formData: {
          docType: 'D',
          docTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          storeId: buIdList[0] && buIdList[0].id,
          whId: param[0] && param[0].value
        }
      });
    }
  }

  // 保存
  save = async (a) => {
    const {
      baseFormRef,
      clientFormRef,
      customerFormRef,
      orderTableRef
    } = this.state;
    await baseFormRef.validateFields();
    const docType = baseFormRef.getFieldValue('docType');
    docType === 'D' ? await customerFormRef.validateFields() : await clientFormRef.validateFields();
    this.setState({
      pageLoading: true
    });
    await orderTableRef.quitEditState(); //退出可编辑状态
    // console.log(orderTableRef.getRows(), 'orderTableRef')
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
      const res = await service.save({ ...params, flag: 'save' });
      this.setState({
        pageLoading: false
      });
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
      orderTableRef
    } = this.state;
    await orderTableRef.quitEditState(); //退出可编辑状态
    // 获取每个组件里的值 --- start
    let baseFormRefValue = await baseFormRef.validateFields();
    // 下面两个根据销售类型渲染其中一个
    let clientFormRefValue = await clientFormRef?.validateFields();
    let customerFormRefValue = await customerFormRef?.validateFields();
    // console.log(clientFormRefValue, 'customerFormRefValuecustomerFormRefValue')
    let orderTableValues = await orderTableRef.validateTableRows();
    // console.log(
    //   baseFormRefValue,
    //   clientFormRefValue,
    //   customerFormRefValue,
    //   orderTableValues,
    //   'valuesvaluesvaluesvalues'
    // );
    //获取每个组件里的值 --- end
    // 传参前的处理 --- start
    // 基本信息处理
    let baseInfo = {
      ...baseFormRefValue,
      docNo: '', //传空
      docTime: dayjs(baseFormRefValue.docTime).format('YYYY-MM-DD HH:mm:ss') //处理时间
    };
    // 顾客信息和客户信息是放在一张表中的
    let crmCustCreateParam = {
      ...clientFormRefValue, //客户信息
      ...customerFormRefValue, //顾客信息
      // custName: customerFormRefValue?.custName.custName,
      vipBirthDate: dayjs(customerFormRefValue?.vipBirthDate).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    };

    //订单明细处理
    // let salSoDCreateParamList = orderTableValues.data;
    let salSoDCreateParamList = orderTableValues?.data?.map((item) => ({
      ...item,
      uom: item?.uom?.udcVal,
      itemId: item.itemName?.id,
      // uomName: item?.uom.valDesc,
      // uom: {
      //   udcVal: item?.uom,
      //   valDesc: item?.uomName
      // },
      itemName: item.itemName?.itemName,
    }));
    // 传参前的处理 --- end
    let params = {};
    console.log(clientFormRefValue, 'statestatestate')
    if (this.state.docType == 'D') { // 顾客信息
      // 处理结果合并
      params = {
        ...baseInfo,
        // storeId: '1',
        // whId: '1',
        // whId: '28000004',
        custName: customerFormRefValue?.custName?.custName,
        custId: customerFormRefValue?.custName?.id,
        docType: 'D',
        salSoDCreateParamList
      };
    } else { // 客户信息
      // custid  custname 
      params = {
        ...baseInfo,
        custName: clientFormRefValue?.custCode?.custName,
        custId: clientFormRefValue?.custCode?.id,
        recvAddrNo: clientFormRefValue?.custCode?.addrNo,
        salSoDCreateParamList
      };
    }

    return params;

    // console.log(params, 'params......')
  }

  // 提交
  submit = async () => {
    const {
      baseFormRef,
      clientFormRef,
      customerFormRef,
      orderTableRef
    } = this.state;
    const docType = baseFormRef.getFieldValue('docType');
    docType === 'D' ? await customerFormRef.validateFields() : await clientFormRef.validateFields();
    await
      this.setState({
        pageLoading: true
      });
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
      console.log(params, ';;ooooo;;;')
      // let params = await this.paramsData();
      const res = await service.submit({ ...params, flag: 'submit' });
      this.setState({
        pageLoading: false
      });
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

  // setorderTable = (data) => {
  //   this.setState({
  //     docType: data
  //   });
  // }


  render() {
    const { orderTableRef, pageLoading } = this.state;
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          position='top'
          blocks={[
            // {
            //   key: 'save',
            //   text: '保存',
            //   icon: <SaveWhite />,
            //   location: 'left',
            //   handleClick: this.save
            // },
            {
              key: 'submit',
              text: '提交',
              icon: <SubmitWhite />,
              location: 'left',
              handleClick: this.submit
            }
          ]}
        />
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.baseFormRef}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            orderTableRef={orderTableRef}
            setdoctype={this.setdoctype} // 定义一个方法接收子组件传参
            handleLoading={this.handleLoading}
          ></BaseForm>
        </ElCard>

        {this.state.docType == 'D' ? (
          <ElCard title='顾客信息'>
            <CustomerForm
              formRef={this.state.customerFormRef}
              onRef={this.getCustomerForm}
              formData={this.state.formData}>
            </CustomerForm>
          </ElCard>
        ) : (
          <ElCard title='客户信息'>
            <ClientForm formRef={this.state.clientFormRef} onRef={this.getClientFormRef} formData={this.state.formData}></ClientForm>
          </ElCard>
        )}
        <ElCard title='订单明细'>
          <OrderTable
            formRef={this.state.baseFormRef}
            onRef={this.getOrderTableRef}
            orderTableRef={orderTableRef}
            setDeleteFlags={this.setDeleteFlags}
          ></OrderTable>
        </ElCard>
      </ElPage>
    );
  }
}
