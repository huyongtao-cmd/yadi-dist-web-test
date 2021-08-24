import requests from '@/utils/request';

// 保存
export const saveOrcheckout = (url, params) => {
  return requests(url, {
    method: 'post',
    query: params
  });
};

// 获取某一条信息进行回显
export const findIdOne = (id) => {
  return requests('/yd-sale/salSo/findIdOne/' + id, {
    method: 'get'
  });
};

// 图片上传
export const uploadPic = (formData) => {
  return requests('/yd-user/com/file/v1/upload', {
    method: 'post',
    query: formData
  });
};

// 消息推送
export const sendMessage = (id) => {
  return requests('/yd-sale/salSo/tryPush/' + id, {
    method: 'get'
  });
};

