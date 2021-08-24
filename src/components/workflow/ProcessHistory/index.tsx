import React from 'react';
import { ElSearchTable } from '@/components/el';
import { getTableColumns } from './config';
import { getComments } from './service';
interface Props {
  processInstanceId: string;
}
interface State {
  dataSource: Array<any>;
  loading: boolean;
}
class ProcessHistory extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false
    };
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      !this.props.processInstanceId ||
      this.props.processInstanceId === prevProps.processInstanceId
    ) {
      return false;
    }
    return true;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.getComments(this.props.processInstanceId);
    }
  }
  componentDidMount() {
    this.getComments(this.props.processInstanceId);
  }
  setLoading = (loading: boolean) => {
    this.setState({ loading });
  };
  getComments = async (processInstanceId) => {
    if (!processInstanceId) {
      this.setState({
        dataSource: []
      });
    }
    this.setLoading(true);
    const res = await getComments(processInstanceId);
    if (res.success) {
      this.setState({
        dataSource: res.data
      });
    }
    this.setLoading(false);
  };
  render() {
    return (
      <ElSearchTable
        tableId='workflow-history'
        columns={getTableColumns()}
        pageSize={5}
        loading={this.state.loading}
        dataSource={this.state.dataSource}
      />
    );
  }
}
export default ProcessHistory;
