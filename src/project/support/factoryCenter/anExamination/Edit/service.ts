import request from '@/utils/request';

// 提交自检详情页
export const submit = (data: any) => {
  return request('/yd-user/selfInspection/saveOrUpdateSelfTest', {
    method: 'post',
    query: data
  });
};
