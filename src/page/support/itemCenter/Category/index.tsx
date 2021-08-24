//商品品类
import React, { PureComponent } from 'react';
import { Tree, Input, Empty, Card, Button, Modal } from 'antd';
import {
  PlusOutlined,
  ImportOutlined,
  CheckCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  PoweroffOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { ElForm, ElCard, ElSearchTable } from '@/components/el';
import { createItemCate, getTreeList, updateItemCate, deleteItemCate, getCateDetailById, switchStatus, getCateConPara } from './service';
import { addForm, editForm, editParamsForm, getEditTableColumns, getEditTableActionButtons, editCardForm } from './config';
import './index.less';
import { ElNotification } from '@/components/el';
import SelectTagModal from '../Item/Add/components/SelectTagModal';

interface Props { }

interface State {
  showInfo: any;
  treeData: any;
  selectedId: Array<any>;
  editStatus: boolean;
  formData: any;
  attrList: Array<any>;
  paramsData: Array<any>;
  type: string;
  defaultActiveKey: string;
  submitIndex: number;
  addType: string;
  selectedColumn: Object;
  expandedKeys: any;
  searchValue: any;
  autoExpandParent: boolean;
  selectItemModal: boolean;
}

const { Search } = Input;

export default class CategoryMgmt extends PureComponent<Props, State> {
  static propTypes = {};
  dataList = [];
  basicRef: any;
  attrRef: any;
  paramsRef: any;
  tabsRef: any;
  addRef: any;
  editRef: any;
  allData: Array<any>;
  editParamsRef: any;
  editTagRef: any;
  editCardRef: any;

  constructor(props) {
    super(props);
    this.state = {
      // 定义左侧树形目录数据
      treeData: [],
      showInfo: '',
      selectedId: [],
      editStatus: false,
      formData: {},
      attrList: [],
      paramsData: [],
      type: '',
      defaultActiveKey: '1',
      submitIndex: 1,
      addType: '',
      selectedColumn: {},
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      selectItemModal: false,
    };
    this.allData = [];
  }

  componentDidMount() {
    this.getTreeList();
  }

  getTreeList = async () => {
    const res = await getTreeList();
    if (res && res.success && res.data) {
      // 替换tree组件识别显示的名称
      this.allData = this.mapAllTreeData(res.data);
      this.setState({ treeData: this.allData }, () => {
        this.generateList(this.allData)
      })
    }
  };

  mapAllTreeData = (list) => {
    return list && list.map((item) => {
      item.title = item.itemCateName;
      item.key = item.id;
      item.children = item.treeNodes;
      if (item.children) {
        this.mapAllTreeData(item.children);
      }
      return item;
    });
  };

  handleAttrRef = (ref) => {
    this.attrRef = ref;
  };

  handleParamsRef = (ref) => {
    this.paramsRef = ref;
  };

  // 点击树节点触发
  onSelect = async (keys: React.Key[]) => {
    if (keys && keys.length > 0) {
      const result = await this.getDetailById(keys);
      const data = await getCateConPara(result.itemCateCode);
      if (!result.cateTags) {
        result.cateTags = [];
      }
      const obj = {};
      data.data.forEach(a => {
        const key = a.controlParamCode;
        const value = key === 'financialType' ? a.controlParamValue : Number(a.controlParamValue);
        obj[key] = value;
      })
      result.contrParaVos = obj;
      if (!result.qualifyTypes) {
        result.qualifyTypes = []
      }
      this.setState({
        selectedId: keys,
        addType: '',
        editStatus: false,
        type: 'view',
        selectedColumn: result
      });
    } else {
      this.setState({
        selectedId: keys,
        addType: '',
        editStatus: false,
        type: '',
        selectedColumn: ''
      });
    }

  };

  handleTreeCheck = (keys: React.Key[], info: any) => {

  };

  //根据id获取下层节点详情
  getDetailById = async (id) => {
    if (!id) {
      return;
    }
    const res = await getCateDetailById(id[0]);
    if (res.data.status === 'ENABLE') {
      res.data.status = true;
    } else {
      res.data.status = false;
    }
    return res.data;
  }

  // 展开/收起节点时触发
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  onSearch = value => {
    const expandedKeys = this.dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          // return this.getParentKey(item.key, this.state.treeData);
          return item.key;
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  handleAddCategory = (e) => {
    // 添加子分类
    this.setState({ addType: 'child', editStatus: true, type: 'create' });
  };

  handleAddRootCategory = async (e) => {
    // 添加根分类
    this.setState({ addType: 'root', editStatus: true, type: 'create' });
  };

  handleImportCategory = (e) => {
    //
  };

  handleApprove = (e) => {
    //
  };

  handleEditCategory = () => {
    //
    this.setState({ editStatus: true, type: 'edit' });
  };

  handleDeleteCategory = () => {
    const { selectedColumn } = this.state;
    const that = this;
    //删除
    Modal.confirm({
      title: '确定删除品类？',
      async onOk(close) {
        const res = await deleteItemCate(selectedColumn['id']);
        ElNotification({
          type: res.success ? 'success' : 'error',
          message: res.msg
        });
        if (res && res.success) {
          that.getTreeList();
          that.setState({ editStatus: false, addType: '', type: 'view' });
        }
        close();
      },
      onCancel() {
      },
    })
  };
  //启用品类
  handleEnableCategory = async () => {
    const { selectedColumn } = this.state;
    const that = this;
    if (selectedColumn['status']) {
      return false;
    }
    Modal.confirm({
      title: '确认启用此品类吗？',
      async onOk(close) {
        const res = await switchStatus({ ids: [selectedColumn['id']], status: 'ENABLE' });
        ElNotification({
          type: res.success ? 'success' : 'error',
          message: res.msg
        });
        if (res && res.success) {
          await that.getTreeList();
          await that.onSelect(that.state.selectedId);
        }
        close();
      },
      onCancel() {
      },
    })
  };
  //禁用
  handleDisableCategory = () => {
    const { selectedColumn } = this.state;
    const that = this;
    if (!selectedColumn['status']) {
      return false;
    }
    let title = '确认禁用此品类吗？'
    if (selectedColumn['itemCateIsBasic'] === 0) {
      title = '此品类下的所有品类都会禁用，确定禁用？'
    }
    Modal.confirm({
      title: title,
      async onOk(close) {
        const res = await switchStatus({ ids: [selectedColumn['id']], status: 'DISABLE' });
        ElNotification({
          type: res.success ? 'success' : 'error',
          message: res.msg
        });
        if (res && res.success) {
          await that.getTreeList();
          await that.onSelect(that.state.selectedId);
        }
        close();
      },
      onCancel() {
      },
    })
  };
  //取消编辑状态
  handleCancelEdit = async () => {
    this.setState({ editStatus: false, type: this.state.selectedId ? 'view' : '' });
  };
  async _getWholeData() {
    let baseBalidRef;
    if (this.state.type === 'edit') {
      baseBalidRef = await this.editRef.validateFields();
    } else {
      baseBalidRef = await this.addRef.validateFields();
    }
    let editParamsData = [];
    const data = await this.editParamsRef.validateFields();
    const cardData = await this.editCardRef.validateFields();
    for (let key in data) {
      editParamsData.push({
        controlParamCode: key,
        controlParamValue: data[key],
        itemCateCode: this.state.selectedColumn['itemCateCode']
      })
    }
    let editTagData = this.state.selectedColumn['cateTags'];
    return { ...baseBalidRef, contrParaSaveParams: editParamsData, tagSaveParams: editTagData, ...cardData };
  }
  handleSave = async () => {
    let res: any;
    const data = await this._getWholeData();
    if (this.state.type === 'create') {
      data.status = data.status == true ? 'ENABLE' : 'DISABLE';
      if (this.state.addType === 'child') {
        data.pid = this.state.selectedColumn['id'];
        data.level = this.state.selectedColumn['level'] + 1;
      }
      res = await createItemCate(data);
    } else if (this.state.type === 'edit') {
      data.id = this.state.selectedColumn['id'];
      data.level = this.state.selectedColumn['level'];
      data.pid = this.state.selectedColumn['pid'];
      data.status = this.state.selectedColumn['status'] ? 'ENABLE' : 'DISABLE';
      res = await updateItemCate(data);
    }
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res.success) {
      await this.getTreeList(); // 异步处理
      if (this.state.selectedId) {
        await this.onSelect(this.state.selectedId);
      } else {
        this.setState({ editStatus: false, addType: '', type: '' });
      }
    }
  };

  //获取节点信息
  generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title } = node;
      this.dataList.push({ key, title });
      if (node.children) {
        this.generateList(node.children);
      }
    }
  };

  renderActionGroup() {
    const { selectedId, selectedColumn } = this.state;
    return (
      <>
        <Button
          className='btn-item'
          type='primary'
          icon={<FormOutlined />}
          onClick={this.handleEditCategory}
          disabled={selectedId && selectedId.length !== 1}
        >
          编辑
        </Button>
        <Button
          className='btn-item'
          danger={false}
          icon={<DeleteOutlined />}
          onClick={this.handleDeleteCategory}
        >
          删除
        </Button>
        <Button
          className='btn-item'
          type='primary'
          icon={<CheckCircleOutlined />}
          onClick={this.handleEnableCategory}
          disabled={selectedId && selectedId.length !== 1}
        >
          启用
        </Button>
        <Button
          className='btn-item'
          danger
          icon={<PoweroffOutlined />}
          onClick={this.handleDisableCategory}
          disabled={selectedId && selectedId.length !== 1}
        >
          禁用
        </Button>
      </>
    );
  }
  //添加标签
  addRows = () => {
    this.setState({
      selectItemModal: true
    })
  }
  deleteRows = (rows) => {
    let data = Object.assign([], this.state.selectedColumn['cateTags']);
    data = this.deleteArray(data, rows);
    this.setState({
      selectedColumn: { ...this.state.selectedColumn, cateTags: data }
    })
  }
  deleteArray = (arr1, arr2) => {
    arr1 = arr1.filter(item => {
      let idList = arr2.map(v => v)
      return !idList.includes(item.id)
    })
    return arr1;
  }
  /**
   * 关闭添加数据对话框
   */
  closeSelectItemModal = () => {
    this.setState({
      selectItemModal: false
    })
  }
  mergeArray = (arr1, arr2) => {
    arr1 = arr1.filter(item => {
      let idList = arr2.map(v => v.id)
      return !idList.includes(item.id)
    })
    return arr1.concat(arr2);
  }
  onAdd = (selectedData: any) => {
    let selectionTag = [];
    if (this.state.selectedColumn['cateTags']) {
      selectionTag = Object.assign([], this.state.selectedColumn['cateTags'])
    }
    let data = this.mergeArray(selectionTag, selectedData.selectedRows);
    this.setState({
      selectedColumn: { ...this.state.selectedColumn, cateTags: data }
    }, () => {
      this.closeSelectItemModal()
    });
  }

  /**
   * 删除数据
   */
  handleDelete = () => {

  }
  handleAdd = () => {

  }

  renderListContent() {
    const {
      type,
      addType,
      selectedColumn
    } = this.state;

    const empty = (
      <Empty description='暂无数据，请选择菜单进行查看' className='empty' />
    );

    const add = (
      <>
        <ElCard key='add' id='add' title='基本信息'>
          <ElForm
            data={{ itemCateIsBasic: selectedColumn['level'] > 1 ? 1 : 0, status: true }}
            onRef={(ref) => (this.addRef = ref)}
            formProps={{
              items: addForm(addType),
              labelCol: { span: 5 },
              wrapperCol: { span: 15 }
            }}
            rowClassName='detail-info-form'
            key='supportCategoryAddBase'
          />
        </ElCard>
        {(selectedColumn['level'] === 2 && addType === 'child') && <ElCard key='params' id='params' title='管控参数维护'>
          <ElForm
            data={{ itemCateIsBasic: 1, snFlag: 1, lotFlag: 1, guaranteeFlag: 1 }}
            onRef={(ref) => (this.editParamsRef = ref)}
            formProps={{
              items: editParamsForm({}, type),
              labelCol: { span: 5 },
              wrapperCol: { span: 15 }
            }}
            rowClassName='detail-info-form'
            key='supportCategoryEditParams'
          />
        </ElCard>}
        {(selectedColumn['level'] === 2 && addType === 'child') && <ElCard key='tag' id='tag' title='标签维护'>
          <ElSearchTable
            bordered
            mode={{
              proxy: false, // 筛选器
              search: false,  // searchForm
              action: true,
              pagination: false, // 分页
              descriptions: false,// descriptions
              tabs: false
            }}
            rowKey='id'
            columns={getEditTableColumns(type)}
            dataSource={[]}
            onRef={(ref) => (this.editTagRef = ref)}
            rowSelectionConfig={{
              type: 'checkbox',
              fixed: true,
              disabledRowIds: []
            }}
            actionButtons={getEditTableActionButtons(this.addRows, this.deleteRows, type)}
          />
        </ElCard>}
        {(selectedColumn['level'] === 2 && addType === 'child') && <ElCard key='card' id='card' title='证照维护'>
          <ElForm
            data={[]}
            onRef={(ref) => (this.editCardRef = ref)}
            formProps={{
              items: editCardForm(type),
              labelCol: { span: 5 },
              wrapperCol: { span: 15 }
            }}
            rowClassName='detail-info-form'
            key='supportCategoryEditCard'
          />
        </ElCard>}
      </>
    );
    const edit = (
      <>
        <ElCard key='edit' id='edit' title='基本信息'>
          <ElForm
            data={selectedColumn}
            onRef={(ref) => (this.editRef = ref)}
            formProps={{
              items: editForm(selectedColumn, type),
              labelCol: { span: 5 },
              wrapperCol: { span: 15 }
            }}
            rowClassName='detail-info-form'
            key='supportCategoryEditBase'
          />
        </ElCard>
        {selectedColumn['itemCateIsBasic'] === 1 && <ElCard key='params' id='params' title='管控参数维护'>
          <ElForm
            data={selectedColumn['contrParaVos']}
            onRef={(ref) => (this.editParamsRef = ref)}
            formProps={{
              items: editParamsForm(selectedColumn['contrParaVos'], type),
              labelCol: { span: 5 },
              wrapperCol: { span: 15 }
            }}
            rowClassName='detail-info-form'
            key='supportCategoryEditParams'
          />
        </ElCard>}
        {selectedColumn['itemCateIsBasic'] === 1 && <ElCard key='tag' id='tag' title='标签维护'>
          <ElSearchTable
            bordered
            mode={{
              proxy: false, // 筛选器
              search: false,  // searchForm
              action: true,
              pagination: false, // 分页
              descriptions: false,// descriptions
              tabs: false
            }}
            rowKey='id'
            columns={getEditTableColumns(type)}
            dataSource={selectedColumn['cateTags']}
            onRef={(ref) => (this.editTagRef = ref)}
            rowSelectionConfig={{
              type: 'checkbox',
              fixed: true,
              disabledRowIds: []
            }}
            actionButtons={getEditTableActionButtons(this.addRows, this.deleteRows, type)}
          />
        </ElCard>}
        {selectedColumn['itemCateIsBasic'] === 1 && <ElCard key='card' id='card' title='证照维护'>
          <ElForm
            data={selectedColumn}
            onRef={(ref) => (this.editCardRef = ref)}
            formProps={{
              items: editCardForm(type),
              labelCol: { span: 5 },
              wrapperCol: { span: 15 }
            }}
            rowClassName='detail-info-form'
            key='supportCategoryEditCard'
          />
        </ElCard>}
      </>
    );

    if (addType) {
      return add;
    }
    if (type === 'edit') {
      return edit;
    }

    if (type === 'view') {
      return edit;
    }

    return empty;
  }

  render() {
    const { treeData, selectedId, editStatus, selectedColumn, expandedKeys, autoExpandParent, selectItemModal } = this.state;
    return (
      <div className='item-center-category-wrapper'>
        <Card className='left-side-menu' bodyStyle={{ padding: '0', border: 'none' }}>
          <Search
            placeholder='请输入品类名称'
            onSearch={this.onSearch}
            style={{ width: 400, padding: '0px 10px' }}
          />
          {treeData.length > 0 && <Tree
            checkable
            className='tag-list'
            onSelect={this.onSelect}
            onCheck={this.handleTreeCheck}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={treeData}
          />}
        </Card>
        <Card className='list-content'>
          {editStatus ? (
            <>
              <div className='buttonLine'>
                <Button
                  className='btn-item'
                  icon={<CloseCircleOutlined />}
                  onClick={this.handleCancelEdit}
                >
                  取消编辑
              </Button>
                <Button
                  className='btn-item'
                  type='primary'
                  icon={<ImportOutlined />}
                  onClick={this.handleSave}
                >
                  保存
              </Button>
              </div>
            </>
          ) : (
            <div className='buttonLine'>
              <Button
                className='btn-item'
                type='primary'
                icon={<PlusOutlined />}
                onClick={this.handleAddRootCategory}
              >
                新增根分类
              </Button>
              {selectedColumn['id'] && selectedColumn['itemCateIsBasic'] === 0 && (
                <Button
                  className='btn-item'
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={this.handleAddCategory}
                >
                  新增子分类
                </Button>
              )}
              <Button
                className='btn-item'
                type='primary'
                icon={<ImportOutlined />}
                onClick={this.handleImportCategory}
              >
                商品品类导入
              </Button>
              <Button
                className='btn-item approve'
                type='default'
                icon={<CheckCircleOutlined />}
                onClick={this.handleApprove}
              >
                提交审核
              </Button>
              {selectedId && selectedId.length > 0 && this.renderActionGroup()}
            </div>
          )}
          {this.renderListContent()}
        </Card>
        {
          <SelectTagModal
            visible={selectItemModal}
            onAdd={this.onAdd}
            onClose={this.closeSelectItemModal}
          />
        }
      </div>
    );
  }
}
