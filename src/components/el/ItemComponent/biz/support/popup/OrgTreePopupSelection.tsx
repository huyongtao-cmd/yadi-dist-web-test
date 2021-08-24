//商品选择
import PopupSelection from '../../../PopupSelection';
import React from 'react';
import { ElNotification } from '@/components/el';
import requests from '@/utils/request';
import { Modal, Tree } from 'antd';

interface Props {
  value?: any;
  placeholder: string;
  disabled: boolean;
  showColumn: string;
  onChange?: Function;
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
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  // 分页查询失败回调
  errCallBack = (res) => {
    ElNotification({
      type: 'error',
      message: res.message || res.data || '操作失败！'
    });
  };
  beforeConfirm = async (record) => {
    let res: any;
    if (record.selectedRows[0]) {
      res = await requests(
        `/yd-user/org/orgBuTree/getById/${record.selectedRows[0].id}`,
        { method: 'get' }
      );
    }
    if (res && res.success) {
      const data = JSON.parse(
        JSON.stringify(res.data.orgBuTreeDVOList || [])
          .replace(/buName/g, 'title')
          .replace(/id/g, 'key')
          .replace(/treeNodes/g, 'children')
      );
      this.setState({
        treeData: data,
        treeVisible: true
      });
    }
  };
  onCancel = () => {
    this.setState({ treeVisible: false });
  };
  onOk = () => {
    const { selectedNodes } = this.state;
    const inputValue = getInputValue(selectedNodes, this.props.showColumn);
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
        this.state.popupSelection.setStateInputValue(buObj);
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
  render() {
    const { treeVisible, treeData, value } = this.state;
    return (
      <>
        <PopupSelection
          tableProxy={{
            request: (paramData) => {
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              return requests('/yd-user/org/orgBuTree/list', {
                method: 'post',
                query: paramData
              });
            },
            successCallBack: () => {},
            errCallBack: this.errCallBack,
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          modalTableColumns={[
            {
              title: '组织树类型',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeTypeName'
            },
            {
              title: '组织树编号',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeCode'
            },
            {
              title: '组织树名称',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeName'
            },
            {
              title: '组织树状态',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeStatusName'
            },
            {
              title: '当前版本',
              width: 100,
              align: 'left',
              dataIndex: 'nowVersion',
              render: (value) => {
                return `V${value}`;
              }
            },
            {
              title: '创建时间',
              width: 100,
              align: 'left',
              dataIndex: 'createTime'
            }
          ]}
          columns={[
            {
              title: '组织树类型',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeTypeName'
            },
            {
              title: '组织树编号',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeCode'
            },
            {
              title: '组织树名称',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeName'
            },
            {
              title: '组织树状态',
              width: 100,
              align: 'left',
              dataIndex: 'buTreeStatusName'
            },
            {
              title: '当前版本',
              width: 100,
              align: 'left',
              dataIndex: 'nowVersion',
              render: (value) => {
                return `V${value}`;
              }
            },
            {
              title: '创建时间',
              width: 100,
              align: 'left',
              dataIndex: 'createTime'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '组织树编号',
                name: 'buTreeCode',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '组织树名称',
                name: 'buTreeName',
                span: 6,
                formOption: { type: '$input', props: { placeholder: '请输入' } }
              },
              {
                title: '组织树类型',
                name: 'buTreeType',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: {
                    placeholder: '请选择',
                    prefixStr: '/yd-system',
                    domain: 'ORG',
                    udc: 'BUTREE_TYPE'
                  }
                }
              },
              {
                title: '组织树状态',
                name: 'buTreeStatus',
                span: 6,
                formOption: {
                  type: '$udc',
                  props: {
                    placeholder: '请选择',
                    prefixStr: '/yd-system',
                    domain: 'ORG',
                    udc: 'BUTREE_STATUS'
                  }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          value={this.props.value}
          overLayWidth={600}
          showColumn='buName'
          beforeConfirm={this.beforeConfirm}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
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
