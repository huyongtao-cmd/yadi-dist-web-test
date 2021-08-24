import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
import * as service from '../service';
import { ElNotification } from '@/components/el';
import { maths } from '@/utils';
interface Props {
  onRef: Function;
  formData: { [key: string]: any };
  formRef: any;
  editTableRef: any;
  handleLoading: any;
  handleComputed: any;
}
class PresetForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      areaRef: null
    }
  }

  componentDidMount() { }


  areaRef = (ref) => {
    this.setState({
      areaRef: ref
    });
  };

  // 点击门店带出仓库
  onValuesChange = async (changedFields) => {
    if (changedFields.storeId) {
      this.props.formRef.setFieldsValue({
        whId: ''
      });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        buId: changedFields.storeId,
        storeIds
      }
      this.props.handleLoading(true);
      const res = await service.findOneInv(data);
      this.props.handleLoading(false);
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
        // console.log(this.state, 'this.state.areaRef');
        this.state.areaRef.setList(param);
        this.props.formRef.setFieldsValue({
          whId: param[0] && param[0].value
        });
        this.getInvQtys({ whId: param[0] && param[0].value })
      }
      // this.props.editTableRef.clearRows();
    }
    // 点击客户查询时自动带出数据
    if (changedFields.custCode) {
      this.props.formRef.setFieldsValue({
        tel: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.tel, // 联系电话
        contPerson: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.contPerson, // 联系人
        detailAddr: changedFields.custCode.orgAddrDetailDTO?.orgAddrAddressVos[0]?.detailAddr, // 联系地址
      });
      this.props.editTableRef.clearRows();
    }
    // 修改仓库时明细商品的库存数要发生变化
    if (changedFields.whId) {
      await this.props.editTableRef.quitEditState();
      const tableData = await this.props.editTableRef.validateTableRows();
      if (tableData.data.length > 0) {
        this.getInvQtys({ whId: changedFields.whId });
      }
    }
  };

  // 仓库改变时明细中商品的库存数要改变
  getInvQtys = async (params) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const validateFields = await this.props.formRef.validateFields(); //基本数据的值所有制
    const tableData = await this.props.editTableRef.validateTableRows();
    let itemIds = tableData.data.map(item => item.itemId?.id);
    const buId = validateFields.storeId;
    const res = await service.getInvQtys({ ...params, storeIds, buId, itemIds });
    if (res.success) {
      if (Array.isArray(res.data) && res.data.length > 0) {
        tableData.data.forEach(item => {
          res.data.forEach(itm => {
            if (item.itemId?.id === itm.itemId) {
              item.ohQty = itm.ohQty || 0;
              // item.qty = itm.qty || 1;    // todo
              // item.amt = maths.mul(item.itemId?.whSalePrice || item.price, itm.qty || 1);
            }
          });
        })
      } else {
        tableData.data.forEach(item => {
          item.ohQty = 0;
          // item.qty = 1; // todo
          // item.amt = maths.mul(item.itemId?.whSalePrice || item.price, 1);
        });
      }
      // this.props.handleComputed(tableData.data);
      await this.props.editTableRef.clearRows();
      this.props.editTableRef.addRows(tableData.data);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '获取明细商品库存数失败！'
      });
      return;
    }
  }

  render() {
    return (
      <ElForm
        onRef={this.props.onRef}
        data={this.props.formData}
        formProps={{
          items: getFormItems(this.areaRef),
          onValuesChange: this.onValuesChange
        }}
      />
    );
  }
}

export default PresetForm;
