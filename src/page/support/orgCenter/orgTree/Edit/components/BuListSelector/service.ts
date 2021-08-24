import request from '@/utils/request';
const api = '/yd-user/org/orgBu';
export const getList = (data: any) => {
  return request(`${api}/list`, {
    method: 'post',
    query: data
  });
};
