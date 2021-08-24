import React from 'react';
import { Modal } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import * as service from '../service';
import { getTableColumns } from '../../../Tag/config'
import { ElFormProps } from '@/components/el/ElForm';
interface State {
    treeData: Array<any>;
    checkedKeys: React.Key[];
    checkedNodes: Array<any>;
}
interface Prop {
    visible: boolean;
    onAdd: Function;
    onClose: Function;
}

class SelectTagModal extends React.Component<Prop, State>{
    tableRef: any;
    dataList: Array<any>;
    constructor(props) {
        super(props)
        this.tableRef = {};
        this.dataList = [];
        this.state = {
            treeData: [],
            checkedKeys: [],
            checkedNodes: []
        }
    }

    handleAdd = () => {
        const { onAdd } = this.props;
        onAdd(this.tableRef.getSelectionData());
    }

    handleClose = () => {
        const { onClose } = this.props;
        onClose();
        this.setState({
            checkedKeys: [],
            checkedNodes: []
        })
    }


    getTableSearchFormItems: ElFormProps = {
        items: [
            {
                title: '标签',
                name: 'tagCodeName',
                span: 8,
                formOption: {
                    type: '$input',
                    props: {
                        placeholder: '请输入标签名称/编码'
                    }
                }
            }
        ]
    };

    render() {
        const { visible, } = this.props
        const { treeData, checkedKeys } = this.state;
        return (
            <>
                <Modal
                    visible={visible}
                    title='添加标签'
                    width={800}
                    onCancel={this.handleClose}
                    onOk={this.handleAdd}>
                    <ElSearchTable
                        rowKey='id'
                        bordered
                        onRef={(ref) => {
                            this.tableRef = ref;
                        }}
                        tableProxy={{
                            request: async (paramData) => {
                                paramData.orders = [{ asc: false, column: 'createTime' }]
                                return await service.getTagNewList(paramData);
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
                        searchFormProps={this.getTableSearchFormItems}
                        columns={getTableColumns()}
                    />

                </Modal>

            </>
        )
    }
}

export default SelectTagModal;
