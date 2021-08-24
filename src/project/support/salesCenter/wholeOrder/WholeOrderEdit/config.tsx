import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SaveWhite, SubmitWhite } from '@/components/el/ElIcon';

const getActionButtons = (handleSave, handleSubmit): Array<ActionButtonProps> => [
  {
    text: '提交',
    key: 'save',
    icon: <SaveWhite />,
    handleClick: handleSave
  },
  // {
  //   text: '提交',
  //   key: 'submit',
  //   icon: <SubmitWhite />,
  //   handleClick: handleSubmit
  // }
];

export { getActionButtons };
