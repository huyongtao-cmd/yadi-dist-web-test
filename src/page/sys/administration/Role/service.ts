import request from '@/utils/request';
export const getRoleList = (data) => {
  return request('/yd-system/sys/roles/q', {
    method: 'post',
    query: data
  });
};

export const getMenuOrActionById = (id) => {
  return request(`/yd-system/sys/permissions/actionsbymenu/${id}`, {
    method: 'get'
  });
};
export const getActionByMenuId = (id) => {
  return request(`/yd-system/sys/permissions/actionsbymenu/${id}`, {
    method: 'get'
  });
};
export const createRole = (data) => {
  return request('/yd-system/sys/roles', {
    method: 'post',
    query: data
  });
};
export const updateRole = (data) => {
  return request('/yd-system/sys/roles', {
    method: 'put',
    query: data
  });
};
export const getMenuTree = () => {
  return request('/yd-system/sys/permissions/menutree', {
    method: 'get'
  });
};
export const getMenuCheck = (id) => {
  return request(`/yd-system/sys/roles/${id}/menuids`, {
    method: 'get'
  });
};
export const getActionCheck = (id) => {
  return request(`/yd-system/sys/roles/${id}/actionids`, {
    method: 'get'
  });
};

export const getActionByRoleIdAndMenuId = (roleId, menuId) => {
  return request(`/yd-system/sys/roles/${roleId}/menus/${menuId}`, {
    method: 'get'
  });
};

export const updateActionByRoleIdAndMenuId = (roleId, menuId, data) => {
  return request(`/yd-system/sys/roles/${roleId}/menus/${menuId}`, {
    method: 'post',
    query: data
  });
};

export const triggerRoleActive = (id) => {
  return request(`/yd-system/sys/roles/${id}`, {
    method: 'put'
  });
};
