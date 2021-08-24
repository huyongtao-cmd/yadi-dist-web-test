import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ElCard } from '@/components/el';
import { asserts, maths } from '@/utils';


export default ({ dataSource }) => {
  console.log(dataSource, 'dataSourcedataSource');
  let data = dataSource.map(item => {
    return {
      ...item,
      itemName: item.itemName?.itemName,
      serialNoList: !Object.keys(item).includes('serialNoList') ? [] : Array.isArray(item.serialNoList) ? item.serialNoList : [],
      serialNoListName: !Object.keys(item).includes('serialNoListName') ? [] : Array.isArray(item.serialNoListName) ? item.serialNoListName : []
    }
  });
  let result = [];
  if (data.length > 0) {
    // data.forEach((item) => {
    //   item.serialNoList?.forEach((no, index) => {
    //     item[`serialNo${index + 1}`] = no;
    //   });
    // });
    data.forEach(item => {
      if (item.serialNoList.length > 0 && item.serialNoListName.length > 0) {
        item.serialNoList?.forEach((no, index) => {
          result.push({
            ...item,
            id: item.id + index,
            serialNo: no,
            serialName: item.serialNoListName[index],
          })
        })
      } else if (item.serialNoList.length > 0 && item.serialNoListName.length === 0) {
        item.serialNoList?.forEach((no, index) => {
          result.push({
            ...item,
            id: item.id + index,
            serialNo: no,
            serialName: '在途'
          })
        })
      } else {
        result.push({
          ...item,
          serialNo: '',
          serialName: ''
        })
      }
    })
  }

  console.log(result, 'resultresultresultresult');

  // const createColumns = () => {
  //   // 最多创建几列
  //   let maxColumns = data.length > 0 ? Math.max.apply(Math, data.map(item => item.serialNoList.length)) : 0;
  //   let arr = [];
  //   new Array(maxColumns).fill(undefined).forEach((item, index) => {
  //     arr.push({
  //       title: '车架号',
  //       key: `serialNo${index + 1}`,
  //       dataIndex: `serialNo${index + 1}`,
  //       width: 160,
  //     })
  //   })
  //   return arr.filter(Boolean);
  // }

  const getColumnsConfig = () => {
    return [
      {
        title: '商品编码',
        key: 'itemCode',
        dataIndex: 'itemCode',
        width: 120,
      },
      {
        title: '商品名称',
        key: 'itemName',
        dataIndex: 'itemName',
        width: 160,
      },
      {
        title: '车架号',
        key: 'serialNo',
        dataIndex: 'serialNo',
        width: 160,
      },
      {
        title: '车架号状态',
        key: 'serialName',
        dataIndex: 'serialName',
        width: 160,
      },
      // {
      //   title: '状态',
      //   key: 'status',
      //   dataIndex: 'status',
      //   width: 160,
      // },
      // ...createColumns()
    ]
  }

  return (
    <div style={{ width: '100%' }}>
      <ConfigProvider locale={zhCN}>
        <ElCard key='detail' id='detail' title='入库车架号信息'>
          <ElSearchTable
            rowKey='id'
            tableId='checkcodeModal'
            dataSource={result}
            columns={getColumnsConfig()}
            scroll={{ x: 'max-content' }}
            mode={{
              proxy: false,
              search: false,
              action: true,
              pagination: true,
            }}
            rowSelectionConfig={null}
          />
        </ElCard>
      </ConfigProvider>
    </div>
  )
}

