import React from 'react';
import BpmnViewer from './BpmnViewer';
import { getProcessXmlByDefKey } from './service';

export default (props: { processDefinitionId: string }) => {
  return props.processDefinitionId ? (
    <BpmnViewer
      processDefinitionId={props.processDefinitionId}
      request={getProcessXmlByDefKey}
    />
  ) : null;
};
