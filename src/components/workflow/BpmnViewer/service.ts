import request from '@/utils/request';

export const getProcessXmlByDefKey = (id) => {
  return request(`/yst-workflow-demo/workflow/api/procDefBpmn/${id}`, {
    method: 'get'
  });
};
export const getProcessXmlByInsId = (id) => {
  return request(`/yst-workflow-demo/workflow/api/procInstBpmn/${id}`, {
    method: 'get'
  });
};
