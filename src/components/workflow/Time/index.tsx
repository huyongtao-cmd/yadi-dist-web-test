import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
const Time = (props: { milliseconds: string }) => {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const translate = (milliseconds) => {
    if (!Number(milliseconds)) {
      return '-';
    }
    return dayjs.duration(Number(milliseconds)).humanize();
  };
  return <div>{translate(props.milliseconds)}</div>;
};
export default Time;
