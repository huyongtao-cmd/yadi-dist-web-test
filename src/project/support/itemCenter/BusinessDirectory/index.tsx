/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 10:56:37
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-03-05 09:54:56
 */
import React from 'react';
import { Modal, Select, Radio, Form, Col, Row, Tree } from 'antd';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import ElForm from '@/components/el/ElForm';
import ElPageHeader from '@/components/el/ElPageHeader';
import { ElNotification, ElPage } from '@/components/el';
import { history, push } from 'react-router-dom';
import * as service from './service';
import SearchTree from '@/components/el/ItemComponent/biz/support/SearchTree';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableFormItems,
  getAddModalForm
} from './config';
// import { getTableColumns } from '../Item/config';
import './index.less';

const { Option } = Select;

const generateList = (target, data, handler) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    let obj = { key, title };
    if (handler) {
      const obj2 = handler(node);
      if (obj2) {
        obj = obj2;
      }
    }
    target.push(obj);
    if (node.children) {
      generateList(target, node.children, handler);
    }
  }
};
interface Props {
  history: history;
  match: any;
  style: any;
  push: push;
}
interface State {
  loadding: boolean;
  tableRef: any;
  modalSatus: boolean;
  treeData: Array<any>;
  treeDataIndex: number;
  tableIndex: number;
  selectedNode: any;
  checkedKeys: Array<any>;
  selectedRowKeys: Array<any>;
  leafNodes: any[];
  halfCheckedKeys: any[];
}

export default class BusinessDirectory extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      loadding: false,
      tableRef: null,
      modalSatus: false,
      treeData: [],
      treeDataIndex: 0,
      tableIndex: 1,
      selectedNode: '',
      checkedKeys: [],
      selectedRowKeys: [],
      leafNodes: [],
      halfCheckedKeys: []
    };
  }
  componentDidMount() {
    this.getTreeData();
  }

  getTreeData = async () => {
    const { tableIndex, treeDataIndex } = this.state;
    let treeData = [];
    let leafNodes = [];
    const res: any = await service.getTreeData();
    if (res?.success) {
      treeData = JSON.parse(
        JSON.stringify(res.data || [])
          .replace(/buName/g, 'title')
          .replace(/id/g, 'key')
          .replace(/treeNodes/g, 'children')
      );
    }
    const getNode = (data) => {
      if (!data) {
        return undefined;
      }
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].children) {
          getNode(data[i].children);
        } else {
          leafNodes.push(data[i].key);
        }
      }
    };
    getNode(treeData);
    this.setState({
      leafNodes,
      treeData,
      treeDataIndex: treeDataIndex + 1,
      tableIndex: tableIndex + 1
    });
  };

  getTableActionButtons = (): Array<ActionButtonProps> => [
    {
      text: '配置经营目录',
      key: 'publish',
      minSelection: 1,
      disabled: false,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.setState({
          selectedRowKeys
        });
        this.changeModalStatus(true);
      }
    },
    {
      text: '解绑经营目录',
      key: 'delete',
      minSelection: 1,
      disabled: false,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.deleteModalStatus(selectedRowKeys);
      }
    }
    // {
    //   text: '编辑经营属性',
    //   key: 'edit',
    //   minSelection: 1,
    //   maxSelection: 1,
    //   disabled: false,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) => {
    //     this.handleEditItem(selectedRowKeys[0]);
    //   }
    // {
    //   text: '编辑经营属性',
    //   key: 'edit',
    //   minSelection: 1,
    //   maxSelection: 1,
    //   disabled: false,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) => {
    //     this.skipRouterFn(selectedRowKeys[0]);
    //   }
    // },
    // {
    //   text: '导出',
    //   key: 'export',
    //   disabled: false,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) => {
    //     console.log(selectedRows);
    //   }
    // },
    // {
    //   text: '导入',
    //   key: 'import',
    //   disabled: false,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) => {
    //     console.log(selectedRows);
    //   }
  ];

  // 跳转方法
  handleEditItem = (id = '') => {
    if (!id) {
      this.setState({ modalSatus: true });
    } else if (id) {
      this.props.push(`/itemCenter/businessDirectory/edit/edit/${id}`);
    }
  };

  // 增加商品跳转
  addItem = () => {
    this.changeModalStatus(true);
  };

  addMultipleItems = () => {
    //
  };

  changeModalStatus = (status) => {
    this.setState({ modalSatus: status });
  };

  // 解绑经营目录
  deleteModalStatus = async (selectedRowKeys) => {
    this.setState({ loadding: true })
    const res = await service.deleteItems(selectedRowKeys);
    this.setState({ loadding: false })
    if (res.success) {
      this.tableRef.refreshData();
      ElNotification({
        type: 'success',
        message: res.data || res.msg || ' 操作成功'
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || ' 操作失败'
      })
    }
  }

  handleOk = () => {
    const { checkedKeys, selectedRowKeys, halfCheckedKeys } = this.state;
    this.setState(
      {
        loadding: true
      },
      async () => {
        const res = await service.configItemToBusiness(
          Array.from(new Set([...checkedKeys, ...halfCheckedKeys])).join(','),
          selectedRowKeys.join(','),
        );
        this.setState({
          loadding: false
        });
        if (res?.success) {
          this.handleCancel();
          ElNotification({
            type: 'success',
            message: '配置成功'
          });
        } else {
          ElNotification({
            type: 'error',
            message: res.data || res.msg || '配置失败'
          });
        }
      }
    );
  };

  handleCancel = () => {
    this.setState({
      modalSatus: false
    });
  };

  handleSelectNode = (keys: Array<any>, { selectedNodes }) => {
    console.log(selectedNodes);
    if (keys.length) {
      this.setState(
        {
          selectedNode: selectedNodes[0]
        },
        () => {
          this.tableRef.refreshData();
        }
      );
    }
  };

  //处理商品品类同级数组
  getCatePathCode = (data) => {
    let result = [];
    if (!data) {
      return result;
    }
    result.push(data[0].itemCateName);
    if (!data[0].treeNodes) {
      return result;
    }
    result.push(...this.getCatePathCode(data[0].treeNodes));
    return result;
  };

  onPubTreeCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys: checkedKeys,
      halfCheckedKeys: info.halfCheckedKeys
    });
  };

  render() {
    const { modalSatus, treeData, treeDataIndex, tableIndex, selectedNode } =
      this.state;
    return (
      <div style={{ height: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col span={6} style={{ borderRight: '5px solid #f5f5f5' }}>
            <SearchTree
              dataIndex={treeDataIndex}
              treeData={treeData}
              onSelect={this.handleSelectNode}
            />
          </Col>
          <Col span={18}>
            <ElPage spinning={this.state.loadding}>
              <ElSearchTable
                key={tableIndex}
                rowKey='id'
                tableId='support_itemCenter_businessDirectoryList'
                bordered
                onRef={(ref) => {
                  this.tableRef = ref;
                }}
                actionButtons={this.getTableActionButtons()}
                tableProxy={{
                  request: async (paramData) => {
                    paramData.orders = [{ asc: false, column: 'createTime' }];
                    paramData.brand = paramData.brandNames?.brandCode;
                    delete paramData.brandNames;
                    if (selectedNode) {
                      // paramData.buId = selectedNode.key;
                      paramData.buId = selectedNode.buId;
                    }
                    // paramData.lotFlag = paramData.lotFlag?.length > 0 ? true : null;
                    // paramData.snFlag = paramData.snFlag?.length > 0 ? true : null;
                    // paramData.guaranteeFlag = paramData.guaranteeFlag?.length > 0 ? true : null;
                    const res: any = await service.search({
                      ...paramData
                    });
                    if (res && res.success) {
                      res.data.records.forEach((item) => {
                        item.itemCatePathName = this.getCatePathCode(
                          item.itemCatePath
                        ).join('/');
                      });
                    }
                    return res;
                  },
                  successCallBack: (tableRef) => {
                    this.setState({
                      tableRef
                    });
                  },
                  errCallBack: () => {
                    console.log('err');
                  },
                  props: {
                    success: 'success',
                    result: 'data.records',
                    total: 'data.total'
                  },
                  autoLoad: false
                }}
                searchFormProps={getTableSearchFormItems()}
                columns={getTableColumns()}
                scroll={{
                  x: 'max-content'
                }}
              />
            </ElPage>
          </Col>
        </Row>
        <Modal
          visible={modalSatus}
          title='发布商品'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <SearchTree
            dataIndex={treeDataIndex}
            treeData={treeData}
            disableCheckboxIds={[selectedNode.key]}
            checkable
            // checkStrictly
            onCheck={this.onPubTreeCheck}
            height={400}
          />
        </Modal>
      </div>
    );
  }
}
