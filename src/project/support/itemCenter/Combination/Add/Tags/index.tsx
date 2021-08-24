
import React, { PureComponent } from 'react';
import { ElEditTable } from '@/components/el';
import SelectTagModal from './components/SelectTagModal';

import { getEditTableColumns, getEditTableActionButtons } from './config'

interface Props {
  onRef: Function;
  data: any;
  submitIndex: number;
  type: string | 'add' | 'edit';
}

interface State {
  formData: any;
  selectItemModal: boolean;
}

export default class ItemTag extends PureComponent<Props, State> {
  tagRef: any;
  submitIndex: number;
  addItemModalRef: any = {};

  constructor(props) {
    super(props);
    this.tagRef = {};
    this.submitIndex = 0;
    this.state = {
      formData: {},
      selectItemModal: false
    };
  }

  componentDidUpdate() {
    const { submitIndex, onRef } = this.props;
    // 根据submitIndex判断是否进行提交的操作，传递最新的form
    if (this.submitIndex !== submitIndex) {
      this.submitIndex = submitIndex;
      onRef && onRef(this.tagRef);
    }
  }

  /**
   * 显示添加数对话框
   */
  showSelectItemModal = () => {
    this.setState({
      selectItemModal: true
    })
  }

  /**
   * 关闭添加数据对话框
   */
  closeSelectItemModal = () => {
    this.setState({
      selectItemModal: false
    })
  }

  /**
   * 添加商品框 添加、继续添加
   * @param {Object[]} selectedData
   */
  onAdd = (selectedData: any) => {
    console.log(selectedData);
    this.addDetailItem(selectedData);
  }

  /**
   * 将已选择的数据集合添加到明细列表中
   * @param {array} records
   */
  addDetailItem(records: Array<any>) {
    let newRows = [...records];
    const oldRows = this.tagRef.getRows();
    const oldKeys = oldRows.map(item => item.id);
    newRows = records.filter((value) => {
      return !oldKeys.includes(value.id);
    });
    this.tagRef.addRows(newRows);
  }


  /**
   * 删除数据
   */
  handleDelete = () => {
    this.tagRef.quitEditState(() => {
      const { selectedRowKeys } = this.tagRef.getSelectionData();
      this.tagRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    });
  }

  render() {
    const { type, data, submitIndex } = this.props;
    const { formData, selectItemModal } = this.state;
    return (
      <>
        <ElEditTable
          key={submitIndex}
          rowKey='id'
          pagination={false}
          bordered
          columns={getEditTableColumns()}
          dataSource={data}
          onRef={(ref) => (this.tagRef = ref)}
          rowSelectionConfig={{
            type: 'checkbox',
            fixed: false,
            disabledRowIds: []
          }}
          actionButtons={type === 'add' ?
            getEditTableActionButtons({
              handleAdd: () => {
                this.tagRef.quitEditState(() => {
                  this.showSelectItemModal()
                })
              },
              handleDelete: this.handleDelete
            })
            : []
          }
        />
        {
          type === 'add' && <SelectTagModal
            onRef={(ref) => this.addItemModalRef = ref}
            visible={selectItemModal}
            onAdd={this.onAdd}
            onClose={this.closeSelectItemModal}
          />
        }
      </>
    );
  }
}
