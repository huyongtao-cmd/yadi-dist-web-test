import React from 'react';
import { ElNotification, ElEditTable } from '@/components/el';
import { maths } from '@/utils';
import { Statistic } from '@/components/el/ItemComponent';
import { getTableColumns } from './config';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  nums: number;
  allamt: number;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  // 点击新增事件
  async handleAdd() {
    // console.log('新增11');
    await this.props.editTableRef.quitEditState();
    // 新增数据的内容
    this.props.editTableRef.addRow({
      id: maths.genFakeId(-1),
    });
  }
  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  render() {
    return (
      <div>
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
            总价格：
            <Statistic
              value={this.props.allamt}
              style={{ display: 'inline-block' }}
              precision={2}
            />
          </span>
        </div>
        <ElEditTable
          rowKey='id'
          bordered
          scroll={{ y: 370 }}
          onRef={this.props.onRef}
          dataSource={this.props.tableData}
          columns={getTableColumns()}
        />
      </div>
    );
  }
}
export default DetailTable;
