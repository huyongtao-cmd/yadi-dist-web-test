
import requests from '@/utils/request';

const api = '/yd-user/itm/brand';

//分页查询
export const search = (data: any) => {
  return requests(`${api}/listSpec`, {
    method: 'post',
    query: data
  });
};

//根据id删除品牌
export const delteBrand = (data: any) => {
  return requests(`${api}/${data}`, {
    method: 'delete',
    query: { id: data }
  });
};

//根据id获取品牌
export const getBrandDetail = (data: any) => {
  return requests(`${api}/details/${data}`, {
    method: 'get'
  });
};

//新增时提交
export const createSubmit = (data: any) => {
  return requests(`${api}/save`, {
    method: 'post',
    query: data
  });
};

//启用禁用
export const switchStatus = (data: any) => {
  return requests('/yd-user/itm/brand/switch', {
    method: 'post',
    query: data
  });
};

