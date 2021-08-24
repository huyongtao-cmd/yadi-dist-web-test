import requests from '@/utils/request';

//入库提交
export const submit = (data) => {
  return requests(`/yd-inv/inv/ydPurGr/saveAndSubmit`, {
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

// 入库序列号查数据
export const findSerialNoOnesin = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnesin/${data}`, {
    method: 'get'
  });
};

// 查明细
export const findIdOne = (data: any) => {
  return requests(`/yd-inv/inv/ydPurGrD/findIdOne/${data}`, {
    method: 'get'
  });
};

//查询采购订单明细
// export const findPurcIdOne = (data: any) => {
//   return requests(`/yd-pur/pur/purPo/purPoDetail/${data}`, {
//     method: 'get'
//   });
// };
export const findPurcIdOne = (data: any) => {
  return requests(`/yd-pur/pur/purPo/purPoDetailApp/${data}`, {
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

// 批发退货商品入库
export const findIdOneSalSo = (data: any) => {
  return requests(`/yd-sale/salSo/findIdOne/${data}`, {
    method: 'get'
  });
};


// 查看条码
export const findSerialNos = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerialDoc/selectStatus`, {
    method: 'post',
    query: data
  });
};


