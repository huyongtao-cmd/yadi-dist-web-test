// 序列号查询
import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';
import requests from '@/utils/request';
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
import { commonExport } from '@/utils/utils';
import * as service from './service';
import app from '@/utils/appCommon';
import { ELImportExcel } from '@/components/el';
import { Modal } from 'antd';
import ImportFailModal from './ImportFailModal';

class SerialNo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      storeRef: null,
      whRef: null,
      importModalRef: null
    };
  }
  beforeRequest = (formData) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    let params = {
      ...formData,
      storeIds
      // itemIds: formData.itemIds?.map((item) => item.id),
      // lotNo: formData.lotNo?.lotNo
    };
    console.log('处理后的结果', params);
    return params;
  };

  onSelectChange = async (value) => {
    this.setState({
      loading: true
    })
    this.state.tableRef.setSearchFormData({
      whId: ''
    })
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      storeIds,
      buId: value
    }
    const res = await service.findOneInv(data);
    if (res.success) {
      const param = res.data.records?.map((item) => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
          }
        }
      }).filter(Boolean);
      this.state.whRef.setList(param);
    }
  }

  storeRef = (ref) => {
    this.setState({
      storeRef: ref
    });
  };

  whRef = (ref) => {
    this.setState({
      whRef: ref
    });
  };

  exports = (a, b, page) => {
    const data = {
      ...b,
      size: page.pageSize,
      current: page.current
    }
    commonExport({
      url: '/yd-inv/Inv/ydSerial/serialExport',
      params: this.beforeRequest(data),
      fileName: '车架号状态导出'
    });
  };

  // 导入
  imports = () => {
    const { importModalRef } = this.state;
    importModalRef.openModal();
  }

  //获取modalref
  modalRef = (importModalRef) => {
    this.setState({
      importModalRef
    });
  };

  //导入接口调用成功后的回调
  importCallBack = async (res) => {
    if (res.success) {
      if (res.data.length > 0) {
        // 有导入失败的数据
        Modal.info({
          title: '',
          width: '40%',
          content: <ImportFailModal dataSource={(res.data)} />,
          okText: '确认',
          icon: null
        })
      }
    }
    app.ShowMsg(res);
    this._refreshData();
  };

  _refreshData() {
    this.state.tableRef.refreshData();
  }

  render() {
    return (
      <>
        <ElSearchTable
          bordered
          rowKey='id'
          scroll={{ x: 'max-content' }}
          onRef={(tableRef) => {
            this.setState({
              tableRef: tableRef
            });
          }}
          tableProxy={{
            request: async (paramData) => {
              return await requests(`/yd-inv/Inv/ydSerial/search`, {
                method: 'post',
                query: this.beforeRequest(paramData)
              });
            },
            successCallBack: (tableRef) => {
              console.log('请求成功的回调', tableRef);
            },
            errCallBack: () => {
              console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          searchFormProps={{ items: getTableSearchFormItems(this.storeRef, this.whRef, this.onSelectChange) }}
          columns={getTableColumns()}
          actionButtons={getTableActionButtons(this.imports, this.exports)}
        />
        <ELImportExcel
          downTemplateRequest='/yd-inv/Inv/ydSerial/downloadSpcTemplate'
          downTemplateFileName='车架号状态导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-inv/Inv/ydSerial/import'
          successCallBak={this.importCallBack}
          onRef={this.modalRef}
          maxSize={20}
          sizeType='MB'
          note='仅支持xlsx文件，不能大于20mb'
          fileType='xlsx|xls|xlsx'
        />
      </>
    );
  }
}
export default SerialNo;
