import request from '@/utils/request';

export const getCategoryList = (data) => {
  return request('/yst-workflow-demo/workflow/api/category/search', {
    method: 'post',
    query: data
  });
};
export const getCategoryById = (id) => {
  return request(`/yst-workflow-demo/workflow/api/category/${id}`, {
    method: 'get'
  });
};
export const saveCategory = (data) => {
  return request('/yst-workflow-demo/workflow/api/category', {
    method: 'post',
    query: data
  });
};
export const deleteCategory = (id) => {
  return request(`/yst-workflow-demo/workflow/api/category/${id}`, {
    method: 'delete'
  });
};
