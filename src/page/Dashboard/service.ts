import requests from '@/utils/request';


export const getList=(data)=>{
  return requests("/user/list",{
    method:"post",
    query:data
  })
}


export const getMock=()=>{
  return require("../../mock/services/dashboardMock.json")
}
