import request from '@/utils/request';

export const getTaskNodeConfigByProcInstId = (processInstanceId) => {
  return request(
    `/yst-workflow-demo/workflow/api/taskNodeConfig/queryByProcInstId?processInstanceId=${processInstanceId}`,
    {
      method: 'get'
    }
  );
};
export const complete = (data) => {
  return request(`/yst-workflow-demo/workflow/api/complete`, {
    method: 'post',
    query: data
  });
};
export const withdraw = (data) => {
  return request(`/yst-workflow-demo/workflow/api/withdraw`, {
    method: 'post',
    query: data
  });
};
export const getWorkflowUser = () => {
  return request(`/yst-workflow-demo/workflow/api/query/users`, {
    method: 'get'
  });
};
export const getBackNodes = (processInstanceId) => {
  return request(
    `/yst-workflow-demo/workflow/api/backNodes?processInstanceId=${processInstanceId}`,
    {
      method: 'get'
    }
  );
};
export const reject = (data) => {
  return request(`/yst-workflow-demo/workflow/api/back`, {
    method: 'post',
    query: data
  });
};
export const delegation = (data) => {
  return request(`/yst-workflow-demo/workflow/api/delegation`, {
    method: 'post',
    query: data
  });
};
export const transfer = (data) => {
  return request(`/yst-workflow-demo/workflow/api/transfer`, {
    method: 'post',
    query: data
  });
};
export const invalid = (data) => {
  return request(`/yst-workflow-demo/workflow/api/invalid`, {
    method: 'post',
    query: data
  });
};
