import React from 'react';
import ElCard from '@/components/el/ElCard';
import { ElEditTable } from '@/components/el';
import { getBankTableColumns, getTableActionButtons } from './config';
import { maths } from '@/utils';

interface State {
    bankTableData: Array<any>;
}
interface Prop {
    tableData: Array<any>;
    type?: string;
    onRef?: Function;
    status?: string;
    defaultDataFu?: Function;  //自定义初始化
}

class BankTable extends React.Component<Prop, State>{
    tableRef: any;
    dataList: Array<any>;
    bankTableRef: any;
    constructor(props) {
        super(props)
        this.tableRef = {};
        this.dataList = [];
        this.state = {
            bankTableData: []
        }
    }

    actionButton = (actype: string, data: any) => {
        if (actype === 'create') {
            this.bankTableRef.addRow({
                id: maths.genFakeId(-1),
                defaultFlag: false
            });
        } else {
            this.bankTableRef.quitEditState(() => {
                this.bankTableRef.removeRowsByKeys(data.selectedRowKeys, 'rowKey');
            });
        }
    }
    static getDerivedStateFromProps(props, state) {
        const { tableData } = props;
        const { bankTableData } = state;
        if (
            tableData &&
            tableData.length >= 1 &&
            tableData !== bankTableData &&
            Array.isArray(tableData)
        ) {
            tableData.forEach((a) => {
                a.accTypeNames = {
                    udcVal: a.accType,
                    valDesc: a.accTypeName
                }
                a.currNames = {
                    currName: a.currName,
                    currCode: a.currCode
                }
            })
            return {
                bankTableData: tableData
            };
        }
        return null;
    }
    componentDidMount() {
        const { onRef, defaultDataFu } = this.props;
        if (onRef) {
            this.props.onRef({
                validateTable: this.validateFields,
                bankTableRef: this.bankTableRef
            });
        }
        if (defaultDataFu) {
            this.setState({ bankTableData: defaultDataFu() });
            return;
        }
    }

    validateFields = async () => {
        let defaultBankNums = 0;
        let errList = [];
        await this.bankTableRef.quitEditState();
        const tableData = await this.bankTableRef.validateTableRows();
        if (tableData.msg.valid) {
            tableData.data.forEach((a) => {
                a.accType = a.accTypeNames.udcVal;
                a.currCode = a.currNames?.currCode;
                if (a.defaultFlag) {
                    defaultBankNums++;
                }
            })
        } else {
            errList.push(tableData.msg.errors[0].schema.message);
        }
        if (tableData.data.length > 0 && defaultBankNums != 1) {
            errList.push('默认银行有且只能有一个');
        }
        const obj = {
            data: tableData.data,
            err: errList
        }
        return obj
    }

    render() {
        const { type, status } = this.props
        const { bankTableData } = this.state
        return (
            <>
                <ElCard title='银行信息'>
                    <ElEditTable
                        rowKey='id'
                        bordered
                        rowSelectionConfig={{
                            type: 'checkbox',
                            fixed: true,
                            disabledRowIds: []
                        }}
                        key='supportItemBankTable'
                        onRef={(ref) => (this.bankTableRef = ref)}
                        dataSource={bankTableData}
                        columns={getBankTableColumns(type, status)}
                        actionButtons={getTableActionButtons(type, this.actionButton, status)}
                    />
                </ElCard>

            </>
        )
    }
}

export default BankTable;
