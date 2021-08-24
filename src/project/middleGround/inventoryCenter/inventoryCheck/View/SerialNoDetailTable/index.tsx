import React from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';

interface Props {
  serialNoSource: Array<any>
}

class CheckEditSerialNoTableView extends React.Component<Props>{
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
        dataSource={this.props.serialNoSource}
        columns={getTableColumns()}
      />
    );
  }

}

export default CheckEditSerialNoTableView;