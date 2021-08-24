import requests from '@/utils/request';

const api = '/yd-user/itm/item';

//获取商品品类
export const getCategoryList = () => {
  return requests('/yd-user/itm/itmItemCate/searchTree', {
    method: 'get'
  });
};

//分页查询
export const search = (data: { [props: string]: any }) => {
  return requests('/yd-user/itm/item/list', {
    method: 'post',
    query: data
  });
};

//根据id删除商品
export const deleteItem = (data: any) => {
  return requests(`${api}/${data}`, {
    method: 'delete',
    query: { id: data }
  });
};

export const getBarCode = () => {
  return requests(`${api}/barCode/list`, {
    method: 'get'
  });
};

export const uploadPic = (formData) => {
  return requests('/yd-user/com/file/v1/upload', {
    method: 'post',
    query: formData
  });
};
