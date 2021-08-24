import request from '@/utils/request';

export const getTaskInfo = (id) => {
  return request(`/yst-workflow-demo/workflow/api/procManage/${id}/taskInfo`, {
    method: 'get'
  });
};
export const getWorkflowUser = () => {
  return request(`/yst-workflow-demo/workflow/api/query/users`, {
    method: 'get'
  });
};
export const resetTaskHandler = (data) => {
  return request(
    `/yst-workflow-demo/workflow/api/procManage/resetTaskhandler`,
    {
      method: 'post',
      query: data
    }
  );
};
