import React from 'react';
import { Table, Button, Dropdown, Menu, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import SearchForm from './components/SearchForm';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DownOutlined
} from '@ant-design/icons';
import { path } from 'ramda';
import './style.less';
import { ColumnType, TableProps } from 'antd/lib/table';
import { ButtonProps } from 'antd/lib/button';
import { ElFormProps } from '@/components/el/ElForm';
import { ExpandableConfig } from 'antd/lib/table/interface';
import MenuItem from 'antd/lib/menu/MenuItem';
import ElTab, { ElTabProps } from '../ElTab';
import ToolBar from './components/ToolBar';
import SearchFormConfig from './components/SearchFormConfig';
import { clone } from 'ramda';
import AuthWrapper from '@/layout/AuthWrapper';
import { sum, average, count, max, min } from './summary';
import { omit } from 'ramda';

const { confirm } = Modal;
interface Props extends TableProps<any> {
  tableId?: string;
  rowKey: string;
  mode?: {
    proxy?: boolean;
    search?: boolean;
    action?: boolean;
    pagination?: boolean;
    descriptions?: boolean;
    tabs?: boolean;
  };
  rowSelectionConfig?: {
    type: 'radio' | 'checkbox';
    fixed: boolean;
    onChange?: Function;
    disabledRowIds?: Array<unknown>;
  };
  columns: Array<ElSearchTableColumns>;
  dataSource?: Array<any>;
  tableProxy?: TableProxy;
  actionButtons?: Array<ActionButtonProps>;
  descriptions?: Function;
  pageSize?: number;
  searchFormProps?: ElFormProps;
  onRef?: Function;
  expandable?: ExpandableConfig<any>;
  tabs?: ElTabProps;
  onTableRowClick?: Function;
  defaultSearchData?: object;
  summarySetup?: Array<SummarySetupProps>;
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
  buttons?: Array<ProxyButtonProps>;
}
interface ProxyButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
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

interface SummaryProps {
  [type: string]: {
    //'max' | 'min' | 'sum' | 'average' | 'count' | string
    func?: Function;
    target?: 'auto' | 'manual';
  };
}
interface SummarySetupProps {
  type: 'max' | 'min' | 'sum' | 'average' | 'count' | string;
  name: string;
  emptyText: string;
  func: Function;
  target: 'auto' | 'manual';
  props?: {};
}
interface ElSearchTableColumns extends ColumnType<any> {
  dataIndex: string;
  summary?: SummaryProps;
}
interface State {
  dataSource: Array<any>;
  tableLoading: boolean;
  oldDataSource: Array<any>;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  };
  searchFormProps: ElFormProps;
  columns: Array<ElSearchTableColumns>;
  formData: {};
  tempRecord: object;
  formRef: FormInstance;
  selectionData: SelectionDataProps
}
interface SelectionDataProps {
  selectedRowKeys: Array<any>;
  selectedRows: Array<any>;
  length: number;
}
// todo searchTable
class ElSearchTable extends React.Component<Props, State> {
  static defaultProps = {
    tableId: 'ElSearchTable',
    rowKey: 'id',
    mode: {
      proxy: true,
      search: true,
      action: true,
      pagination: true,
      descriptions: true,
      tabs: false
    },
    columns: [],
    actionButtons: [],
    pageSize: 10,
    rowSelectionConfig: {
      type: 'checkbox',
      fixed: true,
      disabledRowIds: []
    },
    tableProxy: {
      autoLoad: true,
      props: {
        result: 'data.result',
        total: 'data.total',
        success: 'success'
      }
    },
    dataSource: [],
    defaultSearchData: {}
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      dataSource: [],
      oldDataSource: [],
      tableLoading: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 0
      },
      searchFormProps: null,
      formData: {},
      columns: [],
      tempRecord: {},
      formRef: null,
      selectionData: {
        selectedRows: [],
        selectedRowKeys: [],
        length: 0
      }
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { dataSource, searchFormProps } = props;
    const { oldDataSource } = state;

    if (
      dataSource &&
      JSON.stringify(dataSource) !== JSON.stringify(oldDataSource) &&
      Array.isArray(dataSource)
    ) {
      return {
        oldDataSource: dataSource,
        dataSource: dataSource.slice(
          props.pageSize * (state.pagination.current - 1),
          props.pageSize * state.pagination.current
        ),
        pagination: {
          total: Array.isArray(dataSource) ? dataSource.length : 0,
          current: state.pagination.current,
          pageSize: state.pageSize ? state.pageSize : props.pageSize
        }
      };
    }
    return null;
  }
  componentDidMount() {
    const {
      columns,
      onRef,
      searchFormProps,
      dataSource,
      pageSize
    } = this.props;
    this.setState(
      {
        columns,
        searchFormProps,
        pagination: {
          total: 0,
          current: 1,
          pageSize: pageSize
        }
      },
      () => {
        this.props.tableProxy &&
          this.props.tableProxy.autoLoad &&
          this.getTableData();
      }
    );
    if (onRef) {
      onRef({
        setCurrentColumns: this.setColumns,
        getCurrentColumns: this.getColumns,
        getTableData: this.getTableData,
        refreshData: this.refreshData,
        resetForm: this.resetForm,
        setSearchFormData: this.setSearchFormData,
        getSearchFormData: this.getSearchFormData,
        getSelectionData: this.getSelectionData,
        setSelectionData: this.setSelectionData,
        clearSelectionData: this.clearSelectionData,
        getFormRef: this.getFormRef,
        getRows: this.getRows,
        setLoading: this.setLoading,
        getRowByRowKey: this.getRowByRowKey,
        updateRowByRowKey: this.updateRowByRowKey
      });
    }
    // 是否允许自动请求数据

    window.addEventListener('resize', this.onWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }
  onWindowResize = (e) => {
    console.log(e);
  };
  getTableData = async (defaultParams?: object) => {
    // 如果需要数据代理
    if (this.props.tableProxy && this.props.tableProxy.request) {
      this.setState({
        tableLoading: true
      });
      const formData = this.state.formRef
        ? this.state.formRef.getFieldsValue()
        : { ...this.props.defaultSearchData };
      let paramData = {
        ...formData,
        size: this.state.pagination.pageSize,
        current: this.state.pagination.current,
        ...defaultParams
      };
      if (JSON.stringify(formData) !== JSON.stringify(this.state.formData)) {
        paramData.current = 1;
      }
      const res = await this.props.tableProxy.request(paramData);
      if (path(this.props.tableProxy.props.success.split('.'), res)) {
        // 请求成功
        this.setState(
          {
            // total: this.props.tableProxy.props.total.indexOf('.')
            dataSource: path(
              this.props.tableProxy.props.result.split('.'),
              res
            ),
            pagination: {
              total: path(this.props.tableProxy.props.total.split('.'), res),
              pageSize: this.state.pagination.pageSize,
              current: paramData.current
            },
            formData
          },
          () => {
            if (this.props.tableProxy.successCallBack) {
              const tableRef = {
                query: this.getTableData,
                dataSource: this.state.dataSource
              };
              this.props.tableProxy.successCallBack(tableRef, res);
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
              this.props.tableProxy.errCallBack(res);
            }
          }
        );
      }
      this.setState({
        tableLoading: false
      });
    } else {
      // 如果没用数据代理
      this.setState({
        pagination: {
          total: this.props.dataSource.length,
          pageSize: this.state.pagination.pageSize,
          current: this.state.pagination.current
        },
        dataSource:
          this.props.dataSource && this.props.mode.pagination
            ? this.props.dataSource.slice(
              this.state.pagination.pageSize *
              (this.state.pagination.current - 1),
              this.state.pagination.pageSize * this.state.pagination.current
            )
            : this.props.dataSource
      });
    }
    // 触发getTableData必将改变dataSource，所以需要重置selectionData
    this.clearSelectionData();
  };
  onRef = (formRef) => {
    this.setState(
      {
        formRef
      },
      () => {
        this.state.formRef.setFieldsValue(this.props.defaultSearchData);
      }
    );
  };
  onPaginationChange = (page: number, pageSize?: number) => {
    this.setState(
      {
        pagination: {
          current: page,
          total: this.state.pagination.total,
          pageSize: pageSize || this.state.pagination.pageSize
        }
      },
      () => {
        this.getTableData();
      }
    );
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
  setColumns = (newColumns: Array<ElSearchTableColumns>) => {
    this.setState({
      columns: newColumns
    });
    return newColumns;
  };
  getColumns = () => {
    return this.state.columns;
  };
  refreshData = (callBack?: Function) => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          current: 1
        }
      },
      () => {
        if (callBack) {
          callBack();
        } else {
          this.getTableData();
        }
      }
    );
  };
  onRowClick = (record: any, index: number) => {
    const { selectionData } = this.state;
    const { rowKey } = this.props;
    selectionData.selectedRowKeys = [record[rowKey]];
    selectionData.selectedRows = [record];
    selectionData.length = 1;
    this.setState(
      {
        tempRecord: record,
        selectionData: clone(selectionData)
      },
      () => {
        if (this.props.rowSelectionConfig?.onChange) {
          this.props.rowSelectionConfig.onChange(selectionData);
        }
      }
    );
  };
  resetForm = (callBack?: Function) => {
    this.state.formRef.resetFields();
    if (callBack) {
      callBack();
    }
  };
  setSearchFormData = (data) => {
    this.state.formRef.setFieldsValue(data);
  };
  getSearchFormData = () => {
    return this.state.formRef.getFieldsValue();
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
  getRows = () => {
    return this.state.dataSource;
  };
  setLoading = (loading: boolean) => {
    this.setState({
      tableLoading: loading
    });
  };
  getRowByRowKey = (rowKey: string) => {
    return this.state.dataSource.find((v) => v[this.props.rowKey] === rowKey);
  };
  updateRowByRowKey = (rowKey: string, data) => {
    this.setState({
      dataSource: this.state.dataSource.map((v) => {
        if (v[this.props.rowKey] === rowKey) {
          return data;
        }
        return v;
      })
    });
  };
  // 筛选器方法
  setSearchFormProps = (searchFormProps: ElFormProps, callBack?: Function) => {
    this.setState(
      {
        searchFormProps
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };

  renderSummary = (
    pageData,
    columns: Array<ElSearchTableColumns>,
    selectionData: SelectionDataProps
  ) => {
    let types: Array<SummarySetupProps> = [
      {
        type: 'sum',
        name: '总和',
        func: sum,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'average',
        name: '平均',
        func: average,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'count',
        name: '计数',
        func: count,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'max',
        name: '最大',
        func: max,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'min',
        name: '最小',
        func: min,
        target: 'auto',
        emptyText: '-',
        props: {}
      }
    ];
    const { summarySetup } = this.props;
    if (summarySetup) {
      types = types.concat(summarySetup);
    }
    //这里应该加上table.summary
    return (
      <>
        {this.state.dataSource.length !== 0
          ? types.map((v) => {
            return this.renderSummaryRow(
              v.type,
              v.name,
              v.func,
              v.target,
              v.emptyText,
              v.props,
              columns,
              pageData,
              selectionData
            );
          })
          : null}
      </>
    );
  };

  renderSummaryRow = (
    type: string,
    name: string,
    fuc: Function,
    target: 'auto' | 'manual',
    emptyText: string,
    props: {},
    columns: Array<ElSearchTableColumns>,
    pageData: any[],
    selectionData: SelectionDataProps
  ) => {
    const shouldRender = columns.find(
      (v) => v.summary && Object.keys(v.summary).includes(type)
    );
    if (!shouldRender) {
      return null;
    }
    const rowColumns = columns.map((v, i) => {
      if (v.summary && Object.keys(v.summary).includes(type)) {
        return (
          <Table.Summary.Cell
            index={i + 1}
            key={type + v.dataIndex}
            className={'summary-cell ' + v.className ? v.className : ''}
            {...omit(['className', 'title', 'dataIndex', 'summary'], v)}
          >
            {this.summaryComputed(
              v.summary[type].target || target,
              v.dataIndex,
              v.summary[type].func || fuc,
              pageData,
              selectionData
            )}
          </Table.Summary.Cell>
        );
      } else {
        return (
          <Table.Summary.Cell
            index={i + 1}
            key={`empty${v.dataIndex}${type}`}
            className='summary-cell-empty'
            {...omit(['className', 'title', 'dataIndex', 'summary'], v)}
          >
            {emptyText}
          </Table.Summary.Cell>
        );
      }
    });
    // .filter((v) => !!v);
    return (
      <Table.Summary.Row key={'summary-row-' + type} {...props}>
        <Table.Summary.Cell index={0} key={'summary-index-' + type}>
          {name}
        </Table.Summary.Cell>
        {rowColumns}
      </Table.Summary.Row>
    );
  };

  summaryComputed = (
    target: 'manual' | 'auto',
    dataIndex: string,
    func: Function,
    pageData: any[],
    selectionData: SelectionDataProps
  ): string => {
    if (target === 'manual') {
      return func(selectionData.selectedRows, dataIndex);
    } else {
      return func(pageData, dataIndex);
    }
  };

  render() {
    return (
      <>
        {/* <button onClick={() => console.log(this.state.selectionData)}>
          test
        </button> */}
        {this.props.mode.proxy && (
          <div className='elSearchTable-proxyButton-container'>
            <SearchFormConfig
              searchFormProps={this.state.searchFormProps}
              setSearchFormProps={this.setSearchFormProps}
            />
            <Button
              icon={<SearchOutlined />}
              type='primary'
              className='proxy-button-left'
              onClick={() => {
                this.refreshData();
              }}
            >
              查询
            </Button>
            <Button
              icon={<ReloadOutlined />}
              className='proxy-button-left'
              onClick={() => this.resetForm()}
            >
              重置
            </Button>
          </div>
        )}
        {this.props.mode.search && (
          <div className='elSearchTable-queryForm-container'>
            <SearchForm
              onRef={this.onRef}
              submitForm={this.getTableData}
              searchFormProps={this.state.searchFormProps}
            />
          </div>
        )}
        {this.props.mode.action && (
          <div className='elSearchTable-actionButton-container'>
            <div className='elSearchTable-actionButton-container-left'>
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
                                            this.state.formRef.getFieldsValue(),
                                            this.state.pagination
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
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
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
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
                                );
                              },
                              onCancel: () => { }
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
                                this.state.formRef.getFieldsValue(),
                                this.state.pagination
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
            <div className='elSearchTable-actionButton-container-right'>
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
                                            this.state.formRef.getFieldsValue(),
                                            this.state.pagination
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
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
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
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
                                );
                              },
                              onCancel: () => { }
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
                                this.state.formRef.getFieldsValue(),
                                this.state.pagination
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
        )}
        {this.props.mode.descriptions && (
          <div className='elSearchTable-description-container'>
            {this.props.descriptions && this.props.descriptions()}
          </div>
        )}
        <div className='elSearchTable-container'>
          <Table
            bordered
            summary={(pageData) =>
              this.renderSummary(
                pageData,
                this.state.columns,
                this.state.selectionData
              )
            }
            rowClassName={(record, index) => {
              let className = 'singular-row';
              if (index % 2 === 1) className = 'dual-row';
              if (this.state.selectionData.selectedRows.indexOf(record) > -1)
                className = `${className} row-selected`;
              return className;
            }}
            onRow={(record: any, index: number) => {
              return {
                onClick: () => {
                  // console.log(`...点击了行 ${record}`);
                  if (this.props.onTableRowClick) {
                    this.props.onTableRowClick(record, index);
                  }
                  this.onRowClick(record, index);
                }
              };
            }}
            {...this.props}
            size='small'
            className='elSearchTable'
            rowKey={this.props.rowKey}
            loading={this.state.tableLoading || this.props.loading}
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            rowSelection={
              this.props.rowSelectionConfig
                ? {
                  selectedRowKeys: this.state.selectionData.selectedRowKeys,
                  onChange: this.onSelectionChange,
                  type: this.props.rowSelectionConfig.type,
                  fixed: this.props.rowSelectionConfig.fixed,
                  getCheckboxProps: (record) => {
                    return {
                      disabled: Array.isArray(
                        this.props.rowSelectionConfig.disabledRowIds
                      )
                        ? this.props.rowSelectionConfig.disabledRowIds.some(
                          (item) => record[this.props.rowKey] === item
                        )
                        : false
                    };
                  }
                }
                : null
            }
            pagination={
              this.props.mode.pagination
                ? {
                  size: 'small',
                  total: this.state.pagination.total,
                  current: this.state.pagination.current,
                  // hideOnSinglePage: true,
                  pageSize: this.state.pagination.pageSize,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: (total, range) => {
                    return (
                      <>
                        <ToolBar
                          columns={this.props.columns}
                          setColumns={this.setColumns}
                          tableId={this.props.tableId}
                        />
                        {/** todo 优化 **/}
                        <span
                          style={{ marginRight: '10px' }}
                        >{`共${this.state.pagination.total}条记录`}</span>
                        <span
                          style={{ marginRight: '10px' }}
                        >{`当前页共${this.state.dataSource.length}条记录`}</span>
                        <span style={{ marginRight: '10px' }}>{`共${Math.ceil(
                          total / this.state.pagination.pageSize
                        )}页`}</span>
                      </>
                    );
                  },
                  onChange: this.onPaginationChange
                }
                : false
            }
          />
        </div>
        {this.props.mode.tabs && (
          <div className='elSearchTable-tab-container'>
            <ElTab {...this.props.tabs} record={this.state.tempRecord} />
          </div>
        )}
      </>
    );
  }
}
export type { ElSearchTableColumns, ActionButtonProps, TableProxy };
export default ElSearchTable;
