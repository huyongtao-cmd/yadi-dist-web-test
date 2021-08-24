// 下一编号规则
import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons
} from './config';
import {
  ElPage,
  ElSearchTable,
  ElNotification,
  ElRowContainer
} from '@/components/el';
import EditModal from './EditModal/index';
import * as service from './service';

interface Props {}

interface State {
  Loading: boolean;
  modalVisible: boolean;
  mark: any;
  formRef: any;
  data: any;
  tableRef: any;
}
class NextNum extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      Loading: false, //loading状态
      mark: 'create', //create代表点了新增，edit代表点了修改
      formRef: null, //表单的ref
      data: null,
      tableRef: null
    };
  }

  //新增
  handleCreate = () => {
    this.setState({
      modalVisible: true,
      mark: 'create'
    });
  };
  //编辑
  // handleEdit = () => {};
  handleEdit = async ({ selectedRowKeys }) => {
    // 获取实时的要修改的数据
    this.setState({
      Loading: true
    });
    const res = await service.findOneNextNum(selectedRowKeys[0]);
    this.setState({
      Loading: false
    });
    console.log('查询单条数据==========', res);
    if (res.success) {
      this.setState({
        modalVisible: true,
        mark: 'edit',
        data: res.data
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
    console.log('修改的id', this.state.data.id);
  };

  // handleCancel = () => {};
  // onModalConfirm = () => {};

  // form表单ref
  formRef = (ref) => {
    this.setState({
      formRef: ref
    });
  };

  // 保存前
  beforeSave = async () => {
    const { formRef, mark } = this.state;
    this.setState({
      Loading: true
    });
    const fieldsValue = await formRef.validateFields();
    this.setState({
      Loading: false
    });
    if (fieldsValue) {
      //value有值，代表验证通过，null代表没有通过验证
      this.setState({
        modalVisible: false
      });
      //form表单重置为默认值，即是全空状态
      formRef.resetFields();
      if (mark == 'create') {
        const res = await service.createNextNum(fieldsValue);
        if (res.success) {
          ElNotification({
            type: 'success',
            message: res.msg || res.message || res.data || '操作成功'
          });
          this.state.tableRef.getTableData();
        } else {
          ElNotification({
            type: 'error',
            message: res.msg || res.message || res.data || '操作失败！'
          });
        }
      }
      if (mark == 'edit') {
        fieldsValue.id = this.state.data.id;
        console.log('编辑按保存', fieldsValue);
        this.setState({
          Loading: true
        });
        const res = await service.updateNextNum(fieldsValue);
        this.setState({
          Loading: false
        });
        if (res.success) {
          ElNotification({ type: 'success', message: res.msg });
          this.state.tableRef.getTableData();
        } else {
          ElNotification({
            type: 'error',
            message: res.msg || res.data || '操作失败！'
          });
        }
      }
    }
  };

  beforeRequest = (formData) => ({
    ...formData,
    orders: [{ asc: false, column: 'createTime' }] //排序
  });

  render() {
    const { modalVisible, data, mark, formRef } = this.state;
    return (
      <ElPage spinning={this.state.Loading}>
        <ElSearchTable
          tableId='sys-nextnum-list'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit
          })}
          searchFormProps={getTableSearchFormItems}
          onRef={(tableRef) => {
            this.setState({
              tableRef: tableRef
            });
          }}
          tableProxy={{
            request: (paramData) => {
              return service.getNextNumList(this.beforeRequest(paramData));
            },
            // successCallBack: (tableRef) => {
            //   this.setState({
            //     tableRef
            //   });
            // },
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
        <ElPage spinning={this.state.Loading}>
          <EditModal
            modalVisible={modalVisible}
            //取消
            cancel={() => {
              this.setState({ modalVisible: false });
              formRef.resetFields(); //form表单重置为默认值，即是全空状态
            }}
            //保存
            save={() => {
              this.beforeSave();
            }}
            onRef={this.formRef}
            data={data}
            mark={mark}
          ></EditModal>
        </ElPage>
      </ElPage>
    );
  }
}
export default NextNum;
