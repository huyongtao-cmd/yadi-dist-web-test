//零售单详情
import React, { Component } from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import MultiTabMobx from '@/store/multiTab';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import { maths } from '@/utils';
import { printFn } from '@/project/utils/printUtils';
// import store from '@/store';



// 公共组件 --- start
import {
  ElCard,
  ElPage,
  ElRowContainer,
  ElForm,
  ElNotification
} from '@/components/el';
//公共组件 --- end

//图标 --- start
import { PrintBlue, PrintWhite, SaveBlue } from '@/components/el/ElIcon';
//图标 --- end

// 零售单显示5个组件
import BaseForm from './BaseForm';
import CustomerForm from './CustomerForm';
import OrderTable from './OrderTable';
import OldCarTable from './OldCarTable';
import ImgInfo from './ImgInfo';

export default class RetailOrderDetail extends Component<any, any> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      nums: 1,
      allamt: 2,
      baseFormRef: null, //基本信息组件的ref
      customerFormRef: null, //顾客信息的ref
      orderTableRef: null, //订单明细组件的ref
      oldCarTableRef: null, //旧车信息的ref
      imgInfoRef: null, // 图片信息的ref
      pageLoading: false, //加载状态
      deleteFlags: [],
      docType: 'A', //业务类型,A代表正常零售，B代表依旧换新，默认A
      baseFormRefValue: {},
      customerFormRefValue: {},
      orderTableRefValue: [],
      oldCarTableRefValue: [],
      imgInfoRefValue: [],
      type: null,
      sendDisabed: false
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: true, type: this.props.match.params.type });
    const res = await service.findIdOne(this.props.match.params.id);
    this.setState({ pageLoading: false });
    const { data } = res;
    let inds = data?.creator?.indexOf(':')
    let baseFormRefValue = {
      storeName: data?.storeName,
      whName: data?.whName,
      docType: data?.docType,
      docNo: data?.docNo,
      docTypeName: data?.docTypeName,
      payMethodName: data?.payMethodName,
      docTime: data?.docTime,
      remark: data?.remark,
      es1Name: data?.es1Name,
      creator: data?.creator?.substring(0, inds),
      empName: data?.empName,
      intfFlag: data?.intfFlag,
    };

    // 顾客信息回显(顾客信息和客户信息在一张表中)
    let customerFormRefValue = data.crmCustVO;

    // 订单明细回显
    let orderTableRefValue = data.salSoDVOList.map((item) => {
      console.log(item, '000000')
      return {
        ...item,
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        discRatio: item.discRatio,
        serialNos: Array.isArray(item.serialNoList) && item.serialNoList.length > 0 ? item.serialNoList.join(',') : null
      };
    });

    // 旧车信息回显
    let oldCarTableRefValue = data.oldCarSalSoDVOList;
    console.log('oldCarTableRefValue', oldCarTableRefValue);

    // 图片信息回显
    let imgInfoRefValue = data.salImagesInfoVOS;
    console.log(imgInfoRefValue, 'imgInfoRefValue');

    this.setState({
      nums: data.qty,
      allamt: data.amt,
      baseFormRefValue,
      customerFormRefValue,
      orderTableRefValue,
      oldCarTableRefValue,
      imgInfoRefValue,
      docType: data.docType,
      sendDisabed: Object.keys(baseFormRefValue).includes('intfFlag') && baseFormRefValue.intfFlag ? true : false
    });
  }

  // 获取图片信息的ref
  getImgInfoRef = (ref) => {
    this.setState({
      imgInfoRef: ref
    });
  };
  // 获取基本信息的ref
  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
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
  // 获取旧车信息的ref
  getOldCarTableRef = (ref) => {
    this.setState({
      oldCarTableRef: ref
    });
  };
  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };
  showOldCarTable = (docType) => {
    if (docType == 'B') {
      return (
        <ElCard title='旧车信息'>
          <OldCarTable
            docType={this.state.docType}
            onRef={this.getOldCarTableRef}
            data={this.state.oldCarTableRefValue}
          ></OldCarTable>
        </ElCard>
      );
    }
    return null;
  };
  //打印
  print = async () => {
    const {
      nums,
      allamt,
      baseFormRefValue,
      customerFormRefValue
    } = this.state;
    const config = {
      proTitle: '',
      title: '零售单',
      span: 3,
      orderNum: baseFormRefValue.docNo
    };
    const columns = [
      { title: '行号', dataIndex: 'lineNo' },
      { title: '商品名称', dataIndex: 'itemName' },
      { title: '商品品牌', dataIndex: 'brandName' },
      { title: '商品编码', dataIndex: 'itemCode' },
      { title: '商品类型', dataIndex: 'itemTypeName' },
      { title: '销售数量', dataIndex: 'qty' },
      { title: '单价', dataIndex: 'price' },
      { title: '单位', dataIndex: 'uomName' },
      { title: '金额', dataIndex: 'amt' },
      { title: '备注', dataIndex: 'remark' }
    ];
    let tableData = [];
    // let firstName = store.principal['firstName'];
    const footData = [{ title: '制单人:', value: baseFormRefValue.empName }, { title: '总数量:', value: nums }, { title: '总金额:', value: allamt }];
    const baseInfo = [
      { label: '订单号', value: baseFormRefValue.docNo },
      { label: '门店', value: baseFormRefValue.storeName },
      { label: '销售类型', value: baseFormRefValue.docTypeName },
      { label: '付款方式', value: baseFormRefValue.payMethodName },
      { label: '参保方式', value: baseFormRefValue.es1Name },
      { label: '开单日期', value: baseFormRefValue.docTime },
      { label: '备注', value: baseFormRefValue.remark },
      { label: '顾客姓名', value: customerFormRefValue.custName },
      { label: '手机号', value: customerFormRefValue.reprCertMobile },
    ];
    this.state.orderTableRefValue.forEach((item, index) => {
      item.lineNo = index + 1;
    });
    tableData = this.state.orderTableRefValue;
    printFn(config, baseInfo, columns, tableData, footData);
  };

  // 再开一单
  handleOpenOrder = () => {
    this.multiTabStore.closeCurrentToPath(`/salesCenter/retailorder/create`);
  }

  // 消息推送
  send = async () => {
    this.setState({
      pageLoading: true
    })
    const res = await service.sendMessage(this.props.match.params.id);
    console.log(res, 'res');
    this.setState({
      pageLoading: false
    })
    if (res.success) {
      this.setState({
        sendDisabed: true,
      })
      ElNotification({
        type: 'success',
        message:
          '推送成功'
      })
    } else {
      this.setState({
        sendDisabed: false
      })
      ElNotification({
        type: 'success',
        message:
          '推送失败'
      })
    }
  }

  // onBack = () => {
  //   this.props.push('/salesCenter/saleorder/search');
  // }

  render() {
    const {
      baseFormRefValue,
      customerFormRefValue,
      orderTableRefValue,
      oldCarTableRefValue,
      imgInfoRefValue,
      pageLoading,
      docType,
      orderTableRef,
      sendDisabed
    } = this.state;
    console.log(baseFormRefValue, imgInfoRefValue, 'imgInfoRefValue2');
    return (
      <ElPage spinning={pageLoading}>
        <ElRowContainer
          position='top'
          // onBack={this.onBack}
          blocks={[
            {
              text: '打印',
              key: 'print',
              handleClick: this.print,
              location: 'left',
              icon: <PrintWhite />
            },
            this.state.type === 'retailOrderCreate' && {
              text: '再开一单',
              key: 'again',
              handleClick: this.handleOpenOrder,
              location: 'left',
            },
            {
              text: '推送',
              key: 'send',
              handleClick: this.send,
              location: 'left',
              disabled: !!sendDisabed
            }
          ].filter(Boolean)}
        />
        <ElCard title='基本信息'>
          <BaseForm
            onRef={this.getBaseFormRef}
            data={baseFormRefValue}
          ></BaseForm>
        </ElCard>
        <ElCard title='顾客信息'>
          <CustomerForm
            onRef={this.getCustomerForm}
            data={customerFormRefValue}
          ></CustomerForm>
        </ElCard>
        <ElCard title='订单明细'>
          <OrderTable
            nums={this.state.nums}
            allamt={this.state.allamt}
            onRef={this.getOrderTableRef}
            orderTableRef={orderTableRef}
            setDeleteFlags={this.setDeleteFlags}
            data={orderTableRefValue}
          ></OrderTable>
        </ElCard>
        {this.showOldCarTable(docType)} {/*旧车信息根据销售状态决定是否显示*/}
        <ElCard title='图片信息'>
          <ImgInfo
            data={imgInfoRefValue}
            onRef={this.getImgInfoRef}
            imgTableRef={this.state.imgInfoRef}
          ></ImgInfo>
        </ElCard>
      </ElPage>
    );
  }
}
