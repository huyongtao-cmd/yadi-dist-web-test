import React from 'react';
import ElCard from '@/components/el/ElCard';
import { ElEditTable } from '@/components/el';
import { getAddressTableColumns, getTableActionButtons } from './config';
import { maths } from '@/utils';

interface State {
  addressTableData: Array<any>;
}
interface Prop {
  tableData: Array<any>;
  type?: string;
  onRef?: Function;
  status?: string;
  defaultDataFu?: Function; //自定义初始化
}

class AddressTable extends React.Component<Prop, State> {
  tableRef: any;
  dataList: Array<any>;
  addressTableRef: any;
  constructor(props) {
    super(props);
    this.tableRef = {};
    this.dataList = [];
    this.state = {
      addressTableData: []
    };
  }

  actionButton = (actype: string, data: any) => {
    if (actype === 'create') {
      this.addressTableRef.addRow({
        id: maths.genFakeId(-1),
        country: '中国',
        defaultFlag: false
      });
    } else {
      this.addressTableRef.quitEditState(() => {
        this.addressTableRef.removeRowsByKeys(data.selectedRowKeys, 'rowKey');
      });
    }
  };
  static getDerivedStateFromProps(props, state) {
    const { tableData } = props;
    const { addressTableData } = state;
    if (
      tableData &&
      tableData.length >= 1 &&
      tableData !== addressTableData &&
      Array.isArray(tableData)
    ) {
      tableData.forEach((a) => {
        const regionNames = [];
        if (a.province) {
          regionNames.push({ label: a.provinceName, value: a.province });
        }
        if (a.city) {
          regionNames.push({ label: a.cityName, value: a.city });
        }
        if (a.county) {
          regionNames.push({ label: a.countyName, value: a.county });
        }
        a.regionNames = regionNames;
        a.addressTypeNames = {
          udcVal: a.addressType,
          valDesc: a.addressTypeName
        };
      });
      return {
        addressTableData: tableData
      };
    }
    return null;
  }
  componentDidMount() {
    const { onRef, defaultDataFu } = this.props;
    if (onRef) {
      this.props.onRef({
        validateTable: this.validateFields,
        addressTableRef: this.addressTableRef
      });
    }
    if (defaultDataFu) {
      this.setState({ addressTableData: defaultDataFu() });
      return;
    }
  }

  validateFields = async () => {
    let defaultAddressNums = 0;
    let errList = [];
    await this.addressTableRef.quitEditState();
    const tableData = await this.addressTableRef.validateTableRows();
    if (tableData.msg.valid) {
      tableData.data.forEach((value) => {
        value.addressType = value.addressTypeNames.udcVal;
        value.province =
          value.regionNames && value.regionNames.length > 0
            ? value.regionNames[0].value
            : '';
        value.city =
          value.regionNames && value.regionNames.length > 1
            ? value.regionNames[1].value
            : '';
        value.county =
          value.regionNames && value.regionNames.length > 2
            ? value.regionNames[2].value
            : '';
        if (value.defaultFlag) {
          defaultAddressNums++;
        }
      });
    } else {
      errList.push(tableData.msg.errors[0].schema.message);
    }
    if (tableData.data.length > 0 && defaultAddressNums != 1) {
      errList.push('默认地址有且只能有一个');
    }
    const obj = {
      data: tableData.data,
      err: errList
    };
    return obj;
  };

  render() {
    const { type, status } = this.props;
    const { addressTableData } = this.state;
    return (
      <>
        <ElCard title='地址信息'>
          <ElEditTable
            rowKey='id'
            bordered
            key='supportItemAddressTable'
            onRef={(ref) => (this.addressTableRef = ref)}
            dataSource={addressTableData}
            columns={getAddressTableColumns(type, this, status)}
            actionButtons={getTableActionButtons(
              type,
              this.actionButton,
              status
            )}
            rowSelectionConfig={{
              type: 'checkbox',
              fixed: true,
              disabledRowIds: []
            }}
          />
        </ElCard>
      </>
    );
  }
}

export default AddressTable;
