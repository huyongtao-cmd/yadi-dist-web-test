
import React from 'react';
import { Button, ConfigProvider, Modal } from 'antd';
import { ElCard, ElEditTable, ElForm, ELImportExcel, ElNotification, ElSearchTable } from '@/components/el';
import { getTableActionButtons, getTableColumns, getFormItems } from './config';
import zhCN from 'antd/lib/locale/zh_CN';
import { maths } from '@/utils';
import * as service from '../../service';
import app from '@/project/utils/appCommon';
import FailInfosModal from '../FailInfosModal';
import './index.less';

interface Props {
  onRef: any;
  editTableRef: any;
  dataSource: Array<any>;
  formData: Object;
  handleLoading: Function;
  formRef: any;
  type: String;
}

interface State {
  invFormRef: any;
  importPartModalRef: any;
  importAllModalRef: any;
}

class CheckEditTable extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      invFormRef: null,
      importPartModalRef: null,
      importAllModalRef: null
    }
  }

  getInvFormRef = (ref) => {
    this.setState({
      invFormRef: ref,
    })
  }

  // 新增
  handleAdd = async () => {
    const formRefs = await this.props.formRef.validateFields();
    await this.props.editTableRef.quitEditState();
    this.props.editTableRef.addRow({
      id: maths.genFakeId(-1),
      whId: formRefs.whId,
      buId: formRefs.buId,
      docMethod: formRefs.docMethod,
      serialNoList: [],
      serialNoLod: [],
      serialNoNew: [],
      serialNoNow: [],
      factQty: 0
    })
  };

  // 删除
  handleRemove = async ({ selectedRowKeys }) => {
    await this.props.editTableRef.quitEditState();
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  setStateData = () => {

  }

  onPressEnter = async (e) => {
    await this.props.editTableRef.quitEditState();
    const invFormValues = this.state.invFormRef.getFieldsValue();
    console.log(this.state.invFormRef.getFieldsValue(), 'eeeeeeeeeeeeeee');
    const formValues = await this.props.formRef.validateFields();
    const data = {
      buId: formValues.buId.id,
      whId: formValues.whId,
      serialNo: e.target.value
    };
    this.props.handleLoading(true);
    const res = await service.findSerialNoOnesPOut(data);
    this.props.handleLoading(false);
    this.state.invFormRef.setFieldsValue({
      docNo: ''
    });
    const tableData = await this.props.editTableRef.validateTableRows();
    const itemIdList = tableData.data?.map(item => item.itemId);
    let serialNoLod = [];
    let serialNoNew = [];
    let serialNoNow = [];
    let accQty = 0;
    if (res.success) {
      // 过滤到数据
      const newData = tableData.data?.filter(item => item.itemName?.id === res.data?.itemId);
      if (newData.length === 0) {
        // 如果明细中没有该商品  需要调用接口获取库存原始车架号
        const getSerialRes = await await service.getAccQtyByItemId({ ...data, itemId: res.data?.itemId });
        if (getSerialRes.success) {
          serialNoLod = getSerialRes.data.serialNoLod || [];
          serialNoNew = getSerialRes.data.serialNoNew || [];
          serialNoNow = getSerialRes.data.serialNoNow || [];
          accQty = getSerialRes.data.accQty;
        } else {
          ElNotification({
            type: 'error',
            message: '获取原始库存车架号失败'
          });
        }
      }
      if (res.data?.itemType === 'ALL') {
        // 整车
        if (invFormValues.flag && invFormValues.flag[0] === true) {
          // 勾选冲销  但是 明细里没有该数据  实际数量减1
          if (newData.length === 0) {
            ElNotification({
              type: 'warning',
              message: '没有对应的商品明细，请检查！'
            });
          } else {
            // 明细里有该数据
            if (!newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '没有找到对应商品，请检查！'
              });
              return;
            }
            // newData[0].factQty === 1  
            // todo
            if (newData[0].factQty === 0) {
              // 实际数量等于0   但是选择了冲销  直接删除该数据
              this.props.editTableRef.removeRowByKey(newData[0].id, 'rowKey');
            } else {
              const serialNoList = newData[0].serialNoList?.filter((item) => item !== res.data?.serialNo);
              await this.props.editTableRef.updateRows({
                factQty: newData[0].factQty - 1,
                serialNoList: serialNoList
              }, [newData[0].id])
            }
          }
        } else {
          // 不勾选冲销
          if (newData.length === 0) {
            // 明细中没有该商品  添加
            this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data?.itemId,
                itemName: res.data?.itemName,
                itemCode: res.data?.itemCode,
                brandName: res.data?.brandName
              },
              accQty: accQty || 0,     // res.data.ohQty || 0
              factQty: 1,   // todo 实际数量应该是1
              dbrand: res.data?.brand,
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              },
              serialNoList: [res.data?.serialNo],
              serialNoLod,
              serialNoNew,
              serialNoNow,
              docMethod: formValues.docMethod,
              buId: formValues.buId?.id,
              whId: formValues.whId,
            })
          } else {
            // 明细中有该商品  更新
            if (newData[0].serialNoList.includes(res.data?.serialNo)) {   //扫码车架号已在队列
              ElNotification({
                type: 'warning',
                message: '该商品已经扫码，请检查！'
              });
              return;
            }
            await this.props.editTableRef.updateRows({
              factQty: newData[0].factQty + 1,
              serialNoList: [...newData[0].serialNoList, res.data?.serialNo]
            }, [newData[0].id])
          }
        }
      } else {
        // 配件  但是勾选了冲销  报错
        if (invFormValues.flag && invFormValues.flag[0] === true) {
          ElNotification({
            type: 'warning',
            message: '冲销只针对于整车商品，请检查！'
          });
        } else {
          // 判断有没有过滤到数据   
          if (newData.length > 0) {
            // 指有重复的数据  实际数量需要加1
            await this.props.editTableRef.updateRows({
              factQty: newData[0].factQty + 1,
            }, [newData[0].id])
          } else {
            // 没有重复的数据   明细需要添加一条数据
            this.props.editTableRef.addRow({
              ...res.data,
              id: maths.genFakeId(-1),
              itemName: {
                id: res.data.itemId,
                itemName: res.data.itemName,
                itemCode: res.data.itemCode,
                brand: res.data?.brand,
                brandName: res.data?.brandName
              },
              dbrand: res.data?.brand,
              factQty: 1,    // todo 实际数量应该是1
              accQty: accQty || 0,     // res.data.ohQty || 0
              itemType: {
                udcVal: res.data?.itemType,
                valDesc: res.data?.itemTypeName
              },
              uom: {
                udcVal: res.data?.uom,
                valDesc: res.data?.uomName
              },
              docMethod: formValues.docMethod,
              buId: formValues.buId?.id,
              whId: formValues.whId,
              serialNoLod,
              serialNoNew,
              serialNoNow,
            })
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

  beforeConfirm = async (a, callback) => {
    // todo
    const { selectedRowKeys = [] } = a;
    const tableData = await this.props.editTableRef.validateTableRows();
    let isExist = false;
    let currentLineNo = null;
    tableData.data.forEach((item, index) => {
      selectedRowKeys.forEach(key => {
        if (item.itemName?.id === key) {
          // 说明已经存在该商品
          isExist = true;
          currentLineNo = index;
        }
      })
    });
    if (isExist) {
      callback({ modalVisible: false });
      this.props.editTableRef.intoEditByIndex(currentLineNo);
      ElNotification({
        type: 'warning',
        message: `所选商品在明细中第${currentLineNo + 1}行已存在，不能重复添加！`
      });
      return false;
    } else {
      return true;
    }
  }

  // 清除
  handleClear = async ({ selectedRows, selectedRowKeys }) => {
    await this.props.editTableRef.quitEditState();
    console.log(this.props.editTableRef, selectedRowKeys, selectedRows, 'selectedRowKeysselectedRowKeys')
    if (selectedRows[0].itemType.udcVal !== 'ALL') {
      ElNotification({
        type: 'warning',
        message: `请选择商品类型为整车的商品`
      });
      return;
    } else {
      if (selectedRows[0].serialNoList.length === 0) {
        ElNotification({
          type: 'warning',
          message: '所选商品不存在车架号信息'
        });
        return;
      } else {
        this.props.handleLoading(true);
        const res = await service.clearSerialNosById(selectedRowKeys[0]);
        this.props.handleLoading(false);
        if (res.success) {
          await this.props.editTableRef.updateRows({
            factQty: 0,
            serialNoList: []
          }, selectedRowKeys);
          this.props.editTableRef.clearSelectionData();
        } else {
          ElNotification({
            type: 'error',
            message: res.data || res.msg
          });
        }
      }
    }
  }

  //获取modalref
  partModalRef = (ref) => {
    this.setState({
      importPartModalRef: ref
    });
  };
  allModalRef = (ref) => {
    this.setState({
      importAllModalRef: ref
    });
  };

  //导入接口调用成功后的回调
  importCallBack = async (res, flag) => {
    // 配件
    if (flag === 'part') {
      if (res.success) {
        const { itemCodeFailure = [], itemCodeSuccess = [] } = res.data;
        if (Array.isArray(itemCodeFailure) && itemCodeFailure.length > 0) {
          Modal.info({
            title: '',
            width: '50%',
            content: <FailInfosModal dataSource={itemCodeFailure} flag={flag} />,
            okText: '确认',
            icon: null
          })
        }
        if (Array.isArray(itemCodeSuccess) && itemCodeSuccess.length > 0) {
          await this.handleImportData(itemCodeSuccess, 'part');
        }
      }
    } else {
      // 整车
      if (res.success) {
        const { invSerialFailure = [], invSerialSuccess = [] } = res.data;
        if (Array.isArray(invSerialFailure) && invSerialFailure.length > 0) {
          Modal.info({
            title: '',
            width: '50%',
            content: <FailInfosModal dataSource={invSerialFailure} flag={flag} />,
            okText: '确认',
            icon: null
          })
        }
        if (Array.isArray(invSerialSuccess) && invSerialSuccess.length > 0) {
          await this.handleImportData(invSerialSuccess, 'all');
        }
      }
    }
    app.ShowMsg(res);
  };

  // 导入数据返回处理
  handleImportData = async (list, flag) => {
    const tableData = await this.props.editTableRef.validateTableRows();
    const formValues = await this.props.formRef.validateFields();
    let newList = [];
    list.forEach(item => {
      const tempIndex = tableData.data.findIndex(orginItem => orginItem.itemCode === item.itemCode);
      console.log(tempIndex, 'tempIndextempIndextempIndex')
      if (tempIndex === -1) {
        console.log(item, 'itemitemitemitem');
        newList.push({
          ...item,
          id: maths.genFakeId(-1),
          itemName: {
            id: item.itemId,
            itemName: item.itemName,
            itemCode: item.itemCode,
            brand: item?.brand,
            brandName: item?.brandName
          },
          dbrand: item?.brand,
          factQty: item.avalQty,
          accQty: item.ohQty || 0,
          itemType: {
            udcVal: item?.itemType,
            valDesc: item?.itemTypeName
          },
          uom: {
            udcVal: item?.uom,
            valDesc: item?.uomName
          },
          docMethod: formValues.docMethod,
          buId: formValues.buId?.id,
          whId: formValues.whId,
          serialNoList: flag === 'all' ? item.serialNoList : []   // todo,
        });
      } else {
        const filterData = tableData.data.filter(itm => itm.itemCode === item.itemCode);
        console.log(filterData);
        this.props.editTableRef.updateRows({
          factQty: maths.add(filterData[0].factQty || 0, item.avalQty || 0),
          serialNoList: flag === 'all' ? Array.from(new Set([...filterData[0].serialNoList, ...item?.serialNoList])) : [],
        }, [filterData[0].id])
      }
    });
    if (newList.length > 0) {
      const list = await this.getInvQtys(newList);
      this.props.editTableRef.addRows(list);
    }
  }

  // 导入获取商品库存数
  getInvQtys = async (data) => {
    const formValues = await this.props.formRef.validateFields();
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    let itemIds = data.map(item => item.itemId);
    const res = await service.getInvQtys({
      buId: formValues.buId?.id,
      whId: formValues.whId,
      storeIds,
      itemIds
    });
    if (res.success) {
      if (Array.isArray(res.data) && res.data.length > 0) {
        data.forEach(item => {
          res.data.forEach(itm => {
            if (item.itemId === itm.itemId) {
              item.ohQty = itm.ohQty || 0;
            }
          });
        })
      } else {
        data.forEach(item => {
          item.ohQty = 0;
        });
      }
      return data;
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '获取明细商品库存数失败！'
      });
      return [];
    }
  }


  handlePartImport = async ({ selectedRowKeys, selectedRows }) => {
    await this.props.editTableRef.quitEditState();
    const { importPartModalRef } = this.state;
    importPartModalRef.openModal();
  };

  handleAllImport = async ({ selectedRowKeys, selectedRows }) => {
    await this.props.editTableRef.quitEditState();
    const { importAllModalRef } = this.state;
    importAllModalRef.openModal();
  };

  render() {
    return (
      <>
        <div className={'serialNo'}>
          <ElForm
            onRef={this.getInvFormRef}
            formProps={{
              items: getFormItems(this.onPressEnter),
              className: 'ant-detailForm'
            }}
          />
          <div className={'importButtons'}>
            <Button type='primary' size='small' style={{ marginRight: '16px' }} onClick={(e: any) => this.handlePartImport(e)}>配件导入</Button>
            <Button type='primary' size='small' onClick={(e: any) => this.handleAllImport(e)}>整车导入</Button>
          </div>
          {/* <div style={{ textAlign: 'right', marginRight: '30px' }}>
            <span>
              总数量：
            <Statistic
                value={0}
                style={{ display: 'inline-block' }}
                precision={2}
              />
            </span>
            <span style={{ marginLeft: '30px' }}>
              总价格：
            <Statistic
                value={0}
                style={{ display: 'inline-block' }}
                precision={2}
              />
            </span>
          </div> */}
        </div>
        <ElEditTable
          rowKey='id'
          tableId='inventoryCheckEdit'
          scroll={{ y: 300 }}
          onRef={this.props.onRef}
          actionButtons={getTableActionButtons(this.handleAdd, this.handleRemove, this.handleClear, this.props.type)}
          columns={getTableColumns(this.beforeConfirm)}
          dataSource={this.props.dataSource}
        />
        <ELImportExcel
          downTemplateRequest='/yd-inv/ydinvCk/downloadSpcTemplatePart'
          downTemplateFileName='配件导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-inv/ydinvCk/importpart'
          successCallBak={(res) => this.importCallBack(res, 'part')}
          onRef={this.partModalRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
        <ELImportExcel
          downTemplateRequest='/yd-inv/ydinvCk/downloadTemplateAll'
          downTemplateFileName='整车导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-inv/ydinvCk/importAll'
          successCallBak={(res) => this.importCallBack(res, 'all')}
          onRef={this.allModalRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
      </>
    )
  }

}

export default CheckEditTable;