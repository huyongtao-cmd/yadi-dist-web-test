import React from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';

interface Props {
  dataSource: Array<any>
}

class CheckEditTableView extends React.Component<Props>{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ElEditTable
        disabledTable={true}
        rowSelectionConfig={null}
        rowKey='id'
        bordered
        scroll={{ y: 300 }}
        dataSource={this.props.dataSource}
        columns={getTableColumns()}
      />
    );
  }

}

export default CheckEditTableView;