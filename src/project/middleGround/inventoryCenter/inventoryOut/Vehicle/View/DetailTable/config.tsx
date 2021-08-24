import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

const getTableColumns = (): Array<ElEditTableColumns> => {
  return [
    {
      title: '商品名称',
      width: 180,
      dataIndex: 'itemName',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'itemName'
        };
      }
    },
    {
      title: '商品编码',
      width: 200,
      dataIndex: 'itemCode',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'itemCode'
        };
      }
    },
    {
      title: '商品类型',
      width: 200,
      dataIndex: 'itemType',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'itemType'
        };
      }
    },
    // {
    //   title: '单价',
    //   width: 200,
    //   dataIndex: 'price',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: { type: '$input' },
    //       name: 'price'
    //     };
    //   }
    // },
    {
      title: '入库数量',
      width: 160,
      dataIndex: 'qty',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'qty'
        };
      }
    },
    {
      title: '单位',
      width: 140,
      dataIndex: 'uom',
      editable: true,
      field: () => {
        return {
          formOption: { type: '$input' },
          name: 'uom'
        };
      }
    },
    // {
    //   title: '金额',
    //   width: 200,
    //   dataIndex: 'amt',
    //   editable: true,
    //   field: () => {
    //     return {
    //       formOption: {
    //         type: '$textArea',
    //         props: {}
    //       },
    //       name: 'amt'
    //     };
    //   }
    // },
    {
      title: '品牌',
      width: 200,
      dataIndex: 'brandName',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: {}
          },
          name: 'brandName'
        };
      }
    },
    {
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      editable: true,
      field: () => {
        return {
          formOption: {
            type: '$textArea',
            props: {}
          },
          name: 'remark'
        };
      }
    }
  ];
};

export { getTableColumns };
