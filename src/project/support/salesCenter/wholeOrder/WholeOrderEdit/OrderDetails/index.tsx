import React from 'react';
import { ElNotification, ElEditTable } from '@/components/el';
import { maths } from '@/utils';
import { Statistic } from '@/components/el/ItemComponent';
import { getTableColumns, getTableActionButtons } from './config';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  nums: number;
  allamt: number;
  setnums: any;
  delnums: any;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  // 点击新增事件
  async handleAdd() {
    // console.log('新增11');
    const validateFields = await this.props.formRef.validateFields(); //基本数据的值所有制
    const whId = validateFields.whId // 仓库id
    const buId = validateFields.storeId
    await this.props.editTableRef.quitEditState();
    // 新增数据的内容
    this.props.editTableRef.addRow({
      id: maths.genFakeId(-1),
      whId,
      buId
    });
  }

  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    const data = this.props.editTableRef.getRows();
    this.props.delnums(data)
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
          actionButtons={getTableActionButtons(
            this.handleAdd.bind(this),
            this.handleRemove.bind(this)
          )}
          columns={getTableColumns(this.props.setnums)}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: []
          }}
        />
      </div>
    );
  }
}
export default DetailTable;
