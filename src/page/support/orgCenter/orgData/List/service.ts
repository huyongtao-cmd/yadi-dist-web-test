import requests from '@/utils/request';
import Mock from 'mockjs';

const api = '/yd-user/org/orgBu';
let ser = {
  //分页查询
  search: (data: any) => {
    return requests(`${api}/list`, {
      method: 'post',
      query: data
    });
  },
  // 停用
  stop: (ids, forceStop) => {
    let data = { ids, buStatus: 'CLOSED', forceStop: forceStop };
    return ser._updateStatus(data);
  },
  // 确认
  confirm: (ids) => {
    let data = { ids, buStatus: 'ACTIVE' };
    return ser._updateStatus(data);
  },
  // 批量改状态
  _updateStatus: (data) => {
    return requests(`${api}/updateOrgBuStatus`, {
      method: 'put',
      query: data
    });
  },

  getDetail: (id) => {
    return requests(`${api}/getById/${id}`, {
      method: 'get'
    });
  },
  // 保存
  save: (id, data) => {
    data.id = id;
    // data.buStatus = 'DR'; // 理论上，本身就应该是草稿
    return ser._update(data);
  },
  // 提交
  submit: (id, data) => {
    data.id = id;
    data.buStatus = 'ACTIVE';
    return ser._update(data);
  },
  // 更新
  _update: (data) => {
    return requests(`${api}/update`, {
      method: 'put',
      query: data
    });
  }
};

export default ser;
