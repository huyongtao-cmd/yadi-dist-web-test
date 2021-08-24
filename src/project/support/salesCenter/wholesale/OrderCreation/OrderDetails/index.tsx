//订单明细
import React from 'react';
import { ElNotification, ElEditTable, ELImportExcel } from '@/components/el';
import { getTableColumns, getTableActionButtons } from './config';
import { Statistic } from '@/components/el/ItemComponent';
import { maths } from '@/utils';

class OrderTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 优化渲染页面（如果父组件的改变，不影响这个页面，就让他不渲染）
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.onRef !== this.props.onRef &&
      nextProps.orderTableRef !== this.props.onRef
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() { }

  add = async () => {
    console.log('新增');
    await this.props.orderTableRef.quitEditState();
    this.props.orderTableRef.addRow({
      id: maths.genFakeId(-1)
    });
  };

  del = async ({ selectedRowKeys }) => {
    console.log('删除');
    await this.props.editTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };

  render() {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
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
        </div>
        <ElEditTable
          rowKey='id'
          bordered
          onRef={this.props.onRef}
          scroll={{ y: 370 }}
          actionButtons={getTableActionButtons(
            this.add.bind(this),
            this.del.bind(this)
          )}
          columns={getTableColumns()}
        />
      </>
    );
  }
}
export default OrderTable;
