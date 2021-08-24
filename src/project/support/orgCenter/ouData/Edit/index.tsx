//公司主数据详情
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Spin } from 'antd';
import { ElNotification, ElRowContainer } from '@/components/el';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import {
  getBaseConfig,
  getFinancialConfig,
  getClassCodeConfig
} from './config';
import './index.less';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import { maths } from '@/utils';
import store from '@/store';
import * as service from './service';
import { SubmitWhite, SaveWhite } from '@/components/el/ElIcon';
import AddressTable from '@/page/support/orgCenter/components/AddressTable';
import BankTable from '@/page/support/orgCenter/components/BankTable';
import LicensesTable from '@/page/support/orgCenter/components/LicensesTable';

interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  id: string | number;
  formDataBase: any; //基础信息
  formDataFinancial: any; //财务信息
  formDataClass: any; //类别码
  addressTableData: any; //地址信息
  bankTableData: any; //银行信息
  cardTableData: any; //证照信息
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  formBaseRef: any; //基础信息
  formFinancialRef: any; //财务信息
  addressTableRef: any; //地址信息
  bankTableRef: any; //银行信息
  cardTableRef: any; //证照信息
  formClassCodeRef: any; //类别码
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
      formDataFinancial: {},
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
      };
      const data = { ...this.state.formDataBase };
      data.createTime = dayjs().format('YYYY-MM-DD');
      data.creator = store.principal['username'];
      data.ouStatus = '';
      this.setState({
        formDataBase: data
      });
    } else {
      this.setState({ loading: true });
    }
    type != 'add' && (await this.getDetailById(id));
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
      };
      const formDataBase = res.data;
      delete formDataBase.orgAddrSaveParam;
      const formDataClass = formDataBase;
      const formDataFinancial = {
        ouCurr: res.data.ouCurr,
        taxerCode: res.data.taxerCode,
        taxpayerType: res.data.taxpayerType
      };
      this.orgAddrSaveParam = {
        addrName: res.data.orgAddrDetailVO.addrName,
        addrNo: res.data.orgAddrDetailVO.addrNo,
        addrType: res.data.orgAddrDetailVO.addrType,
        addrTypeName: res.data.orgAddrDetailVO.addrTypeName,
        id: res.data.orgAddrDetailVO.id
      };
      const addressTableData = res.data.orgAddrDetailVO.orgAddrAddressVos;
      // 银行信息
      const bankTableData = res.data.orgAddrDetailVO.orgAddrBankAccVos;
      //证照信息
      const cardTableData = res.data.orgAddrDetailVO.orgAddrQualifyVos;
      this.setState({
        formDataBase,
        formDataFinancial,
        addressTableData,
        bankTableData,
        cardTableData,
        formDataClass
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data
      });
    }
  };
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
    const basic = this.formBaseRef && (await this.formBaseRef.validateFields());
    if (basic.legalOuNames) {
      basic.legalOuId = basic.legalOuNames.id;
    }
    params = { ...params, ...basic };
    // 校验财务信息
    const financial =
      this.formFinancialRef && (await this.formFinancialRef.validateFields());
    params = { ...params, ...financial };
    // 地址信息
    const address =
      this.addressTableRef && (await this.addressTableRef.validateTable());
    params.orgAddrSaveParam.orgAddrAddressSaveParams = address.data;
    errList.push.apply(errList, address.err);
    // 银行信息
    const bank = this.bankTableRef && (await this.bankTableRef.validateTable());
    params.orgAddrSaveParam.orgAddrBankAccSaveParams = bank.data;
    errList.push.apply(errList, bank.err);
    // 证照信息
    const card = this.cardTableRef && (await this.cardTableRef.validateTable());
    params.orgAddrSaveParam.orgAddrQualifySaveParams = card.data;
    errList.push.apply(errList, card.err);
    //校验码
    const formClass =
      this.formClassCodeRef && (await this.formClassCodeRef.validateFields());
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
  };

  async onSave(params, type) {
    params.orgAddrSaveParam.orgAddrAddressSaveParams?.length > 0 &&
      params.orgAddrSaveParam.orgAddrAddressSaveParams.forEach((a) => {
        if (a.region?.length > 0) {
          a.province = a.region[0];
          a.city = a.region.length > 1 ? a.region[1] : '';
          a.county = a.region.length > 2 ? a.region[2] : '';
        }
      });
    let response: any;
    if (
      this.state.formDataBase.ouStatus === 'DRAFT' ||
      this.state.formDataBase.ouStatus === ''
    ) {
      params.ouStatus = type;
    } else {
      params.ouStatus = this.state.formDataBase.ouStatus;
    }
    if (this.props.match.params.type === 'edit') {
      params.id = this.props.match.params.id;
      response = await service.updateOu(params);
    } else if (this.props.match.params.type === 'add') {
      response = await service.createOu(params);
    }
    ElNotification({
      type: response.success ? 'success' : 'error',
      message: response.msg
    });
    if (response && response.success) {
      MultiTabMobx.closeCurrentToPath('/orgCenter/ouData/list');
    }
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
  };
  handleCancelClick = () => {
    MultiTabMobx.closeCurrentToPath('/orgCenter/ouData/list');
  };
  getButtons = ({ type, formDataBase }) => [
    {
      key: 'save',
      text: '保存',
      icon: <SaveWhite />,
      disabled: type === 'view' || formDataBase.ouStatus === 'CLOSED',
      location: 'left',
      type: 'primary',
      handleClick: () => this.boforeSave('DRAFT')
    },
    {
      key: 'sure',
      text: '确认',
      type: 'primary',
      icon: <SubmitWhite />,
      disabled:
        type === 'view' ||
        (formDataBase.ouStatus != '' && formDataBase.ouStatus != 'DRAFT'),
      location: 'left',
      handleClick: () => this.boforeSave('ACTIVE')
    }
  ];

  render() {
    const {
      loading,
      formDataBase,
      formDataFinancial,
      type,
      formDataClass,
      addressTableData,
      bankTableData,
      cardTableData
    } = this.state;

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
                items: getBaseConfig(type, formDataBase.ouStatus),
                labelCol: { span: 7 },
                wrapperCol: { span: 17 }
              }}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <ElCard title='财务信息'>
            <ElForm
              formProps={{
                items: getFinancialConfig(type, formDataBase.ouStatus)
              }}
              data={formDataFinancial}
              onRef={(ref) => (this.formFinancialRef = ref)}
            ></ElForm>
          </ElCard>
          <AddressTable
            status={formDataBase.ouStatus}
            type={type}
            tableData={addressTableData}
            onRef={(ref) => (this.addressTableRef = ref)}
          />
          <BankTable
            status={formDataBase.ouStatus}
            type={type}
            tableData={bankTableData}
            onRef={(ref) => (this.bankTableRef = ref)}
          />
          <LicensesTable
            status={formDataBase.ouStatus}
            type={type}
            tableData={cardTableData}
            onRef={(ref) => (this.cardTableRef = ref)}
          />
          <ElCard title='类别码'>
            <ElForm
              formProps={getClassCodeConfig(type, formDataBase.ouStatus)}
              data={formDataClass}
              onRef={(ref) => (this.formClassCodeRef = ref)}
            ></ElForm>
          </ElCard>
        </Spin>
      </>
    );
  }
}
