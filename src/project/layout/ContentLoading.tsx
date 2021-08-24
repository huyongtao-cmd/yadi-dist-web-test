import React from 'react';
import { Spin } from 'antd';
const ContentLoading = () => {
  return (
    <div className='suspense-loading-container'>
      <Spin style={{ fontSize: 80 }} />
    </div>
  );
};
export default ContentLoading;
