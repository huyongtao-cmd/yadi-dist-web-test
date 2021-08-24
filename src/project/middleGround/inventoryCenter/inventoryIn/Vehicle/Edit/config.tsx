import React from 'react';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SaveBlue } from '@/components/el/ElIcon';

const getActionButtons = (handleSave,handleSubmit,handleCode): Array<ActionButtonProps> => [
  {
    text: '保存',
    key: 'save',
    icon: <SaveBlue />,
    handleClick: handleSave
  },
  {
    text: '入库',
    key: 'submit',
    icon: <SaveBlue />,
    handleClick: handleSubmit
  },
  {
    text: '查看条码',
    key: 'code',
    icon: <SaveBlue />,
    handleClick: handleCode
  }
];

export { getActionButtons };
