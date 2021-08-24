import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SubmitWhite } from '@/components/el/ElIcon';

const getActionButtons = (handleSave,handleSubmit,handleCode): Array<ActionButtonProps> => [
  // {
  //   text: '保存',
  //   key: 'save',
  //   icon: <SaveBlue />,
  //   handleClick: handleSave
  // },
  {
    text: '提交',
    key: 'submit',
    icon: <SubmitWhite />,
    handleClick: handleSubmit
  }
];

export { getActionButtons };
