import requests from '@/utils/request';

//分页查询
export const search = (data: any) => {
  return requests('/yst-pur/pur/purPoPayplan/procurementApplicationScheme', {
    method: 'post',
    query: data
  });
};

//新增供应商
export const save = (data: any) => {
  return requests('/yd-pur/supp/add', {
    method: 'post',
    query: data
  });
};

//查询供应商详情
export const findById = (data: any) => {
  return requests('/yd-pur/supp/findById/' + data, {
    method: 'get'
  });
};

//编辑供应商
export const update = (data: any) => {
  return requests('/yd-pur/supp/update', {
    method: 'put',
    query: data
  });
};
