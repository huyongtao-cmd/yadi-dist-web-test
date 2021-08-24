import requests from '@/utils/request';
import app from '@/project/utils/appCommon';

//获取公司列表
export const getOuDataList = (data) => {
  data.storeType = 'A';
  app.InsertOrderParams(data);
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
