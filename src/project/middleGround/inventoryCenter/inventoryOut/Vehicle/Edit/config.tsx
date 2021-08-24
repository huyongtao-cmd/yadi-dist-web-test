import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SaveBlue } from '@/components/el/ElIcon';

const getActionButtons = (handleSave,handleSubmit): Array<ActionButtonProps> => [
  {
    text: '保存',
    key: 'save',
    icon: <SaveBlue />,
    handleClick: handleSave
  },
  {
    text: '出库',
    key: 'submit',
    icon: <SaveBlue />,
    handleClick: handleSubmit
  }
];

export { getActionButtons };
