import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SubmitWhite } from '@/components/el/ElIcon';

const getActionButtons = (handleSave): Array<ActionButtonProps> => [
  {
    text: '提交',
    key: 'save',
    icon: <SubmitWhite />,
    handleClick: handleSave
  }
  // {
  //   text: '提交',
  //   key: 'submit',
  //   icon: <SubmitWhite />,
  //   handleClick: handleSubmit
  // }
];

export { getActionButtons };
