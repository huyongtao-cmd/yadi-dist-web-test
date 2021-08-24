import React from 'react';
import { notification } from 'antd';

interface NotificationProps extends NotiTitle {
  message: String;
  closeCallBakck?: () => void;
}

interface NotiTitle {
  type: 'success' | 'info' | 'warning' | 'error';
}

enum notiTitleEnum {
  SUCCESS = '成功提示',
  INFO = '消息提示',
  WARNING = '警告提示',
  ERROR = '错误提示'
}

const notiTitle = (type): NotiTitle => {
  type = type.toUpperCase();
  return notiTitleEnum[type];
};

const ElNotification = ({
  type,
  message,
  closeCallBakck
}: NotificationProps) => {
  notification[type]({
    style: {
      wordWrap: 'break-word',
      wordBreak: 'break-all'
    },
    message: notiTitle(type),
    description: message,
    duration: type === 'error' ? 4 : 2,
    onClose: closeCallBakck
  });
};

export default ElNotification;
