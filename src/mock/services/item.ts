
import Mock from "mockjs";

// function getLevel1List (req,res) {
//   const json = { code: 200, success: true, data: [], msg: '操作成功' };
//   const list = [
//     {id:'00001', name: '燃气具'},
//     {id:'00002', name: '净水器'},
//     {id:'00003', name: '大家电'},
//     {id:'00004', name: '厨房小店'},
//     {id:'00005', name: '生活电器'},
//     {id:'00006', name: '配件'}
//   ];
//   json.data = list;
//   return res.json(json);
// }

// function getLevel2ListById (req,res) {
//   const json = { code: 200, success: true, data: [], msg: '操作成功' };
//   const list = [
//     {id:'00011', name: '燃气具1'},
//     {id:'00012', name: '净水器1'},
//     {id:'00013', name: '大家电1'},
//     {id:'00014', name: '厨房小店1'},
//     {id:'00015', name: '生活电器1'},
//     {id:'00016', name: '配件1'}
//   ];
//   json.data = list;
//   return res.json(json);
// }

// function categorySubmit (req,res) {
//   const json = { code: 200, success: true, data: [], msg: '操作成功' };
//   return res.json(json);
// }

// const proxy = {
//   'GET /yst-fc/mock/item/addition/category/level1List': getLevel1List,
//   'GET /yst-fc/mock/item/addition/category/level2ListById': getLevel2ListById,
//   'POST /yst-fc/mock/item/addition/category/submit': categorySubmit,
// }

// export default delay(proxy,500)
const level1Obj = {
  "list|1-10": [
    {
      "id|+1": 1,
      'name':'@name'
    },
  ],
};

Mock.mock('/yst-fc/mock/item/addition/category/level1List', 'get', (opts)=>{
  console.log('mock.........')
  return Mock.mock(level1Obj)
});