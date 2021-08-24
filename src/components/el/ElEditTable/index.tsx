import React from 'react';
import { ColumnType, TableProps } from 'antd/lib/table';
import { ButtonProps } from 'antd/lib/button';
import { Table, Button, FormInstance, Dropdown, Modal, Menu } from 'antd';
import ElForm from '../ElForm';
import ElFormItem from '../ElForm/components/ElFormItem';
import cls from 'classnames';
import validate from './utils/validate';
import { path } from 'ramda';
import { DownOutlined } from '@ant-design/icons';
import './style.less';
import { addOnlyRowId } from './utils/utils';
import ToolBar from './components/ToolBar';
import MenuItem from 'antd/lib/menu/MenuItem';
import AuthWrapper from '@/layout/AuthWrapper';
import { clone } from 'ramda';
const { confirm } = Modal;
interface ElEditTableProps extends TableProps<any> {
  tableId?: string;
  rowKey: string;
  rowSelectionConfig?: {
    type: 'radio' | 'checkbox';
    fixed: boolean;
    onChange?: Function;
    disabledRowIds?: Array<unknown>;
  };
  disabledTable?: boolean;
  columns: Array<ElEditTableColumns>;
  editFocusName?: string;
  dataSource?: Array<any>;
  tableProxy?: TableProxy;
  actionButtons?: Array<ActionButtonProps>;
  descriptions?: Function;
  onRef?: Function;
  getNewDataExtra?: Function;
  dealDataToForm?: Function;
  dealFormToData?: Function;
  needToolBar?: boolean;
  defaultTableConfig?: {
    onBottomPressEnter: 'add' | 'save' | 'trigger' | 'noaction';
    onTableIntoEdit: 'click' | 'dbclick';
  };
}
interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
  location?: 'left' | 'right';
  minSelection?: number;
  maxSelection?: number;
  needConfirm?: boolean;
  confirmText?: string;
  authCode?: string;
  overLay?: Array<{
    key: string;
    text?: string;
    disabled?: boolean;
    icon?: any;
    hidden?: boolean;
    handleClick: Function;
    minSelection?: number;
    maxSelection?: number;
  }>;
}
interface TableProxy {
  autoLoad?: boolean;
  request?: Function;
  errCallBack?: Function;
  successCallBack?: Function;
  props?: {
    result: string;
    total: string;
    success: string;
  };
}
interface ColumnsRule {
  type?:
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'object'
    | 'array'
    | 'null'
    | 'any';
  pattern?: string;
  format?: Function;
  minLength?: number;
  maxLength?: number;
  const?: string | number;
  enum?: string[] | number[];
  required?: boolean;
  multipleOf?: number;
  message?: string;
}
interface ElEditTableColumns extends ColumnType<any> {
  title?: string;
  width?: number;
  dataIndex?: string;
  editable?: boolean;
  field?: Function;
  rule?: ColumnsRule;
  selectMapping?: Function;
  renderDataIndex?: string;
  cellRender?: any;
  children?: any;
}

interface State {
  offset: number;
  tableLoading: boolean;
  dataSource: Array<any>;
  selectionData: {
    selectedRowKeys: Array<any>;
    selectedRows: Array<any>;
    length: number;
  };
  columns: Array<ElEditTableColumns>;
  hasSet: boolean;
  errRowIndexs: Array<number>;
  formRef: FormInstance;
  config: {
    onBottomPressEnter: 'trigger' | 'save' | 'add' | 'noaction';
    onTableIntoEdit: 'click' | 'dbclick';
  };
}

// todo editTable
class ElEditTable extends React.Component<ElEditTableProps, State> {
  static defaultProps = {
    rowKey: 'rowId',
    mode: {
      proxy: true,
      search: true,
      action: true,
      pagination: true,
      descriptions: true
    },
    disabledTable: false,
    columns: [],
    actionButtons: [],
    rowSelectionConfig: {
      type: 'checkbox',
      fixed: true,
      disabledRowIds: []
    },
    tableProxy: {
      autoLoad: true,
      props: {
        result: 'data',
        total: 'data.length',
        success: 'success'
      }
    },
    needToolBar: true
  };
  constructor(props) {
    super(props);
    this.state = {
      offset: -1,
      tableLoading: false,
      dataSource: [],
      selectionData: {
        selectedRows: [],
        selectedRowKeys: [],
        length: 0
      },
      columns: [],
      hasSet: false,
      errRowIndexs: [],
      formRef: null,
      config: {
        onBottomPressEnter: props.defaultTableConfig
          ? props.defaultTableConfig.onBottomPressEnter
          : 'save',
        onTableIntoEdit: props.defaultTableConfig
          ? props.defaultTableConfig.onTableIntoEdit
          : 'click'
      }
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { dataSource } = props;
    const { dataSource: oldDataSource } = state;
    if (
      !state.hasSet &&
      dataSource &&
      dataSource.length >= 1 &&
      dataSource !== oldDataSource &&
      Array.isArray(dataSource)
    ) {
      return {
        dataSource: dataSource.map((v) => addOnlyRowId(v, props.rowKey)),
        hasSet: true
      };
    }
    return null;
  }
  componentDidMount() {
    const { onRef, columns } = this.props;
    // 不再暴露整个this
    if (onRef) {
      this.props.onRef({
        getActiveRow: this.getActiveRow,
        getActiveRecord: this.getActiveRecord,
        setActiveRow: this.setActiveRow,
        intoEditByIndex: this.intoEditByIndex,
        quitEditState: this.quitEditState,
        reloadTableData: this.getTableData,
        addRow: this.addRow,
        getRows: this.getRows,
        getRowByIndex: this.getRowByIndex,
        clearRows: this.clearRows,
        removeRowByKey: this.removeRowByKey,
        validateTableRows: this.validateTable,
        getSelectionData: this.getSelectionData,
        setSelectionData: this.setSelectionData,
        clearSelectionData: this.clearSelectionData,
        getFormRef: this.getFormRef,
        removeRowsByKeys: this.removeRowsByKeys,
        addRows: this.addRows,
        setUpRow: this.setUpRow,
        setDownRow: this.setDownRow,
        swapRow: this.swapRow,
        setLoading: this.setLoading,
        setCurrentColumns: this.setCurrentColumns,
        getCurrentColumns: this.getCurrentColumns,
        refreshCurrentColumns: this.refreshCurrentColumns,
        updateTableData: this.updateTableData,
        updateRows: this.updateRows
      });
    }
    this.getColumnsConfig(columns);
    this.addKeyDownEvent();
    this.getTableData();
  }
  getColumnsConfig = (
    columns: Array<ElEditTableColumns>,
    callBack?: Function
  ) => {
    const newColumns = columns.map((v) => {
      return { ...v, key: v.dataIndex };
    });
    this.setState(
      {
        columns: newColumns
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  getTableData = async () => {
    // 如果需要数据代理
    if (
      this.props.tableProxy &&
      this.props.tableProxy.request &&
      this.props.tableProxy.autoLoad
    ) {
      this.setState({
        tableLoading: true
      });
      const res = await this.props.tableProxy.request();
      if (path(this.props.tableProxy.props.success.split('.'), res)) {
        // 请求成功
        this.setState(
          {
            // total: this.props.tableProxy.props.total.indexOf('.')
            dataSource: Array.from(
              path(this.props.tableProxy.props.result.split('.'), res)
            ).map((v) => addOnlyRowId(v, this.props.rowKey))
          },
          () => {
            this.clearSelectionData();
            if (this.props.tableProxy.successCallBack) {
              const tableRef = {
                query: this.getTableData,
                dataSource: this.state.dataSource
              };
              this.props.tableProxy.successCallBack(tableRef);
            }
          }
        );
      } else {
        this.setState(
          {
            dataSource: []
          },
          () => {
            // 请求失败
            if (this.props.tableProxy.errCallBack) {
              this.props.tableProxy.errCallBack();
            }
          }
        );
      }
    } else {
      // 如果没用数据代理
      this.setState({
        dataSource: this.props.dataSource
          ? this.props.dataSource.map((v) => addOnlyRowId(v, this.props.rowKey))
          : []
      });
    }
    this.setState({
      tableLoading: false
    });
  };
  onSelectionChange = (selectedRowKeys, selectedRows) => {
    const selectionData = {
      selectedRowKeys,
      selectedRows,
      length: selectedRowKeys.length
    };
    this.setState(
      {
        selectionData
      },
      () => {
        if (this.props.rowSelectionConfig.onChange) {
          this.props.rowSelectionConfig.onChange(selectionData);
        }
      }
    );
  };
  onRef = (form) => {
    this.setState({
      formRef: form
    });
  };
  onTablePressEsc = () => {
    this.saveEditResult();
    this.setState({
      offset: -1
    });
  };
  // 直接控制某行可编辑
  intoEditByIndex = (index) => {
    this.intoEdit(this.state.dataSource[index], index);
  };
  onTablePressEnter = () => {
    const { length } = this.state.dataSource;
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        if (this.state.offset <= length - 2) {
          this.setState(
            {
              offset: this.state.offset + 1
            },
            () => {
              this.intoEdit(
                this.state.dataSource[this.state.offset],
                this.state.offset
              );
              this.focusEditItem();
            }
          );
        } else {
          console.log(this.state.config.onBottomPressEnter);
          if (this.state.config.onBottomPressEnter === 'noaction') {
            this.focusEditItem();
            return;
          } else if (this.state.config.onBottomPressEnter === 'trigger') {
            this.setState(
              {
                offset: 0
              },
              () => {
                this.intoEdit(
                  this.state.dataSource[this.state.offset],
                  this.state.offset
                );
                this.focusEditItem();
              }
            );
          } else if (this.state.config.onBottomPressEnter === 'add') {
            this.setActiveRow(this.state.dataSource[this.state.offset]);
            // 这里可能需要优化  默认给个rowkey 防止报错
            this.addRow(
              this.props.getNewDataExtra ? this.props.getNewDataExtra() : {},
              () => {
                this.state.formRef.resetFields();
                this.setState(
                  {
                    offset: this.state.offset + 1
                  },
                  () => {
                    this.focusEditItem();
                  }
                );
              }
            );
          } else {
            this.setState({
              offset: -1
            });
          }
        }
      });
    }
  };
  addKeyDownEvent = () => {
    document.getElementById('ElEditTable').addEventListener('keydown', (e) => {
      const key = e.key?.toLowerCase();
      switch (key) {
        case 'escape':
          this.onTablePressEsc();
          break;
        case 'enter':
          this.onTablePressEnter();
          break;
      }
    });
  };
  // 进入编辑状态
  intoEdit = (record, index) => {
    const { offset } = this.state;
    if (offset >= 0) {
      this.saveEditResult(() => {
        const { dealDataToForm } = this.props;
        let t = {};
        if (dealDataToForm) {
          t = dealDataToForm(record);
        } else {
          t = record;
        }
        this.setActiveRow(t);
        this.setState(
          {
            offset: index
          },
          () => {
            this.focusEditItem();
          }
        );
      });
    } else {
      const { dealDataToForm } = this.props;
      let t = {};
      if (dealDataToForm) {
        t = dealDataToForm(record);
      } else {
        t = record;
      }
      this.setActiveRow(t);
      this.setState(
        {
          offset: index
        },
        () => {
          this.focusEditItem();
        }
      );
    }
  };
  // 保存逻辑
  saveEditResult = (callBack?: Function) => {
    const { dealFormToData } = this.props;
    let newDataSource = [...this.state.dataSource];
    if (dealFormToData) {
      newDataSource[this.state.offset] = dealFormToData({
        data: {
          ...this.state.dataSource[this.state.offset],
          ...this.state.formRef.getFieldsValue()
        },
        record: this.state.dataSource[this.state.offset],
        formRef: this.state.formRef
      });
    } else {
      newDataSource[this.state.offset] = {
        ...this.state.dataSource[this.state.offset],
        ...this.state.formRef.getFieldsValue()
      };
    }
    this.state.formRef.resetFields();
    this.setState(
      {
        dataSource: newDataSource
      },
      () => {
        this.refreshSelectionRows(() => {
          if (callBack) {
            callBack();
          }
        });
      }
    );
  };
  // 聚焦逻辑    等待优化  todo todo todo
  focusEditItem = (name?: string) => {
    // 暂时默认聚焦第一个可编辑元素 如果有定制需要  这里入参预留
    if (!name) {
      const { editFocusName } = this.props;
      // const first = this.state.columns.filter(
      //   //陈英杰修改this.state.columns
      //   (v) => v.editable && v.field && Object.keys(v.field()).indexOf('name')
      // )[0];
      let first;
      if (editFocusName) {
        first = editFocusName;
      } else {
        first = this.state.columns.filter((v) => v.editable)[0]?.dataIndex;
      }

      // const t = first?.field
      //   ? first.field().name
      //     ? first.field().name
      //     : ''
      //   : '';
      //直接使用dom操作
      document.getElementById(`el_search_${first}`)?.focus();
    } else {
      document.getElementById(`el_search_${name}`)?.focus();
    }
  };

  mergeColumns = (columns: Array<ElEditTableColumns>) => {
    return columns.map((row, colIndex) => {
      if (row.children) {
        row.children = this.mergeColumns(row.children);
      }
      const { field, editable, cellRender, renderDataIndex } = row;
      row.className = cls({ 'form-required': row.rule?.required });
      if (!editable) {
        // do sth
        row.render = (text: any, record: any, index: any) => {
          return cellRender
            ? cellRender(text, record, index)
            : renderDataIndex
            ? record[renderDataIndex]
            : text;
        };
        return row;
      } else {
        row.render = (text: any, record: any, index: any) => {
          return index === this.state.offset ? (
            field ? (
              <ElFormItem
                {...field({
                  text,
                  record,
                  index,
                  formRef: this.state.formRef,
                  formData: this.state.formRef.getFieldsValue()
                })}
              />
            ) : cellRender ? (
              cellRender(text, record, index)
            ) : (
              text
            )
          ) : cellRender ? (
            cellRender(text, record, index)
          ) : renderDataIndex ? (
            record[renderDataIndex]
          ) : (
            text
          );
        };
        return row;
      }
    });
  };
  refreshSelectionRows = (callBack: Function) => {
    const { rowKey } = this.props;
    this.setState(
      {
        selectionData: {
          ...this.state.selectionData,
          selectedRows: [
            ...this.state.dataSource.filter((v) =>
              this.state.selectionData.selectedRowKeys.includes(v[rowKey])
            )
          ]
        }
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  findSelectMapping = (columns: Array<ElEditTableColumns>, changedValues) => {
    const changeColumns = columns
      .map((v) => {
        if (v.selectMapping && v.dataIndex === Object.keys(changedValues)[0]) {
          return v;
        } else if (v.children) {
          return this.findSelectMapping(v.children, changedValues);
        }
      })
      .find((v) => v !== undefined);
    if (changeColumns) {
      return changeColumns;
    }
  };
  onFormValueChange = async (changedValues: any, allValues: any) => {
    // const changeColumn = this.state.columns.find((v) => {
    //   //this.state.columns修改
    //   // 先用dataIndex进行比较，因为直接调用field会导致field入参丢失，页面抛错
    //   if (v.selectMapping && v.dataIndex === Object.keys(changedValues)[0]) {
    //     return v;
    //   }
    // });
    const changeColumn = this.findSelectMapping(
      this.state.columns,
      changedValues
    );
    if (changeColumn) {
      const data = await changeColumn.selectMapping({
        changedValues: changedValues,
        allValues: allValues,
        record: this.state.dataSource[this.state.offset],
        formRef: this.state.formRef,
        editTableRef: {
          getActiveRow: this.getActiveRow,
          getActiveRecord: this.getActiveRecord,
          setActiveRow: this.setActiveRow,
          intoEditByIndex: this.intoEditByIndex,
          quitEditState: this.quitEditState,
          reloadTableData: this.getTableData,
          addRow: this.addRow,
          getRows: this.getRows,
          getRowByIndex: this.getRowByIndex,
          clearRows: this.clearRows,
          removeRowByKey: this.removeRowByKey,
          validateTableRows: this.validateTable,
          getSelectionData: this.getSelectionData,
          setSelectionData: this.setSelectionData,
          clearSelectionData: this.clearSelectionData,
          getFormRef: this.getFormRef,
          removeRowsByKeys: this.removeRowsByKeys,
          addRows: this.addRows,
          setUpRow: this.setUpRow,
          setDownRow: this.setDownRow,
          swapRow: this.swapRow,
          setLoading: this.setLoading,
          setCurrentColumns: this.setCurrentColumns,
          getCurrentColumns: this.getCurrentColumns,
          refreshCurrentColumns: this.refreshCurrentColumns,
          updateTableData: this.updateTableData,
          updateRows: this.updateRows
        }
      });
      this.state.formRef.setFieldsValue({
        ...data
      });
    }
  };
  updateTableData = (data: object) => {
    const { offset, dataSource, formRef } = this.state;
    if (offset > -1) {
      this.setState({
        dataSource: dataSource.map((v) => {
          return { ...v, ...data };
        })
      });
    } else {
      let formData = formRef.getFieldsValue();
      formRef.setFieldsValue({ ...formData, ...data });
      this.setState({
        dataSource: dataSource.map((v) => {
          return { ...v, ...data };
        })
      });
    }
  };
  setTableConfig = (value) => {
    this.setState({
      config: value
    });
    return value;
  };
  getTableConfig = () => {
    return this.state.config;
  };
  // 外部方法
  getActiveRecord = () => {
    if (this.state.offset <= -1) {
      return null;
    } else {
      return this.state.dataSource[this.state.offset];
    }
  };
  getActiveRow = () => {
    return this.state.formRef.getFieldsValue();
  };
  setActiveRow = (data) => {
    return this.state.formRef.setFieldsValue(data);
  };
  clearActiveRow = () => {
    return this.state.formRef.resetFields();
  };
  quitEditState = (callBack?: Function) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(callBack);
      return this.setState({
        offset: -1
      });
    } else {
      callBack && callBack(); //陈英杰修改，表单里插如可编辑表格时，去编辑的时候数据回显，如果不操作可编辑表格，直接点击保存offset为-1，无法调回调函数
    }
  };
  getRows = () => {
    return this.state.dataSource;
  };
  getRowByIndex = (index: number) => {
    if (index >= 0) {
      return this.state.dataSource[index];
    } else {
      return null;
    }
  };
  clearRows = async () => {
    await this.quitEditState();
    return this.setState({
      dataSource: []
    });
  };
  addRow = (data = {}, callBack?: Function) => {
    const { dataSource } = this.state;
    return this.setState(
      {
        dataSource: [
          ...dataSource,
          { ...addOnlyRowId(data, this.props.rowKey) }
        ]
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  addRows = (data: Array<unknown>, callBack?: Function) => {
    const { dataSource } = this.state;
    return this.setState(
      {
        dataSource: [
          ...dataSource,
          ...data.map((v) => addOnlyRowId(v, this.props.rowKey))
        ]
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };

  updateRows = (data: object, rowKeyList: Array<string>) => {
    const { rowKey } = this.props;
    const { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.map((v) => {
        if (rowKeyList.includes(v[rowKey])) {
          return { ...v, ...data };
        } else {
          return v;
        }
      })
    });
  };
  removeRowByKey = (key: any, type: 'index' | 'rowKey') => {
    let newDataSource = [...this.state.dataSource];
    if (type && type === 'index') {
      newDataSource = this.state.dataSource.filter(
        (value, index) => index !== key
      );
      this.setState({
        dataSource: newDataSource
      });
    } else {
      newDataSource = this.state.dataSource.filter(
        (value) => value[this.props.rowKey] !== key
      );
      this.setState({
        dataSource: newDataSource
      });
    }
    this.clearSelectionData();
    return newDataSource;
  };
  removeRowsByKeys = (key: Array<unknown>, type: 'index' | 'rowKey') => {
    if (Array.isArray(key)) {
      const { dataSource } = this.state;
      let newDataSource = [...dataSource];
      if (type && type === 'index') {
        newDataSource = dataSource.filter(
          (value, index) => !key.includes(index)
        );
        this.setState({
          dataSource: newDataSource
        });
      } else {
        newDataSource = dataSource.filter(
          (value) => !key.includes(value[this.props.rowKey])
        );
        this.setState({
          dataSource: newDataSource
        });
      }
      this.clearSelectionData();
      return newDataSource;
    } else {
      return false;
    }
  };
  getSelectionData = () => {
    return this.state.selectionData;
  };
  setSelectionData = (data) => {
    return this.setState({
      selectionData: data
    });
  };
  clearSelectionData = () => {
    return this.setState({
      selectionData: {
        selectedRowKeys: [],
        selectedRows: [],
        length: 0
      }
    });
  };
  getFormRef = () => {
    return this.state.formRef;
  };
  setUpRow = (key: any) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        this.setState(
          {
            offset: -1
          },
          () => {
            const { rowKey } = this.props;
            const { dataSource } = this.state;
            const index = dataSource.findIndex((v) => v[rowKey] === key);
            if (index && index <= 0) {
              return false;
            }
            let temp = [...dataSource];
            temp[index] = temp.splice(index - 1, 1, temp[index])[0];
            this.setState({
              dataSource: temp
            });
          }
        );
      });
    } else {
      const { rowKey } = this.props;
      const { dataSource } = this.state;
      const index = dataSource.findIndex((v) => v[rowKey] === key);
      if (index && index <= 0) {
        return false;
      }
      let temp = [...dataSource];
      temp[index] = temp.splice(index - 1, 1, temp[index])[0];
      this.setState({
        dataSource: temp
      });
    }
  };
  setDownRow = (key: any) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        this.setState(
          {
            offset: -1
          },
          () => {
            const { rowKey } = this.props;
            const { dataSource } = this.state;
            const index = dataSource.findIndex((v) => v[rowKey] === key);
            if (index && index >= dataSource.length - 1) {
              return false;
            }
            let temp = [...dataSource];
            temp[index] = temp.splice(index + 1, 1, temp[index])[0];
            this.setState({
              dataSource: temp
            });
          }
        );
      });
    } else {
      const { rowKey } = this.props;
      const { dataSource } = this.state;
      const index = dataSource.findIndex((v) => v[rowKey] === key);
      if (index && index >= dataSource.length - 1) {
        return false;
      }
      let temp = [...dataSource];
      temp[index] = temp.splice(index + 1, 1, temp[index])[0];
      this.setState({
        dataSource: temp
      });
    }
  };
  swapRow = (keyF: any, keyS: any) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        this.setState(
          {
            offset: -1
          },
          () => {
            const { rowKey } = this.props;
            const { dataSource } = this.state;
            const indexF = dataSource.findIndex((v) => v[rowKey] === keyF);
            const indexS = dataSource.findIndex((v) => v[rowKey] === keyS);
            if (
              (indexF && indexS && indexF < 0) ||
              indexS > dataSource.length - 1
            ) {
              return false;
            }
            let temp = [...dataSource];
            temp[indexF] = temp.splice(indexS, 1, temp[indexF])[0];
            this.setState({
              dataSource: temp
            });
          }
        );
      });
    } else {
      const { rowKey } = this.props;
      const { dataSource } = this.state;
      const indexF = dataSource.findIndex((v) => v[rowKey] === keyF);
      const indexS = dataSource.findIndex((v) => v[rowKey] === keyS);
      if ((indexF && indexS && indexF < 0) || indexS > dataSource.length - 1) {
        return false;
      }
      let temp = [...dataSource];
      temp[indexF] = temp.splice(indexS, 1, temp[indexF])[0];
      this.setState({
        dataSource: temp
      });
    }
  };
  searchTable = (key: unknown) => {
    // todo...
    // 浅search  暂不考虑深层
    const { dataSource } = this.state;
    dataSource.filter((v) => {});
  };
  resetTableAfterSearch = () => {};
  // 表格校验  todo...
  validateTable = async () => {
    return new Promise((resolve) => {
      validate(this.state.dataSource, this.state.columns).then((res) => {
        if (res.errors.length > 0) {
          let errIndexs = new Set<number>();
          res.errors.forEach((v: any) => {
            errIndexs.add(Number(v.property.match(/\d+/)[0]));
          });
          this.setState({
            errRowIndexs: Array.from(errIndexs)
          });
          resolve({
            success: false,
            msg: res,
            data: this.state.dataSource
          });
        } else {
          this.setState({
            errRowIndexs: []
          });
          resolve({
            success: true,
            msg: res,
            data: this.state.dataSource
          });
        }
      });
    });
  };
  setLoading = (loading: boolean) => {
    this.setState({
      tableLoading: loading
    });
  };
  setCurrentColumns = (
    columns: Array<ElEditTableColumns>,
    callBack?: Function
  ) => {
    this.getColumnsConfig(columns, callBack);
  };
  refreshCurrentColumns = (callBack?: Function) => {
    const { columns } = this.state;
    this.getColumnsConfig(clone(columns), callBack);
  };
  getCurrentColumns = () => {
    return this.state.columns;
  };
  render() {
    return (
      <>
        <div className='elEditTable-actionButton-container'>
          <div className='elEditTable-actionButton-container-left'>
            {Array.isArray(this.props.actionButtons) &&
              this.props.actionButtons
                .filter(
                  (v) => (v.location && v.location !== 'right') || !v.location
                )
                .map((v) => {
                  const {
                    text,
                    key,
                    disabled,
                    hidden,
                    handleClick,
                    icon,
                    overLay,
                    minSelection = 0,
                    maxSelection = 0,
                    needConfirm = false,
                    confirmText = '您确定吗?',
                    authCode
                  } = v;
                  return overLay ? (
                    <AuthWrapper authCode={authCode}>
                      <Dropdown
                        disabled={
                          disabled ||
                          (minSelection !== 0 &&
                            this.state.selectionData.length < v.minSelection) ||
                          (maxSelection !== 0 &&
                            this.state.selectionData.length > v.maxSelection)
                        }
                        overlay={
                          <Menu>
                            {overLay && Array.isArray(overLay) ? (
                              overLay.map((value) => {
                                return (
                                  <MenuItem
                                    key={value.key}
                                    disabled={
                                      disabled ||
                                      (minSelection !== 0 &&
                                        this.state.selectionData.length <
                                          v.minSelection) ||
                                      (maxSelection !== 0 &&
                                        this.state.selectionData.length >
                                          v.maxSelection)
                                    }
                                    icon={value.icon}
                                    onClick={() => {
                                      if (value.handleClick) {
                                        value.handleClick(
                                          this.state.selectionData,
                                          this.state.formRef &&
                                            this.state.formRef.getFieldsValue()
                                        );
                                      }
                                    }}
                                    // className={'action-button'}
                                  >
                                    {value.text}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </Menu>
                        }
                      >
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                                v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          icon={icon}
                          onClick={() => {
                            if (handleClick) {
                              handleClick(
                                this.state.selectionData,
                                this.state.formRef &&
                                  this.state.formRef.getFieldsValue()
                              );
                            }
                          }}
                          className={'action-button'}
                        >
                          {text}
                          <DownOutlined />
                        </Button>
                      </Dropdown>
                    </AuthWrapper>
                  ) : needConfirm ? (
                    <AuthWrapper authCode={authCode}>
                      <Button
                        key={key}
                        disabled={
                          disabled ||
                          (minSelection !== 0 &&
                            this.state.selectionData.length < v.minSelection) ||
                          (maxSelection !== 0 &&
                            this.state.selectionData.length > v.maxSelection)
                        }
                        hidden={hidden}
                        icon={icon}
                        className='action-button'
                        onClick={() =>
                          confirm({
                            content: confirmText,
                            onOk: () => {
                              handleClick(
                                this.state.selectionData,
                                this.state.formRef &&
                                  this.state.formRef.getFieldsValue()
                              );
                            },
                            onCancel: () => {}
                          })
                        }
                      >
                        {text}
                      </Button>
                    </AuthWrapper>
                  ) : (
                    <AuthWrapper authCode={authCode}>
                      <Button
                        key={key}
                        disabled={
                          disabled ||
                          (minSelection !== 0 &&
                            this.state.selectionData.length < v.minSelection) ||
                          (maxSelection !== 0 &&
                            this.state.selectionData.length > v.maxSelection)
                        }
                        hidden={hidden}
                        icon={icon}
                        onClick={() => {
                          if (handleClick) {
                            handleClick(
                              this.state.selectionData,
                              this.state.formRef &&
                                this.state.formRef.getFieldsValue()
                            );
                          }
                        }}
                        className='action-button'
                      >
                        {text}
                      </Button>
                    </AuthWrapper>
                  );
                })}
            <div className='elEditTable-actionButton-container-right'>
              {Array.isArray(this.props.actionButtons) &&
                this.props.actionButtons
                  .filter(
                    (v) => (v.location && v.location !== 'left') || !v.location
                  )
                  .map((v) => {
                    const {
                      text,
                      key,
                      disabled,
                      hidden,
                      handleClick,
                      icon,
                      overLay,
                      minSelection = 0,
                      maxSelection = 0,
                      needConfirm = false,
                      confirmText = '您确定吗?',
                      authCode
                    } = v;
                    return overLay ? (
                      <AuthWrapper authCode={authCode}>
                        <Dropdown
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                                v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          overlay={
                            <Menu>
                              {overLay && Array.isArray(overLay) ? (
                                overLay.map((value) => {
                                  return (
                                    <MenuItem
                                      key={value.key}
                                      disabled={
                                        disabled ||
                                        (minSelection !== 0 &&
                                          this.state.selectionData.length <
                                            v.minSelection) ||
                                        (maxSelection !== 0 &&
                                          this.state.selectionData.length >
                                            v.maxSelection)
                                      }
                                      icon={value.icon}
                                      onClick={() => {
                                        if (value.handleClick) {
                                          value.handleClick(
                                            this.state.selectionData,
                                            this.state.formRef &&
                                              this.state.formRef.getFieldsValue()
                                          );
                                        }
                                      }}
                                      // className={'action-button'}
                                    >
                                      {value.text}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </Menu>
                          }
                        >
                          <Button
                            key={key}
                            disabled={
                              disabled ||
                              (minSelection !== 0 &&
                                this.state.selectionData.length <
                                  v.minSelection) ||
                              (maxSelection !== 0 &&
                                this.state.selectionData.length >
                                  v.maxSelection)
                            }
                            icon={icon}
                            onClick={() => {
                              if (handleClick) {
                                handleClick(
                                  this.state.selectionData,
                                  this.state.formRef &&
                                    this.state.formRef.getFieldsValue()
                                );
                              }
                            }}
                            className='action-button'
                          >
                            {text}
                            <DownOutlined />
                          </Button>
                        </Dropdown>
                      </AuthWrapper>
                    ) : needConfirm ? (
                      <AuthWrapper authCode={authCode}>
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                                v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          hidden={hidden}
                          icon={icon}
                          className='action-button'
                          onClick={() =>
                            confirm({
                              content: confirmText,
                              onOk: () => {
                                handleClick(
                                  this.state.selectionData,
                                  this.state.formRef &&
                                    this.state.formRef.getFieldsValue()
                                );
                              },
                              onCancel: () => {}
                            })
                          }
                        >
                          {text}
                        </Button>
                      </AuthWrapper>
                    ) : (
                      <AuthWrapper authCode={authCode}>
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                                v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          hidden={hidden}
                          icon={icon}
                          onClick={() => {
                            if (handleClick) {
                              handleClick(
                                this.state.selectionData,
                                this.state.formRef &&
                                  this.state.formRef.getFieldsValue()
                              );
                            }
                          }}
                          className='action-button'
                        >
                          {text}
                        </Button>
                      </AuthWrapper>
                    );
                  })}
            </div>
          </div>
        </div>
        <div className='elEditTable-description-container'>
          {this.props.descriptions && this.props.descriptions()}
        </div>
        <ElForm
          onRef={this.onRef}
          formProps={{ onValuesChange: this.onFormValueChange }}
        >
          <Table
            {...this.props}
            id='ElEditTable'
            size='small'
            className='elEditTable'
            rowKey={this.props.rowKey}
            loading={this.state.tableLoading}
            columns={this.mergeColumns(this.state.columns)}
            dataSource={this.state.dataSource}
            rowSelection={
              this.props.rowSelectionConfig
                ? {
                    onChange: this.onSelectionChange,
                    type: this.props.rowSelectionConfig.type,
                    fixed: this.props.rowSelectionConfig.fixed,
                    selectedRowKeys: this.state.selectionData.selectedRowKeys,
                    getCheckboxProps: (record) => {
                      return {
                        disabled: Array.isArray(
                          this.props.rowSelectionConfig.disabledRowIds
                        )
                          ? this.props.rowSelectionConfig.disabledRowIds.some(
                              (item) => record[this.props.rowKey] === item
                            )
                          : true
                      };
                    }
                  }
                : null
            }
            rowClassName={(record, index) => {
              let className = '';
              if (this.state.errRowIndexs.includes(index))
                className = 'validate-err';
              return className;
            }}
            onRow={(record: any, index: number) => {
              return {
                onClick:
                  !this.props.disabledTable &&
                  this.state.config.onTableIntoEdit === 'click' &&
                  index !== this.state.offset
                    ? () => this.intoEdit(record, index)
                    : null,
                onDoubleClick:
                  !this.props.disabledTable &&
                  this.state.config.onTableIntoEdit === 'dbclick' &&
                  index !== this.state.offset
                    ? () => this.intoEdit(record, index)
                    : null
              };
            }}
            pagination={{
              pageSize: 999999,
              // total: this.state.dataSource.length,
              // hideOnSinglePage: true,
              showQuickJumper: false,
              showSizeChanger: false,

              showTotal: (total, range) => {
                return (
                  this.props.needToolBar && (
                    <>
                      <ToolBar
                        defaultTableConfig={this.props.defaultTableConfig}
                        selectionData={this.state.selectionData}
                        setTableConfig={this.setTableConfig}
                        getTableConfig={this.getTableConfig}
                        setUpRow={this.setUpRow}
                        setDownRow={this.setDownRow}
                        swapRow={this.swapRow}
                      />
                      <span
                        style={{ marginRight: '14px' }}
                      >{`共${this.state.dataSource.length}条记录`}</span>
                    </>
                  )
                );
              }
            }}
          />
        </ElForm>
      </>
    );
  }
}
export type {
  ElEditTableProps,
  ActionButtonProps,
  TableProxy,
  ElEditTableColumns
};
export default ElEditTable;
