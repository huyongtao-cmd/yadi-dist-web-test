import requests from '@/utils/request';

//获取 顾客详情查询
export const getSelctList = (data, storeId) => {
  return requests(`/yd-sale/crmCust/searchCustomerInfo?custCode=${data}&storeId=${storeId}`, {
    method: 'get'
    // query: data
  });
};


