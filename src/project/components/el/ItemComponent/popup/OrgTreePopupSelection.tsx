//商品选择
import PopupSelection from '@/project/components/el/ItemComponent/popup/PopupSelection';
import React from 'react';
import { ElNotification } from '@/components/el';
import requests from '@/utils/request';
import { Input, Modal, Tree } from 'antd';
import { asserts } from '@/utils';
import { clone } from 'ramda';

interface Props {
  value?: any;
  placeholder: string;
  disabled: boolean;
  showColumn: string;
  onChange?: Function;
  currentPid?: any;    // 经销商组织   所属组织编辑时控制已经选过的组织不能再选择  0617
}
interface State {
  popupSelection: any;
  treeVisible: boolean;
  treeData: Array<any>;
  selectedNodes: any;
  inputValue: any;
  value: any;
}
const getInputValue = (record, showColumn) => {
  if (!record) {
    return '';
  }
  return Array.isArray(record)
    ? record.map((v) => v[showColumn]).toString()
    : record[showColumn];
};
// 在此处组装所有的数据
class OrgTreePopupSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null,
      treeVisible: false,
      treeData: [],
      selectedNodes: null,
      inputValue: null,
      value: null
    };
  }
  // 状态修改
  static getDerivedStateFromProps(props, state) {
    if (typeof props.value === 'object') {
      const inputValue = getInputValue(props.value, 'buName');
      if (inputValue !== state.prevInputValue) {
        return {
          inputValue,
          prevInputValue: inputValue
        };
      }
    }
    return null;
  }
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };

  getTree = async () => {
    let res = await requests(`/yd-user/tree/currentTree`, { method: 'post' });
    if (!res.success) {
      return;
    }
    const data = JSON.parse(
      JSON.stringify(res.data || [])
        .replace(/buName/g, 'title')
        .replace(/id/g, 'key')
        .replace(/treeNodes/g, 'children')
    );
    // todo 0617
    let treeList = [];
    if (asserts.isExist(this.props.currentPid)) {
      // 需要递归判断 当前那一级与data对比  并置灰
      const getNode = (data, nodeId) => {
        if (!data || !nodeId) {
          return undefined;
        }
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].buId === nodeId) {
            data[i].disabled = true;
          }
          if (data[i].children) {
            getNode(data[i].children, nodeId);
          }
        }
        return data;
      };
      treeList = getNode(data, this.props.currentPid);
    } else {
      treeList = clone(data);
    }

    this.setState({
      treeData: treeList
    });
  };
  onCancel = () => {
    this.setState({ treeVisible: false });
  };
  onOk = () => {
    const { selectedNodes } = this.state;
    const inputValue = getInputValue(selectedNodes, 'title');
    const buObj = {
      buId: selectedNodes.length > 0 ? selectedNodes[0].buId : '',
      buTreeDId: selectedNodes.length > 0 ? selectedNodes[0].key : '',
      buTreeId: selectedNodes.length > 0 ? selectedNodes[0].buTreeId : '',
      buName: selectedNodes.length > 0 ? selectedNodes[0].title : '',
      buCode: selectedNodes.length > 0 ? selectedNodes[0].buCode : ''
    };
    this.setState(
      {
        value: buObj,
        treeVisible: false,
        inputValue
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.value);
        }
      }
    );
  };
  onSelectNode = (
    selectedKeys,
    e: { selected: boolean; selectedNodes: any; node: any; event: any }
  ) => {
    let selectedNodes = [];
    if (selectedKeys.length) {
      selectedNodes = e.selectedNodes;
    }
    this.setState({ selectedNodes });
  };

  handleSearch = async (_, event) => {
    await this.getTree();
    this.setState({ treeVisible: true });
  };
  render() {
    const { treeVisible, treeData, value } = this.state;
    return (
      <>
        <Input.Search
          readOnly
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          value={this.state.inputValue}
          allowClear
          onSearch={this.handleSearch}
        />
        <Modal
          title='选择组织'
          visible={treeVisible}
          width={600}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          <Tree
            height={500}
            onSelect={this.onSelectNode}
            defaultExpandAll
            treeData={treeData}
          />
        </Modal>
      </>
    );
  }
}
export default OrgTreePopupSelection;
