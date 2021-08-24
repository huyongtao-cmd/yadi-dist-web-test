import requests from '@/utils/request';

//通过分类获取类目属性
export const getItmCate = (data: { [props: string]: any }) => {
  return requests(`/yd-user/itm/itmCateProp/list/cate/${data}`, {
    method: 'get'
  });
};

//获取品类树
export const getItmTagTree = () => {
  return requests('/yd-user/itm/tag/tree', {
    method: 'get'
  });
};
//新增商品
export const createItem = (data: { [props: string]: any }) => {
  return requests('/yd-user/itm/item/save', {
    method: 'post',
    query: data
  });
};
//根据id获取商品详情
export const getItemDetail = (data: any) => {
  return requests(`/yd-user/itm/item/details/${data}`, {
    method: 'get'
  });
};
//获取管控参数
export const getItemParamsData = (data: any) => {
  return requests(`/yd-user/itm/cateConPara/list/cate/${data}`, {
    method: 'get'
  });
};
//标签新接口，分页查询
export const getTagNewList = (data: any) => {
  return requests('/yd-user/itm/tag/list', {
    method: 'post',
    query: data
  });
};
