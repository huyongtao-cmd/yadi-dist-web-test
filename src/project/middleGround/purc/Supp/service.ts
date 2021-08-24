import requests from '@/utils/request';

//供应商信息分页查询
export const search = (data: any) => {
  return requests('/yd-pur/supp/findPage', {
    method: 'post',
    query: data
  });
};
