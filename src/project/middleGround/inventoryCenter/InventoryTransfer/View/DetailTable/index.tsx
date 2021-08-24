import React from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';

interface Props {
  editTableRef: any;
  onRef: Function;
  tableData: Array<any>;
  formRef: any;
  setDeleteFlags: Function;
  type: any;
  setNum: any;
  confirmBtn: Boolean;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.confirmBtn,'this.props.confirmBtn');
    
  }

  render() {
    return (
      <div>
        <ElEditTable
          rowKey='id'
          bordered
          disabledTable={true}
          scroll={{ y: 370 }}
          onRef={this.props.onRef}
          dataSource={this.props.tableData}
          columns={getTableColumns(this.props.confirmBtn)}
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
