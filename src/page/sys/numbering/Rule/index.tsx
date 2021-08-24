import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons
} from './config';
import { ElNotification, ElSearchTable } from '@/components/el';
import { getRuleList, removeRuleById, searchRuleById } from './service';
import EditModal from './EditModal';
class Rule extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      editData: null,
      mark: 'create',
      editId: null,
      tableRef: null,
      editLoading: false
    };
  }
  handleCreate = () => {
    this.setState({
      editData: null,
      modalVisible: true,
      mark: 'create'
    });
  };
  handleEdit = async (_, selectedRows) => {
    console.log('修改', selectedRows);
    this.setState({
      editLoading: true
    });
    const res = await searchRuleById(selectedRows[0].id);
    console.log('aaaaa', res);
    res.data.ruleDetails?.forEach((a) => {
      if (a.numberType) {
        a.numberTypeObj = {
          valDesc: a.numberTypeName || a.numberType,
          udcVal: a.numberType
        };
      }
    });
    this.setState({
      modalVisible: true,
      editData: res.data,
      mark: 'edit',
      editId: res.data.id,
      editLoading: false
    });
    // if (res.success) {
    //   ElNotification({
    //     type: 'success',
    //     message: res.msg || '操作成功'
    //   });
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: res.msg || '操作失败'
    //   });
    // }
  };
  resetTable = () => {
    this.setState({
      editData: null
    });
  };

  beforeRequest = (formData) => ({
    ...formData,
    orders: [{ asc: false, column: 'createTime' }] //排序
  });
  render() {
    return (
      <>
        <ElSearchTable
          tableId='sys_rule'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            editLoading: this.state.editLoading
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef: tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getRuleList(this.beforeRequest(paramData));
            },
            successCallBack: (tableRef) => {
              // this.setState({
              //   tableRef
              // });
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
        />
        <EditModal
          modalVisible={this.state.modalVisible}
          editData={this.state.editData}
          key='id'
          tableRef={this.state.tableRef}
          resetTable={this.resetTable}
          editId={this.state.editId}
          mark={this.state.mark}
          onCancel={() => {
            this.setState({
              modalVisible: false
            });
          }}
        />
      </>
    );
  }
}
export default Rule;
