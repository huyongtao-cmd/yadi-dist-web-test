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
      serialNoList: !Object.keys(item).includes('serialNoList') ? [] : Array.isArray(item.serialNoList) ? item.serialNoList : [],
    }
  });
  let result = [];
  if (data.length > 0) {
    data.forEach(item => {
      if (item.serialNoList.length > 0) {
        item.serialNoList?.forEach((no, index) => {
          result.push({
            itemCode: item.itemCode,
            itemName: item.itemName,
            id: item.id + index,
            serialNo: no,
          })
        })
      }
    })
  }

  console.log(result, 'resultresultresultresult');

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
        <ElCard key='detail' id='detail' title='明细车架号信息'>
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

