import requests from '@/utils/request';

//保存 新增 批发单创建
export const save = (data: any) => {
  console.log(data, '批发单创建');
  return requests('/yd-sale/salSo/createWholesaleOrder', {
    method: 'post',
    query: data
  })
};
// 仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};
// 提交
export const submit = (data: any) => {
  return requests('/yd-sale/salSo/submitWholesaleOrder', {
    method: 'post',
    query: data
  });
};
// 库存数 repertory  /yd-inv/invStk/findPage  根据商品itemId 和 仓库whId
export const getInventory = (data: any) => {
  console.log(data);
  return requests('/yd-inv/invStk/findPage', {
    method: 'post',
    query: data
  })
};
// 根据明细中的商品获取库存数
export const getInvQtys = (data: any) => {
  console.log(data);
  return requests('/yd-inv/invStk/findBuidandItemidandWhidTO', {
    method: 'post',
    query: data
  })
};


// 扫码 查库存合二为一接口
export const findSerialNoOnesSalOut = (data: any) => {
  console.log(data);
  return requests('/yd-inv/Inv/ydSerial/findSerialNoOnesSalOut', {
    method: 'post',
    query: data
  });
};

