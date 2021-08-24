import requests from '@/utils/request';

//获取公司列表
export const getOuDataList = (data) => {
  return requests('/yd-sale/crmCust/searchWholesaleCustomer', {
    method: 'post',
    // orders: [{ asc: false, column: 'createTime' }],
    query: data
  });
};

// 所属经销商
export const searchUserOrgBu = (data) => {
  return requests('/yd-sale/crmCust/searchUserOrgBu', {
    method: 'post',
    // orders: [{ asc: false, column: 'createTime' }],
    query: data
  });
};



//公司状态操作
export const updateOrgBuStatus = (data) => {
  return requests('/yd-user/org/orgOu/updateOrgBuStatus', {
    method: 'PUT',
    query: data
  });
};
