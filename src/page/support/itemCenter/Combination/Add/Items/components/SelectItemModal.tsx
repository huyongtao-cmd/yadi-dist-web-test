import React from 'react';
import { Modal, Button } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';

import { search } from '../../../../Item/service';

import { getTableSearchFormItems, getTableColumns } from '../../../../Item/config';

interface State {
    // selectedRowKeys: Array<any>;
    // selectedRows: Array<any>;
}
interface Prop {
    onRef: Function;
    visible: boolean;
    onAdd: Function;
    onClose: Function;
    rowKey?: string;
}

class SelectItemModal extends React.Component<Prop, State>{
    tableRef: any;
    constructor(props) {
        super(props)
        this.tableRef = {}
        // this.state = {
        //     selectedRowKeys: [],
        //     selectedRows: []
        // }
    }

    componentDidMount() {
        const { onRef } = this.props
        if (onRef) {
            onRef(this)
        }
    }

    // getSelectionData = () => {
    //     return this.state.selectedRows
    // }

    handleAdd = (selectedData: any, needClose: boolean) => {
        const { onAdd } = this.props;
        onAdd(selectedData);
        if (needClose) {
            this.handleClose();
        } else {
            this.tableRef.clearSelectionData();
        }
    }

    handleClose = () => {
        const { onClose } = this.props;
        onClose()
        this.tableRef.clearSelectionData();
    }

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
    }

    render() {
        const { visible, rowKey } = this.props
        return (
            <>
                <Modal
                    visible={visible}
                    title='添加商品'
                    width={1000}
                    onCancel={this.handleClose}
                    footer={[
                        <Button key='add' type='primary' onClick={() => { this.handleAdd(this.tableRef.getSelectionData(), true) }}>添加</Button>,
                        <Button key='continuousAdd' type='primary' onClick={() => { this.handleAdd(this.tableRef.getSelectionData(), false) }}>继续添加</Button>,
                        <Button key='cancel' onClick={this.handleClose}>取消</Button>,
                    ]}
                // destroyOnClose
                >
                    <ElSearchTable
                        rowKey={rowKey || 'id'}
                        bordered
                        onRef={(ref) => {
                            this.tableRef = ref;
                        }}
                        mode={{
                            proxy: true, // 筛选器
                            search: true,  // searchForm
                            action: false,
                            pagination: true, // 分页
                            descriptions: false,// descriptions
                            tabs: false
                        }}
                        tableProxy={{
                            request: async (paramData) => {
                                paramData.orders = [{ asc: false, column: 'createTime' }]
                                paramData.brand = paramData.brandNames?.brandCode;
                                delete paramData.brandNames;
                                paramData.lotFlag = paramData.lotFlag?.length > 0 ? true : null;
                                paramData.snFlag = paramData.snFlag?.length > 0 ? true : null;
                                paramData.guaranteeFlag = paramData.guaranteeFlag?.length > 0 ? true : null;
                                const res: any = await search({
                                    ...paramData
                                });
                                if (res && res.success) {
                                    res.data.records.forEach((item) => {
                                        item.itemCatePathName = this.getCatePathCode(item.itemCatePath).join('/');
                                    })
                                }
                                return res;
                            },
                            successCallBack: (tableRef) => {
                                // this.setState({
                                //     tableRef
                                // });
                            },
                            errCallBack: () => {
                                console.log('err');
                            },
                            props: {
                                success: 'success',
                                result: 'data.records',
                                total: 'data.total'
                            },
                            autoLoad: true
                        }}
                        // rowSelectionConfig={{
                        //     type: 'checkbox',
                        //     fixed: false,
                        //     onChange: ({ selectedRowKeys, selectedRows }) => {
                        //         this.setState({
                        //             selectedRowKeys,
                        //             selectedRows
                        //         });
                        //     }
                        // }}
                        searchFormProps={getTableSearchFormItems}
                        columns={getTableColumns()}

                    />
                </Modal>

            </>
        )
    }
}

export default SelectItemModal;
