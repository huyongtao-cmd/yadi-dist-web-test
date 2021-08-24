import React from 'react';
import ElSearchTable, {
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { history } from 'react-router-dom';
import { getTableSearchFormItems, getTableColumns } from './config';
import * as service from './service';
import dayjs from 'dayjs';
import { commonExport } from '@/utils/utils';

interface Props {
  history: history;
  match: any;
  style: any;
  push: any;
}
interface State {
  tableRef: any;
  modalSatus: boolean;
  formData: any;
}

class SuportItemCenterBrand extends React.Component<Props, State> {
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

  // 自检
  seleExam = ({ selectedRows }) => {
    console.log(selectedRows);
    this.props.push(
      '/factoryCenter/anExamination/details/B/' + selectedRows[0].inspectionId
    );
  };

  // 复检
  repeatExam = ({ selectedRows }) => {
    this.props.push(
      '/factoryCenter/anExamination/details/C/' + selectedRows[0].inspectionId
    );
  };

  // 导出
  exports = (a, b, page) => {
    console.log(a, b, page, '查看导出参数');
    const data = {
      ...b,
      size: page.pageSize,
      current: page.current
    };
    console.log(data, '查看data详情');
    commonExport({
      url: '/yd-user/selfInspection/export1',
      params: this.beforeRequestParams(data),
      fileName: '自检单导出'
    });
  };

  getTableActionButtons = (): Array<ActionButtonProps> => [
    {
      text: '自检',
      key: '1',
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      handleClick: this.seleExam
    },
    {
      text: '复检',
      key: '2',
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      handleClick: this.repeatExam
    },
    {
      text: '导出',
      key: '3',
      // minSelection: 1,
      // maxSelection: 1,
      location: 'left',
      handleClick: this.exports
    }
  ];

  beforeRequestParams = (params) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const param = {
      ...params,
      storeIds,
      // docMode: params.docMode === 'C' ? '' : params.docMode,
      orders: [{ asc: false, column: 'createTime' }],
      timeVersion:
        params.timeVersion && dayjs(params.timeVersion).format('YYYY/M')
    };
    return param;
  };

  requset = (param) => {
    console.log(param, 'paramparamparamparamparamparam');
    return service.search(this.beforeRequestParams(param));
  };

  addMultipleItems = () => {
    //
  };

  render() {
    return (
      <>
        <ElSearchTable
          rowKey='inspectionId'
          tableId='Anexamination'
          bordered
          tableProxy={{
            request: this.requset,
            successCallBack: () => {
              console.log(123123);
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          onRef={(ref) => {
            this.tableRef = ref;
          }}
          actionButtons={this.getTableActionButtons()}
          searchFormProps={getTableSearchFormItems}
          columns={getTableColumns(this)}
        />
      </>
    );
  }
}
export default SuportItemCenterBrand;
