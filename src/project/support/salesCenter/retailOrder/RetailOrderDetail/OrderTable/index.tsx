//订单明细
import React from 'react';
import { ElNotification, ElEditTable, ELImportExcel } from '@/components/el';
import { getTableColumns, getTableActionButtons } from './config';
import { Statistic } from '@/components/el/ItemComponent';
import { maths } from '@/utils';
interface Props {
  // editTableRef: any;
  // onRef: Function;
  // tableData: Array<any>
  nums: number;
  allamt: number;
  // setDeleteFlags: Function;
}

class OrderTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.data, 'this.props.data')
  }

  add = async () => {
    console.log('新增');
    await this.props.orderTableRef.quitEditState();
    this.props.orderTableRef.addRow({
      id: maths.genFakeId(-1)
    });
  };

  del = async ({ selectedRowKeys }) => {
    console.log('删除');
    await this.props.orderTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.orderTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };

  render() {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
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
              value={this.props.allamt}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
        </div>
        <ElEditTable
          // rowSelectionConfig={{
          //   type: 'checkbox',
          //   fixed: false,
          //   disabledRowIds: []
          // }}
          rowKey='id'
          bordered
          onRef={this.props.onRef}
          scroll={{ y: 370 }}
          // actionButtons={getTableActionButtons(
          //   this.add.bind(this),
          //   this.del.bind(this)
          // )}
          columns={getTableColumns()}
          dataSource={this.props.data}
        />
      </>
    );
  }
}
export default OrderTable;
