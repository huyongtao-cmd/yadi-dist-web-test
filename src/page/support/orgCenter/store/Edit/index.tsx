//公司主数据详情
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { ElNotification, ElRowContainer } from '@/components/el';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import {
  getBaseConfig, getClassCodeConfig
} from './config';
import './index.less';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import { maths } from '@/utils';
import * as service from './service';
import { SaveWhite } from '@/components/el/ElIcon';
import AddressTable from '../../components/AddressTable'
import BankTable from '../../components/BankTable'
import LicensesTable from '../../components/LicensesTable'


interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  id: string | number;
  formDataBase: any;  //基础信息
  formDataClass: any;   //类别码
  addressTableData: any; //地址信息
  bankTableData: any; //银行信息
  cardTableData: any;  //证照信息
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  formBaseRef: any;  //基础信息
  addressTableRef: any;  //地址信息
  bankTableRef: any;   //银行信息
  cardTableRef: any;  //证照信息
  formClassCodeRef: any;  //类别码
  orgAddrSaveParam: any; //地址信息集合
  defaultAddressNums: number; //默认地址
  defaultBankNums: number; //默认银行
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formDataBase: {
        // createTime: dayjs().format('YYYY-MM-DD'),
        // creator: store.principal['username']
      },
      formDataClass: {},
      addressTableData: [],
      bankTableData: [],
      cardTableData: [],
      id: this.props.match.params?.id,
      type: this.props.match.params?.type
    };
  }

  //获取详情
  async componentDidMount() {
    const type = this.props.match.params?.type;
    const id = this.props.match.params?.id;
    if (type === 'add') {
      this.orgAddrSaveParam = {
        addrName: '',
        addrNo: '',
        addrType: 'BU',
        addrTypeName: '',
        id: ''
      }
      const data = { ...this.state.formDataBase };
      this.setState({
        formDataBase: data
      })
    } else {
      this.setState({ loading: true });
    }
    type != 'add' && await this.getDetailById(id);
    this.setState({ loading: false });
  }

  //根据id获取详情
  getDetailById = async (id) => {
    const res = await service.getDetailById(id);
    if (res && res.success) {
      res.data.createTime = dayjs(res.data.createTime).format('YYYY-MM-DD');
      res.data.legalOuNames = {
        ouName: res.data.legalName,
        id: res.data.legalOuId
      }
      res.data.buObj = {
        buId: res.data.buId,
        buName: res.data.pidName,
        buTreeDId: res.data.buTreeDId,
        buTreeId: res.data.buTreeId
      }
      const formDataBase = res.data;
      delete formDataBase.orgAddrSaveParam;
      const formDataClass = formDataBase;
      this.orgAddrSaveParam = {
        addrName: res.data.orgAddrDetailVO.addrName,
        addrNo: res.data.orgAddrDetailVO.addrNo,
        addrType: res.data.orgAddrDetailVO.addrType,
        addrTypeName: res.data.orgAddrDetailVO.addrTypeName,
        id: res.data.orgAddrDetailVO.id,
      }
      //地址信息
      const addressTableData = res.data.orgAddrDetailVO.orgAddrAddressVos;
      //银行信息
      const bankTableData = res.data.orgAddrDetailVO.orgAddrBankAccVos;
      //证照信息
      const cardTableData = res.data.orgAddrDetailVO.orgAddrQualifyVos;
      this.setState({
        formDataBase, addressTableData, bankTableData, cardTableData, formDataClass
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data
      });
    }
  }
  //提交前数据处理
  boforeSave = async (type) => {
    // 需要上传的全部数据
    let params = {
      orgAddrSaveParam: {
        ...this.orgAddrSaveParam
      }
    };
    let errList = [];
    // 校验基础信息
    const basic = this.formBaseRef && await this.formBaseRef.validateFields();
    if (basic.legalOuNames) {
      basic.legalOuId = basic.legalOuNames.id;
    }
    params = { ...params, ...basic };
    // 地址信息
    const address = this.addressTableRef && await this.addressTableRef.validateTable();
    params.orgAddrSaveParam.orgAddrAddressSaveParams = address.data;
    errList.push.apply(errList, address.err);
    // 银行信息
    const bank = this.bankTableRef && await this.bankTableRef.validateTable();
    params.orgAddrSaveParam.orgAddrBankAccSaveParams = bank.data;
    errList.push.apply(errList, bank.err);
    // 证照信息
    const card = this.cardTableRef && await this.cardTableRef.validateTable();
    params.orgAddrSaveParam.orgAddrQualifySaveParams = card.data;
    errList.push.apply(errList, card.err);
    //校验码
    const formClass = this.formClassCodeRef && await this.formClassCodeRef.validateFields();
    const formClassCode = formClass;
    params = { ...params, ...formClassCode };
    if (errList.length === 0) {
      this.onSave(params, type);
    } else {
      ElNotification({
        type: 'warning',
        message: errList[0]
      });
    }
  }

  async onSave(params, type) {
    params.orgAddrSaveParam.orgAddrAddressSaveParams?.length > 0 && params.orgAddrSaveParam.orgAddrAddressSaveParams.forEach((a) => {
      if (a.region?.length > 0) {
        a.province = a.region[0];
        a.city = a.region.length > 1 ? a.region[1] : '';
        a.county = a.region.length > 2 ? a.region[2] : ''
      }
    })
    let response: any;
    params.storeStatus = this.state.formDataBase.storeStatus;
    if (this.props.match.params.type === 'edit') {
      params.id = this.props.match.params.id;
      params.buId = this.state.formDataBase.buId;
      params.ouId = this.state.formDataBase.ouId;
      params.pid = this.state.formDataBase.pid;
    }
    response = await service.updateStore(params);
    ElNotification({
      type: response.success ? 'success' : 'error',
      message: response.msg
    });
    if (response && response.success) {
      MultiTabMobx.closeCurrentToPath('/orgCenter/store/list');
    }

  }
  handleCancelClick = () => {
    MultiTabMobx.closeCurrentToPath('/orgCenter/store/list');
  }

  actionButton = (actype, type, data) => {
    if (actype === 'create') {
      if (type === 'address') {
        this.addressTableRef.addRow({
          id: maths.genFakeId(-1)
        });
      } else if (type === 'bank') {
        this.bankTableRef.addRow({
          id: maths.genFakeId(-1)
        });
      } else if (type === 'card') {
        this.cardTableRef.addRow({
          id: maths.genFakeId(-1)
        });
      }
    } else {
      if (type === 'address') {
        this.addressTableRef.quitEditState(() => {
          this.addressTableRef.removeRowsByKeys(data.selectedRowKeys, 'rowKey');
        });
      } else if (type === 'bank') {
        this.bankTableRef.quitEditState(() => {
          this.bankTableRef.removeRowsByKeys(data.selectedRowKeys, 'rowKey');
        });
      } else if (type === 'card') {
        this.cardTableRef.quitEditState(() => {
          this.cardTableRef.removeRowsByKeys(data.selectedRowKeys, 'rowKey');
        });
      }
    }
  }
  getButtons = ({ type, formDataBase }) => [
    {
      key: 'save',
      text: '保存',
      icon: <SaveWhite />,
      disabled: type === 'view' || formDataBase.storeStatus === 'CLOSED',
      location: 'left',
      type: 'primary',
      handleClick: () => this.boforeSave('DRAFT')
    }
  ];

  render() {
    const { loading, formDataBase, type, formDataClass,
      addressTableData, bankTableData, cardTableData } = this.state;

    return (
      <>
        <Spin spinning={loading}>
          <ElRowContainer
            onBack={this.handleCancelClick}
            blocks={this.getButtons({ type, formDataBase })}
            position='top'
          />

          <ElCard title='基本信息' className='ouDetailView'>
            <ElForm
              formProps={{
                items: getBaseConfig(type, formDataBase.storeStatus, formDataBase, this),
                labelCol: { span: 7 },
                wrapperCol: { span: 17 }
              }}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <AddressTable status={formDataBase.storeStatus} type={type} tableData={addressTableData} onRef={(ref) => (this.addressTableRef = ref)} />
          <BankTable status={formDataBase.storeStatus} type={type} tableData={bankTableData} onRef={(ref) => (this.bankTableRef = ref)} />
          <LicensesTable status={formDataBase.storeStatus} type={type} tableData={cardTableData} onRef={(ref) => (this.cardTableRef = ref)} />
          <ElCard title='类别码'>
            <ElForm
              formProps={getClassCodeConfig(type, formDataBase.storeStatus)}
              data={formDataClass}
              onRef={(ref) => (this.formClassCodeRef = ref)}
            ></ElForm>
          </ElCard>
        </Spin>
      </>
    );
  }
}
