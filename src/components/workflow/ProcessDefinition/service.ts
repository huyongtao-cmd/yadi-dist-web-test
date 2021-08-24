import request from '@/utils/request';

export const getDefinitionList = (data) => {
  return request('/yst-workflow-demo/workflow/api/procDef/search', {
    method: 'post',
    query: data
  });
};
export const getDefinitionById = (id) => {
  return request(`/yst-workflow-demo/workflow/api/procDef/${id}`, {
    method: 'get'
  });
};
export const saveDefinition = (data) => {
  return request('/yst-workflow-demo/workflow/api/procDef', {
    method: 'post',
    query: data
  });
};
export const deleteDefinition = (id) => {
  return request(`/yst-workflow-demo/workflow/api/procDef/${id}`, {
    method: 'delete'
  });
};
export const getCategoryDropDownList = () => {
  return request(`/yst-workflow-demo/workflow/api/query/categorys`, {
    method: 'get'
  });
};
export const getDefinitionHistoryListByKey = (key) => {
  return request(
    `/yst-workflow-demo/workflow/api/processDefinitionHistory/${key}`,
    {
      method: 'get'
    }
  );
};
export const deployProcess = (id) => {
  return request(`/yst-workflow-demo/workflow/api/deploy/${id}`, {
    method: 'post'
  });
};
export const hangOrActiveProcess = (data) => {
  return request(`/yst-workflow-demo/workflow/api/activateProcessDefinition`, {
    method: 'post',
    query: data
  });
};
