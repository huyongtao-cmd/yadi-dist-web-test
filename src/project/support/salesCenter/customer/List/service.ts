import requests from '@/utils/request';

//获取 查询顾客接口
export const getSelctClient = (data) => {
  return requests('/yd-sale/crmCust/searchCustomer', {
    method: 'post',
    query: data
  });
};

// 门店
export const searchUserOrgBu = (data) => {
  return requests('/yd-user/org/orgStore/list', {
    method: 'post',
    query: data
  });
};


