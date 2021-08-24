import React from 'react';
import ElCard from '@/components/el/ElCard';
import { ElEditTable } from '@/components/el';
import { getCardTableColumns, getTableActionButtons } from './config';
import { maths } from '@/utils';
import dayjs from 'dayjs';

interface State {
    cardTableData: Array<any>;
}
interface Prop {
    tableData: Array<any>;
    type?: string;
    onRef?: Function;
    status?: string;
    defaultDataFu?: Function;  //自定义初始化
}

class LicensesTable extends React.Component<Prop, State>{
    tableRef: any;
    dataList: Array<any>;
    cardTableRef: any;
    constructor(props) {
        super(props)
        this.tableRef = {};
        this.dataList = [];
        this.state = {
            cardTableData: []
        }
    }

    actionButton = (actype: string, data: any) => {
        if (actype === 'create') {
            this.cardTableRef.addRow({
                id: maths.genFakeId(-1)
            });
        } else {
            this.cardTableRef.quitEditState(() => {
                this.cardTableRef.removeRowsByKeys(data.selectedRowKeys, 'rowKey');
            });
        }
    }
    static getDerivedStateFromProps(props, state) {
        const { tableData } = props;
        const { cardTableData } = state;
        if (
            tableData &&
            tableData.length >= 1 &&
            tableData !== cardTableData &&
            Array.isArray(tableData)
        ) {
            tableData.forEach((a) => {
                a.qualifyStatusNames = {
                    udcVal: a.qualifyStatus,
                    valDesc: a.qualifyStatusName
                }
                a.qualifyTypeNames = {
                    udcVal: a.qualifyType,
                    valDesc: a.qualifyTypeName
                }
                a.validFrom = a.validFrom ? dayjs(a.validFrom).format('YYYY-MM-DD') : a.validFrom;
                a.validTo = a.validTo ? dayjs(a.validTo).format('YYYY-MM-DD') : a.validTo;
            })
            return {
                cardTableData: tableData
            };
        }
        return null;
    }
    componentDidMount() {
        const { onRef, defaultDataFu, tableData } = this.props;
        if (onRef) {
            this.props.onRef({
                validateTable: this.validateFields,
                cardTableRef: this.cardTableRef
            });
        }
        if (defaultDataFu) {
            this.setState({ cardTableData: defaultDataFu() });
            return;
        }
    }

    validateFields = async () => {
        let errList = [];
        let validData = [];
        await this.cardTableRef.quitEditState();
        const tableData = await this.cardTableRef.validateTableRows();
        if (tableData.msg.valid) {
            validData = tableData.data.map((value) => ({
                ...value,
                qualifyStatus: value.qualifyStatusNames?.udcVal,
                qualifyType: value.qualifyTypeNames.udcVal,
                validFrom: value.validFrom ? dayjs(value.validFrom).format('YYYY-MM-DD HH:mm:ss') : value.validFrom,
                validTo: value.validFrom ? dayjs(value.validTo).format('YYYY-MM-DD HH:mm:ss') : value.validTo
            }))
        } else {
            errList.push(tableData.msg.errors[0].schema.message);
        }
        const obj = {
            data: validData,
            err: errList
        }
        return obj
    }

    render() {
        const { type, status } = this.props
        const { cardTableData } = this.state
        return (
            <>
                <ElCard title='证照信息'>
                    <ElEditTable
                        rowKey='id'
                        bordered
                        rowSelectionConfig={{
                            type: 'checkbox',
                            fixed: true,
                            disabledRowIds: []
                        }}
                        key='supportItemCardsTable'
                        onRef={(ref) => (this.cardTableRef = ref)}
                        dataSource={cardTableData}
                        columns={getCardTableColumns(type, status)}
                        actionButtons={getTableActionButtons(type, this.actionButton, status)}
                    />
                </ElCard>

            </>
        )
    }
}

export default LicensesTable;
