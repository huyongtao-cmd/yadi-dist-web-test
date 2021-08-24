import React, { PureComponent } from 'react';
// import { history } from 'react-router-dom';
import MultiTabMobx from '@/store/multiTab';
import { Button, Col, Row, Tree, Checkbox, Radio, Table, Modal } from 'antd';
import BuListSelector from './components/BuListSelector';
import {
    ElNotification,
    ElCard,
    ElForm,
    ElRowContainer
} from '@/components/el';
import {
    SaveWhite,
    SubmitWhite,
    AddBlue,
    DeleteRed,
    CancelBlack,
} from '@/components/el/ElIcon';

import { clone } from 'ramda';

import * as service from './service';

import { getFormItems, getTableColumns } from './config';

import './index.less';
interface Props {
    // history: any;
    match: any;
}
interface State {
    [key: string]: any
}


/**
 * 深克隆
 * @param data 
 * @returns 
 */
function deepClone(data: any) {
    return clone(data);
}
export default class App extends PureComponent<Props, State>{
    multiTabStore: any;
    baseFormRef: any;
    buSelectotRef: any;
    treeData = [];
    treeDataView = [];
    dataList = [];
    dataListView = [];
    constructor(props) {
        super(props)
        const { path, params } = props.match;
        this.multiTabStore = MultiTabMobx;
        let isAdd = true;
        let isNewVer = false;
        let id;
        let nowVersion = 1;
        if (path.includes('/add')) {
            isAdd = true
        } else if (path.includes('/edit')) {
            isAdd = false;
            isNewVer = false;
            id = params.id;
            nowVersion = params.version;
        } else if (path.includes('/newVersion')) {
            isAdd = false;
            isNewVer = true;
            id = params.id;
            nowVersion = params.version;
        }
        this.state = {
            id,
            isAdd,
            nowVersion,
            formData: {
                nowVersion: isNewVer ? ++nowVersion : nowVersion,
                buTreeStatus: ''
            },
            treeData: [],
            selectedNodes: [],
            listShowType: 0,
            showModal: false,
            isShowAll: true,
            viewSelectedList: [],
        }
    }



    componentDidMount() {
        this.getDetail();
    }

    closePage() {
        this.multiTabStore.closeCurrentToPath('/orgCenter/orgTree/list');
    }

    getDetail = async () => {
        const { id } = this.state;
        if (id) {
            const res = await service.getDetail(id);
            if (res?.success) {
                const { id, buTreeCode, buTreeName, buTreeStatus, buTreeType, buTreeVersion, nowVersion, orgBuTreeDVOList = [] } = res.data;
                let tree = JSON.parse(JSON.stringify(orgBuTreeDVOList || [])
                    .replace(/buName/g, "title")
                    .replace(/id/g, 'key')
                    .replace(/treeNodes/g, 'children')
                );
                this.treeData = tree;
                this.treeDataView = tree;
                this.generateList(this.dataList, this.treeDataView);
                this.setState({
                    formData: {
                        buTreeCode,
                        buTreeType,
                        buTreeName,
                        buTreeStatus,
                        nowVersion,
                    },
                    treeData: this.treeDataView,
                });
                console.log('getDetail====', this.treeData);
            }
        }
    }

    generateList = (target, data, isReturnAll?: boolean) => {
        const len = data ? data.length : 0;
        for (let i = 0; i < len; i++) {
            const node = data[i];
            const { key, title, pKey } = node;
            if (isReturnAll) {
                const newNode = clone(node);
                delete newNode.children;
                target.push(newNode);
            } else {
                target.push({ key, title, pKey });
            }
            if (node.children) {
                this.generateList(target, node.children, isReturnAll);
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

    findNode(key: string, data: Array<any>, callback?: Function) {
        let node = null;
        for (let i = 0; i < data.length; i++) {
            // eslint-disable-next-line
            // debugger;
            const item = data[i];
            if (item.key == key) {
                console.log('findNode===>', item);
                if (callback) {
                    data[i] = callback(item);
                    console.log('newNode===>', data[i]);
                }
                return data[i];
            } else if (data[i].children) {
                node = this.findNode(key, data[i].children, callback);
            }
        }
        return node;
    }



    /**
     * 过滤已停用的
     */
    handleFilterByStatus = (e) => {
        let checked = e.target.checked
        this.treeDataView = this.getFilteredDataByStatus(checked)
        this.setState({
            isShowAll: checked,
            treeData: this.treeDataView
        });
    }

    getFilteredDataByStatus(status) {
        let data = deepClone(this.treeData);
        if (!status) {
            data = this.filterTree(data, (item) => {
                return item.buStatus === 'ACTIVE' || item.buStatus === 'DRAFT';
            });
        }
        return data;
    }


    handleNewNode = () => {
        this.setState({
            showModal: true
        })
    }

    onSelectNode = (selectedKeys, e: { selected: boolean, selectedNodes: any, node: any, event: any }) => {
        let selectedNodes = [];
        if (selectedKeys.length) {
            selectedNodes = e.selectedNodes
        }
        console.log('onSelectNode===========', JSON.parse(JSON.stringify(this.treeData)));
        this.setState({
            selectedNodes
        }, () => {
            this.loadSelectedList();
        });
    }

    handleOk = async (payload: any) => {
        const { id } = this.state;
        const { type } = payload;
        let { selectedRowKeys, selectedRows, length } = this.buSelectotRef.getSelectionData();
        const { selectedNodes } = this.state;

        let params;
        let res;
        let pkey;
        console.log(selectedNodes);
        console.log(this.treeData);
        if (length > 0) {
            console.log(this.buSelectotRef.getSelectionData());
            if (type === 'child') {
                if (selectedNodes.length === 0) {
                    pkey = '0';
                    params = selectedRows.map(item => {
                        return {
                            buId: item.id,
                            buTreeId: id,
                            pid: pkey
                        }
                    })
                    res = await service.appendNode(params);
                    if (res?.success) {
                        this.getDetail();
                        // selectedRows = selectedRows.map((item, index) => {
                        //     const newItem = {
                        //         ...item,
                        //         key: res.data[index].id,
                        //         title: item.buName,
                        //         pkey
                        //     }
                        //     delete newItem.id;
                        //     delete newItem.buName;
                        //     return newItem;
                        // });
                        // this.treeData = [...this.treeData, ...selectedRows];
                    } else {
                        ElNotification({
                            type: 'error',
                            message: res.msg
                        });
                    }
                } else {
                    const key = selectedNodes[0].key;
                    pkey = key;
                    params = selectedRows.map(item => {
                        return {
                            buId: item.id,
                            buTreeId: id,
                            pid: pkey
                        }
                    })
                    res = await service.appendNode(params);
                    if (res?.success) {
                        this.getDetail();
                        // selectedRows = selectedRows.map((item, index) => {
                        //     const newItem = {
                        //         ...item,
                        //         key: res.data[index].id,
                        //         title: item.buName,
                        //         pkey
                        //     }
                        //     delete newItem.id;
                        //     delete newItem.buName;
                        //     return newItem;
                        // });
                        // this.findNode(key, this.treeData, function (item) {
                        //     item.children = [...item.children || [], ...selectedRows];
                        //     return item;
                        // });
                    } else {
                        ElNotification({
                            type: 'error',
                            message: res.msg
                        });
                    }


                }
            } else if (type === 'brother') {
                // eslint-disable-next-line 
                // debugger
                if (selectedNodes.length === 0 || !selectedNodes[0]?.pkey || selectedNodes[0]?.pkey == 0) {
                    pkey = '0';
                    params = selectedRows.map(item => {
                        return {
                            buId: item.id,
                            buTreeId: id,
                            pid: pkey
                        }
                    })
                    res = await service.appendNode(params);
                    if (res?.success) {
                        this.getDetail();
                        // selectedRows = selectedRows.map((item, index) => {
                        //     const newItem = {
                        //         ...item,
                        //         key: res.data[index].id,
                        //         title: item.buName,
                        //         pkey
                        //     }
                        //     delete newItem.id;
                        //     delete newItem.buName;
                        //     return newItem;
                        // });
                        // this.treeData = [...this.treeData, ...selectedRows];

                    } else {
                        ElNotification({
                            type: 'error',
                            message: res.msg
                        });
                    }
                } else {
                    const key = selectedNodes[0].pkey;
                    pkey = key;
                    params = selectedRows.map(item => {
                        return {
                            buId: item.id,
                            buTreeId: id,
                            pid: pkey
                        }
                    })
                    res = await service.appendNode(params);
                    if (res?.success) {
                        this.getDetail();
                        // selectedRows = selectedRows.map((item, index) => {
                        //     const newItem = {
                        //         ...item,
                        //         key: res.data[index].id,
                        //         title: item.buName,
                        //         pkey
                        //     }
                        //     delete newItem.id;
                        //     delete newItem.buName;
                        //     return newItem;
                        // });
                        // this.findNode(key, this.treeData, function (item) {
                        //     item.children = [...item.children || [], ...selectedRows];
                        //     return item;
                        // });
                    } else {
                        ElNotification({
                            type: 'error',
                            message: res.msg
                        });
                    }
                }
            }
            // this.setState({
            //     treeData: deepClone(this.treeData)
            // });
        }

        console.log(this.treeData);
        this.handleCancel();
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        }, () => {
            this.buSelectotRef.clearSelectionData()
        })
    }

    handleDeleteNode = async () => {
        const { id, selectedNodes, isShowAll } = this.state;
        let data = deepClone(this.treeData);
        if (selectedNodes.length) {
            const key = selectedNodes[0].key;
            const pKey = selectedNodes[0].pkey;
            const res = await service.deleteNode(`${key}&${id}`);
            if (res?.success) {
                this.getDetail();
                // if (pKey == '0') {
                //     data = data.reduce((arr, item) => {
                //         if (item.key === key) {
                //             return arr;
                //         } else {
                //             arr.push(item)
                //         }
                //         return arr;
                //     }, []);
                // } else {
                //     this.findNode(pKey, data, function (item) {
                //         item.children = item.children.reduce((arr, item) => {
                //             if (item.key === key) {
                //                 return arr;
                //             } else {
                //                 arr.push(item)
                //             }
                //             return arr;
                //         }, [])
                //         return item;
                //     });
                // }
                // this.treeData = data;
                // this.treeDataView = this.getFilteredDataByStatus(isShowAll);
                this.setState({
                    selectedNodes: [],
                    viewSelectedList: [],
                    // treeData: this.treeDataView
                })
            } else {
                ElNotification({
                    type: 'error',
                    message: res.msg
                });
            }
        }

    }

    handleChangeList = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            listShowType: e.target.value
        }, () => {
            this.loadSelectedList()
        });
    }

    loadSelectedList() {
        const { listShowType, selectedNodes } = this.state;
        const _selectedNodes = clone(selectedNodes);//防止下面操作因为引用关系破坏treeData
        let list = [];
        console.log(selectedNodes);
        if (selectedNodes.length) {
            if (listShowType == 0) {
                list = _selectedNodes[0].children?.map(item => {
                    delete item.children;
                    return item;
                }) || []
            } else if (listShowType == 1) {
                // this.generateList(list, _selectedNodes[0].children, true);
                list = _selectedNodes[0].children?.map(item => {
                    return item;
                }) || []
            }
        }
        console.log(list);
        this.setState({
            viewSelectedList: list
        });
    }

    handleSave = async (buTreeStatus: string) => {
        const { id, isAdd, formData } = this.state;
        let res: any = {}
        await this.baseFormRef.validateFields()
            .then(async (params) => {
                if (!params?.errorFields) {
                    if (!isAdd) {
                        params.id = id;
                    }
                    params.buTreeStatus = buTreeStatus;
                    res = await service.saveData(params);
                    if (res?.success) {
                        ElNotification({
                            type: 'success',
                            message: '保存成功'
                        });
                        if (isAdd) {
                            this.setState({
                                isAdd: false,
                                id: res.data
                            });
                        }
                        this.setState({
                            formData: {
                                ...params,
                                buTreeStatus
                            }
                        })
                    } else {
                        ElNotification({
                            type: 'error',
                            message: res.msg
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return res;
    }

    render() {
        const { isAdd, formData, treeData, listShowType, showModal, isShowAll, viewSelectedList, selectedNodes } = this.state;
        console.log(formData);
        return (
            <div className='content'>
                <ElRowContainer
                    blocks={[
                        {
                            text: '保存',
                            key: 'save',
                            icon: <SaveWhite />,
                            disabled: formData.buTreeStatus && formData.buTreeStatus != 'DRAFT',
                            // hidden: !isAdd,
                            type: 'primary',
                            handleClick: () => {
                                this.handleSave('DRAFT')
                            }
                        },
                        {
                            text: '确认',
                            key: 'ok',
                            icon: <SubmitWhite />,
                            disabled: formData.buTreeStatus && formData.buTreeStatus != 'DRAFT',
                            // hidden: !isAdd,
                            type: 'primary',
                            handleClick: () => {
                                this.handleSave('ACTIVE')
                            }
                        },
                    ]}
                    position='top'
                />
                {/* <div className='content-button'>
                    <Button type='primary' onClick={() => { this.handleSave('DRAFT') }} disabled={formData.buTreeStatus && formData.buTreeStatus != 'DRAFT'}>保存</Button>
                    <Button type='primary' onClick={() => { this.handleSave('ACTIVE') }} disabled={formData.buTreeStatus && formData.buTreeStatus != 'DRAFT'}>确认</Button>
                </div> */}
                <ElCard title='基本信息'>
                    <ElForm
                        onRef={(ref) => this.baseFormRef = ref}
                        data={formData}
                        formProps={{
                            items: getFormItems({ isAdd, formData })
                        }}
                    />
                </ElCard>
                <ElCard title='组织树信息'>
                    <ElRowContainer
                        position='inbox'
                        needBackButton={false}
                        blocks={[
                            {
                                text: '新增节点',
                                key: 'addNode',
                                icon: <AddBlue />,
                                disabled: isAdd,
                                // hidden: !isAdd,
                                type: 'primary',
                                handleClick: () => {
                                    this.handleNewNode()
                                }
                            },
                            {
                                text: '删除选中节点',
                                key: 'deleteNode',
                                icon: <DeleteRed />,
                                disabled: isAdd || selectedNodes.length == 0,
                                // hidden: !isAdd,
                                type: 'primary',
                                handleClick: () => {
                                    this.handleDeleteNode()
                                }
                            },
                        ]}
                    />
                    <Row gutter={10}>
                        <Col span={8} className='tree'>
                            <div>
                                树形显示内容：<Checkbox onChange={this.handleFilterByStatus} checked={isShowAll} >包括已停用的</Checkbox>
                            </div>
                            {/* <div>
                            <Button type='primary' onClick={this.handleNewNode} disabled={isAdd}>新增节点</Button>
                            <Button type='primary' onClick={this.handleDeleteNode} disabled={isAdd || selectedNodes.length == 0}>删除选中节点</Button>
                        </div> */}
                            <Tree
                                onSelect={this.onSelectNode}
                                treeData={treeData} />
                        </Col>
                        <Col span={16}>
                            列表显示内容：
                        <Radio.Group onChange={this.handleChangeList} value={listShowType}>
                                <Radio value={0}>选中节点的下一级</Radio>
                                <Radio value={1}>选中节点的下面所有级别</Radio>
                            </Radio.Group>
                            <Table
                                // key={viewSelectedList.length}
                                columns={getTableColumns()}
                                dataSource={viewSelectedList}
                                defaultExpandAllRows={true}
                                size='small'
                            />
                        </Col>
                    </Row>
                </ElCard>

                <Modal title='新增结点'
                    visible={showModal}
                    width={1000}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key='cancel' onClick={this.handleCancel}><CancelBlack />取消</Button>,
                        <Button key='appendChild' type='primary' onClick={() => { this.handleOk({ type: 'child' }) }}><SubmitWhite />添加为已选结点的下级</Button>,
                        <Button key='appendBrother' type='primary' onClick={() => { this.handleOk({ type: 'brother' }) }}><SubmitWhite />添加为已选结点的同级</Button>,
                    ]}>
                    <BuListSelector onRef={(ref) => this.buSelectotRef = ref} />
                </Modal>
            </div>
        );
    }
}