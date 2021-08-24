import React from 'react';
import {
  ElRowContainer,
  ElForm,
  ElNotification,
  ElSearchTable
} from '@/components/el';
import {
  getActionButtons,
  getMenuEditForm,
  getActionEditForm,
  getTableActionButtons,
  getTableColumns
} from './config';
import { Row, Col, Tree, FormInstance, Modal, Skeleton, Input } from 'antd';
import {
  getMenuTree,
  getMenuById,
  createAction,
  createMenu,
  updateMenuOrAction,
  getActionByMenuId
} from './service';
import { isEmpty } from 'ramda';
import './style.less';
interface State {
  menuVisible: boolean;
  menuEditButtonLoading: boolean;
  menuSaveButtonLoading: boolean;
  actionVisible: boolean;
  actionSaveButtonLoading: boolean;
  menuFormRef: FormInstance;
  actionFormRef: FormInstance;
  tempMenuRecord: object;
  tempActionRecord: object;
  tableRef: any;
  treeData: any;
  selectedNode: any;
  actionDataSource: any[];
  treeLoading: boolean;
  isEdit: boolean;
  menuList: Array<any>;
  expandedKeys: Array<any>;
  searchValue: string;
}
class Permission extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      menuEditButtonLoading: false,
      menuSaveButtonLoading: false,
      actionVisible: false,
      actionSaveButtonLoading: false,
      menuFormRef: null,
      actionFormRef: null,
      tempMenuRecord: { isHidden: false },
      tempActionRecord: { sortNo: 0 },
      tableRef: null,
      treeData: [],
      selectedNode: {},
      actionDataSource: [],
      treeLoading: false,
      isEdit: false,
      menuList: [],
      expandedKeys: [],
      searchValue: ''
    };
  }
  componentDidMount() {
    this.getMenuTree();
  }
  getMenuTree = async () => {
    this.setState({
      treeLoading: true
    });
    const res = await getMenuTree();
    if (res.success) {
      this.setState(
        {
          treeData: res.data
        },
        () => {
          this.generateList(res.data);
        }
      );
    }
    this.setState({
      treeLoading: false
    });
  };
  generateList = (arr: Array<any>) => {
    let dataList = [];
    const generate = (data) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({ key, title: title });
        if (node.children) {
          generate(node.children);
        }
      }
    };
    generate(arr);
    this.setState({
      menuList: dataList
    });
  };
  handleMenuCreate = () => {
    const { menuFormRef, selectedNode } = this.state;
    this.setState(
      {
        menuVisible: true,
        tempMenuRecord: {
          isHidden: false,
          parentId: !isEmpty(selectedNode) ? selectedNode.key : 0
        }
      },
      () => {
        menuFormRef.setFieldsValue(this.state.tempMenuRecord);
      }
    );
  };
  handleMenuEdit = async () => {
    const { menuFormRef, selectedNode } = this.state;
    this.setState({
      menuEditButtonLoading: true
    });
    const res = await getMenuById(selectedNode.key);
    if (res.success && menuFormRef) {
      this.setState(
        {
          menuVisible: true,
          tempMenuRecord: res.data
        },
        () => {
          menuFormRef.setFieldsValue(res.data);
        }
      );
    }
    this.setState({
      menuEditButtonLoading: false
    });
  };
  handleActionCreate = () => {
    const { actionFormRef, tempActionRecord, selectedNode } = this.state;
    this.setState(
      {
        actionVisible: true,
        tempActionRecord: {
          parentId: !isEmpty(selectedNode) ? selectedNode.key : 0,
          sortNo: 0
        },
        isEdit: false
      },
      () => {
        actionFormRef.setFieldsValue(tempActionRecord);
      }
    );
  };
  handleActionEdit = async (selectedRows) => {
    const { actionFormRef } = this.state;
    this.setState(
      {
        actionVisible: true,
        tempActionRecord: selectedRows[0],
        isEdit: true
      },
      () => {
        actionFormRef.setFieldsValue(selectedRows[0]);
      }
    );
  };
  getTableData = async (key) => {
    const { tableRef } = this.state;
    tableRef.setLoading(true);
    const res = await getActionByMenuId(key);
    if (res.success) {
      this.setState({
        actionDataSource: res.data
      });
    }
    tableRef.setLoading(false);
  };
  handleTreeSelect = (selectedKeys, e) => {
    if (e.selected) {
      this.setState(
        {
          selectedNode: e.selectedNodes[0]
        },
        () => {
          this.getTableData(this.state.selectedNode.key);
        }
      );
    } else {
      this.setState({
        selectedNode: {}
      });
    }
  };
  closeMenuModal = () => {
    const { menuFormRef } = this.state;
    this.setState({
      menuVisible: false
    });
    this.getMenuTree();
    menuFormRef.resetFields();
  };
  handleMenuSave = async () => {
    const { menuFormRef, tempMenuRecord } = this.state;
    if (menuFormRef) {
      let data = await menuFormRef.validateFields();
      if (!isEmpty(tempMenuRecord)) {
        data = { ...tempMenuRecord, ...data };
      }
      this.setState({
        menuSaveButtonLoading: true
      });
      let res;
      if (data.id) {
        res = await updateMenuOrAction(data);
      } else {
        res = await createMenu(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        menuSaveButtonLoading: false
      });
    }
  };
  closeActionModal = () => {
    const { actionFormRef } = this.state;
    this.setState({
      actionVisible: false
    });
    this.getTableData(this.state.selectedNode.key);
    actionFormRef.resetFields();
  };
  handleActionSave = async () => {
    const { actionFormRef, tempActionRecord } = this.state;
    if (actionFormRef) {
      let data = await actionFormRef.validateFields();
      if (!isEmpty(tempActionRecord)) {
        data = { ...tempActionRecord, ...data };
      }
      let res;
      this.setState({
        actionSaveButtonLoading: true
      });
      if (data.id) {
        res = await updateMenuOrAction(data);
      } else {
        res = await createAction(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        actionSaveButtonLoading: false
      });
    }
  };
  onSearch = (value) => {
    const expandedKeys = this.state.menuList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          // return this.getParentKey(item.key, this.state.treeData);
          console.log(item);
          return item.key;
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value
    });
  };
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys
    });
  };
  render() {
    const loop = (data) =>
      data.map((item) => {
        const index = item.title.indexOf(this.state.searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(
          index + this.state.searchValue.length
        );
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className='select-node'>{this.state.searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key
        };
      });
    return (
      <>
        <ElRowContainer
          needBackButton={false}
          position='top'
          blocks={getActionButtons({
            handleMenuCreate: this.handleMenuCreate,
            handleMenuEdit: this.handleMenuEdit,
            selectedNode: this.state.selectedNode,
            menuEditButtonLoading: this.state.menuEditButtonLoading
          })}
        />
        <Modal
          destroyOnClose={false}
          visible={this.state.menuVisible}
          okButtonProps={{
            disabled: this.state.menuSaveButtonLoading,
            loading: this.state.menuSaveButtonLoading
          }}
          okText='保存'
          title='菜单维护'
          onCancel={this.closeMenuModal}
          onOk={this.handleMenuSave}
          forceRender={true}
        >
          <ElForm
            formProps={getMenuEditForm()}
            onRef={(menuFormRef) => this.setState({ menuFormRef })}
          />
        </Modal>
        <Modal
          destroyOnClose={false}
          visible={this.state.actionVisible}
          okButtonProps={{
            disabled: this.state.actionSaveButtonLoading,
            loading: this.state.actionSaveButtonLoading
          }}
          okText='保存'
          title='能力维护'
          onCancel={this.closeActionModal}
          onOk={this.handleActionSave}
          forceRender={true}
        >
          <ElForm
            formProps={getActionEditForm(this.state.isEdit)}
            onRef={(actionFormRef) => this.setState({ actionFormRef })}
          />
        </Modal>
        <Row className='el-permission-row'>
          <Col span={7} className='el-permission-col'>
            {/* <Input.Search /> */}
            {this.state.treeLoading ? (
              <Skeleton />
            ) : (
              <>
                <Input.Search
                  placeholder='请输入菜单名称'
                  onSearch={this.onSearch}
                  style={{ width: '100%', padding: '6px 10px' }}
                />
                <Tree
                  autoExpandParent={true}
                  onExpand={this.onExpand}
                  expandedKeys={this.state.expandedKeys}
                  treeData={loop(this.state.treeData)}
                  onSelect={this.handleTreeSelect}
                />
              </>
            )}
          </Col>
          <Col span={17}>
            <div hidden={isEmpty(this.state.selectedNode)}>
              <ElSearchTable
                tableId='sys_permission'
                dataSource={this.state.actionDataSource}
                onRef={(tableRef) => {
                  this.setState({
                    tableRef
                  });
                }}
                mode={{
                  proxy: false,
                  search: false,
                  action: true,
                  pagination: true
                }}
                columns={getTableColumns()}
                pageSize={20}
                actionButtons={getTableActionButtons({
                  handleActionCreate: this.handleActionCreate,
                  handleActionEdit: this.handleActionEdit,
                  selectedNode: this.state.selectedNode
                })}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
export default Permission;
