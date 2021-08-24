import { ElFormProps } from '@/components/el/ElForm';

export const getTableSearchFormItems = (): ElFormProps => ({
  items: [
    {
      title: '组织',
      name: 'buCodeNameLike',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入组织编号/名称'
        }
      }
    },
    {
      title: '组织类型',
      name: 'buType',
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请选择',
          domain: 'ORG',
          prefixStr: '/yd-system',
          udc: 'BU_TYPE',
          mode: 'multiple'
        }
      }
    }
  ]
});

export const getTableColumns = (): Array<any> => [
  {
    title: '组织编号',
    align: 'center',
    dataIndex: 'buCode'
  },
  {
    title: '组织名称',
    align: 'center',
    dataIndex: 'buName'
  },
  {
    title: '所属公司',
    // width: 100,
    align: 'center',
    dataIndex: 'ouName'
  },
  {
    title: '组织类型',
    align: 'center',
    dataIndex: 'buTypeName'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'buStatusName'
  }
];
