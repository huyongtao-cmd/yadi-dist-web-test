// 销售订单查询
import React from 'react';

//公共组件 --- start
import ElSearchTable from '@/components/el/ElSearchTable';
//公共组件 --- end
import dayjs from 'dayjs';
//配置信息 -- start
import {
  getTableSearchFormItems,
  getTableColumns,
  getTableActionButtons
} from './config';
//配置信息 -- end
import { commonExport } from '@/utils/utils';
import * as service from './service';
import { ELImportExcel, ElNotification } from '@/components/el';

import app from '@/utils/appCommon';
// import { null } from 'mathjs';




class Search extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      storeRef: null,
      whRef: null,
      pageLoading: false,
      importModalRef: null
    };
  }
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
      buId: value,
      storeIds
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
  exports = async (...[, formData]) => {
    // console.log(formData, 'formData');
    commonExport({
      url: '/yd-sale/salSo/saleOrderExport',
      params: await this.beforeRequest(formData),
      fileName: '销售订单查询数据导出',
    });
  };
  // 导出数据处理
  beforeRequest = async (formData) => {
    const res = await service.salestype();
    if (res.success) {
      // console.log('查询', paramData)
      let docTypeListarrs = ['1', '5'];
      res.data.map((item) => {
        docTypeListarrs.push(item.udcVal)
      })
      console.log(docTypeListarrs, 'docTypeListdocTypeList')
      // console.log('导出数据处理卡卡那是不是', formData)
      const buIdList = JSON.parse(localStorage.getItem('BuIdList')).records;
      const storeIds = buIdList.map((item) => item.id);
      let params = {
        ...formData,
        docStatusList: docTypeListarrs,
        // docTypeList: docTypeListarrs,
        storeIds,
        startTime:
          formData.dataTime && dayjs(formData.dataTime[0]).format('YYYY-MM-DD'), //日期
        endTime:
          formData.dataTime && dayjs(formData.dataTime[1]).format('YYYY-MM-DD'), //日期
        dataTime: undefined,
        orders: [
          {
            asc: false,
            column: 'createTime'
          }
        ],
      };
      // console.log('处理后的结果', params);
      return params;
    } else {
      app.ShowMsg(res)
      console.log('处理后的结果');
    }
  }
  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    });
  };

  edit = ({ selectedRows }) => {
    console.log('-----,', '单据类型');
    let pageType;
    if (selectedRows[0].docNo.indexOf("LS") == 0) {
      if (selectedRows[0].custId) {
        pageType = 'retailorder'; // 整车零售单详情
      } else {
        pageType = 'partsRetailorder'; // 配件零售单详情
      }
    } else {
      ElNotification({
        type: 'warning',
        message:
          '只有零售单可以编辑'
      });
      return;
    }
    // else if (selectedRows[0].docNo.indexOf("PF") == 0) {
    //   pageType = 'wholeorder'; //批发单
    // } else {
    //   pageType = 'returnorder'; //退货单
    // }
    // if (selectedRows[0].docType == 'A' || selectedRows[0].docType == 'B') {
    //   pageType = 'retailorder'; //零售单
    // } else if (selectedRows[0].docType == 'C') {
    //   pageType = 'wholeorder'; //批发单
    // } else {
    //   pageType = 'returnorder'; //退货单
    // }
    if (selectedRows[0].docStatus == 1) {
      this.props.push(
        `/salesCenter/${pageType}/edit/${selectedRows[0].id}`
      );
    } else {
      ElNotification({
        type: 'warning',
        message:
          '非草稿订单不可编辑'
      })
    }
  };

  onRef = (tableRef) => {
    this.setState({
      tableRef: tableRef
    });
  };

  // 出库
  delivery = ({ selectedRows }) => {
    console.log(selectedRows[0], 'chuku');
    if (selectedRows[0]?.docNo.indexOf("LS") == 0) {
      ElNotification({
        type: 'warning',
        message:
          '零售订单已经全部出库'
      })
    } else if (selectedRows[0]?.docNo.indexOf("PF") == 0) { //批发单
      // this.props.history.push(
      //   `/salesCenter/wholeorder/detail/${selectedRows[0].id}`
      // );
      if (selectedRows[0]?.docStatus !== '4') {
        this.props.push(
          `/inventory/inventoryout/item/C/${selectedRows[0].id}`
        );
      } else {
        ElNotification({
          type: 'warning',
          message:
            '批发订单已经全部出库'
        })
      }

    }
  }

  request = async (paramData) => {
    // console.log('查询', paramData)
    const params = {
      ...paramData,
      startTime: paramData.dataTime && dayjs(paramData.dataTime[0]).format('YYYY-MM-DD') || undefined, //日期
      endTime: paramData.dataTime && dayjs(paramData.dataTime[1]).format('YYYY-MM-DD') || undefined, //日期
      dataTime: undefined,
      // 根据订单日期倒序排序
      orders: [
        {
          asc: false,
          column: 'createTime'
        }
      ]
    };
    // console.log(params, '//////')
    return service.search(params);
  };

  onimport = ({ selectedRows }) => {
    const { importModalRef } = this.state;
    importModalRef.openModal();
  };

  //获取modalref
  modalRef = (importModalRef) => {
    this.setState({
      importModalRef
    });
  };

  //导入接口调用成功后的回调
  importCallBack = async (res) => {
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
          scroll={{ x: 'min-content' }}
          onRef={this.onRef}
          tableProxy={{
            request: async (paramData) => {
              // console.log('查询参数', paramData);
              return service.search(await this.beforeRequest(paramData));
            },
            successCallBack: (tableRef) => {
              // console.log('请求成功的回调', tableRef);
            },
            errCallBack: () => {
              // console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          searchFormProps={{ items: getTableSearchFormItems(this.storeRef, this.whRef, this.onSelectChange) }}
          actionButtons={getTableActionButtons(
            this.exports,
            this.onimport,
            this.edit,
            this.delivery
          )}
          columns={getTableColumns(this)}
        />
        <ELImportExcel
          downTemplateRequest='/yd-sale/salSo/downloadTemplate'
          downTemplateFileName='批发订单导入模板'
          downTemplateMethod='POST'
          requestPath='/yd-sale/salSo/wholesaleImport'
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
export default Search;
