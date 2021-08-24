import requests from '@/utils/request';
import Mock from 'mockjs';
import serOrg from '@/page/support/orgCenter/orgData/List/service';
import app from '@/project/utils/appCommon';

const api = '/yd-user/agent';
let ser = {
  //分页查询
  search: (data: any) => {
    data.buType = 'DEALER';
    app.InsertOrderParams(data);
    // return serOrg.search(data);
    return requests(`${api}/list`, {
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
    return requests(`${api}/saveOrUpdateAgent`, {
      method: 'post',
      query: data
    });
  }
};

export default ser;
