import React, { PureComponent } from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';

import { getTableSearchFormItems, getTableColumns } from './config';
// import { getTableColumns } from '../../config';

import * as service from './service';

interface Prop {
    onRef?: Function;
}
interface State {
    [key: string]: any
}

export default class BuListSelect extends PureComponent<Prop, State>{
    tableRef: any;
    constructor(props) {
        super(props)
        this.state = {
            searchForm: {},
            selectedRowKeys: [],
            selectedRows: []
        }
    }

    componentDidMount() {
        const { onRef } = this.props;
        if (onRef) {
            console.log(this.tableRef);
            onRef(this.tableRef);
        }
    }

    render() {
        const { searchForm } = this.state;
        return (
            <>
                <ElSearchTable
                    rowKey='id'
                    onRef={(ref) => (this.tableRef = ref)}
                    mode={{
                        proxy: true, // 筛选器
                        search: true,  // searchForm
                        action: false,
                        pagination: true, // 分页
                        descriptions: true,// descriptions
                        tabs: false
                    }}
                    searchFormProps={getTableSearchFormItems()}
                    defaultSearchData={searchForm}
                    columns={getTableColumns()}
                    rowSelectionConfig={{
                        disabledRowIds: [],
                        type: 'checkbox',
                        fixed: false,
                        onChange: ({ selectedRowKeys, selectedRows }) => {
                            this.setState({
                                selectedRowKeys,
                                selectedRows
                            });
                        }
                    }}
                    tableProxy={{
                        request: (paramData) => {
                            paramData.buStatus = 'ACTIVE';
                            return service.getList({ ...paramData });
                        },
                        successCallBack: (tableRef) => {
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
                />
            </>
        )
    }
}