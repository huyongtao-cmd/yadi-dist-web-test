import requests from '@/utils/request';

const api = '/yd-user/itm/tag';

// 根据上级ID获取标签列表
export const getTagList = (data: any) => {
  return requests(`${api}/tree`, {
    method: 'get'
  });
};

// 新增 编辑标签
export const newOrEditTag = (data: any, tagType: any) => {
  data.tagType = tagType;
  return requests(`${api}/save`, {
    method: 'post',
    query: data
  });
};

//获取详情
export const getTagDetail = (tagId: number) => {
  return requests(`${api}/details/${tagId}`, {
    method: 'get'
  });
};
//删除标签
export const deleteTag = (tagId: number) => {
  return requests(`${api}/remove/${tagId}`, {
    method: 'post'
  });
};
//标签启用禁用
export const switchStatus = (data: any) => {
  return requests('/yd-user/itm/tag/switch', {
    method: 'post',
    query: data
  });
};

//标签新接口，分页查询
export const getTagNewList = (data: any) => {
  return requests('/yd-user/itm/tag/list', {
    method: 'post',
    query: data
  });
};
