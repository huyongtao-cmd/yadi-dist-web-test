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
import { ElNotification, ElPage } from '@/components/el';
// import { null } from 'mathjs';


class Search extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      storeRef: null,
      whRef: null,
      docTypeList: [],
    };
  }
  // async componentDidMount() {
  //   const res = await service.saltype();
  //   console.log(res, '........')
  //   let docTypeListarrs = [];
  //   res.data.map((item) => {
  //     docTypeListarrs.push(item.udcVal)
  //   })
  //   console.log(docTypeListarrs, 'docTypeListdocTypeList')
  //   this.setState({ docTypeList: docTypeListarrs });
  // }
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
    const res = await service.returntype();
    if (res.success) {
      // console.log('查询', paramData)
      console.log(res, '........')
      let docTypeListarrs = [];
      res.data.map((item) => {
        docTypeListarrs.push(item.udcVal)
      })
      console.log(docTypeListarrs, 'docTypeListdocTypeList')
      // this.setState({ docTypeList: docTypeListarrs });
      const buIdList = JSON.parse(localStorage.getItem('BuIdList')).records;
      const storeIds = buIdList.map((item) => item.id);
      let params = {
        ...formData,
        docStatusList: docTypeListarrs,
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
      console.log('处理后的结果', params);
      return params;
    } else {
      console.log('yichang');
    }
    // }
  };
  // print = () => {
  //   console.log('打印');
  // };

  edit = ({ selectedRows }) => {
    // console.log(selectedRows, '单据类型');
    let pageType;
    console.log(selectedRows[0], '单据类型');
    if (selectedRows[0].docNo.indexOf("LS") == 0) {
      if (selectedRows[0].custId) {
        pageType = 'retailorder'; // 整车零售单详情
      } else {
        pageType = 'partsRetailorder'; // 配件零售单详情
      }
    } else if (selectedRows[0].docNo.indexOf("PF") == 0) {
      pageType = 'wholeorder'; //批发单
    } else {
      pageType = 'returnorder'; //退货单
    }
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

  // 退货
  returngoods = async ({ selectedRows }) => {
    // 是否是全部入库  docStatus===‘8’
    if (selectedRows[0].docStatus !== '8') {
      // 不是全部入库 根据销售类型来判断  批发和批发退货,零售退货跳转商品入库界面 其它算零售，跳转退货编辑页面
      if (selectedRows[0].docType === 'C' || selectedRows[0].docType === 'E' || selectedRows[0].docType === 'D') {
        this.setState({
          loading: true,
        });
        let params = {};
        if (selectedRows[0].docNo.indexOf('TH') != 0) {
          params = {
            ...selectedRows[0],
            relateDocNo: selectedRows[0].docNo,
            docNo: null,
            salSoDCreateParamList: selectedRows[0].salSoDVOList
          }
        } else {
          params = {
            ...selectedRows[0],
            salSoDCreateParamList: selectedRows[0].salSoDVOList
          }
        }
        const res = await service.salesPFReturn(params);
        this.setState({
          loading: false,
        })
        if (res.success) {
          this.props.history.push(
            this.props.push(`/inventory/inventoryin/item/returninquiry/${res.data}`)
          );
        } else {
          ElNotification({
            type: 'warning',
            message: res.msg
          })
        }
      } else {
        this.props.history.push(
          this.props.push(`/salesCenter/returnorder/edit/${selectedRows[0].id}`)
        );
      }
    } else {
      ElNotification({
        type: 'warning',
        message:
          '已退货订单不可退货'
      })
    }
    // if ((selectedRows[0].docNo?.indexOf("PF") == 0 || selectedRows[0].relateDocNo?.indexOf("PF") == 0 || selectedRows[0].docNo?.indexOf("TH") == 0) && selectedRows[0].docStatus != '8' && selectedRows[0].docType === 'E') {
    //   this.setState({
    //     loading: true
    //   })
    //   let params = {};
    //   if (selectedRows[0].docNo.indexOf('TH') != 0) {
    //     // let { salSoDVOList: salSoDCreateParamList } = selectedRows[0].salSoDVOList;
    //     params = {
    //       ...selectedRows[0],
    //       relateDocNo: selectedRows[0].docNo,
    //       docNo: null,
    //       salSoDCreateParamList: selectedRows[0].salSoDVOList
    //     }
    //   } else {
    //     params = {
    //       ...selectedRows[0],
    //       salSoDCreateParamList: selectedRows[0].salSoDVOList
    //     }
    //   }
    //   const res = await service.salesPFReturn(params);
    //   if (res.success) {
    //     this.setState({
    //       loading: false
    //     })
    //     this.props.history.push(
    //       this.props.push(`/inventory/inventoryin/item/returninquiry/${res.data}`)
    //     );
    //   } else {
    //     ElNotification({
    //       type: 'warning',
    //       message: res.msg
    //     })
    //   }
    //   console.log(res, 'rrrr')
    // } else if ((selectedRows[0].docNo?.indexOf("LS") == 0 || selectedRows[0].docNo?.indexOf("TH") == 0) && selectedRows[0].docStatus != '8' && selectedRows[0].docType === 'D') {
    //   this.props.history.push(
    //     this.props.push(`/salesCenter/returnorder/edit/${selectedRows[0].id}`)
    //   );
    // }
    // else {
    //   ElNotification({
    //     type: 'warning',
    //     message:
    //       '已退货订单不可退货'
    //   })
    // }
  };

  onRef = (tableRef) => {
    this.setState({
      tableRef: tableRef
    });
  };

  request = async (paramData) => {
    // const res = await service.saltype();
    // console.log('查询', paramData)
    // console.log(res, '........')
    // let docTypeListarrs = [];
    // res.data.map((item) => {
    //   docTypeListarrs.push(item.udcVal)
    // })
    // console.log(docTypeListarrs, 'docTypeListdocTypeList')
    // this.setState({ docTypeList: docTypeListarrs });
    const params = {
      // docTypeList: docTypeListarrs,
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
  render() {
    return (
      <ElPage spinning={this.state.loading}>
        <ElSearchTable
          bordered
          rowKey='id'
          scroll={{ x: 'min-content' }}
          onRef={this.onRef}
          tableProxy={{
            request: async (paramData) => {
              console.log('查询参数222', paramData);
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
            this.returngoods,
            // this.print,
            this.edit
          )}
          columns={getTableColumns(this)}
        />
      </ElPage>
    );
  }
}
export default Search;
