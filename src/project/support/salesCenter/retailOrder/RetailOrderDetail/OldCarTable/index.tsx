// 旧车信息
import React, { PureComponent } from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';
class OldCarTable extends PureComponent<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.data, 'this.props.data');
    return (
      <ElEditTable
        rowKey='id'
        bordered
        scroll={{ y: 370 }}
        columns={getTableColumns()}
        onRef={this.props.onRef}
        dataSource={this.props.data}
      />
    );
  }
}

export default OldCarTable;
