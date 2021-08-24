import request from '@/utils/request';

export const getUserList = (data) => {
  return request('/yd-system/sys/users/q', {
    method: 'post',
    query: data
  });
};
export const getUserById = (id) => {
  return request(`/yd-system/sys/users/${id}`, {
    method: 'get'
  });
};
export const createUser = (data) => {
  return request('/yd-system/sys/users', {
    method: 'post',
    query: data
  });
};
export const updateUser = (data) => {
  return request('/yd-system/sys/users', {
    method: 'put',
    query: data
  });
};
export const getAllRoleList = () => {
  let data = { enabled: true, current: 1, size: 99999 };
  return request('/yd-system/sys/roles/q', {
    method: 'post',
    query: data
  });
};
export const triggerUserActive = (id) => {
  return request(`/yd-system/sys/users/${id}`, {
    method: 'put'
  });
};
export const changePassword = (userId, password) => {
  return request(`/yd-system/sys/users/p/${userId}/${password}`, {
    method: 'put'
  });
};
