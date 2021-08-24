import {
    ElEditTableColumns,
    ActionButtonProps
} from '@/components/el/ElEditTable';

export const getEditTableActionButtons = (data: any): Array<ActionButtonProps> => {
    return [
        {
            text: '新增',
            key: '3',
            location: 'left',
            needConfirm: false,
            handleClick: data.handleAdd
        },
        {
            text: '删除',
            key: '1',
            needConfirm: false,
            location: 'left',
            minSelection: 1,
            handleClick: data.handleDelete
        }
    ];
}

export const getTableColumns = (payload: any): Array<ElEditTableColumns> => [
    {
        title: '商品编码',
        width: 100,
        dataIndex: 'itemCode',
        align: 'center',
    },
    {
        title: '商品名称',
        width: 100,
        dataIndex: 'itemName',
        align: 'center',
    },
    {
        title: '商品别名',
        width: 100,
        dataIndex: 'itemName2',
        align: 'center',
    },
    {
        title: '商品条码',
        width: 100,
        dataIndex: 'barCode',
        align: 'center',
    },
    {
        title: '数量',
        width: 100,
        dataIndex: 'qty',
        align: 'center',
        editable: true,
        rule: payload?.type === 'view' ? undefined : {
            required: true,
            message: '必填！',
            type: 'number'
        },
        selectMapping: payload?.type === 'view' ? undefined : () => { },
        field: payload?.type === 'view' ? undefined : () => {
            return {
                formOption: {
                    type: '$inputNumber',
                    props: { disabled: false, min: 1}
                },
                name: 'qty'
            };
        }
    },
    {
        title: '单位',
        width: 100,
        dataIndex: 'uomName',
        align: 'center',
    },
]