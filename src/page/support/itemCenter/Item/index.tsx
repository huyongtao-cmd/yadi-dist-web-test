//商品列表
import React from 'react';
import { Modal, Select } from 'antd';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import ElForm from '@/components/el/ElForm';
import { ElNotification } from '@/components/el';
import { history, push } from 'react-router-dom';
import {
  search,
  deleteItem
} from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getAddModalForm
} from './config';
import './index.less';
import { AddBlue, EditBlue, DeleteRed, CopyBlue, SubmitBlue } from '@/components/el/ElIcon';

const { Option } = Select;
interface Props {
  history: history;
  match: any;
  style: any;
  push: push;
}
interface State {
  tableRef: any;
  modalSatus: boolean;
}

export default class SupportItemList extends React.Component<Props, State> {
  tableRef: any;
  addModalRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      modalSatus: false,
    };
  }
  getTableActionButtons = (): Array<ActionButtonProps> => [
    {
      text: '新增',
      key: 'add',
      disabled: false,
      location: 'left',
      icon: <AddBlue />,
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.skipRouterFn();
      }
    },
    {
      text: '编辑',
      key: 'edit',
      minSelection: 1,
      maxSelection: 1,
      disabled: false,
      icon: <EditBlue />,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.skipRouterFn(selectedRowKeys[0]);
      }
    },
    {
      text: '批量新增',
      key: 'multipleAdd',
      disabled: false,
      icon: <CopyBlue />,
      location: 'left',
      handleClick: this.addMultipleItems
    },
    {
      text: '提交审核',
      key: 'approve',
      minSelection: 1,
      disabled: false,
      location: 'left',
      icon: <SubmitBlue />,
      needConfirm: true,
      confirmText: '您确定要提交审核吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.approveItem(selectedRowKeys);
      }
    },
    {
      text: '删除',
      key: 'delete',
      minSelection: 1,
      maxSelection: 1,
      icon: <DeleteRed />,
      disabled: false,
      location: 'left',
      needConfirm: true,
      confirmText: '您确定要删除吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.deleteItem(selectedRowKeys[0]);
      }
    }
  ];

  // 跳转方法
  skipRouterFn = (id = '') => {
    if (!id) {
      this.setState({ modalSatus: true });
    } else if (id) {
      this.props.push(`/itemCenter/item/detail/edit/${id}`);
    }
  };

  // 增加商品跳转
  addItem = () => {
    this.changeModalStatus(true);
  };

  addMultipleItems = () => {
    //
  };

  changeModalStatus = (status) => {
    this.setState({ modalSatus: status });
  };

  approveItem = async (ids) => {
    console.log('disable-ids', ids);
    // const res = await submitToApprove(ids);
    // if (res && res.success) {
    // }
  };

  // 删除
  deleteItem = async (id) => {
    const res = await deleteItem(id);
    if (res && res.success) {
      this.tableRef.getTableData();
      ElNotification({
        type: 'success',
        message: '删除成功'
      });
    }
  };

  handleAdd = () => {
    this.addModalRef.validateFields().then((data) => {
      this.changeModalStatus(false);
      this.props.push(`/itemCenter/item/add/add/${data.itemCateCode.join(',')}`);
    })
  };

  handleCancel = () => {
    this.changeModalStatus(false);
  };
  //处理商品品类同级数组
  getCatePathCode = (data) => {
    let result = [];
    if (!data) {
      return result;
    }
    result.push(data[0].itemCateName);
    if (!data[0].treeNodes) {
      return result;
    }
    result.push(...this.getCatePathCode(data[0].treeNodes));
    return result;
  }

  render() {
    const { modalSatus } = this.state;
    return (
      <>
        <Modal
          visible={modalSatus}
          title='新增商品'
          onOk={this.handleAdd}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <>
            <ElForm
              onRef={(e) => (this.addModalRef = e)}
              formProps={getAddModalForm()}
            />
          </>
        </Modal>
        <ElSearchTable
          rowKey='id'
          bordered
          onRef={(ref) => {
            this.tableRef = ref;
          }}
          tableId='supportItemList'
          actionButtons={this.getTableActionButtons()}
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [{ asc: false, column: 'createTime' }]
              paramData.brand = paramData.brandNames?.brandCode;
              delete paramData.brandNames;
              paramData.lotFlag = paramData.lotFlag?.length > 0 ? true : null;
              paramData.snFlag = paramData.snFlag?.length > 0 ? true : null;
              paramData.guaranteeFlag = paramData.guaranteeFlag?.length > 0 ? true : null;
              const res: any = await search({
                ...paramData
              });
              if (res && res.success) {
                res.data.records.forEach((item) => {
                  item.itemCatePathName = this.getCatePathCode(item.itemCatePath).join('/');
                })
              }
              return res;
            },
            successCallBack: (tableRef) => {
              this.setState({
                tableRef
              });
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
          searchFormProps={getTableSearchFormItems}
          columns={getTableColumns()}
        />
      </>
    );
  }
}
