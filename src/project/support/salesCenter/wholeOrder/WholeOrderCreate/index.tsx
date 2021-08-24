//销售 新的批发单创建
import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BasicsMsg';
import DetailTable from './OrderDetails';
import { getActionButtons } from './config';
import { FormInstance } from 'antd/lib/form';
import { asserts, maths } from '@/utils';
import * as service from './service';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  areaRef: any;
  // flag: Boolean;
  totalPrice: Number,
  totalNum: Number,
  nums: number,
  allamt: number,
  outSubmit: boolean
}
class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      nums: 0,
      allamt: 0,
      baseFormRef: null,  //基本信息组件的ref
      detailTableRef: null, //订单明细组件的ref
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      areaRef: null,
      totalPrice: 0,
      totalNum: 0,
      outSubmit: true
    };
  }

  componentDidMount() {
    this.getWareHouse();
  }

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
          docType: 'C',
          docTime: new Date().toString(),
          storeId: buIdList[0] && buIdList[0].id,
          whId: param[0] && param[0].value
        }
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
    this.setState({
      nums: qty,
      allamt: amt
    })
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

  // 计算总价格和总数量
  handleComputed = (data) => {
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
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    let salSoDCreateParamList = detailTableValues.data?.map((item) => {
      //要考虑明细信息是否有数据 给后台的商品信息
      return {
        ...item,
        itemId: item.itemId?.id,
        itemName: item.itemId?.itemName,
        itemCode: item.itemId?.itemCode,
        uom: item.itemId?.uom,
        itemType: item.itemId?.itemType,
        itemType2: item.itemId?.itemType2,
      };
    });
    // console.log(salSoDCreateParamList, '点击了商品明细')
    // 在这里处理数据
    let params = {
      ...baseFormValues, // 基础的form信息
      createUserId: store.principal['id'],
      qty: this.state.nums, // 总数量
      amt: this.state.allamt, // 总金额
      storeId: baseFormValues.storeId * 1, // 后台接受数字格式
      whId: baseFormValues.whId,
      docTime: dayjs(baseFormValues.docTime).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // 日期
      recvAddrNo: baseFormValues.custCode?.addrNo, // 地址号
      custId: baseFormValues.custCode?.id,
      custName: baseFormValues.custCode?.custName, // 二网客户
      salSoDCreateParamList
    };
    // console.log(params, 'whSalePrice 保存传参')

    this.setState({ pageLoading: true });
    const res = await service.save(params);
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
    // this.setState({flag: !this.state.flag})
  };
  //提交
  handleSubmit = async () => {
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    // console.log('表单校验通过', baseFormValues);
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log('34342424', detailTableValues);

    if (detailTableValues.data.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '明细信息不能为空！'
      });
    }
    let isNull = false;
    detailTableValues.data.forEach(item => {
      if (!asserts.isExist(item.price)) {
        isNull = true;
      }
    });

    if (isNull) {
      return ElNotification({
        type: 'warning',
        message: '请检查明细中单价是否必填！'
      });
    }

    // 销售数量不能为0
    if (detailTableValues.data.some(item => item.qty === 0)) {
      ElNotification({
        type: 'warning',
        message: '明细信息中销售数量不能为0，请修改！'
      });
      return;
    }

    let salSoDCreateParamList = detailTableValues.data?.map((item) => {
      // console.log(item,'item')
      //要考虑明细信息是否有数据 给后台的商品信息
      return {
        ...item,
        itemId: item.itemId?.id || item.itemId?.itemId,
        itemName: item.itemId?.itemName,
        itemCode: item.itemId?.itemCode,
        uom: item.uom?.udcVal,
      };
    });
    // console.log(salSoDCreateParamList, '点击了商品明细')
    // 在这里处理数据
    let params = {
      ...baseFormValues, // 基础的form信息
      createUserId: store.principal['id'],
      qty: this.state.nums, // 总数量
      amt: this.state.allamt, // 总金额
      storeId: baseFormValues.storeId * 1, // 后台接受数字格式
      whId: baseFormValues.whId, // 后台接受数字格式
      docTime: dayjs(baseFormValues.docTime).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // 日期
      recvAddrNo: baseFormValues.custCode?.addrNo, // 地址号
      custId: baseFormValues.custCode?.id,
      custName: baseFormValues.custCode?.custName, // 二网客户
      salSoDCreateParamList
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
      this.multiTabStore.closeCurrentToPath('/salesCenter/saleorder/search');
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

  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    })
  }

  handleOutSubmit = (flag) => {
    this.setState({
      outSubmit: flag
    })
  }

  // 提交并出库
  handleSubmitAndOut = async () => {
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    // console.log('表单校验通过', baseFormValues);
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log('可编辑表格校验通过', detailTableValues);

    if (detailTableValues.data.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '明细信息不能为空！'
      });
    }
    let isNull = false;
    detailTableValues.data.forEach(item => {
      if (!asserts.isExist(item.price)) {
        isNull = true;
      }
    });

    if (isNull) {
      return ElNotification({
        type: 'warning',
        message: '请检查明细中单价是否必填！'
      });
    }

    // 销售数量不能为0
    if (detailTableValues.data.some(item => item.qty === 0)) {
      ElNotification({
        type: 'warning',
        message: '明细信息中销售数量不能为0，请修改！'
      });
      return;
    }


    let salSoDCreateParamList = detailTableValues.data?.map((item) => {
      // console.log(item,'item')
      //要考虑明细信息是否有数据 给后台的商品信息
      return {
        ...item,
        itemId: item.itemId?.id || item.itemId?.itemId,
        itemName: item.itemId?.itemName,
        itemCode: item.itemId?.itemCode,
        uom: item.uom?.udcVal,
      };
    });
    // console.log(salSoDCreateParamList, '点击了商品明细')
    // 在这里处理数据
    let params = {
      ...baseFormValues, // 基础的form信息
      createUserId: store.principal['id'],
      qty: this.state.nums, // 总数量
      amt: this.state.allamt, // 总金额
      storeId: baseFormValues.storeId * 1, // 后台接受数字格式
      whId: baseFormValues.whId, // 后台接受数字格式
      docTime: dayjs(baseFormValues.docTime).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // 日期
      recvAddrNo: baseFormValues.custCode?.addrNo, // 地址号
      custId: baseFormValues.custCode?.id,
      custName: baseFormValues.custCode?.custName, // 二网客户
      salSoDCreateParamList,
      outFlag: 'submit'
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
      this.multiTabStore.closeCurrentToPath('/salesCenter/saleorder/search');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  }

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons(this.handleSave, this.handleSubmit, this.handleSubmitAndOut, this.state.outSubmit)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            handleLoading={this.handleLoading}
            formRef={this.state.baseFormRef} // data里的
            editTableRef={this.state.detailTableRef}
            onRef={this.getBaseFormRef} //  ref 的操作
            formData={this.state.formData} // 数据
            handleComputed={this.handleComputed}
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
            setnums={this.setnums}
            delnums={this.delnums}
            totalPrice={this.state.totalPrice}
            totalNum={this.state.totalNum}
            computedSum={this.sum}
            handleLoading={this.handleLoading}
            handleOutSubmit={this.handleOutSubmit}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
