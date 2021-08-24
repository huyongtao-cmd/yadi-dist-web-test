import request from '@/utils/request';
export const getUdcList = (data) => {
  return request('/yd-system/sys/codes/q', {
    method: 'post',
    query: data
  });
};

export const searchUdcById = (id) => {
  return request(`/yd-system/sys/codes/${id}`, {
    method: 'get'
  });
};

export const createUdc = (data) => {
  return request('/yd-system/sys/codes', {
    method: 'post',
    query: data
  });
};
export const updateUdc = (data) => {
  return request('/yd-system/sys/codes', {
    method: 'put',
    query: data
  });
};
