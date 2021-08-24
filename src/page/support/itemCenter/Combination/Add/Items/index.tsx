import React from 'react';
import ElEditTable from '@/components/el/ElEditTable'
import SelectItemModal from './components/SelectItemModal';

import { getEditTableActionButtons, getTableColumns } from './config';


interface Props {
    type: string | 'add' | 'edit';
    data: any;
    onRef: any;
    tableIndex: number;
}

interface State {
    selectItemModal: boolean;
}

class Items extends React.Component<Props, State>{
    tableRef: any = {};
    addItemModalRef: any = {};
    constructor(props) {
        super(props)
        this.state = {
            selectItemModal: false
        }
    }


    componentDidUpdate() {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this.tableRef)
        }
    }

    /**
     * 添加商品框 添加、继续添加
     * @param {array<object>} selectedData
     */
    onAdd = (selectedData: any) => {
        this.addDetailItem(selectedData.selectedRows);
    }

    /**
     * 将已选择的数据集合添加到明细列表中
     * @param {array} records
     */
    addDetailItem(records: Array<any>) {
        let newRows = [...records];
        const oldRows = this.tableRef.getRows();
        const oldKeys = oldRows.map(item => item.id);
        newRows = records.filter((value) => {
            return !oldKeys.includes(value.id);
        });
        this.tableRef.addRows(newRows);
    }

    /**
     * 删除数据
     */
    handleDeleteRow = () => {
        this.tableRef.quitEditState(() => {
            const { selectedRowKeys } = this.tableRef.getSelectionData();
            this.tableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
        });
    }

    /**
     * 显示添加数对话框
     */
    showSelectItemModal = () => {
        this.setState({
            selectItemModal: true
        })
    }

    /**
     * 关闭添加数据对话框
     */
    closeSelectItemModal = () => {
        this.setState({
            selectItemModal: false
        })
    }

    render() {
        const { type, data, tableIndex = 1 } = this.props;
        const { selectItemModal } = this.state
        return (
            <>
                <ElEditTable
                    key={tableIndex}
                    // rowKey='id'
                    bordered
                    size='small'
                    onRef={(ref) => { this.tableRef = ref }}
                    pagination={false}
                    columns={getTableColumns({ type })}
                    dataSource={data}
                    rowSelectionConfig={{
                        type: 'checkbox',
                        fixed: false,
                        disabledRowIds: []
                    }}
                    actionButtons={type === 'add' ?
                        getEditTableActionButtons({
                            handleAdd: () => {
                                this.tableRef.quitEditState(() => {
                                    this.showSelectItemModal()
                                })
                            },
                            handleDelete: this.handleDeleteRow
                        })
                        :
                        []}
                />
                {
                    type === 'add' && <SelectItemModal
                        rowKey='id'
                        onRef={(ref) => this.addItemModalRef = ref}
                        visible={selectItemModal}
                        onAdd={this.onAdd}
                        onClose={this.closeSelectItemModal}
                    />
                }
            </>
        )
    }
}

export default Items

