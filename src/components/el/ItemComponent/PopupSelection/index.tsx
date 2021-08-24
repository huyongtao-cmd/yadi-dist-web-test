import React from 'react';
import { Input, Popover, Modal } from 'antd';
import ElSearchTable from '@/components/el/ElSearchTable';
import './style.less';
interface Props {
  tableProxy?: any;
  disabled?: boolean;
  columns?: any;
  value?: any;
  onChange?: Function;
  multiple?: boolean;
  searchFormProps?: any;
  placeholder?: string;
  showColumn?: string;
  rowKey?: string;
  overLayWidth?: number;
  limit?: number;
  needModal?: boolean;
  modalTitle?: string;
  onRef?: any;
  modalTableColumns: any; //弹出窗的columns
  keywords?: string;
  needPopup?: boolean;
  beforeConfirm?: Function;
  destroyOnClose: boolean;
}
interface State {
  visible: boolean;
  inputValue: string;
  prevInputValue: string;
  tableRef: any;
  popupTable: any;
  modalTable: any;
  modalVisible: boolean;
}

const getInputValue = (record, showColumn) => {
  if (!record) {
    return '';
  }
  return Array.isArray(record)
    ? record.map((v) => v[showColumn]).toString()
    : record[showColumn];
};
class PopupSelection extends React.Component<Props, State> {
  static defaultProps = {
    showColumn: 'id',
    keywords: 'keywords',
    needPopup: false,
    destroyOnClose: false
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inputValue: '',
      prevInputValue: '',
      tableRef: null,
      popupTable: null,
      modalTable: null,
      modalVisible: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (typeof props.value === 'object') {
      const inputValue = getInputValue(props.value, props.showColumn);
      if (inputValue !== state.prevInputValue) {
        return {
          inputValue,
          prevInputValue: inputValue
        };
      }
    }
    return null;
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  onRef = (ref) => {
    this.setState({
      popupTable: ref
    });
  };
  onModalRef = (ref) => {
    this.setState({
      modalTable: ref
    });
  };
  setStateInputValue = (value) => {
    if (!value) {
      this.setState({ modalVisible: false });
      return;
    }
    const inputValue = getInputValue(value, this.props.showColumn);
    this.setState({ inputValue, modalVisible: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };
  onTableSelectedChange = (selectionData) => {
    const inputValue = getInputValue(
      selectionData.selectedRows,
      this.props.showColumn
    );
    this.setState(
      {
        inputValue
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(selectionData.selectedRows);
        }
      }
    );
  };
  renderContent = () => {
    return (
      <ElSearchTable
        onRef={this.onRef}
        scroll={{ x: 'min-content' }}
        onRow={
          this.props.multiple
            ? null
            : (record: any) => {
              return {
                onClick: () => {
                  const inputValue = getInputValue(
                    record,
                    this.props.showColumn
                  );
                  this.setState(
                    {
                      inputValue
                    },
                    () => {
                      if (this.props.onChange) {
                        this.props.onChange(record);
                      }
                    }
                  );
                }
              };
            }
        }
        mode={{
          proxy: false,
          action: false,
          search: false,
          pagination: false,
          descriptions: false,
          tabs: false
        }}
        rowSelectionConfig={
          this.props.multiple
            ? {
              type: 'checkbox',
              fixed: true,
              onChange: this.onTableSelectedChange
            }
            : null
        }
        rowKey={this.props.rowKey}
        tableProxy={this.props.tableProxy}
        columns={this.props.columns}
      />
    );
  };
  renderModalContent = () => {
    return (
      <ElSearchTable
        onRef={this.onModalRef}
        scroll={{ x: 'min-content', y: 400 }}
        // onRow={
        //   this.props.multiple
        //     ? null
        //     : (record: any) => {
        //         return {
        //           onClick: () => {
        //             const inputValue = getInputValue(
        //               record,
        //               this.props.showColumn
        //             );
        //             console.log(inputValue);
        //             this.setState(
        //               {
        //                 inputValue
        //               },
        //               () => {
        //                 if (this.props.onChange) {
        //                   this.props.onChange(record);
        //                 }
        //               }
        //             );
        //           }
        //         };
        //       }
        // }
        mode={{
          proxy: true,
          action: false,
          search: true,
          pagination: true,
          descriptions: false,
          tabs: false
        }}
        rowSelectionConfig={
          this.props.multiple
            ? {
              type: 'checkbox',
              fixed: true
            }
            : {
              type: 'radio',
              fixed: true
            }
        }
        rowKey={this.props.rowKey}
        tableProxy={this.props.tableProxy}
        columns={this.props.modalTableColumns}
        searchFormProps={this.props.searchFormProps}
      />
    );
  };
  handleChange = (e) => {
    this.setState(
      {
        inputValue: e.target.value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange();
        }
      }
    );
  };
  handleEnter = () => {
    const { keywords } = this.props;
    const { inputValue } = this.state;
    let params = {};
    params[keywords] = inputValue;
    this.state.popupTable.getTableData(params);
  };
  handleSearch = (_, event) => {
    if (event.target.nodeName !== 'INPUT') {
      this.setState({
        modalVisible: true,
        visible: false
      });
    }
  };
  // onVisibleChange = (visible) => {
  //   if (!visible) {
  //     const inputValue = getInputValue(this.props.value, this.props.showColumn);
  //     this.setState({
  //       inputValue
  //     });
  //   }
  // };
  onModalConfirm = async () => {
    const inputValue = getInputValue(
      this.state.modalTable.getSelectionData().selectedRows,
      this.props.showColumn
    );
    let beforeConfirmRes = true;
    if (this.props.beforeConfirm) {
      beforeConfirmRes = await this.props.beforeConfirm(
        this.state.modalTable.getSelectionData(),
        (data) => { this.setState(data) }
      );
    }
    beforeConfirmRes &&
      this.setState(
        {
          inputValue,
          modalVisible: false
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(
              this.props.multiple
                ? this.state.modalTable.getSelectionData().selectedRows
                : this.state.modalTable.getSelectionData().selectedRows[0]
            );
          }
        }
      );
  };
  onInputClick = () => {
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
    }
  };
  onModalCancel = () => {
    this.setState({
      modalVisible: false
    });
  };
  onVisibleChange = (visible) => {
    this.setState({
      visible
    });
  };
  render() {
    return (
      <div id='popupSelection' className='popupSelection'>
        <Modal
          visible={this.state.modalVisible}
          okText='确认'
          cancelText='取消'
          onOk={this.onModalConfirm}
          onCancel={this.onModalCancel}
          closable={false}
          width='80%'
          destroyOnClose={this.props.destroyOnClose}
        >
          {this.renderModalContent()}
        </Modal>
        {this.props.needPopup ? (
          <Popover
            placement='bottomLeft'
            visible={this.state.visible}
            // onVisibleChange={this.onVisibleChange}
            content={this.renderContent()}
            trigger='click'
            getPopupContainer={() => document.getElementById('popupSelection')}
            overlayStyle={{ width: this.props.overLayWidth }}
          >
            {this.props.needModal ? (
              <Input.Search
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.state.inputValue}
                onChange={this.handleChange}
                allowClear
                onClick={this.onInputClick}
                onPressEnter={this.handleEnter}
                onSearch={this.handleSearch}
              />
            ) : (
              <Input
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.state.inputValue}
                onChange={this.handleChange}
                allowClear
                onClick={this.onInputClick}
                onPressEnter={this.handleEnter}
              />
            )}
          </Popover>
        ) : this.props.needModal ? (
          <Input.Search
            readOnly
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.state.inputValue}
            onChange={this.handleChange}
            allowClear
            onSearch={this.handleSearch}
          />
        ) : (
          <Input
            readOnly
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.state.inputValue}
            onChange={this.handleChange}
            allowClear
          />
        )}
      </div>
    );
  }
}
export default PopupSelection;
