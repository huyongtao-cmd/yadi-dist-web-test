// import Selection from '../../Selection';
import React from 'react';
import { TreeSelect } from 'antd';
import { DataNode } from 'rc-tree-select/lib/interface';
// import { path } from 'ramda';
// import request from '@/utils/request';
interface TransferProps {
  key: string;
  title: string;
  children: string;
}
const defaultTransfer: TransferProps = {
  key: 'key',
  title: 'title',
  children: 'children'
};
interface Props {
  treeData: Array<DataNode>;
  request?: Function;
  [props: string]: any;
}

interface State {
  loading: boolean;
  treeData: Array<DataNode>;
}
// 在此处组装所有的数据
class TreeSelection extends React.Component<Props, State> {
  static defaultProps = {
    transfer: defaultTransfer,
    showSearch: true,
    allowClear: true
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      treeData: []
    }
  }

  componentDidMount() {
    this.props.request &&
      this.getTableData();
  }

  getTableData = async () => {
    const { transfer, request, treeData } = this.props;
    // 如果需要数据代理
    function getReg(obj) {
      return new window.RegExp(obj, 'g');
    }
    if (request) {
      this.setState({
        loading: true
      });
      const res = await this.props.request();
      const newTreeData = JSON.parse(JSON.stringify(res || [])
        .replace(getReg(transfer.title), "title")
        .replace(getReg(transfer.key), 'key')
        .replace(getReg(transfer.children), 'children'));
      this.setState({
        treeData: newTreeData
      })
      this.setState({
        loading: false
      });
    } else {
      // 如果没用数据代理
      this.setState({
        treeData
      });
    }
  };

  render() {
    const { loading, treeData } = this.state;
    console.log('props===', this.props);
    return (
      <TreeSelect
        {...this.props}
        disabled={this.props.disabled || loading}
        treeData={treeData}
      />
    );
  }
}
export default TreeSelection;
