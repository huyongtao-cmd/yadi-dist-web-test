
import requests from '@/utils/request';

//分页查询
export const search = (data: any) => {
  return requests('/yd-user/selfInspection/list', {
    method: 'post',
    query: data
  });
};

// 获取详情
export const getDetailsById = (data: any) => {
  return requests('/yd-user/selfInspection/searchSelfTest', {
    method: 'post',
    query: data
  });
};

