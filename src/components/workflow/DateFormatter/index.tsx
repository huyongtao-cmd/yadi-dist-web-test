import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
const DateTransfer = (props: { dateString: string }) => {
  const translate = (dateString) => {
    if (!dateString) {
      return '-';
    }
    return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
  };
  return <div>{translate(props.dateString)}</div>;
};
export default DateTransfer;
