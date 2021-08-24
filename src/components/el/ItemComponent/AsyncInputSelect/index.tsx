import React from 'react';
import { Select, Table, Tag } from 'antd';
import request from '@/utils/request';
interface Props {
  requestUrl: string;
  requestMethod: string;
  queryParam: any;
  columns: any;
  labelKey: string;
  [props: string]: any;
}

interface State {
  loading: boolean;
  tableData: any;
  selectedRowKeys: any;
  inputValue: any;
  selectLabelValues: any;
  selectedRows: any;
  selectValues: any;
}

class AsyncInputSelect extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tableData: [],
      selectedRowKeys: [],
      selectedRows: [],
      inputValue: '',
      selectLabelValues: [],
      selectValues: []
    };
  }

  changeRowSelection = (selectedRowKeys, selectedRows) => {
    const { labelKey, valueKey, showSearch } = this.props;
    console.log('selectedRowKeys', selectedRowKeys);
    console.log('selectedRows', selectedRows);
    this.setState(
      {
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows,
        selectLabelValues: selectedRows.map((row) => ({
          label: row[labelKey],
          value: row[valueKey]
        })),
        selectValues: selectedRows.map((row) => row[valueKey])
      },
      () => {
        this.props.onChange(
          showSearch ? this.state.selectValues.join() : this.state.selectValues
        );
      }
    );
  };

  componentDidMount() {
    const { queryParam } = this.props;
    this.getList({ [queryParam]: '' });
  }

  //getList
  getList = async (params) => {
    const { requestUrl, requestMethod } = this.props;
    // params.current = 1; //默认选择第一页
    // params.size = 10000; //默认1W条数据
    let res = await request(requestUrl, {
      method: requestMethod,
      query: params
    });
    if (res.success) {
      this.setState({
        tableData: res.data.records,
        selectedRowKeys: [],
        selectedRows: [],
        selectLabelValues: []
      });
    } else {
      console.log('....');
    }
  };

  changeSelect = (value) => {
    // console.log('valuevalue', value);
    this.setState({
      inputValue: value
    });
  };

  enterKeyDown = async (e) => {
    if (e.keyCode === 13) {
      //回车
      const { inputValue } = this.state;
      const { queryParam } = this.props;
      this.setState({
        loading: true
      });
      await this.getList({ [queryParam]: inputValue });
      this.setState({
        loading: false
      });
    }
  };

  change = (value, option) => {
    //多选 todo
    console.log('value', value);
    console.log('options', option);
    const { labelKey, valueKey } = this.props;
    const {
      selectedRowKeys,
      selectedRows,
      selectLabelValues,
      selectValues
    } = this.state;
    this.setState({
      // selectedRowKeys:
      // selectedRows:selectedRows.filter((row)=>row.id!==options[0]),
      selectLabelValues: value
      // selectValues: selectedRows.map((row) => row[valueKey])
    });
  };

  tagRender = (props) => {
    console.log('propsprops', props);
    // const { labelKey, valueKey, uniqueKey } = this.props;
    return (
      <Tag style={{ marginRight: 3 }} closable={props.closable}>
        {props.label}
      </Tag>
    );
  };

  clear = () => {
    const { showSearch } = this.props;
    this.setState(
      {
        selectedRowKeys: [],
        selectedRows: [],
        selectLabelValues: [],
        selectValues: []
      },
      () => {
        this.props.onChange(
          showSearch ? this.state.selectValues.join() : this.state.selectValues
        );
      }
    );
  };

  render() {
    const { columns, uniqueKey, showSearch, multiple } = this.props;
    const {
      loading,
      tableData,
      selectedRowKeys,
      selectLabelValues
    } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.changeRowSelection,
    //   type: showSearch ? 'radio' : 'checkbox'
    // };
    return (
      <Select
        allowClear={true}
        showSearch={showSearch}
        onClear={this.clear}
        dropdownStyle={{ paddingBottom: '0px' }}
        style={{ width: '100%' }}
        onSearch={this.changeSelect}
        onInputKeyDown={this.enterKeyDown}
        onChange={this.change}
        value={selectLabelValues}
        tagRender={this.tagRender}
        labelInValue={true}
        dropdownRender={() => {
          return (
            <Table
              columns={columns}
              loading={loading}
              rowSelection={{
                selectedRowKeys,
                onChange: this.changeRowSelection,
                type: showSearch ? 'radio' : 'checkbox'
              }}
              dataSource={tableData}
              rowKey={uniqueKey}
            />
          );
        }}
      />
    );
  }
}

export default AsyncInputSelect;
