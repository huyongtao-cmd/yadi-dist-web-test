import request from '@/utils/request';

export const getComments = (processInstanceId) => {
  return request(
    `/yst-workflow-demo/workflow/api/comments?processInstanceId=${processInstanceId}`,
    {
      method: 'get'
    }
  );
};
