import requests from '@/utils/request';

//属性列表
export const getAttributeList = (data: { [props: string]: any }) => {
  return requests('/yd-user/itm/itmCateProp/list', {
    method: 'post',
    query: data
  });
};

//树形数据
export const getTreeList = () => {
  return requests(`/yd-user/itm/itmItemCate/searchTree`, {
    method: 'get'
  });
};
//根据id获取品类详情
export const getCateDetailById = (id) => {
  return requests(`/yd-user/itm/itmItemCate/getById/${id}`, {
    method: 'get'
  });
};

//新增标签
export const createItemCate = (data: { [props: string]: any }) => {
  return requests('/yd-user/itm/itmItemCate/create', {
    method: 'post',
    query: data
  });
};
//编辑标签
export const updateItemCate = (data: { [props: string]: any }) => {
  return requests('/yd-user/itm/itmItemCate/update', {
    method: 'put',
    query: data
  });
};
//删除标签
export const deleteItemCate = (data: { [props: string]: any }) => {
  return requests(`/yd-user/itm/itmItemCate/del/${data}`, {
    method: 'delete'
  });
};

// 获取参数列表
export const getAttrList = (params) => {
  return requests('/yd-user/itm/cateConPara/list', {
    method: 'post',
    query: params
  });
};

// 根据id获取参数信息
export const getAttrDetailById = (id) => {
  return requests('/yd-user/itm/cateConPara/details/' + id, {
    method: 'get'
  });
};

// 保存参数
export const saveAttrDetail = (params) => {
  return requests('/yd-user/itm/cateConPara/save', {
    method: 'post',
    query: params
  });
};

// 删除属性
export const deleteAttr = (id) => {
  return requests(`/yd-user/itm/cateConPara/${id}`, {
    method: 'delete'
  });
};

// 获取类目属性列表
export const getParamsList = (params) => {
  return requests('/yd-user/itm/itmCateProp/list', {
    method: 'post',
    query: params
  });
};

// 根据id获取类目参数信息
export const getParamsDetailById = (id) => {
  return requests(`/yd-user/itm/itmCateProp/details/${id}`, {
    method: 'get'
  });
};

// 保存类目属性
export const saveParamsDetail = (params) => {
  return requests('/yd-user/itm/itmCateProp/save', {
    method: 'post',
    query: params
  });
};

// 删除类目参数
export const deleteParams = (params) => {
  return requests(`/yd-user/itm/itmCateProp/${params}`, {
    method: 'delete'
  });
};

//启用禁用品类
export const switchStatus = (params) => {
  return requests('/yd-user/itm/itmItemCate/switch', {
    method: 'post',
    query: params
  });
};
//根据品类获取管控参数
export const getCateConPara = (params) => {
  return requests(`/yd-user/itm/cateConPara/list/cate/${params}`, {
    method: 'get'
  });
};
