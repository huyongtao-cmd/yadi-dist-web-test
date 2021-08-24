import React from 'react';
import BpmnViewer from './BpmnViewer';
import { Space, Tag } from 'antd';
import { getProcessXmlByInsId } from './service';
export default (props: { processDefinitionId: string }) => {
  return props.processDefinitionId ? (
    <>
      <div style={{ display: 'flex' }}>
        <Space>
          <span>颜色:</span>
          <Tag color='#017501'>审批通过</Tag>
          <Tag color='#e90606'>正在审批</Tag>
        </Space>
        <span style={{ flex: 1 }} />
        <span>
          流程实例ID: <strong>{props.processDefinitionId}</strong>
        </span>
      </div>
      <BpmnViewer
        processDefinitionId={props.processDefinitionId}
        request={getProcessXmlByInsId}
      />
    </>
  ) : null;
};
