import React from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';

interface Props {
  tableData: Array<any>;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ElEditTable
        disabledTable={true}
        rowSelectionConfig={null}
        rowKey='id'
        bordered
        scroll={{ y: 370 }}
        dataSource={this.props.tableData}
        columns={getTableColumns()}
      />
    );
  }
}
export default DetailTable;
