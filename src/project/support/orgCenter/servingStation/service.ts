import requests from '@/utils/request';
import Mock from 'mockjs';
import app from '@/project/utils/appCommon';

const api = '/yd-user/serve';
let ser = {
  //分页查询
  search: (data: any) => {
    data.storeType = 'B';
    app.InsertOrderParams(data);
    return requests(`/yd-user/org/orgStore/list`, {
      method: 'post',
      query: data
    });
  },
  // 更新状态
  updateStatus: (ids) => {
    return requests(`${api}/switchStatus`, {
      method: 'post',
      query: { ids }
    });
  },
  // 获取明细数据
  getDetail: (id) => {
    return requests(`${api}/findById/${id}`, {
      method: 'get'
    });
  },
  // 保存
  save: (data) => {
    return ser._update(data);
  },
  // 更新
  _update: (data) => {
    return requests(`${api}/saveOrUpdateServe`, {
      method: 'post',
      query: data
    });
  }
};

export default ser;
