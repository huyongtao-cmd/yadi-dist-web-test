import { ElFormItemProps } from '@/components/el/ElForm';
export const getFormItems = ({
  isAdd,
  formData: { nowVersion, buTreeStatus }
}): Array<ElFormItemProps> => {
  return [
    {
      title: '组织树编号',
      span: 6,
      name: 'buTreeCode',
      formOption: {
        type: '$input',
        props: { placeholder: '请输入', disabled: !isAdd }
        // render: payload.isAdd ? null : (ref) => {
        //   const res = ref.getFieldValue('buTreeCode');
        //   console.log(ref, res);
        //   return res
        // }
      },
      rules: [{ required: true, message: '必填！' }]
    },
    {
      title: '组织树类型',
      span: 6,
      name: 'buTreeType',
      formOption: {
        type: '$udc',
        props: {
          placeholder: '请输入',
          disabled: !isAdd,
          prefixStr: '/yd-system',
          domain: 'ORG',
          udc: 'BUTREE_TYPE'
        }
      },
      rules: [{ required: true, message: '必填！' }]
    },
    {
      title: '组织树名称',
      span: 6,
      name: 'buTreeName',
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: buTreeStatus && buTreeStatus != 'DRAFT'
        }
      },
      rules: [{ required: true, message: '必填！' }]
    },
    {
      title: '当前版本号',
      span: 6,
      name: 'nowVersion',
      formOption: {
        // type: '$input',
        // props: { disabled: true },
        render: (ref) => {
          return `V${nowVersion}`;
        }
      }
    }
  ];
};

export const getTableColumns = (): Array<any> => [
  {
    title: '组织编号',
    width: 100,
    align: 'left',
    dataIndex: 'buCode'
  },
  {
    title: '组织名称',
    width: 100,
    align: 'left',
    dataIndex: 'title'
  },
  {
    title: '组织简称',
    width: 100,
    align: 'left',
    dataIndex: 'buAbbr'
  },
  {
    title: '组织类型',
    width: 100,
    align: 'left',
    dataIndex: 'buTypeName'
  },
  {
    title: '状态',
    width: 100,
    align: 'left',
    dataIndex: 'buStatusName'
  }
];
