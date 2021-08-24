// 旧车信息
import React, { PureComponent } from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';
import * as service from '../service';
import { maths } from '@/utils';
import {
  ElNotification
} from '@/components/el';
interface Props {
  // editTableRef: any;
  // onRef: Function;
  // tableData: Array<any>;
  baseFormRef: any;
  setnums2: any;
  setendnums2: any;
  // setDeleteFlags: Function;
}
class OldCarTable extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      oldCarInfo: null
    };
  }
  processData = (params) => {
    return params.map((item) => {
      return {
        ...item,
        qty: 1,
        brand: item.brand,
        brandName: item.brandName,
        price: item.retailPrice,
        uom: {
          udcVal: item.uom,
          valDesc: item.uomName
        }
      };
    });
  };

  async componentDidMount() {
    // const formRefs = await this.props.baseFormRef.validateFields();
    // console.log(formRefs, '666666')
    const res = await service.getOldCar();
    if (res.success) {
      this.setState({
        oldCarInfo: this.processData(res.data?.records)
      });
      this.props.setendnums2(true);
    } else {
      ElNotification({
        type: 'warning',
        message: res.data || '操作失败'
      });
    }
    // console.log(res, 'oldCarTableValues')
    // let params = {
    //   itemId: res.data?.records[0]?.id,
    //   whId: formRefs.whId,
    // }
    // let resp = await service.findPage(params);
    // let ohQty = resp.data?.records[0]?.ohQty || 0;
    // console.log(res.data.records, '以旧换新');

  }
  render() {
    return (
      <ElEditTable
        dataSource={this.state.oldCarInfo}
        rowKey='id'
        bordered
        scroll={{ y: 370 }}
        columns={getTableColumns(this.props.setnums2)}
        onRef={this.props.onRef}
      />
    );
  }
}

export default OldCarTable;
