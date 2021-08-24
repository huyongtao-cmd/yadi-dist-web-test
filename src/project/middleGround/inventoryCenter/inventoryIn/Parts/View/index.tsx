import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import * as service from './service';
import dayjs from 'dayjs';
import { PrintWhite } from '@/components/el/ElIcon';
import { printFn } from '@/project/utils/printUtils';
import store from '@/store';
import { values } from 'mobx';
interface State {
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
}
class View extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      tableData: [],
      pageLoading: false
    };
  }

  componentDidMount() {
    this.getDetails(this.props.match.params.id);
  }

  getDetails = async (params) => {
    console.log(params, 'findIdOnefindIdOnefindIdOne');
    const data = {
      id: params
    };
    this.setState({ pageLoading: true });
    const res = await service.ydPurGrD(params);
    console.log(res, 'pppp[[[[[')
    this.setState({ pageLoading: false });
    if (res.success) {
      const formData = { ...res?.data[0] };
      const tableData = res?.data[0].purGrDSaveVOList;
      this.setState({ formData, tableData });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  };

  onBack = () => {
    this.props.push('/inventory/inventorysearch/account');
  };
  //打印
  print = async () => {
    const {
      formData,
      tableData
    } = this.state;
    const config = {
      proTitle: '',
      title: '入库单',
      span: 3
    };
    const columns = [
      { title: '序号', dataIndex: 'no' },
      { title: '商品名称', dataIndex: 'itemName' },
      { title: '商品品牌', dataIndex: 'brandName' },
      { title: '商品编码', dataIndex: 'itemCode' },
      { title: '商品类型', dataIndex: 'itemTypeName' },
      { title: '入库数量', dataIndex: 'qty' },
      { title: '单位', dataIndex: 'uomName' },
      { title: '备注', dataIndex: 'remark' }
    ];
    let tableDatas = [];
    // let firstName = store.principal['firstName'];
    const footData = [{ title: '制单人:', value: formData.creator }, { title: '总数量:', value: formData.qty }];
    const baseInfo = [
      { label: '门店', value: formData.name },
      { label: '仓库', value: formData.whName },
      { label: '入库类型', value: formData.docTypeName },
      { label: '入库日期', value: formData.recvDate },
      { label: '供应商', value: formData.suppName },
      { label: '入库单号', value: formData.docNo },
      { label: '前置单号', value: formData.relateDocNo },
      { label: '备注', value: formData.remark },
    ];
    tableData.forEach((item, index) => {
      item.no = index + 1;
    });
    tableDatas = tableData;
    printFn(config, baseInfo, columns, tableDatas, footData);
  };

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer blocks={[
          {
            text: '打印',
            key: 'print',
            handleClick: this.print,
            location: 'left',
            icon: <PrintWhite />
          }
        ]} onBack={this.onBack} position={'top'} />
        <ElCard title='基本信息'>
          <BaseForm formData={this.state.formData} />
        </ElCard>
        <ElCard title='明细信息'>
          <DetailTable tableData={this.state.tableData} />
        </ElCard>
      </ElPage>
    );
  }
}

export default View;
