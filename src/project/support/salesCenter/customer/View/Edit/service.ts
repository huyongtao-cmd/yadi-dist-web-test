import request from '@/utils/request';

// 修改
export const getCategoryByIdput = (data) => {
  return request('/yd-sale/crmCust/update', {
    method: 'put',
    query: data
  });
};