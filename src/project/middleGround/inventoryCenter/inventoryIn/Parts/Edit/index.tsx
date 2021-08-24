import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard,
  ElForm
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import { getActionButtons } from './config';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import { asserts, maths } from '@/utils'
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
import { Modal } from 'antd';
import CheckCodeModal from '../../checkCodeModal';
import { clone, concat } from 'ramda';

interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  invFormRef: any;
  poId: any;
  type: any;
  showWarehousing: boolean;
  warehousingFlag: boolean;
  relateDoc2Id: any;
  relateDoc2No: any;
  relateDoc2Did: any;
  relateDoc2Cls: any;
  custId: any;
  poSource: any;
  relateDocNo: any;
  whList: any;
}

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

  componentDidMount() { }
  onPressEnter = async (e) => {
    this.props.editTableRef.quitEditState();
    const invFormValues = this.props.invFormRef.getFieldsValue();
    if (!e.target.value) {
      ElNotification({
        type: 'warning',
        message: '扫码信息有误，请检查！'
      });
      return;
    }
    this.props.handleLoading(true);
    // const res = await service.findSerialNoOnes(e.target.value);  //车架号老接口
    const res = await service.findSerialNoOnesin(e.target.value);   //车架号新接口入库
    this.props.handleLoading(false);
    this.props.invFormRef.setFieldsValue({
      docNo: ''
    })
    const tableData = await this.props.editTableRef.validateTableRows();
    const itemIdList = tableData.data?.map((item) => item.itemId);
    const newData = tableData.data?.filter((item) => item.itemName?.id === res.data?.itemId);
    if (res.success) {
      //是否有前置单据
      if (this.props.type === ':type') {
        console.log('无前置单据', this.props.type);
        if (res.data?.itemType === 'ALL') {  //商品为整车
          console.log(invFormValues, 'invFormValuesinvFormValues');
          if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
            console.log(tableData, '勾选冲销');
            if (newData.length === 0) {  //没有商品明细
              ElNotification({
                type: 'warning',
                message: '没有对应的商品明细，请检查！'
              });
            } else {
              if (!newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
                ElNotification({
                  type: 'warning',
                  message: '没有找到对应商品，请检查！'
                });
                return;
              }
              if (newData[0].qty === 1) {
                this.props.editTableRef.removeRowByKey(newData[0].id, 'rowKey')
              } else {
                const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo)
                this.props.editTableRef.updateRows({
                  qty: newData[0].qty - 1,
                  amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty - 1 || 0), 2),
                  serialNoList: serialNoList
                }, [newData[0].id])
              }
            }
          } else {  //不勾选冲销
            console.log(newData, 'newData', tableData, res.data);
            if (newData.length === 0) { //扫码为整车且不存在明细时
              this.props.editTableRef.addRow({
                ...res.data,
                id: maths.genFakeId(-1),
                itemName: {
                  id: res.data?.itemId,
                  itemName: res.data?.itemName,
                  itemCode: res.data?.itemCode,
                  brandName: res.data?.brandName
                },
                qty: 1,
                price: null,
                amt: null,
                itemType: {
                  udcVal: res.data?.itemType,
                  valDesc: res.data?.itemTypeName
                },
                dbrand: res.data?.brand,
                uom: {
                  udcVal: res.data?.uom,
                  valDesc: res.data?.uomName
                },
                serialNoList: [res.data?.serialNo]
              })
            } else {   //扫码为整车已存在明细
              if (newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
                ElNotification({
                  type: 'warning',
                  message: '该商品已经扫码，请检查！'
                });
                return;
              }
              console.log(this.props.editTableRef, 'this.props.editTableRef');
              this.props.editTableRef.updateRows({
                qty: newData[0].qty + 1,
                amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
                serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
              }, [newData[0].id])
              console.log(tableData, '不勾选冲销', newData);
            }
          }
        } else {
          console.log('配件');  //商品为配件
          if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
            ElNotification({
              type: 'warning',
              message: '冲销只针对于整车商品，请检查！'
            });
            console.log(tableData, '勾选冲销');
          } else {  //不勾选冲销
            console.log(tableData, '不勾选冲销');
            if (newData.length === 0) { //扫码为配件且不存在明细时
              console.log('扫码为配件且不存在明细时扫码为配件且不存在明细时扫码为配件且不存在明细时');
              this.props.editTableRef.addRow({
                ...res.data,
                id: maths.genFakeId(-1),
                itemName: {
                  id: res.data?.itemId,
                  itemName: res.data?.itemName,
                  itemCode: res.data?.itemCode,
                  brandName: res.data?.brandName
                },
                qty: 1,
                price: null,
                amt: null,
                itemType: {
                  udcVal: res.data?.itemType,
                  valDesc: res.data?.itemTypeName
                },
                dbrand: res.data?.brand,
                uom: {
                  udcVal: res.data?.uom,
                  valDesc: res.data?.uomName
                }
              })
            } else {
              this.props.editTableRef.updateRows({
                qty: newData[0].qty + 1,
                amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
                // serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
              }, [newData[0].id])
            }
          }
        }
      } else {
        console.log(this.props.type, '有前置单据');
        //判断商品是否存在于明细
        if (!itemIdList.includes(res.data?.itemId)) {
          console.log(itemIdList, res.data?.itemId);
          ElNotification({
            type: 'warning',
            message: '该商品不在本次入库范围内，请检查！'
          });
          return;
        }
        if (res.data?.itemType === 'ALL') {  //商品为整车
          console.log(invFormValues, 'invFormValuesinvFormValues');
          if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
            console.log(tableData, '勾选冲销');
            if (newData.length === 0) {  //没有商品明细
              ElNotification({
                type: 'warning',
                message: '没有对应的商品明细，请检查！'
              });
            } else {
              if (!newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
                ElNotification({
                  type: 'warning',
                  message: '没有找到对应商品，请检查！'
                });
                return;
              }
              if (newData[0].qty === 1) {
                // todo
                // this.props.editTableRef.removeRowByKey(newData[0].id,'rowKey')
                // const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo);
                const realSerialNoList = newData[0].realSerialNoList?.filter((item) => item !== res.data?.serialNo);
                this.props.editTableRef.updateRows({
                  qty: newData[0].qty - 1,
                  amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty - 1 || 0), 2),
                  // serialNoList: serialNoList
                  realSerialNoList: realSerialNoList
                }, [newData[0].id])
              } else {
                // const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo); 
                const realSerialNoList = newData[0].realSerialNoList?.filter((item) => item !== res.data?.serialNo);   // todo
                this.props.editTableRef.updateRows({
                  qty: newData[0].qty - 1,
                  amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty - 1 || 0), 2),
                  // serialNoList: serialNoList,
                  realSerialNoList: realSerialNoList
                }, [newData[0].id])
              }
            }
          } else {  //不勾选冲销
            console.log(newData, 'newData', tableData, res.data);
            //扫码数量大于采购单据数量-已入库数量  // todo
            if (newData[0].qty === maths.sub(newData[0].poQty || 0, newData[0].shippedQty || 0)) {
              ElNotification({
                type: 'warning',
                message: '入库数量超出订单数量，请检查！'
              });
              return;
            }
            if (newData[0].serialNoList.includes(res.data?.serialNo)) {
              //扫码车架号已在队列   初始车架号已存在并且已入库不能被扫码
              if (res.data.serialStatus === '1') {
                // 已入库不能扫码
                ElNotification({
                  type: 'warning',
                  message: '该商品已经扫码，请检查！'
                });
                return;
              } else {
                // 出库或者在途  可以扫
                let nos = clone(newData[0].realSerialNoList);
                const isExist = newData[0].realSerialNoList.some(item => item === res.data?.serialNo);
                if (!isExist) {
                  nos.push(res.data?.serialNo);
                  this.props.editTableRef.updateRows({
                    qty: newData[0].qty + 1,
                    amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
                    // serialNoList: [...newData[0].serialNoList, res.data?.serialNo],
                    realSerialNoList: nos  // todo 
                  }, [newData[0].id])
                } else {
                  // 存在  不能重复扫码
                  ElNotification({
                    type: 'warning',
                    message: '该商品已经扫码，请检查！'
                  });
                  return;
                }
              }
            } else {
              // 所输入车架号不在初始化车架号里  不可以扫
              console.log(newData[0], res.data, this.props.formData, this.props.poSource, 'pppppppppppppppppppppppp')
              if (this.props.type === 'purcOrder') {
                if (this.props.poSource === 'SAP') {
                  ElNotification({
                    type: 'warning',
                    message: `${this.props.type === 'returninquiry' ? '不在可退范围内' : '不在采购范围内'}`   // todo
                  });
                  return;
                } else {
                  // 没有原始车架号 随便录
                  let nos = clone(newData[0].realSerialNoList);
                  if (!newData[0].realSerialNoList.some(item => item === res.data?.serialNo)) {
                    // 过滤
                    nos.push(res.data?.serialNo)
                  }
                  this.props.editTableRef.updateRows({
                    qty: newData[0].qty + 1,
                    amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
                    // serialNoList: [...newData[0].serialNoList, res.data?.serialNo],
                    serialNoList: Array.from(new Set([...newData[0].serialNoList, ...nos])),
                    serialNoListName: [...newData[0].serialNoListName, '在途'],
                    realSerialNoList: nos  // todo 
                  }, [newData[0].id])
                }
              } else {
                if (!asserts.isExist(this.props.relateDocNo)) {
                  let nos = clone(newData[0].realSerialNoList);
                  const isExist = newData[0].realSerialNoList.some(item => item === res.data?.serialNo);
                  if (!isExist) {
                    nos.push(res.data?.serialNo);
                    this.props.editTableRef.updateRows({
                      qty: newData[0].qty + 1,
                      amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
                      serialNoList: Array.from(new Set([...newData[0].serialNoList, ...nos])),
                      serialNoListName: [...newData[0].serialNoListName, '在途'],
                      realSerialNoList: nos  // todo 
                    }, [newData[0].id])
                  }
                } else {
                  ElNotification({
                    type: 'warning',
                    message: `${this.props.type === 'returninquiry' ? '不在可退范围内' : '不在采购范围内'}`   // todo
                  });
                  return;
                }

              }
            }
          }
        } else {
          if (invFormValues.flag && invFormValues.flag[0] === true) {  //勾选冲销
            ElNotification({
              type: 'warning',
              message: '冲销只针对于整车商品，请检查！'
            });
          } else {
            //扫码数量大于采购单据数量-已入库数量  // todo
            if (newData[0].qty === maths.sub(newData[0].poQty || 0, newData[0].shippedQty || 0)) {
              ElNotification({
                type: 'warning',
                message: '入库数量超出订单数量，请检查！'
              });
              return;
            }
            this.props.editTableRef.updateRows({
              qty: newData[0].qty + 1,
              amt: maths.rounds(maths.mul(newData[0].price, +newData[0].qty + 1 || 0), 2),
              // serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
            }, [newData[0].id])
          }
        }
      }
    } else {
      ElNotification({
        type: 'warning',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <ElForm
          onRef={this.props.onRef}
          data={this.props.formData}
          formProps={{
            items: getFormItems(this.onPressEnter)
          }}
        />
        {/* <div style={{ textAlign: 'right', marginRight: 50 }}>总数量：0  总价格：0</div> */}
      </div>
    );
  }
}

class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      baseFormRef: null,
      detailTableRef: null,
      invFormRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      poId: null,
      type: this.props.match.params?.type,
      warehousingFlag: false,
      showWarehousing: true,
      relateDoc2Id: null,
      relateDoc2No: null,
      relateDoc2Did: null,
      relateDoc2Cls: null,
      custId: null,
      poSource: null,
      relateDocNo: null,
      whList: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.type === 'purcOrder') {
      this.getDetails(this.props.match.params.id, 'CG');
    } else if (this.props.match.params.type === 'returninquiry') {
      // this.getDetails3(this.props.match.params.id, 'PF');
      this.getDetails3(this.props.match.params.id, 'TH');
      // ElNotification({
      //   type: 'warning',
      //   message:
      //     '000000'
      // })
    }
    else {
      this.getWareHouse('create', '');
    }
  }

  getWareHouse = async (flag, buId) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      buId: flag === 'create' ? buIdList[0] && buIdList[0].id : buId,
      storeIds
    }
    this.setState({ pageLoading: true })
    const res = await service.findOneInv(data)
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
      this.setState({ pageLoading: false })
      if (flag === 'create') {
        this.setState({
          formData: {
            createUserId: {
              createUserId: store.principal['id'],
              firstName: store.principal['firstName']
            },
            recvDate: new Date().toString(),
            buId: buIdList[0] && buIdList[0].id,
            whId: param[0] && param[0].value
          }
        });
      } else if (flag === 'purcOrder') {
        this.setState({
          whList: param
        })
      }

    }
  }

  // 采购订单入库查询 进入
  getDetails = async (params, types) => {
    this.setState({ pageLoading: true });
    const res = await service.findPurcIdOne(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      this.getWareHouse('purcOrder', res.data?.buId)
      const formData = {
        ...res.data,
        poId: res.data?.id,
        docType: this.props.match.params.type === 'purcOrder' ? 'A' : null,
        suppId: {
          id: res.data?.suppId,
          suppName: res.data?.suppName
        },
        createUserId: {
          createUserId: store.principal['id'],
          firstName: store.principal['firstName']
        },
        recvDate: new Date().toString(),
      };
      let serialNoList = [];
      let serialNoListName = [];
      res.data.purPoDRespVOList?.map((item) => {
        const filterlist = item.invSerialList?.map((courseItem) => {
          // if (courseItem.serialStatus != '1') {
          return courseItem.serialNo
          // }
        })
        const filterlistname = item.invSerialList?.map((courseItem) => {
          // if (courseItem.serialStatus != '1') {
          return courseItem.serialStatusName
          // }
        })
        serialNoList.push(filterlist)
        serialNoListName.push(filterlistname)
      })
      const tableData = res.data.purPoDRespVOList?.map((item, index) => ({
        ...item,
        itemName: {
          id: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode
        },
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName,
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        qty: 0,
        poQty: item.qty,
        shippedQty: item.acceptQty || 0,    // 已入库数量
        // serialNoList: []
        serialNoList: serialNoList[index] || [],
        serialNoListName: serialNoListName[index] || [],
        realSerialNoList: []
      }));
      this.setState({
        formData,
        poSource: res.data?.poSource,
        tableData,
        poId: res.data?.id,
        showWarehousing: res.data.poSource === 'SAP' ? false : true,
        relateDoc2Cls: types,
        relateDoc2Id: res.data?.id,
        relateDoc2No: res.data?.docNo,
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  };

  // 批发退货查询 进入
  getDetails3 = async (params, types) => {
    const { formData } = this.state;
    this.setState({ pageLoading: true });
    const res = await service.findIdOneSalSo(params);
    console.log(res.data.purPoDRespVOList, '000000000000000000000')
    this.setState({ pageLoading: false });
    if (res.success) {
      const formData = {
        ...res.data,
        poId: res.data?.id,
        buId: res.data?.storeId,
        docType: this.props.match.params.type === 'returninquiry' ? (res.data?.docType === 'D' ? 'J' : 'H') : null,
        suppId: {
          id: res.data?.suppId,
          suppName: res.data?.suppName
        },
        createUserId: {
          createUserId: store.principal['id'],
          firstName: store.principal['firstName']
        },
        recvDate: new Date().toString()
      };
      // 退货 需要查询车架号  srcDocNo批发单据号 srcDocNo2退货单据号
      const serialNoRes = await service.findSerialNos({ srcDocNo: formData?.relateDocNo, srcDocNo2: formData?.docNo });
      console.log(serialNoRes, 'pppppppppppppppp');
      if (serialNoRes.success) {
        if (serialNoRes.data.length > 0) {
          res.data.salSoDVOList.forEach(item => {
            let serialNoList = [];
            let serialNoListName = [];
            serialNoRes.data.forEach(itm => {
              if (item.itemId === itm.itemId) {
                serialNoList.push(itm.serialNo);
                serialNoListName.push(itm.serialStatusName);
              }
            })
            item['serialNoList'] = serialNoList;
            item['serialNoListName'] = serialNoListName;
          })
        } else {
          res.data.salSoDVOList.forEach(item => {
            item['serialNoList'] = [];
            item['serialNoListName'] = [];
          })
        }
      } else {
        ElNotification({
          type: 'error',
          message: serialNoRes.data || serialNoRes.msg || '退货车架号查询失败'
        });
      }
      // res.data.purPoDRespVOList?.map((item) => {
      //   const filterlist = item.invSerialList?.map((courseItem) => {
      //     // if (courseItem.serialStatus != '1') {
      //     return courseItem.serialNo
      //     // }
      //   })
      //   const filterlistname = item.invSerialList?.map((courseItem) => {
      //     // if (courseItem.serialStatus != '1') {
      //     return courseItem.serialStatusName
      //     // }
      //   })
      //   serialNoList.push(filterlist)
      //   serialNoListName.push(filterlistname)
      // })
      const tableData = res.data.salSoDVOList?.map((item, index) => ({
        ...item,
        itemName: {
          id: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode
        },
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName,
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        qty: 0,
        poQty: item.qty,
        // serialNoList: []
        // serialNoList: serialNoList[index] || [],
        // serialNoListName: serialNoListName[index] || [],
        shippedQty: Object.keys(item).includes('shippedQty') ? item.shippedQty || 0 : 0,
        realSerialNoList: []
      }));
      this.setState({
        formData,
        tableData,
        poId: res.data?.id,
        showWarehousing: true,
        relateDoc2Cls: types,
        relateDoc2Id: res.data?.id,
        relateDoc2No: res.data?.docNo,
        relateDocNo: res.data?.relateDocNo
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  };


  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };

  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
    });
  };

  getInvFormRef = (ref) => {
    this.setState({
      invFormRef: ref
    });
  };

  getDetailTableRef = (ref) => {
    this.setState({
      detailTableRef: ref
    });
  };

  //数值相加
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

  //提交
  handleSubmit = async () => {
    console.log('提交', this.state.formData);
    await this.state.detailTableRef.quitEditState();
    const baseFormValues = await this.state.baseFormRef.validateFields();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log(detailTableValues, baseFormValues, 'detailTableValuesdetailTableValuesdetailTableValues')
    // const qtyNum = detailTableValues.data?.filter((item)=>item.qty <= 0)
    if (detailTableValues.data.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '请添加明细信息'
      });
    }
    if (!detailTableValues.success) {
      return ElNotification({
        type: 'warning',
        message: '请检查必填项'
      });
    }
    const { qty } = this.sum(detailTableValues.data)
    if (qty === 0) {
      return ElNotification({
        type: 'warning',
        message: '总入库数量不能为0，请检查！'
      });
    }
    const params = {
      ...baseFormValues,
      docStatus: this.state.formData?.docStatus,   // 2021.05.21  入库添加docStatus参数
      createUserId: store.principal['id'],
      creator: store.principal['firstName'],
      suppId: baseFormValues.suppId?.id,
      qty,
      flag: Object.keys(baseFormValues).includes('flag') && Array.isArray(baseFormValues.flag) && baseFormValues.flag.length > 0 ? baseFormValues.flag[0] : undefined,
      poId: this.state.poId,
      recvDate: baseFormValues.recvDate && dayjs(baseFormValues.recvDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      relateDoc2Cls: this.state.relateDoc2Cls,
      es4: Object.keys(this.state.formData).includes('es4') ? this.state.formData.es4 : '',
      es3: Object.keys(this.state.formData).includes('docTime') ? this.state.formData.docTime : '',
      // docNo: baseFormValues.docNo && baseFormValues.docNo.docNo,
      // masId: baseFormValues.docNo && baseFormValues.docNo.id,
      purGrDSaveVOList: detailTableValues.data.map((item) => {
        console.log(item, Object.keys(item).includes('realSerialNoList'), 'pppppppppp')
        return {
          itemName: item.itemName?.itemName,
          itemId: item.itemName?.id,
          itemType: item.itemType?.udcVal,
          price: item.price,
          uom: item.uom?.udcVal,
          qty: item.qty,
          // brand: item.brand,
          whId: baseFormValues.whId,
          buId: baseFormValues.buId,
          relateDoc2Id: this.state.relateDoc2Id,
          relateDoc2No: this.state.relateDoc2No,
          relateDoc2Did: item.id,
          es1: Object.keys(item).includes('shippedQty') ? item.shippedQty : 0,
          serialNoList: Object.keys(item).includes('realSerialNoList') ? clone(item.realSerialNoList) : item.serialNoList,
          poDId: item.id
          // whLoc: baseFormValues.whLoc
          // payType: item.payType && item.payType.udcVal,
          // payTypeName: item.payType && item.payType.valDesc,
          // planPayDate:
          //   item.planPayDate &&
          //   dayjs(item.planPayDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        }
      })
    };
    console.log(params, 'params')
    this.setState({ pageLoading: true });
    const res = await service.submit(params);
    this.setState({ pageLoading: false });
    if (res.success) {
      const para = res.data;
      console.log(para, 'submitsubmitsubmit');
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      // this.multiTabStore.closeCurrentToPath('/inventory/inventorysearch/account');
      this.multiTabStore.closeCurrentToPath(`/inventory/inventoryin/itemview/${para}`);
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

  //保存
  handleSave = async () => {
    console.log('baoc');
  };

  //查看条码
  handleCode = async () => {
    const { formData } = this.state;
    await this.state.detailTableRef.quitEditState();
    const detailTableValues = await this.state.detailTableRef.validateTableRows();
    console.log(detailTableValues.data, 'tableData');
    // let arr = [{ id: 1, itemId: '159', itemName: '212' }, { id: 2, itemId: '508', itemName: '2323' }];
    // // 退货 需要查询车架号  srcDocNo批发单据号 srcDocNo2退货单据号
    // const serialNoRes = await service.findSerialNos({ srcDocNo: formData?.relateDocNo, srcDocNo2: formData?.docNo });
    // console.log(serialNoRes, 'pppppppppppppppp');
    // if (serialNoRes.success) {
    //   if (serialNoRes.data.length > 0) {
    //     arr.forEach(item => {
    //       let serialNoList = [];
    //       let serialNoListName = [];
    //       let status = [];
    //       serialNoRes.data.forEach(itm => {
    //         if (item.itemId === itm.itemId) {
    //           console.log(item.itemId, itm.itemId)
    //           serialNoList.push(itm.serialNo);
    //           serialNoListName.push(itm.serialStatusName);
    //           status.push('未入库');
    //         }
    //       })
    //       item['serialNoList'] = serialNoList;
    //       item['serialNoListName'] = serialNoListName;
    //       item['status'] = status;
    //     })
    //     console.log(arr, '[[[[[[[[[[[[[[[[[[[')
    //   }
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: serialNoRes.data || serialNoRes.msg || '退货车架号查询失败'
    //   });
    // }
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={detailTableValues.data} />,
      okText: '确认',
      icon: null
    })
  }

  //返回
  onBack = () => {
    this.props.push('/inventory/inventorysearch/account');
  };

  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    })
  }

  // 一键入库
  handwarehousingFlag = async (data) => {
    if (data == true) {
      this.state.detailTableRef.clearRows();
      const detailTableValues = await this.state.detailTableRef.getRows();
      console.log(detailTableValues, 'detailTableValues')
      //列表
      let serialNoList = [];
      detailTableValues?.map((item) => {
        const filterlist = item.invSerialList?.map((courseItem) => {
          if (courseItem.serialStatus != '1') {
            return courseItem.serialNo
          }
        }).filter(Boolean);
        serialNoList.push(filterlist)
      })
      let details = {};
      if (this.props.match.params.type === 'returninquiry') {
        // todo 退货没有一键入库功能  
        details = detailTableValues?.map((item, index) => ({
          ...item,
          qty: item?.poQty - item?.shippedQty,  // shippedQty 已经退货数量
          serialNoList: serialNoList[index] || []
        }))
      } else {
        details = detailTableValues?.map((item, index) => ({
          ...item,
          qty: item?.poQty - item?.acceptQty, // acceptQty 已经入库数量
          realSerialNoList: serialNoList[index] || []    // 查看条码是用serialNoList控制  只能动态更改realSerialNoList
        }))
      }
      this.state.detailTableRef.addRows(details);
      this.setState({
        warehousingFlag: data
      })
    } else {
      this.state.detailTableRef.clearRows();
      const detailTableValues = await this.state.detailTableRef.getRows();
      let details = detailTableValues?.map((item) => ({
        ...item,
        qty: 0,
        realSerialNoList: []  // 查看条码是用serialNoList控制  只能动态更改realSerialNoList
      }))
      this.state.detailTableRef.addRows(details);
      this.setState({
        warehousingFlag: data
      })
    }
  }

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons(this.handleSave, this.handleSubmit, this.handleCode)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            showWarehousing={this.state.showWarehousing}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.props.match.params.type}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
            handwarehousingFlag={this.handwarehousingFlag}
            whList={this.state.whList}
          />
        </ElCard>
        {/* {this.state.docType == 'D' ? (
          <ElCard title='顾客信息'>
            <CustomerForm
              formRef={this.state.customerFormRef}
              onRef={this.getCustomerForm}
              formData2={this.state.formData2}
              isLS={this.state.isLS}
            >
            </CustomerForm>
          </ElCard>
        ) : (
          <ElCard title='客户信息'>
            <ClientForm formRef={this.state.clientFormRef} onRef={this.getClientFormRef} formData3={this.state.formData3}></ClientForm>
          </ElCard>
        )} */}
        <ElCard title='入库信息'>
          {!this.state.warehousingFlag ? (
            <InvForm
              handleLoading={this.handleLoading}
              onRef={this.getInvFormRef}
              invFormRef={this.state.invFormRef}
              editTableRef={this.state.detailTableRef}
              type={this.state.type}
              poSource={this.state.poSource}
              relateDocNo={this.state.relateDocNo}
            />
          ) : (
            <></>
          )}
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
            type={this.state.type}
            warehousingFlag={this.state.warehousingFlag}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
