import requests from '@/utils/request';
import Mock from 'mockjs';
import app from '@/project/utils/appCommon';

const api = '/yd-user/itm/itmItemYd';
let ser = {
  //分页查询
  search: (data: any) => {
    app.InsertOrderParams(data);
    data.es6 = 0;
    return requests(`${api}/search`, {
      method: 'post',
      query: data
    });
  },
  // 更新状态
  updateStatus: (ids) => {
    return requests(`${api}/switch`, {
      method: 'post',
      query: { ids }
    });
  },

  // 获取明细数据
  getDetail: (id) => {
    return requests(`${api}/findIdOne/${id}`, {
      method: 'get'
    });
  },
  // 保存
  save: (data) => {
    return ser._update(data);
  },
  // 更新
  _update: (data) => {
    return requests(`${api}/save`, {
      method: 'post',
      query: data
    });
  },
  del: (ids) => {
    return requests(`${api}/deleteBatch`, {
      method: 'delete',
      query: ids
    });
  },

  uploadPic: (formData) => {
    return requests('/yd-user/com/file/v1/upload', {
      method: 'post',
      query: formData
    });
  }
};

export default ser;
