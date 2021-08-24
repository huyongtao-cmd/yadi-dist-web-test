import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ElCard } from '@/components/el';
import { asserts, maths } from '@/utils';


export default ({ dataSource, serialNoList }) => {
  console.log(dataSource, serialNoList, 'dataSourcedataSource');
  let result = [];
  if (dataSource.length > 0) {
    dataSource?.forEach(item => {
      let itemName = null;
      let itemCode = null;
      if (serialNoList.length > 0) {
        serialNoList.forEach(no => {
          if (item.id === no.srcDocDid) {
            itemName = item.itemName;
            itemCode = item.itemCode;
            result.push({
              itemName,
              itemCode,
              id: no.id,
              serialNo: no.serialNo,
            })
          }
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

