import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { ElContainerProps } from '@/components/el/ElRowContainer';
import { SaveWhite } from '@/components/el/ElIcon';
import { isEmpty } from 'ramda';
export const getFormItems = (payload: any): Array<ElFormItemProps> => {
  return [
    {
      title: '数据角色代码编号',
      span: 6,
      name: 'dpRoleCode',
      formOption: {
        type: '$input',
        props: { placeholder: '请输入', disabled: !payload.isAdd }
        // render: payload.isAdd ? null : (ref) => {
        //   const res = ref.getFieldValue('buTreeCode');
        //   console.log(ref, res);
        //   return res
        // }
      },
      rules: [{ required: true, message: '必填！' }]
    },
    {
      title: '数据角色名称',
      span: 6,
      name: 'dpRoleName',
      formOption: {
        type: '$input',
        props: { placeholder: '请输入', disabled: !payload.isAdd }
        // render: payload.isAdd ? null : (ref) => {
        //   return ref.getFieldValue('buTreeType')
        // }
      },
      rules: [{ required: true, message: '必填！' }]
    },
  ];
};

export const getActionButtons = ({
  isAdd,
  saveLoading,
  handleBaseInfoSave
}): Array<ElContainerProps> => {
  return [
    {
      text: '保存',
      key: 'save',
      icon: <SaveWhite />,
      disabled: saveLoading,
      hidden: !isAdd,
      type: 'primary',
      handleClick: handleBaseInfoSave
    }
  ];
};
