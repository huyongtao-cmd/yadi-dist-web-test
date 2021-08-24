import requests from '@/utils/request';

// 分页查询
export const getList = (data: any) => {
  return requests('/yd-inv/ydinvCk/list', {
    method: 'post',
    query: data
  });
};

// 作废
export const invalidById = (id: string) => {
  return requests(`/yd-inv/ydinvCk/invalid/${id}`, {
    method: 'put'
  })
}

// 审核通过
export const approvePass = (id: string) => {
  return requests(`/yd-inv/ydinvCk/approval/${id}`, {
    method: 'put'
  })
}

// 审核拒绝
export const approveRefuse = (id: string) => {
  return requests(`/yd-inv/ydinvCk/reject/${id}`, {
    method: 'put'
  })
}

// 根据选择的门店获取对应的仓库
export const findOneInv = (data: any) => {
  return requests(`/yd-inv/inv/ydinvWh/search`, {
    method: 'post',
    query: data
  });
};


// 获取盘点库存
export const getInvsByBase = (data: any) => {
  return requests(`/yd-inv/ydinvCk/findbyMasIds`, {
    method: 'post',
    query: data
  })
}

// 根据选择的商品id，门店，仓库获取库存数    todo 需要获取新旧车架号信息一级库存数量
// /yd-inv/invStk/findPage
export const getAccQtyByItemId = (data: any) => {
  return requests(`/yd-inv/ydinvCk/findbyMasIdsItemId`, {
    method: 'post',
    query: data
  })
}

// 获取详情
export const getDetailsById = (id: string) => {
  return requests(`/yd-inv/ydinvCk/detail/${id}`, {
    method: 'get'
  })
}

// 保存
export const save = (params: Object) => {
  return requests('/yd-inv/ydinvCk/create', {
    method: 'post',
    query: params
  })
}

// 提交
export const submit = (params: Object) => {
  return requests('/yd-inv/ydinvCk/submitInvCk', {
    method: 'post',
    query: params
  })
}

// 序列号查数据
export const findSerialNoOnesOut = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnesSalOut`, {
    method: 'post',
    query: data
  });
};

// 序列号查数据   可以录入非该仓库的车架号
export const findSerialNoOnesPOut = (data: any) => {
  return requests(`/yd-inv/Inv/ydSerial/findSerialNoOnesPOut`, {
    method: 'post',
    query: data
  });
};

// 清空车架号
export const clearSerialNosById = (id: string) => {
  return requests(`/yd-inv/ydinvCk/deleteSerialNo/${id}`, {
    method: 'get'
  })
}

// 根据明细中的商品获取库存数
export const getInvQtys = (data: any) => {
  console.log(data);
  return requests('/yd-inv/invStk/findBuidandItemidandWhidTO', {
    method: 'post',
    query: data
  })
};
