import request from '@/utils/request';

// 新增
export const getCategoryById = (data) => {
  return request('/yd-sale/crmCust/createCustomer', {
    method: 'post',
    query: data
  });
};

// 所属门店
export const searchUserOrgBu = (data) => {
  return request('/yd-user/org/orgStore/list', {
    method: 'post',
    query: data
  });
};
