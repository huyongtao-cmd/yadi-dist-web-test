import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import { PrintWhite, SubmitWhite } from '@/components/el/ElIcon';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import { getActionButtons } from './config';
import { FormInstance } from 'antd/lib/form';
import * as service from './service';
import dayjs from 'dayjs';
import { maths } from '@/utils';
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
import { printFn } from '@/project/utils/printUtils';
import { Modal } from 'antd';
import CheckCodeModal from '../checkCodeModal';
interface State {
  baseFormRef: FormInstance;
  detailTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  deleteFlags: Array<any>;
  invFormRef: any;
  poId: any;
  type: any;
  num: any;
  confirmBtn: boolean;
  es1: any;
  serialNoList: any;
}

class InvForm extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ textAlign: 'right', marginRight: 50 }}>总数量：{this.props.num}</div>
      </div>
    );
  }
}

class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      baseFormRef: null,
      detailTableRef: null,
      invFormRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      deleteFlags: [],
      poId: null,
      num: 0,
      type: this.props.match.params?.type,
      confirmBtn: false,
      es1: null,
      serialNoList: []
    };
  }

  componentDidMount() {
    this.getDetails(this.props.match.params.id);
  }
  //更新总数量和总价格
  setNum = (data) => {
    console.log(data, 'paramsparamsparamsparamsparamsparamsparamsparamsparams');
    const { qty } = this.sum(data)
    console.log(qty);
    this.setState({
      num: qty
    })
    // this.setState({
    //   num: this.state.num + data
    // })
    // this.sum(data);
  }

  getDetails = async (params) => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      id: params,
      storeIds
    };
    this.setState({ pageLoading: true });
    const res = await service.findPurcIdOne(data);
    this.setState({ pageLoading: false });
    if (res.success) {
      const formData = {
        ...res.data,
        applyDate: dayjs(res.data?.applyDate).startOf('day').format('YYYY-MM-DD')
      };
      const tableData = res.data?.ydInvTrnDRespVOList?.map((item) => ({
        ...item,
        // itemName:{
        //   id: item.itemId,
        //   itemName: item.itemName,
        //   itemCode: item.itemCode
        // },
        itemType: {
          udcVal: item.itemType,
          valDesc: item.itemTypeName,
        },
        uom: {
          udcVal: item.qtyUom,
          valDesc: item.qtyUomName
        }
      }));
      const serialNoList = res.data?.invSerialDocList;
      this.setNum(tableData);
      const confirmBtn = res.data?.docStatus === 'A' ? true : false;
      this.setState({ formData, tableData, serialNoList, poId: res.data?.id, confirmBtn, es1: res.data?.es1 });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  };

  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };

  getBaseFormRef = (ref) => {
    this.setState({
      baseFormRef: ref
    });
  };

  getInvFormRef = (ref) => {
    this.setState({
      invFormRef: ref
    });
  };

  getDetailTableRef = (ref) => {
    this.setState({
      detailTableRef: ref
    });
  };

  //数值相加
  sum = (data) => {
    const amt = data.reduce((total, current) => {
      return maths.add(total, current.amt || 0);
    }, 0)
    const qty = data.reduce((total, current) => {
      return maths.add(total, current.qty || 0);
    }, 0)
    return {
      amt,
      qty
    };
  }

  //提交
  handleSubmit = async () => {
    this.setState({ pageLoading: true })
    const res = await service.confirm(this.state.poId);
    this.setState({ pageLoading: false })
    if (res.success) {
      this.getDetails(this.props.match.params.id);
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || res.msg || '操作失败'
      });
    }
  }

  //返回
  onBack = () => {
    this.props.push('/inventory/inventorytransfer/index');
  };

  //loading
  handleLoading = (data) => {
    this.setState({
      pageLoading: data
    })
  }

  //打印
  print = async () => {
    const {
      formData,
      tableData
    } = this.state;
    // const newTableData = tableData.map((item)=>({
    //   ...item,
    //   itemName: item.itemName
    // })})
    const config = {
      proTitle: '',
      title: '调拨单',
      span: 3,
      orderNum: formData.docNo
    };
    const columns = [
      { title: '序号', dataIndex: 'no' },
      { title: '商品名称', dataIndex: 'itemName' },
      { title: '商品编码', dataIndex: 'itemCode' },
      // { title: '商品类型', dataIndex: 'itemTypeName' },
      { title: '调拨数量', dataIndex: 'qty' },
      { title: '单位', dataIndex: 'qtyUomName' },
      { title: '备注', dataIndex: 'remark' }
    ];
    let tableDatas = [];
    // let firstName = store.principal['firstName'];
    const footData = [{ title: '制单人:', value: formData.creator }, { title: '总数量:', value: this.state.num }];
    const baseInfo = [
      { label: '调出门店', value: formData.oouIdName },
      { label: '调出仓库', value: formData.owhName },
      { label: '调入门店', value: formData.iouIdName },
      { label: '调入仓库', value: formData.iwhName },
      { label: '调拨单号', value: formData.docNo },
      { label: '日期', value: formData.applyDate },
      // { label: '前置单号', value: formData.relateDocNo },
      { label: '备注', value: formData.remark },
    ];
    tableData.forEach((item, index) => {
      item.no = index + 1;
    });
    tableDatas = tableData;
    printFn(config, baseInfo, columns, tableDatas, footData);
  };


  checkSerialNos = () => {
    const { tableData, serialNoList } = this.state;
    console.log(tableData, 'dataSourcedataSource');
    const filterData = tableData.filter(item => item.itemType?.udcVal === 'ALL')
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={filterData} serialNoList={serialNoList} />,
      okText: '确认',
      icon: null
    })
  }

  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={[
            this.state.confirmBtn && this.state.es1 === '1' && {
              text: '确认',
              key: 'submit',
              icon: <SubmitWhite />,
              handleClick: this.handleSubmit
            },
            {
              text: '打印',
              key: 'print',
              handleClick: this.print,
              location: 'left',
              icon: <PrintWhite />
            },
            {
              key: 'checkSerialNos',
              text: '查看条码',
              handleClick: this.checkSerialNos,
            },
          ].filter(Boolean)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.props.match.params.type}
            onRef={this.getBaseFormRef}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
          />
        </ElCard>
        <ElCard title='调拨信息'>
          <InvForm
            handleLoading={this.handleLoading}
            onRef={this.getInvFormRef}
            formRef={this.state.baseFormRef}
            invFormRef={this.state.invFormRef}
            editTableRef={this.state.detailTableRef}
            type={this.state.type}
            num={this.state.num}
          />
          <DetailTable
            setDeleteFlags={this.setDeleteFlags}
            formRef={this.state.baseFormRef}
            editTableRef={this.state.detailTableRef}
            onRef={this.getDetailTableRef}
            tableData={this.state.tableData}
            type={this.state.type}
            setNum={this.setNum}
            confirmBtn={this.props.match.params.type}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
