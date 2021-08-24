import React from 'react';
import { ElSearchTable } from '@/components/el';
import { getTableColumns } from './config';
import './index.less';

interface Props {
  editTableRef: any;
  onRef: any;
  dataSource: any;
  type: String;
  change?: (row: Record<string, any>, val: string) => void;
}
class ExamBaseForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      whRef: null
    };
  }

  handleChangeScore = (type, currentRow, val) => {
    this.props.change && this.props.change(currentRow, val);
  };

  render() {
    return (
      <>
        <ElSearchTable
          bordered
          rowKey='id'
          mode={{ proxy: false }}
          dataSource={this.props.dataSource}
          onRef={this.props.onRef}
          scroll={{ y: 360 }}
          pageSize={this.props.dataSource.length || 0}
          columns={getTableColumns(this.props.type, this.handleChangeScore)}
          rowSelectionConfig={null}
        />
      </>
    );
  }
}

export default ExamBaseForm;
