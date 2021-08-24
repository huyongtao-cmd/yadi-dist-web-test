
import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElForm } from '@/components/el';
import {
  getTableColumns,
  getTableSearchFormItems,
  getTableActionButtons,
  modalForm
} from './config';
import {
  getParamsList,
  getParamsDetailById,
  saveParamsDetail,
  deleteParams
} from '../service';
import { ElNotification } from '@/components/el';


interface Props {
  submitIndex: number | string;
  type: string;
  data: any;
  onRef: Function;
}

interface State {
  type: string;
  modalStatus: boolean;
  formData: any;
  selectedId: string;
  tableRef: any;
}

export default class ItemAttribute extends PureComponent<Props, State> {
  static propTypes = {};
  modalRef: any;
  myRef: any;

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      modalStatus: false,
      formData: {},
      selectedId: '',
      tableRef: {}
    };
  }
  //处理商品品类同级数组
  getCatePathCode = (data) => {
    let result = [];
    if (!data) {
      return result;
    }
    result.push(data[0].itemCateCode);
    if (!data[0].treeNodes) {
      return result;
    }
    result.push(...this.getCatePathCode(data[0].treeNodes));
    return result;
  }
  getDetailById = async (id) => {
    const res = await getParamsDetailById(id);
    if (res && res.success && res.data) {
      const itemCateCode = this.getCatePathCode(res.data.itemCatePath);
      let values = [];
      res.data.values.forEach((a) => {
        values.push(a.propValueName);
      })
      const params = {
        ...res.data,
        attribute: values.join('；'),
        itemCateCode: itemCateCode,
      }
      delete params.itemCatePath;
      this.setState({ modalStatus: true, formData: params });
    }
  };

  handleAdd = () => {
    this.setState({ modalStatus: true, formData: { isBox: 0, isHand: 1, isMust: 0 }, type: 'add' });
  };

  handleEdit = async (selected) => {
    // 编辑
    this.setState({ selectedId: selected, type: 'edit' })
    await this.getDetailById(selected);
  };

  handleDelete = async (keys) => {
    // 删除选中行
    const res = await deleteParams(keys[0]);
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.myRef.getTableData();
    }
  };
  //去重
  unique = (arr) => {
    var n = []; //一个新的临时数组
    for (var i = 0; i < arr.length; i++) //遍历当前数组
    {
      if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
    }
    return n;
  }
  handleSave = () => {
    // 保存属性
    this.modalRef.validateFields().then(data => {
      data.values = [];
      if (data.attribute) {
        data.attribute = data.attribute.split('；');
        const newArray = this.unique(data.attribute);
        newArray.forEach(a => {
          if (a) {
            data.values.push({ 'propValueName': a })
          }
        });
      }
      delete data.attribute;
      data.itemCateCode = data.itemCateCode[data.itemCateCode.length - 1];
      if (this.state.type === 'edit') {
        data.id = this.state.selectedId;
      }
      this.save(data);
    })
  };

  save = async (params) => {
    const res = await saveParamsDetail(params);
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    if (res && res.success) {
      this.setState({ modalStatus: false });
      this.myRef.getTableData();
    }
  };

  render() {
    const { type, modalStatus, formData } = this.state;
    return (
      <>
        <Modal
          closable
          visible={modalStatus}
          title={type === 'edit' ? '修改属性' : '新增属性'}
          onOk={this.handleSave}
          onCancel={() => this.setState({ modalStatus: false })}
          destroyOnClose
          maskClosable={false}
        >
          <ElForm
            data={formData}
            onRef={(ref) => (this.modalRef = ref)}
            formProps={{
              items: modalForm(formData, type, this),
              labelCol: { span: 6 },
              wrapperCol: { span: 18 }
            }}
            rowClassName='basic-info-form'
          />
        </Modal>
        <ElSearchTable
          rowKey='id'
          bordered
          onRef={(ref) => {
            this.myRef = ref;
          }}
          tableProxy={{
            request: (paramData) => {
              paramData.orders = [{ asc: false, column: 'createTime' }]
              return getParamsList(paramData);
            },
            successCallBack: (tableRef) => {
              this.setState({
                tableRef
              })
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
          actionButtons={getTableActionButtons({
            type: type,
            handleAdd: this.handleAdd,
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete
          })}
          columns={getTableColumns()}
        />
      </>
    );
  }
}
