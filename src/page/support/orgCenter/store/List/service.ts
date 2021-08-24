import requests from '@/utils/request';

//获取公司列表
export const getOuDataList = (data) => {
  return requests('/yd-user/org/orgStore/list', {
    method: 'post',
    query: data
  });
};
//公司状态操作
export const updateOrgStoreStatus = (data) => {
  return requests('/yd-user/org/orgStore/update', {
    method: 'PUT',
    query: data
  });
};
