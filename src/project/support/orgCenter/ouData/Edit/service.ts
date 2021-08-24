import requests from '@/utils/request';

const api = '/yd-user/itm/item';

//获取商品分类
export const getCategoryList = () => {
  return requests('/yd-user/itm/itmItemCate/searchTree', {
    method: 'get'
  });
};

//获取商品编码
export const getItemCodeList = () => {
  return requests(`${api}/list`, {
    method: 'get'
  });
};

//获取商品类型
export const getItemTypeList = () => {
  return requests(`${api}/list`, {
    method: 'get'
  });
};

//分页查询
export const search = (data: any) => {
  return requests(`${api}/list`, {
    method: 'post',
    query: data
  });
};
//新增公司
export const createOu = (data: any) => {
  return requests('/yd-user/org/orgOu/create', {
    method: 'post',
    query: data
  });
};
//根据id获取详情
export const getDetailById = (data: any) => {
  return requests(`/yd-user/org/orgOu/getById/${data}`, {
    method: 'get'
  });
};

//更新公司
export const updateOu = (data: any) => {
  return requests(`/yd-user/org/orgOu/update`, {
    method: 'PUT',
    query: data
  });
};
//获取币种
export const getCurrAll = () => {
  return requests('/yd-user/com/curr/all', {
    method: 'get'
  });
};
