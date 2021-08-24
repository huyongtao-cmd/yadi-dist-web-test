//销售 新的批发单详情
import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BasicsMsg';
import DetailTable from './OrderDetails';
import { maths } from '@/utils';
import * as service from './service';
import MultiTabMobx from '@/store/multiTab';
import { PrintWhite, ExportWhite } from '@/components/el/ElIcon';
import { printFn } from '@/project/utils/printUtils';
import store from '@/store';

interface State {
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  btnFlag: any;
  baseFormRef: any;
  detailTableRef: any;
  deleteFlags: any;
  nums: number;
  allamt: number;
}
class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      nums: 0,
      allamt: 0,
      baseFormRef: null,
      detailTableRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      btnFlag: false,
    };
  }
  async componentDidMount() {
    this.setState({
      pageLoading: true
    });
    // 数据回显
    const res = await service.findIdOne(this.props.match.params.id);
    // console.log(res, '接收回显参数res')
    if (res.success) {
      this.setState({
        pageLoading: false
      });
      const { data } = res;
      // 存一下要回显的数据 单号 地址号信息
      const resData = {
        id: data.id,
        docNo: data.docNo, // 单号
      }
      let inds = data?.creator?.indexOf(':')
      if (data.orgAddrAddressVos && data.orgAddrAddressVos != null && data.orgAddrAddressVos[0]) {
        let formData = {
          id: data.id,
          docNo: data.relateDocNo ? data.relateDocNo : data.docNo, // 单号   
          storeId: data.storeId + '', // 后台返回id为数字  前端 只有字符串才可以根据id 显示name
          storeName: data.storeName,
          whId: data.whId, // 仓库 418717612026949632
          whName: data.whName,
          docType: data.docType, // 销售 docTypeName
          docTypeName: data.docTypeName, // 销售 docTypeName
          payMethod: data.payMethod, // 付款方式
          payMethodName: data.payMethodName, // 付款方式
          custName: data.custName,
          contPerson: data.orgAddrAddressVos[0].contPerson, // 联系人
          tel: data.orgAddrAddressVos[0].tel, // 联系电话
          detailAddr: data.orgAddrAddressVos[0].detailAddr, // 送货地址
          docTime: data.docTime, // 日期
          remark: data.remark, // 备注
          creator: data?.creator?.substring(0, inds)
        };
        let tableData = data.salSoDVOList.map((item) => ({
          ...item,
          itemId: {
            id: item?.itemId,
            itemName: item?.itemName,
            itemCode: item?.itemCode,
            brand: item?.brand,
            brandName: item?.brandName
          },
          brand: item?.brand,
          uom: {
            udcVal: item?.uom,
            valDesc: item?.uomName
          },
          ohQty: item?.invQty || 0
        }));
        this.setState({
          nums: data.qty,
          allamt: data.amt,
          formData,
          tableData,
        });
        // console.log('成功')
      } else {
        let formData = {
          id: data.id,
          docNo: data.docNo, // 单号
          storeId: data.storeId + '', // 后台返回id为数字  前端 只有字符串才可以根据id 显示name
          storeName: data.storeName,
          whId: data.whId,
          whName: data.whName,
          docType: data.docType, // 销售类型 docTypeName
          docTypeName: data.docTypeName, // 销售 docTypeName
          payMethod: data.payMethod, // 付款方式
          payMethodName: data.payMethodName, // 付款方式
          custName: data.custName,
          contPerson: '', // 联系人
          tel: '', // 联系电话
          detailAddr: '', // 送货地址
          docTime: data.docTime, // 日期
          remark: data.remark, // 备注
          creator: data?.creator?.substring(0, inds)
        };
        // 订单明细回显
        let tableData = data.salSoDVOList.map((item) => ({
          ...item,
          itemId: {
            id: item?.itemId,
            itemName: item?.itemName,
            itemCode: item?.itemCode,
            brand: item?.brand,
            brandName: item?.brandName
          },
          brand: item?.brand,
          uom: {
            udcVal: item?.uom,
            valDesc: item?.uomName
          },
          ohQty: item?.invQty || 0
        }));
        this.setState({
          nums: data.qty,
          allamt: data.amt,
          formData,
          tableData
        });
        // console.log('请求失败 查询库存失败')
      }
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
      this.setState({
        pageLoading: false
      });
    }
  }

  // async componentDidMount() {
  //   this.setState({
  //     pageLoading: true
  //   });
  //   const res = await service.findIdOne(this.props.match.params.id);
  //   this.setState({
  //     pageLoading: false
  //   });
  //   // console.log(res, '接收过来的是销售订单查询页面中的批发数据详情回显')
  //   if (res.success) { // 2 和 3 可以出库
  //     if (res.data?.docStatus === '2' || res.data?.docStatus === '3') {
  //       this.setState({ btnFlag: true, pageLoading: false })
  //     }
  //     // this.setState({ pageLoading: false });
  //     const { data } = res;
  //     console.log(data, 'dadadadad')
  //     if (data.orgAddrAddressVos && data.orgAddrAddressVos != null && data.orgAddrAddressVos[0]) {
  //       // 基本信息回显
  //       let formData = {
  //         storeId: data.storeName, // 门店
  //         whId: data.whName, // 仓库
  //         docType: data.docTypeName, // 销售类型
  //         payMethod: data.payMethodName, // 付款方式
  //         custName: data.custName, // 二网客户
  //         custId: data.custId,
  //         docNo: data.docNo,
  //         contPerson: data.orgAddrAddressVos[0].contPerson, // 联系人 oldCarSalSoDVOList
  //         tel: data.orgAddrAddressVos[0].tel, // 联系电话
  //         detailAddr: data.orgAddrAddressVos[0].detailAddr, // 送货地址
  //         docTime: data.docTime, // 日期
  //         remark: data.remark, // 备注
  //       };
  //       // 订单明细回显
  //       let tableData = data.salSoDVOList.map((item) => ({
  //         ...item,
  //         uom: {
  //           udcVal: item?.uom,
  //           valDesc: item?.uomName
  //         },
  //         itemId: {
  //           id: item?.itemId,
  //           itemName: item?.itemName,
  //           itemCode: item?.itemCode,
  //           brand: item?.brand,
  //           brandName: item?.brandName,
  //         },
  //         ohQty: item?.invQty || 0
  //       }));
  //       this.setState({ formData, tableData });
  //     }
  //     else if (data.orgAddrAddressVos && data.orgAddrAddressVos != null) {
  //       let formData = {
  //         storeId: data.storeName, // 门店
  //         whId: data.whName, // 仓库
  //         docType: data.docTypeName, // 销售类型
  //         payMethod: data.payMethodName, // 付款方式
  //         custName: data.custName, // 二网客户
  //         contPerson: '', // 联系人 oldCarSalSoDVOList
  //         tel: '', // 联系电话
  //         detailAddr: '', // 送货地址
  //         docTime: data.docTime, // 日期
  //         remark: data.remark, // 备注
  //       };
  //       let tableData = data.salSoDVOList.map((item) => ({
  //         ...item,
  //         uom: {
  //           udcVal: item?.uom,
  //           valDesc: item?.uomName
  //         },
  //         itemId: {
  //           id: item?.itemId,
  //           itemName: item?.itemName,
  //           itemCode: item?.itemCode,
  //           brand: item?.brand,
  //           brandName: item?.brandName,
  //         },
  //         ohQty: item?.invQty || 0
  //       }));
  //       this.setState({ formData, tableData });
  //     }
  //   } else {
  //     ElNotification({
  //       type: 'error',
  //       message: res.msg || '操作失败'
  //     });
  //   }
  // }

  //数值相加
  sum = (data) => {
    // 金额
    const amt = data.reduce((total, current) => {
      // console.log('金额', total, current);
      return maths.add(total, current.amt || 0);
    }, 0);
    // 数量
    const qty = data.reduce((total, current) => {
      // console.log('数量', total, current);
      return maths.add(total, current.qty || 0);
    }, 0);
    return {
      amt,
      qty
    };
  };
  onBack = () => {
    // console.log('返回');
    this.props.push('/salesCenter/saleorder/search');
  };
  //打印
  print = async () => {
    const {
      nums,
      allamt,
      formData,
      tableData,
    } = this.state;
    const config = {
      proTitle: '',
      title: '批发单',
      span: 3,
      orderNum: formData.docNo
    };
    const columns = [
      { title: '序号', dataIndex: 'no' },
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
    let tableDatas = [];
    // let firstName = store.principal['firstName'];
    const footData = [{ title: '制单人:', value: formData.creator }, { title: '总数量:', value: nums }, { title: '总金额:', value: allamt }];
    const baseInfo = [
      { label: '订单号', value: formData.docNo },
      { label: '门店', value: formData.storeName },
      { label: '仓库', value: formData.whName },
      { label: '销售类型', value: formData.docTypeName },
      { label: '付款方式', value: formData.payMethodName },
      { label: '二网客户', value: formData.custName },
      { label: '联系人', value: formData.contPerson },
      { label: '联系电话', value: formData.tel },
      { label: '送货地址', value: formData.detailAddr },
      { label: '日期', value: formData.docTime },
      { label: '备注', value: formData.remark },
    ];
    this.state.tableData.forEach((item, index) => {
      item.no = index + 1;
    });
    tableDatas = this.state.tableData;
    printFn(config, baseInfo, columns, tableDatas, footData);
  };

  //出库 // 跳转页面到出库单
  handleSubmit = async () => {
    this.props.push(
      `/inventory/inventoryout/item/C/${this.props.match.params.id}`
    );
  };

  // 设置删除的标记
  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };
  // 获取基础数据
  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
    });
  };

  // 获取订单明细的ref
  getDetailTableRef = (ref) => {
    this.setState({
      detailTableRef: ref
    });
  };
  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={[
            {
              key: 'print',
              text: '打印',
              location: 'left',
              icon: <PrintWhite />,
              handleClick: this.print,
            },
            {
              key: 'submit',
              text: '出库',
              location: 'left',
              icon: <ExportWhite />,
              handleClick: this.handleSubmit
            }
          ]}
          onBack={this.onBack}
          position={'top'}
        />
        {/* <div id={'billDetails'}> */}
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
          />
        </ElCard>
        <ElCard title='订单信息'>
          <DetailTable
            nums={this.state.nums}
            allamt={this.state.allamt}
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
          />
        </ElCard>
        {/* </div> */}
      </ElPage>
    );
  }
}

export default Edit;
