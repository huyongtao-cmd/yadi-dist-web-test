import request from '@/utils/request';

export const changePW = (data) => {
  return request('/yd-system/sys/users/changep', {
    method: 'put',
    query: data
  });
};
