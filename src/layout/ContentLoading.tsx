import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

// todo multitab
const ContentLoading = () => {
  return (
    <div>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
};
export default ContentLoading;
