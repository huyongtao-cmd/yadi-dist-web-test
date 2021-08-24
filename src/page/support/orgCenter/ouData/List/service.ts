import requests from '@/utils/request';

//获取公司列表
export const getOuDataList = (data) => {
  return requests('/yd-user/org/orgOu/list', {
    method: 'post',
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
