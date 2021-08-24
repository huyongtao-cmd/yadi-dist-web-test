import React, { PureComponent } from 'react';
// import { history } from 'react-router-dom';
import { Button, Col, Row, Tree, Checkbox, Radio, Table, Modal, Spin } from 'antd';
import {
  ElNotification,
  ElCard,
  ElForm,
  ElRowContainer
} from '@/components/el';
import { clone } from 'ramda';
import * as service from './service';
import * as orgTreeService from '../orgTree/Edit/service';

import { getFormItems, getActionButtons } from './config';

import './index.less';
interface Props {
  // history: any;
  match: any;
}
interface State {
  [key: string]: any;
}

export default class App extends PureComponent<Props, State> {
  baseFormRef: any;
  treeData = [];
  roleDetail = {}
  constructor(props) {
    super(props);
    const { path, params } = props.match;
    let buTreeDId = params.id;
    this.state = {
      buTreeDId,
      id: null,
      isAdd: true,
      isShowAll: true,
      formIndex: 1,
      formData: {
      },
      acType: null,
      inheritType: null,
      treeData: [],
      selectedNode: {},
      saveLoading: false,
      roleLoading: false,
      config: {}
    };
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail = async () => {
    const { buTreeDId } = this.state;
    if (buTreeDId) {
      await this.getTreeDetail();
      const res = await service.getDetail({ buTreeDId });
      if (res?.success) {
        const {
          id,
          dpRoleCode,
          dpRoleName
        } = res.data;
        this.setState({
          isAdd: false,
          id,
          formData: {
            dpRoleCode,
            dpRoleName
          }
        })
      }
    }
  };


  getTreeDetail = async () => {
    this.setState({
      saveLoading: true
    });
    const { buTreeDId } = this.state;
    let treeData = [];
    if (buTreeDId) {
      const orgTreeRes = await orgTreeService.getDetail(buTreeDId);
      if (orgTreeRes?.success) {
        const { orgBuTreeDVOList } = orgTreeRes.data;
        treeData = JSON.parse(
          JSON.stringify(orgBuTreeDVOList || [])
            .replace(/buName/g, 'title')
            .replace(/id/g, 'key')
            .replace(/treeNodes/g, 'children')
        );
        this.treeData = treeData;
        this.setState({
          treeData
        })
      }
    }
    this.setState({
      saveLoading: false
    });
  }

  generateList = (target, data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title, pKey } = node;
      target.push({ key, title, pKey });
      if (node.children) {
        this.generateList(target, node.children);
      }
    }
  };

  /**
   * 按条件过滤出需要的数据
   * @param data
   * @param filter
   * @returns
   */
  filterTree(data, filter) {
    return data.reduce((arr, item) => {
      if (filter(item)) {
        if (item.children) {
          item.children = this.filterTree(item.children, filter);
        }
        arr.push(item);
      }
      return arr;
    }, []);
  }

  /**
   * 过滤已停用的
   */
  handleFilterByStatus = (e) => {
    let checked = e.target.checked;
    const treeDataView = this.getFilteredDataByStatus(checked);
    this.setState({
      isShowAll: checked,
      treeData: treeDataView
    });
  };

  getFilteredDataByStatus(status) {
    let data = clone(this.treeData);
    if (!status) {
      data = this.filterTree(data, (item) => {
        return item.buStatus === 'ACTIVE';
      });
    }
    return data;
  }

  onSelectNode = (
    selectedKeys,
    e: { selected: boolean; selectedNodes: Array<any>; node: any; event: any }
  ) => {
    console.log(e.selectedNodes);
    if (e.selected) {
      const selectedNode = e.selectedNodes[0];
      this.setState({
        selectedNode
      });
      this.getRoleDetil(selectedNode.key);
    } else {
      this.roleDetail = {}
      this.setState({
        selectedNode: {},
        acType: null,
        inheritType: null,
      });
    }
  };

  getRoleDetil = async (buTreeDId) => {
    this.setState({
      roleLoading: true
    });
    const res = await service.getNodeDetail({ buTreeDId });
    if (res?.success) {
      const { dpRoleCode, acType, inheritType } = res.data;
      this.roleDetail = res.data;
      this.setState({
        acType,
        inheritType
      });
    }
    this.setState({
      roleLoading: false
    });
  }

  handleBaseInfoSave = async () => {
    this.setState({
      saveLoading: true
    });
    await this.baseFormRef.validateFields()
      .then(async (formData) => {
        const res = await service.saveData(formData);
        if (res?.success) {
          ElNotification({
            type: 'success',
            message: '保存成功'
          });
          this.setState({
            id: res.data,
            isAdd: false,
            formData
          });
        } else {
          ElNotification({
            type: 'error',
            message: res.msg
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
    this.setState({
      saveLoading: false
    });
  };

  handleConfigSave = async () => {
    this.setState({
      saveLoading: true
    });
    const { acType, inheritType } = this.state;
    if (acType === null || inheritType === null) {
      ElNotification({
        type: 'warning',
        message: '请选设置限配置'
      });
    } else {
      const { id,
        selectedNode: { key, buId },
        formData: { dpRoleCode, dpRoleName }
      } = this.state;
      const params = {
        acType,
        buId,
        buTreeDId: key,
        createType: inheritType,
        dpRoleCode,
        id,
        inheritType,
      }
      const res = await service.saveConfig({ query: params });
      if (res?.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        })
      }
    }

    this.setState({
      saveLoading: false
    });
  };

  handleChangeRadio = (
    array: Array<{
      key: string,
      value: any
    }>
  ) => {
    const state = {}
    array.map((obj) => {
      const { key, value } = obj;
      state[key] = value ? value : null;
    });
    this.setState({
      ...state
    })
  }

  render() {
    const {
      isAdd, isShowAll,
      saveLoading, roleLoading,
      formData, treeData, selectedNode,
      acType, inheritType
    } = this.state;
    return (
      <div className='content'>
        <ElRowContainer
          blocks={getActionButtons({
            isAdd,
            saveLoading: this.state.saveLoading,
            handleBaseInfoSave: this.handleBaseInfoSave
          })}
          position='top'
        />
        <div className='content-button'></div>
        <ElCard title='基本信息'>
          <ElForm
            onRef={(ref) => (this.baseFormRef = ref)}
            data={formData}
            formProps={{
              items: getFormItems({ isAdd })
            }}
          />
        </ElCard>

        <Row gutter={10}>
          <Col span={8} className='tree'>
            <ElCard
              title='具体权限'
              extra={<>
                <Button type='primary' size='small' disabled={isAdd || saveLoading} onClick={this.handleConfigSave}>保存</Button>
                <Button type='primary' size='small' disabled={isAdd} onClick={this.getTreeDetail}>刷新</Button>
              </>}
            >
              <div>
                树形显示内容：
              <Checkbox onChange={this.handleFilterByStatus} checked={isShowAll}>
                  包括已停用的
              </Checkbox>
              </div>
              <Spin spinning={saveLoading}>
                <Tree onSelect={this.onSelectNode} treeData={treeData} />
              </Spin>
            </ElCard>
          </Col>
          <Col span={16}>
            <Spin spinning={roleLoading}>
              <ElCard title='针对选中节点'>
                {selectedNode?.title ? selectedNode?.title : '<无>'}
              </ElCard>
              <ElCard title='访问控制'>
                <Radio.Group value={acType} onChange={(e) => { this.handleChangeRadio([{ key: 'acType', value: e.target.value }]) }} disabled={!(!isAdd && selectedNode.key)}>
                  <Radio value={1}>完全控制</Radio>
                  <Radio value={2}>读写</Radio>
                  <Radio value={3}>只读</Radio>
                </Radio.Group>
              </ElCard>
              <ElCard title='层级'>
                <Radio.Group value={inheritType} onChange={(e) => { this.handleChangeRadio([{ key: 'inheritType', value: e.target.value }]) }} disabled={!(!isAdd && selectedNode.key)}>
                  <Radio value={1}>本层</Radio>
                  <Radio value={2}>本层及所有下层</Radio>
                </Radio.Group>
              </ElCard>
            </Spin>
          </Col>
        </Row>
      </div>
    );
  }
}
