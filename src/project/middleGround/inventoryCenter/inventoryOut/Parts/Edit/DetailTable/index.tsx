import React from 'react';
import { ElEditTable } from '@/components/el';
import { maths } from '@/utils';
import { getTableColumns, getTableActionButtons } from './config';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  type: any;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  async handleAdd() {
    const formRefs = await this.props.formRef.validateFields();
    await this.props.editTableRef.quitEditState();
    this.props.editTableRef.addRow({
      id: maths.genFakeId(-1),
      serialNoList: [],
      whId: formRefs.whId,
      buId: formRefs.buId
    });
  }
  async handleRemove({ selectedRowKeys }) {
    await this.props.editTableRef.quitEditState();
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  render() {
    return (
      <div>
        <ElEditTable
          rowKey='id'
          bordered
          scroll={{ y: 370 }}
          onRef={this.props.onRef}
          dataSource={this.props.tableData}
          actionButtons={this.props.type === ':type' ? getTableActionButtons(
            this.handleAdd.bind(this),
            this.handleRemove.bind(this)
          ) : null}
          columns={getTableColumns(this.props.type)}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: true,
            disabledRowIds: []
          }}
          defaultTableConfig={
            {
              onBottomPressEnter: 'save',
              onTableIntoEdit: 'click'
            }
          }
        />
      </div>
    );
  }
}
export default DetailTable;
