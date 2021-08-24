import request from '@/utils/request';

export const getProcessXml = (id) => {
  return request(`/yst-workflow-demo/workflow/api/procDef/xml?id=${id}`, {
    method: 'get'
  });
};

export const saveProcessXml = (data) => {
  return request(`/yst-workflow-demo/workflow/api/procDef/xml`, {
    method: 'post',
    query: data
  });
};
export const getTaskNodeConfigList = () => {
  return request(`/yst-workflow-demo/workflow/api/taskLeadersTypes`, {
    method: 'get'
  });
};
export const getProcessUser = () => {
  return request(`/yst-workflow-demo/workflow/api/query/users`, {
    mehtod: 'get'
  });
};
export const getProcessRoles = () => {
  return request(`/yst-workflow-demo/workflow/api/query/roles`, {
    mehtod: 'get'
  });
};
export const getOrgRoles = () => {
  return request(`/yst-workflow-demo/workflow/api/query/orgRoles`, {
    mehtod: 'get'
  });
};
export const getPosts = () => {
  return request(`/yst-workflow-demo/workflow/api/query/posts`, {
    method: 'get'
  });
};
export const getTaskNodeConfig = (procDefKey, taskDefId) => {
  return request(
    `/yst-workflow-demo/workflow/api/taskNodeConfig?procDefKey=${procDefKey}&taskDefId=${taskDefId}`,
    {
      method: 'get'
    }
  );
};
export const saveTaskNodeConfig = (data) => {
  return request(`/yst-workflow-demo/workflow/api/taskNodeConfig`, {
    method: 'post',
    query: data
  });
};
