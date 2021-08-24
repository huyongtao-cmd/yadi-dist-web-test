import requests from '@/utils/request';

//保存 新增 批发单编辑创建
export const saveEdit = (data: any) => {
  console.log(data,'批发单编辑创建');
  return requests('/yd-sale/salSo/createWholesaleOrder', {
    method: 'post',
    query: data
  });
};
// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};
//查询单条数据
export const findIdOne = (data: any) => {
  return requests('/yd-sale/salSo/findIdOne/' + data, {
    method: 'get'
    // query: data
  });
};
// 提交
export const submit = (data: any) => {
  return requests('/yd-sale/salSo/submitWholesaleOrder', {
    method: 'post',
    query: data
  });
};
// 库存数  /yd-inv/invStk/findPage 商品itemId 和 仓库id whId
export const getInventory = (data: any) => {
  console.log(data);
  return requests( '/yd-inv/invStk/findPage', {
    method: 'post',
    query: data
  })
};
