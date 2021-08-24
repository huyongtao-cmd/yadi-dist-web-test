import request from '@/utils/request';
export const getMenuTree = () => {
  return request('/yd-system/sys/permissions/menutree', {
    method: 'get'
  });
};
export const getMenuById = (id) => {
  return request(`/yd-system/sys/permissions/${id}`, {
    method: 'get'
  });
};
export const getActionByMenuId = (id) => {
  return request(`/yd-system/sys/permissions/actionsbymenu/${id}`, {
    method: 'get'
  });
};
export const createMenu = (data) => {
  return request(`/yd-system/sys/permissions/newmenu`, {
    method: 'post',
    query: data
  });
};
export const createAction = (data) => {
  return request(`/yd-system/sys/permissions/newaction`, {
    method: 'post',
    query: data
  });
};
export const updateMenuOrAction = (data) => {
  return request(`/yd-system/sys/permissions`, {
    method: 'put',
    query: data
  });
};
export const getMenuOrActionById = (id) => {
  return request(`/yd-system/sys/permissions/actionsbymenu/${id}`, {
    method: 'get'
  });
};
