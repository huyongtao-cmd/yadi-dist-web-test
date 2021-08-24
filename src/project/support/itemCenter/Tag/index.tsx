/** 标签管理 */
import React from 'react';
import { Modal } from 'antd';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import ElForm from '@/components/el/ElForm';
import { ElNotification } from '@/components/el';
import { history } from 'react-router-dom';
import { AddBlue, EditBlue, DeleteRed, CopyBlue, CloseRed, SubmitBlue } from '@/components/el/ElIcon';

import {
  getTagNewList,
  deleteTag,
  newOrEditTag,
  getTagDetail,
  switchStatus
} from './service';
import { getTableSearchFormItems, getTableColumns } from './config';

interface Props {
  history: history;
  match: any;
  style: any;
}
interface State {
  tableRef: any;
  modalSatus: boolean;
  formData: any
}

const getTableFormItems: any = (formData) => ({
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
  items: [
    {
      title: '标签编码',
      name: 'tagCode',
      span: 24,
      rules: [{ required: true, message: '请填写编码' }],
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入',
          disabled: formData.id ? true : false
        }
      }
    },
    {
      title: '标签名称',
      name: 'tagName',
      span: 24,
      rules: [{ required: true, message: '请填写标签名称' }],
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入'
        }
      }
    },
    {
      title: '状态',
      name: 'status',
      span: 24,
      hidden: formData.id,
      formOption: {
        type: '$radio',
        props: {
          defaultChecked: true,
          options: [
            { value: 'ENABLE', label: '启用' },
            { value: 'DISABLE', label: '禁用' }
          ]
        }
      }
    },
    {
      title: ' 标签描述',
      name: 'tagDesc',
      span: 24,
      formOption: {
        type: '$textArea',
        props: {
          autoSize: { minRows: 4 }
        },
        events: {
          placeholder: '请输入内容'
        }
      }
    }
  ]
});

class SuportItemCenterTag extends React.Component<Props, State> {
  tableRef: any;
  formRef: any;
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      modalSatus: false,
      formData: {
        status: 'ENABLE'
      }
    };
  }

  getTableActionButtons = (): Array<ActionButtonProps> => [
    {
      text: '新增',
      key: 'add',
      disabled: false,
      location: 'left',
      icon: <AddBlue />,
      handleClick: this.addItem
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
        this.editItem(selectedRowKeys[0]);
      }
    },
    {
      text: '批量新增',
      key: 'multipleAdd',
      disabled: false,
      location: 'left',
      icon: <CopyBlue />,
      handleClick: this.addMultipleItems
    },
    {
      text: '禁用',
      key: 'disable',
      minSelection: 1,
      disabled: false,
      location: 'left',
      needConfirm: true,
      confirmText: '您确定要禁用吗？',
      icon: <CloseRed />,
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.disableItem(selectedRowKeys, selectedRows, 'DISABLE');
      }
    },
    {
      text: '启用',
      key: 'undisable',
      minSelection: 1,
      disabled: false,
      location: 'left',
      needConfirm: true,
      icon: <SubmitBlue />,
      confirmText: '您确定要启用吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.disableItem(selectedRowKeys, selectedRows, 'ENABLE');
      }
    },
    {
      text: '删除',
      key: 'delete',
      minSelection: 1,
      maxSelection: 1,
      disabled: false,
      location: 'left',
      icon: <DeleteRed />,
      needConfirm: true,
      confirmText: '您确定要删除吗？',
      handleClick: ({ selectedRowKeys, selectedRows }) => {
        this.delteBrand(selectedRowKeys[0]);
      }
    }
  ];

  // 新增
  addItem = () => {
    this.changeModalStatus(true);
    this.setState({ formData: { status: 'ENABLE' } })
  };
  //编辑
  editItem = async (id) => {
    const res = await getTagDetail(id);
    if (res && res.success) {
      this.setState({
        formData: res.data
      }, () => {
        this.changeModalStatus(true);
      })
    }
  }

  addMultipleItems = () => {
    //
  };

  changeModalStatus = (status) => {
    this.setState({ modalSatus: status });
  };
  //启用禁用
  disableItem = async (ids, rows, status) => {
    let flag = false;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status === status) {
        flag = true;
        break;
      }
    }
    if (flag) {
      ElNotification({
        type: 'warning',
        message: '当前数据状态不符，请重新选择'
      });
      return;
    }
    const res = await switchStatus({ ids, status });
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  };

  // 删除
  delteBrand = async (id) => {
    const res = await deleteTag(id);
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.tableRef.getTableData();
    }
  };

  handleAdd = async () => {
    this.formRef.validateFields().then(async (data) => {
      if (this.state.formData.id) {
        data.id = this.state.formData.id;
        data.status = this.state.formData.status;
      }
      const res = await newOrEditTag(data, 'GROUP');
      ElNotification({
        type: res.success ? 'success' : 'error',
        message: res.msg
      });
      if (res && res.success) {
        this.tableRef.getTableData();
        this.changeModalStatus(false);
      }
    })
  };

  handleCancel = () => {
    this.changeModalStatus(false);
  };

  render() {
    const { modalSatus, formData } = this.state;
    return (
      <>
        <Modal
          visible={modalSatus}
          title={formData.id ? '编辑' : '新增'}
          onOk={this.handleAdd}
          onCancel={this.handleCancel}
          destroyOnClose
          className='supportItemCenterCreate'
        >
          <ElForm
            data={formData}
            onRef={(e) => (this.formRef = e)}
            formProps={getTableFormItems(formData)}
            key='supportTag'
          />
        </Modal>
        <ElSearchTable
          rowKey='id'
          bordered
          onRef={(ref) => {
            this.tableRef = ref;
          }}
          actionButtons={this.getTableActionButtons()}
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [{ asc: false, column: 'createTime' }]
              return await getTagNewList(paramData);
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
export default SuportItemCenterTag;
