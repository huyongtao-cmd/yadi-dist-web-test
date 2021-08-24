import requests from '@/utils/request';

export const agentList = (data) => {
  return requests(`/yd-user/agent/list`, {
    method: 'post',
    query: data
  });
};
//入库提交
export const submit = (data) => {
  return requests(`/yd-inv/inv/invtrn/create`, {
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

// 入库序列号查数据
export const findSerialNoOnesin = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnesin/${data}`, {
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