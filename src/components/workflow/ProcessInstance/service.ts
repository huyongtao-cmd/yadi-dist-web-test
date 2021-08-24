import request from '@/utils/request';

export const getInstanceList = (data) => {
  return request('/yst-workflow-demo/workflow/api/procInst/search', {
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
  return request(`/yst-workflow-demo/workflow/api/category/${id}`, {
    method: 'delete'
  });
};
export const getCategoryDropDownList = () => {
  return request(`/yst-workflow-demo/workflow/api/query/categorys`, {
    method: 'get'
  });
};
export const getProcessHistoryList = (data) => {
  return request(`/yst-workflow-demo/workflow/api/taskInst/search`, {
    method: 'post',
    query: data
  });
};
export const deployProcess = (id) => {
  return request(`/yst-workflow-demo/workflow/api/deploy/${id}`, {
    method: 'post'
  });
};
export const hangOrActiveProcess = (data) => {
  return request(`/yst-workflow-demo/workflow/api/activateProcessInstance`, {
    method: 'post',
    query: data
  });
};
export const interupProcess = (data) => {
  return request(`/yst-workflow-demo/workflow/api/interruptProcessInstance`, {
    method: 'post',
    query: data
  });
};
export const changeTaskAssigness = (data) => {
  return request(`/yst-workflow-demo/workflow/api/changeTaskAssigness`, {
    method: 'post',
    query: data
  });
};
export const complete = (data) => {
  return request(`/yst-workflow-demo/workflow/api/complete`, {
    method: 'post',
    query: data
  });
};
export const getWorkflowUser = () => {
  return request(`/yst-workflow-demo/workflow/api/query/users`, {
    method: 'get'
  });
};
