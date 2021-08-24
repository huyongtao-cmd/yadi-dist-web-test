//零售订单 -- 创建 和 编辑
import React, { Component } from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import MultiTabMobx from '@/store/multiTab';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import { asserts, maths } from '@/utils';
import { isNil, isEmpty, omit } from 'ramda';
import app from '@/utils/appCommon';
import { Statistic } from '@/components/el/ItemComponent';
import store from '@/store';


// 公共组件 --- start
import {
  ElCard,
  ElPage,
  ElRowContainer,
  ElForm,
  ElNotification,
  ELImportExcel
} from '@/components/el';
//公共组件 --- end

//图标 --- start
import { ImportWhite, SaveWhite, SubmitWhite } from '@/components/el/ElIcon';
//图标 --- end

// 零售单显示5个组件
import BaseForm from './BaseForm';
import CustomerForm from './CustomerForm';
import OrderTable from './OrderTable';
import OldCarTable from './OldCarTable';
import ImgInfo from './ImgInfo';
const getFormItems = (onPressEnter): Array<ElFormItemProps> => [
  {
    title: '',
    name: 'doc',
    span: 16,
    formOption: {
      // type: '$input',
      // props: { placeholder: '请输入' }
    }
  },
  {
    title: '条码录入',
    name: 'docNo',
    span: 6,
    formOption: {
      type: '$input',
      props: {
        placeholder: '请输入',
        onPressEnter
      }
    }
  },
  {
    title: '',
    name: 'flag',
    span: 2,
    formOption: {
      type: '$checkbox',
      props: {
        options: [
          { label: '冲销', value: true }
        ]
      }
    }
  }
];

class InvForm extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  onPressEnter = async (e) => {
    this.props.editTableRef.quitEditState();
    // 验证
    const baseInfo = await this.props.baseFormRef
      .validateFields(['storeId', 'whId', 'docType'])
      .catch((cb) => {
        const { storeId, whId, docType } = cb.values;
        console.log('aaaaaaa', storeId, 'bbbbb', whId, 'ccccccc', docType);
        let flag1 = isNil(storeId) || isEmpty(storeId) ? '【门店】' : '';
        let flag2 = isNil(whId) || isEmpty(whId) ? '【仓库】' : '';
        let flag3 = isNil(docType) || isEmpty(docType) ? '【销售类型】' : '';
        ElNotification({
          type: 'warning',
          message: `请选择基础信息` + flag1 + flag2 + flag3
        });
        return Promise.reject();
      });
    const invFormValues = this.props.invFormRef?.getFieldsValue();
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    console.log(baseInfo, 'ppppp')
    let paramInfo = {
      buId: baseInfo.storeId,
      whId: baseInfo.whId,
      // storeIds,
      serialNo: e.target.value
    }
    this.props.handleLoading(true);
    const res = await service.findSerialNoOnesSalOut(paramInfo);
    // const res = await service.findSerialNoOnes(e.target.value);
    this.props.handleLoading(false);
    this.props.invFormRef.setFieldsValue({
      docNo: ''
    })
    const tableData = await this.props.editTableRef.validateTableRows();

    const itemIdList = tableData.data?.map((item) => item.itemId);
    const newData = tableData.data?.filter(
      (item) => item.itemName?.id === res.data?.itemId
    );

    if (res.success) {
      if (res.data?.itemType === 'ALL') {
        //商品为整车
        console.log(invFormValues, 'invFormValuesinvFormValues');
        if (invFormValues.flag && invFormValues.flag[0] === true) {
          //勾选冲销
          console.log(tableData, '勾选冲销');
          if (newData.length === 0) {
            //没有商品明细
            ElNotification({
              type: 'warning',
              message: '没有对应的商品明细，请检查！'
            });
          } else {
            if (!newData[0].serialNoList.includes(res.data?.serialNo)) {
              //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '没有找到对应商品，请检查！'
              });
              return;
            }
            if (newData[0].qty === 1) {
              this.props.editTableRef.removeRowByKey(newData[0].id, 'rowKey');
              const data = this.props.editTableRef.getRows();
              if (data.length == 0) {
                this.props.setFlags(false)
              }
              this.props.setendnums(data);
            } else {
              const serialNoList = newData[0].serialNoList?.filter(
                (item) => item !== res.data?.serialNo
              );
              this.props.editTableRef.updateRows(
                {
                  qty: newData[0].qty - 1,
                  amt: maths.rounds(
                    maths.mul(newData[0].price, + newData[0].qty - 1 || 0),
                    2
                  ),
                  // amt: maths.rounds(maths.mul(newData[0].price, + qty || 0), 2); // 数量*金额
                  discRatio: 100,
                  discAmt: 0,
                  serialNoList: serialNoList
                },
                [newData[0].id]
              );
            }
          }
        } else {
          //不勾选冲销
          console.log(newData, 'newData', tableData, res.data);
          if (newData.length === 0) {
            //扫码为整车且不存在明细时
            // const whId = res.data?.whId;
            // const itemId = res.data?.itemId;
            // this.props.handleLoading(true);
            // const qtyres = await service.findPage({ whId, itemId });
            // this.props.handleLoading(false);
            // if (qtyres.success == false) {
            //   ElNotification({
            //     type: 'error',
            //     message: res.message || res.msg || '操作失败！'
            //   });
            //   return;
            // } else {
            // console.log(qtyres, 'res.datares.datares.datares.datares.data');
            await this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName,
              },
              qty: 1,
              discRatio: 100,
              discAmt: 0,
              price: res.data?.retailPrice,
              // ohQty: qtyres.data?.records[0]?.ohQty || 0,
              ohQty: res.data.ohQty || 0,
              amt: maths.rounds(maths.mul(res.data?.retailPrice, 1 || 0), 2),
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              brand: res.data?.brand,
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              },
              serialNoList: [res.data?.serialNo]
            });
            this.props.setFlags(true)
            const data = this.props.editTableRef.getRows();
            this.props.setendnums(data);
            console.log(this.props.editTableRef.getRows(), 'tableDatatableData0000')
            // }
          } else {
            //扫码为整车已存在明细
            console.log(newData[0].serialNoList, 'newData[0].serialNoList')
            if (newData[0].serialNoList.includes(res.data?.serialNo)) {
              //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '该商品已经扫码，请检查！'
              });
              return;
            }
            if (newData[0].qty === 1) {
              //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '零售单只可以销售一件！'
              });
              return;
            }
            console.log(this.props.editTableRef, 'this.props.editTableRef');
            this.props.editTableRef.updateRows(
              {
                qty: newData[0].qty + 1,
                amt: maths.rounds(
                  maths.mul(newData[0].price, +newData[0].qty + 1 || 0),
                  2
                ),
                discRatio: 100,
                discAmt: 0,
                serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
              },
              [newData[0].id]
            );
            const data = this.props.editTableRef.getRows();
            this.props.setendnums(data);
            console.log(tableData, '不勾选冲销', newData[0].id);
          }
        }
      } else {
        console.log('配件'); //商品为配件
        if (invFormValues.flag && invFormValues.flag[0] === true) {
          //勾选冲销
          ElNotification({
            type: 'warning',
            message: '冲销只针对于整车商品，请检查！'
          });
          console.log(tableData, '勾选冲销');
        } else {
          //不勾选冲销
          console.log(tableData, '不勾选冲销');
          if (newData.length === 0) {
            //扫码为配件且不存在明细时
            console.log(
              '扫码为配件且不存在明细时扫码为配件且不存在明细时扫码为配件且不存在明细时'
            );
            this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName,
              },
              price: res.data?.retailPrice,
              qty: 1,
              discRatio: 100,
              discAmt: 0,
              amt: maths.rounds(maths.mul(res.data?.retailPrice, 1), 2),
              remark: res.data?.remark,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              brand: res.data?.brand,
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              }
            });
            this.props.setFlags(true);
            const data = this.props.editTableRef.getRows();
            this.props.setendnums(data);
          } else {
            this.props.editTableRef.updateRows(
              {
                qty: newData[0].qty + 1,
                amt: maths.rounds(
                  maths.mul(newData[0].price, +newData[0].qty + 1 || 0),
                  2
                ),
                discRatio: 100,
                discAmt: 0,
              },
              [newData[0].id]
            );
            const data = this.props.editTableRef.getRows();
            this.props.setendnums(data);
          }
        }
      }
    } else {
      this.props.handleLoading(false);
      app.ShowMsg(res)
      // ElNotification({
      //   type: 'warning',
      //   message: res.data || '调用失败'
      // });
    }
  };

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.onPressEnter)
        }}
      />
    );
  }
}

export default class RetailOrder extends Component<any, any> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      nums: 0,
      allamt: 0,
      flags: false,
      baseFormRef: null, //基本信息组件的ref
      customerFormRef: null, //顾客信息的ref
      orderTableRef: null, //订单明细组件的ref
      oldCarTableRef: null, //旧车信息的ref
      imgInfoRef: null, // 图片信息的ref
      invFormRef: null, //条码录入的ref
      pageLoading: false, //加载状态
      deleteFlags: [],
      docType: 'A', //业务类型,A代表正常零售，B代表依旧换新，默认A
      baseFormRefValue: {},
      customerFormRefValue: {},
      orderTableRefValue: [],
      oldCarTableRefValue: [],
      imgInfoRefValue: [],
      docNo: '',
      id: '',
      custId: '',
      areaRef: null,
      cardisTrue: false,
      empList: [],
      buListt: [],
      importModalSpecialRef: null
    };
  }

  async componentDidMount() {
    this.getWareHouse();
    // 判断是否有id，如果有，说明是编辑
    console.log('this.props.match.params.id', this.props.match.params.id);
    if (!this.props.match.params.id) {
      return;
    }
    this.setState({ pageLoading: true });
    const res = await service.findIdOne(this.props.match.params.id);
    this.setState({ pageLoading: false });
    const { data } = res;
    // 基本信息回显
    let baseFormRefValue = {
      storeId: data.storeId,
      whId: data.whId,
      docType: data.docType,
      payMethod: data.payMethod,
      docTime: data.docTime,
      remark: data.remark,
      es1: data.es1,
      custId: data.crmCustVO?.id,
      custName: data.crmCustVO?.custName
    };
    // 顾客信息回显
    let customerFormRefValue = {
      ...data.crmCustVO,
      // custName: {
      //   // custId: data.crmCustVO?.custId,
      //   id: data.crmCustVO?.id,
      //   custName: data.crmCustVO?.custName
      // }
    };

    // 订单明细回显
    let orderTableRefValue = data.salSoDVOList.map((item) => {
      console.log(item, 'item');
      return {
        ...item,
        ohQty: item.invQty,
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        brand: item.brand,
        itemName: {
          id: item.itemId,
          brand: item.brand,
          brandName: item.brandName,
          // itemId: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode,
          itemType: item.itemType
        },
        // serialNoList: '', // 取es2  后台命名es2  对应前端serialNoList名字
      };
    });

    // 旧车信息回显
    // let oldCarTableRefValue = data.oldCarSalSoDVOList;
    let oldCarTableRefValue = data.oldCarSalSoDVOList.map((item) => {
      return {
        ...item,
        qty: 0,
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
      }
    })
    // 图片信息回显
    let imgInfoRefValue = data.salImagesInfoVOS;
    console.log(customerFormRefValue, 'imgInfoRefValue');

    this.setState({
      baseFormRefValue,
      customerFormRefValue,
      orderTableRefValue,
      oldCarTableRefValue,
      imgInfoRefValue,
      docType: data.docType,
      id: data.id,
      docNo: data.docNo,
      custId: data.crmCustVO?.custId,
      allamt: data.amt,
      nums: data.qty
    });
  }

  getWareHouse = async () => {
    console.log(sessionStorage.getItem('principalObj'))
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      buId: buIdList[0] && buIdList[0].id,
      storeIds,
      empBuId: buIdList[0] && buIdList[0].buId,
    }
    this.setState({ pageLoading: true })
    const buRes = await service.getBuList({
      current: 1,
      size: 999999,
      // storeType: "A"
    });
    if (buRes.success) {
      this.setState({
        buList: buRes.data.records
      })
    }
    const res = await service.findOneInv(data);
    const empRes = await service.getEmpList({ ...omit(['buId'], data) });
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
      console.log(store.principal, 'reorerieorioeir')
      this.setState({
        baseFormRefValue: {
          docTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          // es3: {
          //   createUserId: store.principal['id'],
          //   firstName: store.principal['firstName']
          // },
          // recvDate: new Date().toString(),
          docType: 'A',
          storeId: buIdList[0] && buIdList[0].id,
          whId: param[0] && param[0].value
        }
      });
    }
    if (empRes.success) {
      let es3List = empRes.data.records.filter(item => item.userName === store.principal['username']);
      let list = [];
      if (empRes.data.records.length > 0) {
        list = empRes.data.records?.map((item) => {
          return {
            value: item.userName,
            label: item.empName
            //  ...item
          }
        }).filter(Boolean);
      }
      this.setState({
        empList: list,
      });
      this.state.baseFormRef.setFieldsValue({
        es3: es3List.length > 0 ? es3List[0].userName : list.length > 0 ? list[0].value : ''
      });
    }
  }


  //table 数值相加 计算金额
  sum = (data) => {
    const amt = data.reduce((total, current) => {
      return maths.add(total, current.amt || 0);
    }, 0)
    const qty = data.reduce((total, current) => {
      return maths.add(total, current.qty || 0);
    }, 0)
    return {
      amt,
      qty
    };
  }

  // 旧车计算金额
  sum2 = (data) => {
    const amt = data.reduce((total, current) => {
      return maths.add(total, current.amt || 0);
    }, 0)
    return {
      amt
    };
  }

  // table 输入计算金额
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
    const { qty, amt } = this.sum(newdata)
    if (this.state.docType == 'B') {
      this.state.oldCarTableRef.quitEditState();
      const oldCarTableRefs = this.state.oldCarTableRef.getRows();
      console.log(oldCarTableRefs, 'oldCarTableRefs')
      const newoldCarTableRefs = oldCarTableRefs.map((item) => {
        return {
          ...item,
          amt: item.price * item.qty
        }
      })
      // 旧车总金额
      const oldamt = this.sum2(newoldCarTableRefs).amt;
      // 新车 - 旧车抵扣  =  最后金额
      const newamt = maths.rounds(maths.sub(amt, + oldamt || 0), 2);
      this.setState({
        nums: qty,
        allamt: newamt
      })
    } else {
      this.setState({
        nums: qty,
        allamt: amt
      })
    }
  }

  // table 车架号回车录入 计算金额
  setendnums = (data) => {
    const { qty, amt } = this.sum(data);
    if (this.state.docType == 'B') {
      this.state.oldCarTableRef.quitEditState();
      const oldCarTableRefs = this.state.oldCarTableRef.getRows();
      const newoldCarTableRefs = oldCarTableRefs.map((item) => {
        return {
          ...item,
          amt: item.price * item.qty
        }
      })
      // 旧车总金额
      const oldamt = this.sum2(newoldCarTableRefs).amt;
      // 新车 - 旧车抵扣  =  最后金额
      const newamt = maths.rounds(maths.sub(amt, + oldamt || 0), 2);
      this.setState({
        nums: qty,
        allamt: newamt
      })
    } else {
      this.setState({
        nums: qty,
        allamt: amt
      })
    }
  }

  // 旧车更改
  setnums2 = async (data, records, qtys, prices, amts) => {
    console.log(data, records, qtys, prices, '222222222222222')
    const newdata = data.map((item) => {
      if (item.id == records.id) {
        return {
          ...item,
          amt: amts
        }
      } else {
        return {
          ...item,
          amt: item.price * item.qty
        }
      }
    })
    const { amt } = this.sum2(newdata)
    await this.state.orderTableRef.quitEditState();
    const orderTableRefs = this.state.orderTableRef.getRows();
    const neworderTableRefs = orderTableRefs.map((item) => {
      return {
        ...item,
      }
    })
    // 旧车总金额
    const qty = this.sum(neworderTableRefs).qty;
    const tabamt = this.sum(neworderTableRefs).amt;
    console.log(amt, 'amt', qty, 'qty', tabamt, 'tabamt')
    // 新车 - 旧车抵扣  =  最后金额
    const newamt = maths.rounds(maths.sub(tabamt, + amt || 0), 2);
    this.setState({
      nums: qty,
      allamt: newamt
    })
  }

  // 更改销售类型时 改变总金额 总数量
  setendnums2 = (n) => {
    let qty = 0;
    let amt = 0;
    if (n) {
      // this.state.orderTableRef.quitEditState();
      const orderTableRefs = this.state.orderTableRef.getRows(); // table
      if (orderTableRefs.length > 0) {
        const newdata = orderTableRefs.map((item) => {
          return {
            ...item
          }
        })
        qty = this.sum(newdata).qty
        amt = this.sum(newdata).amt
      } else {
        qty = 0;
        amt = 0;
      }
      this.state.oldCarTableRef.quitEditState();
      const oldCarTableRefs = this.state.oldCarTableRef.getRows();
      console.log(oldCarTableRefs, 'oldCarTableRefs')
      const newoldCarTableRefs = oldCarTableRefs.map((item) => {
        return {
          ...item,
          amt: item.price * item.qty
        }
      })
      // 旧车总金额
      const oldamt = this.sum2(newoldCarTableRefs).amt;
      // 新车 - 旧车抵扣  =  最后金额
      const newamt = maths.rounds(maths.sub(amt, + oldamt || 0), 2);
      this.setState({
        nums: qty,
        allamt: newamt
      })
    } else {
      // this.state.orderTableRef.quitEditState();
      const orderTableRefs = this.state.orderTableRef.getRows(); // table
      // console.log()
      if (orderTableRefs.length > 0) {
        const newdata = orderTableRefs.map((item) => {
          return {
            ...item
          }
        })
        qty = this.sum(newdata).qty
        amt = this.sum(newdata).amt
      } else {
        qty = 0;
        amt = 0;
      }
      this.setState({
        nums: qty,
        allamt: amt
      })
    }
  }

  // 验证身份证号是否正确
  handleCardisTrue = (flag) => {
    this.setState({
      cardIsTrue: flag
    })
  }

  save = () => {
    console.log('保存');
    this.actionOption('/yd-sale/salSo/createRetail', 'save');
  };
  // 头部销售出库按钮
  checkOut = () => {
    console.log('销售出库');
    this.actionOption('/yd-sale/salSo/saleRetail', 'checkOut');
  };
  // 头部按钮操作
  actionOption = async (url, type) => {
    const {
      baseFormRef,
      customerFormRef,
      orderTableRef,
      oldCarTableRef,
      imgInfoRef,
      docType,
      customerFormRefValue,
      nums,
      allamt
    } = this.state;
    // console.log(docType)
    if (docType == 'B') {
      await oldCarTableRef.quitEditState();
    }
    await orderTableRef.quitEditState(); //退出可编辑状态
    const baseInfoValues = await baseFormRef.validateFields();
    const customerValues = await customerFormRef.validateFields();
    const orderTableValues = await orderTableRef.validateTableRows();
    const oldCarTableValues = await oldCarTableRef?.validateTableRows(); //正常零售时是没有旧车信息的
    const imgInfoValues = await imgInfoRef.validateTableRows();
    console.log(customerValues, customerFormRefValue, 'orderTableValuescustomerValuescustomerValues');

    if (orderTableValues.data.some(item => item.price === 0)) {
      ElNotification({
        type: 'warning',
        message: '明细中商品价格不能为0，请修改！'
      });
      return;
    }

    // 传参前的处理 --- start
    // 基本信息处理
    let baseInfo = {
      ...baseInfoValues,
      createUserId: store.principal['id'],
      // custId
      // custName: 
      id: this.state.id,
      docNo: this.state.docNo,
      whId: baseInfoValues.whId,
      // custName: customerValues?.custName,
      // custId: customerValues?.custName.id,
      // custId: customerValues?.id,
      qty: nums,
      amt: allamt < 0 ? 0 : allamt,
      // custName: customerValues.custName?.custName,
      // custId: customerValues.custName?.custId,
      docTime: dayjs(baseInfoValues.docTime).format('YYYY-MM-DD HH:mm:ss'), //处理时间
      es1: !asserts.isExist(baseInfoValues.es1) ? 'D' : baseInfoValues.es1
    };

    // 顾客信息处理
    let crmCustCreateParam = {};
    let isValueExist = false;
    for (let key in customerValues) {
      if (asserts.isExist(customerValues[key])) {
        isValueExist = true;
      }
    }
    if (isValueExist) {
      if (customerValues?.vipBirthDate) {
        crmCustCreateParam = {
          ...customerValues,
          vipBirthDate: dayjs(customerValues.vipBirthDate).format('YYYY-MM-DD'),
          storeId: baseInfoValues.storeId
        };
      } else {
        crmCustCreateParam = {
          ...customerValues,
          storeId: baseInfoValues.storeId
        };
      }
    }



    // 订单明细处理
    let salSoDCreateParamList = orderTableValues?.data.map((item) => {
      console.log(item, item.itemName, 'item1');
      return {
        ...item,
        itemId: Object.keys(item).includes('itemId') ? item.itemId : item.itemName?.itemId,
        itemName: item.itemName?.itemName,
        uom: item.uom?.udcVal,
        itemCode: item.itemName?.itemCode,
        itemType: item.itemType?.udcVal,
        serialNoList: item?.serialNoList
      };
    });
    let oldCarSalSoDCreateParamList = [];
    // 旧车信息
    if (docType == 'B') {
      oldCarSalSoDCreateParamList = oldCarTableValues?.data.map((item) => {
        console.log(item, 'item2');
        return {
          ...item,
          itemId: item.itemName?.id,
          itemName: item.itemName?.itemName,
          itemCode: item.itemName?.itemCode,
          uom: item.uom?.udcVal
        };
      });
    } else {
      oldCarSalSoDCreateParamList = [];
    }

    // 图片信息
    let salImagesInfoCreateParam = imgInfoValues?.data;

    // 传参前的处理 --- end

    // 处理结果合并
    let params: any = {};
    if (isValueExist) {
      params = {
        ...baseInfo,
        crmCustCreateParam,
        salSoDCreateParamList,
        oldCarSalSoDCreateParamList,
        salImagesInfoCreateParam
      };
    } else {
      params = {
        ...baseInfo,
        salSoDCreateParamList,
        oldCarSalSoDCreateParamList,
        salImagesInfoCreateParam
      };
    }

    if (orderTableValues.data.length < 1) {
      return ElNotification({
        type: 'warning',
        message: '订单明细不可以为空'
      });
    }

    const qtyNum = params.salSoDCreateParamList?.filter((item) => item.ohQty == undefined || (item.ohQty - item.qty < 0 && item.qty > 1) || item.ohQty == 0 || item.qty < 1)
    const qtys = params.salSoDCreateParamList?.filter((item) => item.itemType == 'ALL' && item.qty > 1);

    // console.log(params.salSoDCreateParamList[0].itemType == 'ALL' && params.salSoDCreateParamList[0].qty > 1, 'ppp;;;;;;', qtys)

    if (qtys.length !== 0) {
      return ElNotification({
        type: 'warning',
        message: '零售订单只能录入一个车架号'
      });
    }
    if (qtyNum.length !== 0) {
      return ElNotification({
        type: 'warning',
        message: '订单明细的商品销售数量不可以为0且不能大于库存数'
      });
    }
    console.log(params, 'paramsparams0999998888')
    this.setState({ pageLoading: true });
    const res = await service.saveOrcheckout(url, params);
    this.setState({ pageLoading: false });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: res.message || res.msg || '操作成功！'
      });
      // type == 'save' || type == 'checkOut'
      // this.props.push('/salesCenter/saleorder/search');
      // this.multiTabStore.closeCurrentToPath('/salesCenter/saleorder/search');
      this.multiTabStore.closeCurrentToPath(`/salesCenter/partsRetailorder/detail/retailOrderCreate/${res.data}`);
      // : this.props.history.push('/inventory/inventoryout/item/D/' + res.data);
      // : this.props.history.push('/salesCenter/saleorder/search')
    } else {
      ElNotification({
        type: 'error',
        message: res.message || res.msg || '操作失败！'
      });
    }
  };

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
      // customerFormRefValue: ref
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
  // 获取条码录入的ref
  getInvFormRef = (ref) => {
    this.setState({
      invFormRef: ref
    });
  };
  setDeleteFlags = (params) => {
    // console.log(params, 'params11112222')
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };

  areaRef = (ref) => {
    this.setState({
      areaRef: ref
    });
  };

  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    });
  };

  // 切换顾客信息 或者 客户信息
  setdoctype = (data) => {
    // 接收到子组件穿过来的参数data  改变页面的值
    this.setState({
      docType: data
    });
  }

  // 顾客信息输入手机号 如果已经存在 则添加id 判断不可以增加新顾客
  setcustomerFormRefValue = (data) => {
    this.setState({
      customerFormRefValue: data
    });
  }

  // 基本信息的字段改变监听事件
  onValuesChange = async (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues, 'hello');
    // A代表正常零售，B代表以旧换新
    if (changedValues.docType) {
      if (changedValues.docType == "B") {
        await this.state.orderTableRef.quitEditState();
        this.setState({
          docType: 'B'
        });
        this.setendnums2(true);
      } else {
        this.setState({
          docType: changedValues.docType
        });
        await this.state.orderTableRef.quitEditState();
        this.setendnums2(false);
      }
    }

    if (changedValues.storeId) {
      // await this.state.orderTableRef.clearRows();
      // const orderTableRefs = this.state.orderTableRef.getRows();
      this.setState({
        pageLoading: true,
      });
      this.state.baseFormRef.setFieldsValue({
        whId: '',
        es3: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        storeIds,
        buId: changedValues.storeId,
      };
      const empBuId = this.state.buList.filter(item => item.id === changedValues.storeId);
      const res = await service.findOneInv(data);
      const empRes = await service.getEmpList({ ...omit(['buId'], data), empBuId: empBuId[0].buId });
      this.setState({
        pageLoading: false
      });
      if (res.success) {
        const param = res.data.records
          ?.map((item) => {
            if (item.whStatus === 'ACTIVE') {
              return {
                value: item.id,
                label: item.whName
              };
            }
          })
          .filter(Boolean);
        console.log(this.state, 'this.state.areaRef', param);
        this.state.areaRef.setList(param);
        this.state.baseFormRef.setFieldsValue({
          whId: param[0] && param[0].value
        });
      }
      if (empRes.success) {
        let es3List = empRes.data.records.filter(item => item.userName === store.principal['username']);
        let list = [];
        if (empRes.data.records.length > 0) {
          list = empRes.data.records?.map((item) => {
            return {
              value: item.userName,
              label: item.empName
              //  ...item
            }
          }).filter(Boolean);
        }
        this.setState({
          empList: list,
        });
        this.state.baseFormRef.setFieldsValue({
          es3: es3List.length > 0 ? es3List[0].userName : list.length > 0 ? list[0].value : ''
        });
      }
    }

  };
  // docType == B 显示旧车信息
  showOldCarTable = (docType) => {
    if (docType == 'B') {
      return (
        <ElCard title='旧件信息'>
          <OldCarTable
            orderTableRef={this.state.orderTableRef}
            baseFormRef={this.state.baseFormRef}
            docType={this.state.docType}
            onRef={this.getOldCarTableRef}
            setnums2={this.setnums2}
            setendnums2={this.setendnums2}
            oldCarTableRef={this.state.oldCarTableRef}
          ></OldCarTable>
        </ElCard>
      );
    }
    return null;
  };
  // 门店 仓库 是否可选
  setFlags = (flag) => {
    this.setState({
      flags: flag,
    });
  }

  // 批量导入
  batchImport = () => {
    const { importModalSpecialRef } = this.state;
    importModalSpecialRef.openModal();
  }

  modalSpecialRef = (importModalSpecialRef) => {
    this.setState({
      importModalSpecialRef
    });
  };

  _refreshData = () => {

  }

  importCallBack = async (res) => {
    app.ShowMsg(res);
    this._refreshData();
  }


  render() {
    const { orderTableRef, pageLoading, customerFormRef, docType } = this.state;
    return (
      <ElPage spinning={pageLoading}>
        <ElRowContainer
          position='top'
          blocks={[
            {
              key: 'save',
              text: '保存',
              icon: <SaveWhite />,
              location: 'left',
              handleClick: this.save,
              authCode: 'partRetailOrderCreateAdd'
            },
            {
              key: 'checkOut',
              text: '销售出库',
              icon: <SubmitWhite />,
              location: 'left',
              handleClick: this.checkOut
            },
            {
              key: 'batchImport',
              text: '批量导入',
              icon: <ImportWhite />,
              location: 'left',
              handleClick: this.batchImport
            }
          ]}
        />
        <ElCard title='基本信息'>
          <BaseForm
            flags={this.state.flags}
            areaRef={this.state.areaRef}
            whRef={this.areaRef}
            data={this.state.baseFormRefValue}
            onRef={this.getBaseFormRef}
            onValuesChange={this.onValuesChange}
            empList={this.state.empList}
          ></BaseForm>
        </ElCard>
        <ElCard title='顾客信息'>
          <CustomerForm
            data={this.state.customerFormRefValue}
            customerFormRef={customerFormRef}
            onRef={this.getCustomerForm}
            setcustomerFormRefValue={this.setcustomerFormRefValue} // 定义一个方法接收子组件传参
            handleLoading={this.handleLoading} // 定义一个方法接收子组件传参
            handleCardisTrue={this.handleCardisTrue}
          ></CustomerForm>
        </ElCard>
        <ElCard title='订单明细'>
          <InvForm
            handleLoading={this.handleLoading}
            onRef={this.getInvFormRef}
            setFlags={this.setFlags}
            setendnums={this.setendnums}
            invFormRef={this.state.invFormRef}
            editTableRef={orderTableRef}
            baseFormRef={this.state.baseFormRef}
          />
          <OrderTable
            nums={this.state.nums}
            allamt={this.state.allamt}
            handleLoading={this.handleLoading}
            data={this.state.orderTableRefValue}
            onRef={this.getOrderTableRef}
            orderTableRef={orderTableRef}
            setDeleteFlags={this.setDeleteFlags}
            setnums={this.setnums}
            setFlags={this.setFlags}
            setendnums={this.setendnums}
            baseFormRef={this.state.baseFormRef}
          // customerFormRef={this.state.customerFormRef}
          ></OrderTable>
        </ElCard>
        {this.showOldCarTable(docType)} {/*旧车信息根据销售状态决定是否显示*/}
        <ElCard title='图片信息'>
          <ImgInfo
            onRef={this.getImgInfoRef}
            data={this.state.imgInfoRefValue}
            imgTableRef={this.state.imgInfoRef}
          ></ImgInfo>
        </ElCard>
        <ELImportExcel
          downTemplateRequest='/yd-sale/salSo/downloadSaleRetailTemplate'
          downTemplateFileName='零售单导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-sale/salSo/saleRetailImport'
          successCallBak={this.importCallBack}
          onRef={this.modalSpecialRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
      </ElPage>
    );
  }
}
