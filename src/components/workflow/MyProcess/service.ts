import request from '@/utils/request';

export const getMyTodoTaskList = (data) => {
  return request('/yst-workflow-demo/workflow/api/myTodoTask', {
    method: 'post',
    query: data
  });
};
export const getMyCompletedTaskList = (data) => {
  return request('/yst-workflow-demo/workflow/api/myCompletedTask', {
    method: 'post',
    query: data
  });
};
export const getMyCreatedTaskList = (data) => {
  return request('/yst-workflow-demo/workflow/api/myCreateProcess', {
    method: 'post',
    query: data
  });
};
export const getProcDefsDropdownList = () => {
  return request(`/yst-workflow-demo/workflow/api/query/procDefs`, {
    method: 'get'
  });
};
