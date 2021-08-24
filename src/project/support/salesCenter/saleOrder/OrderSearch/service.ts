import requests from '@/utils/request';

// 查询
export const search = (data: any) => {
  return requests('/yd-sale/salSo/search', {
    method: 'post',
    query: data
  });
};

// 销售类型
// export const salestype = () => {
//   return requests('/yd-system/sys/codes/combo/SAL/SALES_TYPE', {
//     method: 'get'
//   });
// };
export const salestype = () => {
  return requests('/yd-system/sys/codes/combo/SAL/SAL_ORDER', {
    method: 'get'
  });
};


// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};
