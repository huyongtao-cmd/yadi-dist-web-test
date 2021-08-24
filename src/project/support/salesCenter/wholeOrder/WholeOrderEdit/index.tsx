//批发单编辑
import React from 'react';
import { ElNotification, ElRowContainer, ElPage, ElCard } from '@/components/el';
import BaseForm from './BasicsMsg';
import DetailTable from './OrderDetails';
import { getActionButtons } from './config';
import { FormInstance } from 'antd/lib/form';
import { maths } from '@/utils';
import * as service from './service';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
// import { null } from 'mathjs';

interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  areaRef: any;
  resData: { [key: string]: any };
  nums: number,
  allamt: number,
  createUserId: any;

}
class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      nums: 0,
      allamt: 0,
      createUserId: null,
      baseFormRef: null,
      detailTableRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      areaRef: null,
      resData: {}
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
      // console.log(resData)
      this.setState({
        resData
      })
      if (data.orgAddrAddressVos && data.orgAddrAddressVos != null && data.orgAddrAddressVos[0]) {
        let formData = {
          storeId: data.storeId + '', // 后台返回id为数字  前端 只有字符串才可以根据id 显示name
          whId: data.whId, // 仓库 418717612026949632
          docType: data.docType, // 销售 docTypeName
          payMethod: data.payMethod, // 付款方式
          custCode: {
            custCode: data.custCode,
            custName: data.custName,
            addrNo: data.recvAddrNo, // 地址号
            id: data.custId,
          },
          contPerson: data.orgAddrAddressVos[0].contPerson, // 联系人
          tel: data.orgAddrAddressVos[0].tel, // 联系电话
          detailAddr: data.orgAddrAddressVos[0].detailAddr, // 送货地址
          docTime: data.docTime, // 日期
          remark: data.remark, // 备注
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
          uom: {
            udcVal: item?.uom,
            valDesc: item?.uomName
          },
          ohQty: item?.invQty || 0
        }));
        this.setState({
          nums: data.qty,
          allamt: data.amt,
          createUserId: data.createUserId,
          formData,
          tableData,
        });
        // console.log('成功')
      } else {
        let formData = {
          storeId: data.storeId + '', // 后台返回id为数字  前端 只有字符串才可以根据id 显示name
          whId: data.whId,
          docType: data.docType, // 销售类型 docTypeName
          payMethod: data.payMethod, // 付款方式
          custCode: {
            custCode: data.custCode,
            custName: data.custName,
            addrNo: data.recvAddrNo, // 地址号
            id: data.custId,
          },
          contPerson: '', // 联系人
          tel: '', // 联系电话
          detailAddr: '', // 送货地址
          docTime: data.docTime, // 日期
          remark: data.remark, // 备注
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
          uom: {
            udcVal: item?.uom,
            valDesc: item?.uomName
          },
          ohQty: item?.invQty || 0
        }));
        this.setState({
          nums: data.qty,
          allamt: data.amt,
          createUserId: data.createUserId,
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

  // 改变
  setnums = (data, records, qtys, amts) => {
    const newdata = data.map((item) => {
      if (item.id == records.id) {
        return {
          ...item,
          qty: qtys,
          amt: amts
        }
      } else {
        return {
          ...item
        }
      }
    })
    const { qty } = this.sum(newdata)
    const { amt } = this.sum(newdata)
    this.setState({
      nums: qty,
      allamt: amt
    })
  }

  // 删除
  delnums = (data) => {
    const { qty } = this.sum(data)
    const { amt } = this.sum(data)
    this.setState({
      nums: qty,
      allamt: amt
    })
  }

  //保存
  handleSave = async () => {
    // console.log('保存');
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields(); // 基本数据
    const detailTableValues = await this.state.detailTableRef.validateTableRows(); // 订单信息
    let salSoDCreateParamList = detailTableValues.data?.map((item) => {
      //要考虑明细信息是否有数据
      return {
        ...item,
        itemId: item.itemId?.id,
        itemName: item.itemId?.itemName,
        itemCode: item.itemId?.itemCode,
        uom: item.uom?.udcVal,
        itemType: item.itemId?.itemType,
        itemType2: item.itemId?.itemType2,
      };
    });
    // console.log(salSoDCreateParamList, '详设')
    const { id, docNo } = this.state.resData
    // 在这里处理数据
    // console.log(baseFormValues, 'baseFormValuesbaseFormValues??????')
    let params = {
      ...baseFormValues, // 基础的form信息
      createUserId: this.state.createUserId,
      qty: this.state.nums, // 总数量
      amt: this.state.allamt, // 总金额
      storeId: baseFormValues.storeId * 1, // 后台接受数字格式
      whId: baseFormValues.whId,
      docTime: dayjs(baseFormValues.docTime).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // 注册日期
      custName: baseFormValues.custCode?.custName, // 二网客户
      contPerson: baseFormValues.contPerson, // 联系人
      tel: baseFormValues.tel, // 联系电话
      detailAddr: baseFormValues.detailAddr, // 送货地址
      salSoDCreateParamList,
      id,
      docNo,
      custId: baseFormValues.custCode?.id,
      recvAddrNo: baseFormValues.custCode?.addrNo, // 地址号
      // orgAddrDetailDTO: baseFormValues.custCode?.orgAddrDetailDTO
    };
    // console.log(params, '有了没有单号')
    this.setState({ pageLoading: true });
    const res = await service.saveEdit(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      this.multiTabStore.closeCurrentToPath('/salesCenter/saleorder/search');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };
  //提交
  handleSubmit = async () => {
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    let salSoDCreateParamList = detailTableValues.data?.map((item) => {
      // console.log(item,'item')
      //要考虑明细信息是否有数据 给后台的商品信息
      return {
        ...item,
        itemId: item.itemId?.id,
        itemName: item.itemId?.itemName,
        itemCode: item.itemId?.itemCode,
        uom: item.uom?.udcVal,
        itemType: item.itemId?.itemType,
        itemType2: item.itemId?.itemType2,
      };
    });
    // console.log(salSoDCreateParamList, '点击了商品明细', baseFormValues)
    const { id, docNo } = this.state.resData
    // 在这里处理数据
    let params = {
      ...baseFormValues, // 基础的form信息
      createUserId: this.state.createUserId,
      qty: this.state.nums, // 总数量
      amt: this.state.allamt, // 总金额
      storeId: baseFormValues.storeId * 1, // 后台接受数字格式
      whId: baseFormValues.whId,
      docTime: dayjs(baseFormValues.docTime).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // 日期
      custName: baseFormValues.custCode?.custName, // 二网客户
      contPerson: baseFormValues.contPerson, // 联系人
      tel: baseFormValues.tel, // 联系电话
      detailAddr: baseFormValues.detailAddr, // 送货地址
      salSoDCreateParamList,
      id,
      docNo,
      custId: baseFormValues.custCode?.id,
      recvAddrNo: baseFormValues.custCode?.addrNo, // 地址号
      // orgAddrDetailDTO: baseFormValues.custCode?.orgAddrDetailDTO

    };
    // console.log(params, 'whSalePrice 保存传参')
    this.setState({ pageLoading: true });
    const res = await service.submit(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      // this.multiTabStore.closeCurrentToPath('/salesCenter/saleorder/search');
      this.multiTabStore.closeCurrentToPath(`/inventory/inventoryout/item/C/${res.data}`);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  }

  onBack = () => {
    // console.log('返回');
    this.props.push('/salesCenter/saleorder/search');
  };

  // 设置删除的标记
  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };
  // 获取基础数据
  getBaseFormRef = (ref) => {
    // console.log(ref, '获取基本信息的ref');
    this.setState({
      baseFormRef: ref
    });
  };

  // 获取订单明细的ref
  getDetailTableRef = (ref) => {
    // console.log(ref, '获取订单明细的ref');
    this.setState({
      detailTableRef: ref
    });
  };
  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons(this.handleSave, this.handleSubmit)}
          onBack={this.onBack}
          position='top'
        />
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
            setnums={this.setnums}
            delnums={this.delnums}
            tableData={this.state.tableData}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
