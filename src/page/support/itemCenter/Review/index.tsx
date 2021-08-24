/* 商品审核 */
import React from 'react';
import ElSearchTable from '@/components/el/ElSearchTable';
import { ElNotification } from '@/components/el';
import dayjs from 'dayjs';
import request from '@/utils/request';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import ReviewModal from './Modal';
import { getTableSearchFormItems, getTableColumns } from './config';
import { getTableColumns as getItemTableColumns } from '../Item/config';
import * as service from './service';
import { ElTabPaneProps } from '@/components/el/ElTab';
import ElForm from '../../../../components/el/ElForm';
import { Table } from 'antd';

interface State {
  // tableRef: any;
  reviewModalVisible: boolean;
  rowData: Array<any>;
  isAccept: boolean;
  examineDtlData: Array<any>;
  examineDetailModalVisible: boolean;
  formRef: any;
  [props: string]: any;
}

class SearchTable extends React.Component<{}, State> {
  tableRef: any;
  constructor(props) {
    super(props);
    this.state = {
      // tableRef: null,
      reviewModalVisible: false,
      examineDetailModalVisible: false,
      isAccept: false, //控制审核弹框中审核意见是否必填
      examineDtlData: [], //存放当前行的数据
      rowData: [],
      formRef: '', //存放审核弹框的ref
      itemListV0: [],
      tabListType: 1
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  /**
   * 审核
   * @param data
   */
  handleReview = (data, isAccept) => {
    let hasError = false;
    data.map((item) => {
      if (!['APPROVING'].includes(item.stateCheck)) {
        hasError = true;
      }
    });
    if (hasError) {
      return ElNotification({
        type: 'warning',
        message: '只有审批中的商品可以审核'
      });
    }

    this.setState({
      isAccept,
      rowData: data.map((item) => {
        return {
          ...item,
          approve: isAccept //给商品审核设置默认值
        };
      })
    });
    this.setModalVisible(true);
  };

  // 设置审核弹框显隐
  setModalVisible = (visible: boolean) => {
    this.setState({
      reviewModalVisible: visible
    });
  };
  // 设置审核详情弹框显隐
  // handleShowReviewModal = (rowData) => {
  //   this.setState({
  //     examineDtlData: [rowData],
  //     examineDetailModalVisible: true
  //   });
  // };
  /**
   * 审核弹框的确定事件
   * @param values
   */
  handleOk = (values) => {
    const createTime = dayjs().format('YYYY-MM-DD');
    const params = values.rows.map((item) => ({
      approve: item.approve,
      comment: values?.comment,
      createTime: createTime,
      createUserName: item.createUserName,
      itmItmId: item.id
    }));

    service.review(params).then((res) => {
      if (res && res.success) {
        this.setModalVisible(false);
        ElNotification({
          type: 'success',
          message: res?.msg
        });
        this.tableRef.getTableData();
      } else {
        this.setModalVisible(false);
      }
    });
  };

  getTableActionButtons = (): Array<ActionButtonProps> => {
    return [
      {
        text: '审批',
        key: 'approve',
        disabled: false,
        hidden: false,
        minSelection: 1,
        maxSelection: 0,
        location: 'left',
        handleClick: ({ selectedRowKeys, selectedRows }) =>
          this.handleReview(selectedRows, true)
      },
      {
        text: '拒绝',
        key: 'reject',
        disabled: false,
        hidden: false,
        minSelection: 1,
        maxSelection: 0,
        location: 'left',
        handleClick: ({ selectedRowKeys, selectedRows }) =>
          this.handleReview(selectedRows, false)
      }
    ];
  };
  // 审核弹框-商品审核change触发
  handleApproveChange = (e) => {
    // 审核不通过时，审核意见必填
    if (e.target?.value === false) {
      this.setState({
        isAccept: true
      });
    } else {
      this.setState({
        isAccept: false
      });
    }
  };

  //给审核弹框赋值ref
  getFormRef = (formRef) => {
    this.setState({
      formRef: formRef
    });
  };

  onRowClick = async (record) => {
    console.log(record);
    const res = await service.getReviewDetail(record.id);
    if (res.success == 200) {
      const { data } = res;
      this.setState({
        tabListType: data.applyType,
        itemListV0: data.list
      });
    }
  };

  /** tab 列表 */
  setTabList = (): Array<ElTabPaneProps> => {
    const {
      // orderId,
      itemListV0,
      tabListType
    } = this.state;

    // 组织列表
    let tabList = [
      {
        name: '明细信息',
        key: 'itemReviewDetail',
        render: () => {
          return (
            <Table
              bordered
              size='small'
              pagination={false}
              columns={getItemTableColumns()}
              dataSource={itemListV0}
            />
          );
        }
      }
    ];
    if (tabListType == 2) {
      tabList = [
        {
          name: '明细信息2',
          key: 'itemReviewDetail',
          render: () => {
            return (
              <Table
                bordered
                size='small'
                pagination={false}
                columns={[
                  {
                    title: '编号',
                    width: 100,
                    dataIndex: 'id',
                    align: 'center'
                  }
                ]}
                dataSource={itemListV0}
              />
            );
          }
        }
      ];
    }
    return tabList;
  };

  render() {
    const {
      reviewModalVisible,
      rowData,
      examineDetailModalVisible,
      examineDtlData,
      isAccept,
      formRef
    } = this.state;
    return (
      <>
        <ElSearchTable
          rowKey='id'
          bordered
          // rowSelectionConfig={null}
          onRef={(ref) => (this.tableRef = ref)}
          tableProxy={{
            request: (paramData) => {
              let newParamData = {};
              newParamData = paramData;
              if (paramData.categoryComVO) {
                let req = {};
                paramData.categoryComVO.forEach((item: any, index: number) => {
                  req['itmCategoryId' + (index + 1)] = item;
                });
                newParamData = { ...paramData, categoryComVO: req };
              }
              return service.getList(newParamData);
            },
            successCallBack: (tableRef) => {},
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
          actionButtons={this.getTableActionButtons()}
          // dataSource={tableDataJson()}
          searchFormProps={getTableSearchFormItems}
          columns={getTableColumns(this.handleReview, this)}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: false,
            onChange: ({ selectedRowKeys, selectedRows }) => {
              this.setState({
                selectedRowKeys,
                selectedRows
              });
            }
          }}
          mode={{
            // 精简模式,是否隐藏搜索表格的某一块元素
            proxy: true, // 筛选器
            search: true, // SearchForm
            action: true, // actionButtons
            pagination: true, // 分页
            descriptions: true, // descriptions
            tabs: false
          }}
          onTableRowClick={this.onRowClick}
        />
        {/* 审核弹窗 */}
        {reviewModalVisible && (
          <ReviewModal
            formData={rowData}
            visible={reviewModalVisible}
            getFormRef={this.getFormRef}
            formRef={formRef}
            onCancel={() => this.setModalVisible(false)}
            onOk={this.handleOk}
            // handleApproveChange={this.handleApproveChange}
            isAccept={isAccept}
          />
        )}
      </>
    );
  }
}
export default SearchTable;
