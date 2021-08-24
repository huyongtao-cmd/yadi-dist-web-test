import request from '@/utils/request';

const api = '/yst-fin/fin/salSettle';

// 分页查询
export const search = (data) => {
  return request(`${api}/list`, {
    method: 'post',
    query: data
  });
};

// 销售结算单-审核通过(批量)
export const approved = (data) => {
  return request(`${api}/approved`, {
    method: 'post',
    query: data
  });
};


// 销售结算单-审核拒绝（批量）
export const rejected = (data) => {
  return request(`${api}/rejected`, {
    method: 'post',
    query: data
  });
};
// 销售结算单-审核拒绝（单个）
export const rejectedById = (data) => {
  return request(`${api}/rejected/${data.id}`, {
    method: 'post',
    query: data
  });
};

// 销售结算单-审核暂挂（批量）
export const pending = (data) => {
  return request(`${api}/pending`, {
    method: 'post',
    query: data
  });
};

// 销售结算单-关联发票信息分页查询（详情页）
export const invoice = (data) => {
  return request(`${api}/invoice`, {
    method: 'post',
    query: data
  });
};

// 销分页查询-销售结算明细
export const details = (data) => {
  return request(`${api}/details`, {
    method: 'post',
    query: data
  });
};

// 分页查询-商户分配
export const merDetails = (data) => {
  return request(`${api}/merDetails`, {
    method: 'post',
    query: data
  });
};
// 分页查询-KOC分配
export const kocDetails = (data) => {
  return request(`${api}/gridDetails`, {
    method: 'post',
    query: data
  });
};

// 销售结算单-付款信息分页查询（详情页）
export const pay = (data) => {
  return request(`${api}/pay`, {
    method: 'post',
    query: data
  });
};

// 采购结算单-按照id查询基本信息（详情页）
export const searchBasic = (data) => {
  return request(`${api}/query/${data.id}`, {
    method: 'post'
  });
};
// 采购结算单-按照id查询基本信息（详情页）
export const searchDel = (data) => {
  return request(`/yst-order/order/salRecvconf/select`, {
    method: 'post',
    query: data
  });
};
