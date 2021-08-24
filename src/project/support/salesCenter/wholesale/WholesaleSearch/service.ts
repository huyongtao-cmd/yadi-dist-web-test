import requests from '@/utils/request';

// 查询
export const search = (data: any) => {
  return requests('/yd-user/inv/invStk/searchInvLot', {
    method: 'post',
    query: data
  });
};
