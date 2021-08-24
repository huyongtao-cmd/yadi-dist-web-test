import request from '@/utils/request';
export const getCurrentUserMenu = () => {
  return request('/yd-system/sys/users/current/menus', {
    method: 'get'
  });
};
export const getCurrentUserAction = () => {
  return request('/yd-system/sys/users/current/actions', {
    method: 'get'
  });
};
export const getCurrentUserCurrentPageAction = (menuId) => {
  return request(`/yd-system/sys/users/current/menus/${menuId}`, {
    method: 'get'
  });
};
