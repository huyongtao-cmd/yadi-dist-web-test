import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SubmitWhite, PrintWhite } from '@/components/el/ElIcon';

const getActionButtons = (handleSubmit, print): Array<ActionButtonProps> => [
  {
    text: '确认',
    key: 'submit',
    icon: <SubmitWhite />,
    handleClick: handleSubmit
  },
  {
    text: '打印',
    key: 'print',
    icon: <PrintWhite />,
    handleClick: print
  }
];

export { getActionButtons };
