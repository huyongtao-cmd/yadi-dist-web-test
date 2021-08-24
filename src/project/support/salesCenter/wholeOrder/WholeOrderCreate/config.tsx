import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SaveWhite, SubmitWhite } from '@/components/el/ElIcon';

const getActionButtons = (handleSave, handleSubmit, handleSubmitAndOut, outSubmit): Array<ActionButtonProps> => [
  // {
  //   text: '提交',
  //   key: 'save',
  //   icon: <SaveWhite />,
  //   handleClick: handleSave
  // },
  {
    text: '提交',
    key: 'submit',
    icon: <SubmitWhite />,
    handleClick: handleSubmit
  },
  {
    text: '提交并出库',
    key: 'submitAndInvenporyOut',
    icon: <SubmitWhite />,
    handleClick: handleSubmitAndOut,
    disabled: !!outSubmit
  }
];

export { getActionButtons };
