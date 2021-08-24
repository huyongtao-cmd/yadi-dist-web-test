import requests from '@/utils/request';

//入库提交
export const submit = (data) => {
  return requests(`/yd-inv/sal/salDo/outbound`, {
    method: 'post',
    query: data
  });
};

//保存
export const grsave = (data) => {
  return requests('/yd-inv/inv/ydPurGr/save', {
    method: 'post',
    query: data
  });
};

// 查库位
export const findOneInvAj = (data: any) => {
  return requests('/yd-inv/inv/ydinvWh/findBySalDoIdOne?id=' + data, {
    method: 'get'
  });
};

// 序列号查数据
export const findSerialNoOnes = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnes/${data}`, {
    method: 'get'
  });
};

// 序列号查数据
export const findSerialNoOnesOut = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnesSalOut`, {
    method: 'post',
    query: data
  });
};

// 查明细
export const findIdOne = (data: any) => {
  return requests(`/yd-inv/inv/ydPurGrD/findIdOne/${data}`, {
    method: 'get'
  });
};

//查询采购订单明细
export const findPurcIdOne = (data: any) => {
  return requests(`/yd-pur/pur/purPo/purPoDetail/${data}`, {
    method: 'PATCH'
  });
};

//查询销售订单明细
export const findSaleOrder = (data: any) => {
  return requests(`/yd-sale/salSo/findIdOne/${data}`, {
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

// 库存数 repertory  /yd-inv/invStk/findPage  根据商品itemId 和 仓库whId
export const findPage = (data: any) => {
  console.log(data);
  return requests('/yd-inv/invStk/findPage', {
    method: 'post',
    query: data
  });
};