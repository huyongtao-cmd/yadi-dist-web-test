//订单明细
import React from 'react';
import { ElNotification, ElEditTable, ELImportExcel } from '@/components/el';
import { getTableColumns, getTableActionButtons } from './config';
import { Statistic } from '@/components/el/ItemComponent';
import { maths } from '@/utils';
import ItemModal from '@/project/components/el/Modal/ItemModal';

interface Props {
  // editTableRef: any;
  // onRef: Function;
  // tableData: Array<any>;
  baseFormRef: any;
  handleLoading: any;
  setnums: any;
  nums: number;
  allamt: number;
  oldCarTableRef: any;
  setFlags: any;
  // setDeleteFlags: Function;
}

class OrderTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      itemModalRef: null,
      defaultSearchData: {},
      paramData: {},
    };
  }

  componentDidMount() {
    console.log(this.props.baseFormRef, 'numsnums')
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      !this.props.baseFormRef ||
      this.props.baseFormRef === prevProps.baseFormRef
    ) {
      return false;
    }
    return true;
  }

  add = async () => {
    await this.props.baseFormRef
      .validateFields(['storeId', 'whId', 'es1'])
      .catch(() => {
        ElNotification({
          type: 'warning',
          message: '请选择基础信息【门店】、【仓库】和【参保方式】'
        });
        return Promise.reject();
      });
    this.props.setFlags(true)
    await this.props.orderTableRef.quitEditState();
    const formData = this.props.baseFormRef && this.props.baseFormRef.getFieldsValue();
    console.log(formData, 'oldCarTableRef------')
    this.setState({
      paramData: {
        buId: formData?.storeId,
        whId: formData?.whId,
      }
    });
    this.state.itemModalRef && this.state.itemModalRef.setModalVisible(true);
    // await this.props.baseFormRef
    //   .validateFields(['storeId', 'whId', 'docType'])
    //   .catch((cb) => {
    //     const { storeId, whId, docType } = cb.values;
    //     console.log('aaaaaaa', storeId, 'bbbbb', whId, 'ccccccc', docType);
    //     let flag1 = isNil(storeId) || isEmpty(storeId) ? '【门店】' : '';
    //     let flag2 = isNil(whId) || isEmpty(whId) ? '【仓库】' : '';
    //     let flag3 = isNil(docType) || isEmpty(docType) ? '【销售类型】' : '';
    //     ElNotification({
    //       type: 'warning',
    //       message: `请选择基础信息` + flag1 + flag2 + flag3
    //     });
    //     return Promise.reject();
    //   });
    // await this.props.customerFormRef
    //   .validateFields(['custName', 'reprCertMobile', 'reprCertNo'])
    //   .catch((cb) => {
    //     const { custName, reprCertMobile, reprCertNo } = cb.values;
    //     let flag1 = isNil(custName) || isEmpty(custName) ? '【顾客姓名】' : '';
    //     let flag2 =
    //       isNil(reprCertMobile) || isEmpty(reprCertMobile)
    //         ? '【手机号码】'
    //         : '';
    //     let flag3 =
    //       isNil(reprCertNo) || isEmpty(reprCertNo) ? '【身份证号】' : '';
    //     ElNotification({
    //       type: 'warning',
    //       message: `请选择顾客信息` + flag1 + flag2 + flag3
    //     });
    //     return Promise.reject();
    //   });

    // this.props.orderTableRef.addRow({
    //   id: maths.genFakeId(-1),
    //   serialNoList: [],
    //   qty: 0,
    //   discRatio: 100,
    //   discAmt: 0,
    //   whId: formRefs.whId,
    //   buId: formRefs.storeId
    // });
  };

  handleConfirm = async ({ selectedRows }) => {
    const formRefs = this.props.baseFormRef && this.props.baseFormRef.getFieldsValue();
    const tableData = this.props.orderTableRef.getRows();
    const rows = selectedRows.map(item => {
      let price = item.retailPrice; // 单格
      let qty = item.itemType === 'PART' ? 1 : 0; // 数量
      let discRatio = item.discRatio || 100; // 折扣率
      let discAmt = item.discAmt || 0; // 折扣金额
      const amt1 = maths.rounds(maths.mul(price, + qty || 0), 2); // 数量*金额
      const amt2 = maths.rounds(maths.mul(amt1, discRatio / 100 || 0), 2); //  数量*金额 *折扣比例
      const amt = maths.rounds(maths.sub(amt2, discAmt || 0), 2); // 总价
      return {
        ...item,
        id: maths.genFakeId(-1),
        serialNoList: [],
        whId: formRefs.whId,
        buId: formRefs.storeId,
        itemName: {
          id: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode,
          brandName: item?.brandName,
        },
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        },
        qty: qty,
        discRatio: discRatio,
        discAmt: discAmt,
        price: price,
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName
        },
        amt: amt,
        ohQty: item.ohQty,
        ref: this.props.baseFormRef
      }
    });
    const itemIds = tableData.map((item) => item.itemId);
    const filterRows = rows.filter((item) => itemIds.indexOf(item.itemId) === -1);
    console.log('filterRows', filterRows);
    await this.props.orderTableRef.addRows(filterRows);
    const dataList = this.props.orderTableRef.getRows();
    console.log(dataList, 'dataListdataList');
    this.props.setendnums(dataList);
    let isSpecial = dataList.some(item => item.itemType.udcVal === 'ALL' && item.es9 === '1');
    if (isSpecial) {
      // 存在整车并且有整车是特价车
      this.props.baseFormRef.setFieldsValue({ es1: 'B' });  // 人保
    } else {
      if (!dataList.every(item => item.itemType.udcVal === 'PART')) {
        // 只存在整车但是都不是特价车
        this.props.baseFormRef.setFieldsValue({ es1: 'A' });   // 人车双保
      } else {
        // 全部是配件
        this.props.baseFormRef.setFieldsValue({ es1: 'D' });
      }
    }
  };

  del = async ({ selectedRowKeys }) => {
    console.log('删除');
    await this.props.orderTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.orderTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    const data = this.props.orderTableRef.getRows();
    this.props.setendnums(data);
    let isSpecial = data.some(item => item.itemType.udcVal === 'ALL' && item.es9 === '1');
    console.log(isSpecial, 'ppppppppppppppp')
    if (isSpecial) {
      // 存在整车并且有整车是特价车
      this.props.baseFormRef.setFieldsValue({ es1: 'B' });  // 人保
    } else {
      if (!data.every(item => item.itemType.udcVal === 'PART')) {
        // 只存在整车但是都不是特价车
        this.props.baseFormRef.setFieldsValue({ es1: 'A' });   // 人车双保
      } else {
        // 全部是配件
        this.props.baseFormRef.setFieldsValue({ es1: 'D' });
      }
    }
    if (data.length == 0) {
      this.props.setFlags(false);
      this.props.baseFormRef.setFieldsValue({ es1: 'D' });
    }
  };

  onItemModalRef = (ref) => {
    this.setState({
      itemModalRef: ref
    });
  };

  render() {
    return (
      <>
        <div style={{ textAlign: 'right', marginRight: '30px' }}>
          <span>
            总数量：
            <Statistic
              value={this.props.nums}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
          <span style={{ marginLeft: '30px' }}>
            总金额：
            <Statistic
              value={this.props.allamt > 0 ? this.props.allamt : 0}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
        </div>
        <ElEditTable
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: false,
            disabledRowIds: []
          }}
          rowKey='id'
          bordered
          onRef={this.props.onRef}
          scroll={{ y: 370 }}
          actionButtons={getTableActionButtons(
            this.add.bind(this),
            this.del.bind(this)
          )}
          columns={getTableColumns(this.props.baseFormRef, this.props.handleLoading, this.props.setnums, this.props.oldCarTableRef)}
          dataSource={this.props.data}
        />
        <ItemModal
          onRef={this.onItemModalRef}
          defaultSearchData={this.state.defaultSearchData}
          handleConfirm={this.handleConfirm}
          paramData={this.state.paramData}
        />
      </>
    );
  }
}
export default OrderTable;
