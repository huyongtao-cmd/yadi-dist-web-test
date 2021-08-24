import React from 'react';
import { ElEditTable } from '@/components/el';
import { getTableColumns } from './config';
import { Statistic } from '@/components/el/ItemComponent';

interface Props {
  tableData: Array<any>;
  nums: any;
  allamt: any;
}

class DetailTable extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

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
          disabledTable={true}
          rowSelectionConfig={null}
          rowKey='id'
          bordered
          scroll={{ y: 370 }}
          dataSource={this.props.tableData}
          columns={getTableColumns()}
        />
      </>
    );
  }
}
export default DetailTable;
