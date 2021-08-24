//公司主数据详情
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { ElNotification, ElRowContainer } from '@/components/el';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import { getBaseConfig, getClassCodeConfig } from './config';
import './index.less';
import dayjs from 'dayjs';
import MultiTabMobx from '@/store/multiTab';
import { maths } from '@/utils';
import * as service from './service';
import { SaveWhite } from '@/components/el/ElIcon';
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
  formDataClass: any; //类别码
  addressTableData: any; //地址信息
  bankTableData: any; //银行信息
  cardTableData: any; //证照信息
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  formBaseRef: any; //基础信息
  addressTableRef: any; //地址信息
  orgAddrSaveParam: any; //地址信息集合
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
    // 默认值
    this.setState({
      formDataBase: { storeType: 'A' }
    });
    if (type === 'add') {
      this.orgAddrSaveParam = {
        addrName: '',
        addrNo: '',
        addrType: 'BU',
        addrTypeName: '',
        id: ''
      };
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
      res.data.buObj = {
        buId: res.data.buId,
        buName: res.data.pidName,
        buTreeDId: res.data.buTreeDId,
        buTreeId: res.data.buTreeId
      };
      const formDataBase = res.data;
      delete formDataBase.orgAddrSaveParam;
      const formDataClass = formDataBase;
      this.orgAddrSaveParam = {
        addrName: res.data.orgAddrDetailVO.addrName,
        addrNo: res.data.orgAddrDetailVO.addrNo,
        addrType: res.data.orgAddrDetailVO.addrType,
        addrTypeName: res.data.orgAddrDetailVO.addrTypeName,
        id: res.data.orgAddrDetailVO.id
      };
      //地址信息
      const addressTableData = res.data.orgAddrDetailVO.orgAddrAddressVos;
      //银行信息
      const bankTableData = res.data.orgAddrDetailVO.orgAddrBankAccVos;
      //证照信息
      const cardTableData = res.data.orgAddrDetailVO.orgAddrQualifyVos;
      this.setState({
        formDataBase,
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
    // 地址信息
    const address =
      this.addressTableRef && (await this.addressTableRef.validateTable());
    params.orgAddrSaveParam.orgAddrAddressSaveParams = address.data;
    errList.push.apply(errList, address.err);
    params = { ...params };
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
    params.storeStatus = this.state.formDataBase.storeStatus;
    if (this.props.match.params.type === 'edit') {
      params.id = this.props.match.params.id;
      // params.buId = this.state.formDataBase.buId;
      params.ouId = this.state.formDataBase.ouId;
      // params.pid = this.state.formDataBase.pid;
      params.pid = params.buObj.buId;
      params.buTreeDId = params.buObj.buTreeDId;
      params.buTreeId = params.buObj.buTreeId;
      params.storeStatus = this.state.formDataBase.storeStatus;
    } else {
      params.pid = params.buObj.buId;
      params.buTreeDId = params.buObj.buTreeDId;
      params.buTreeId = params.buObj.buTreeId;
      params.storeStatus = 'ACTIVE';
    }
    this.setState({ loading: true });
    response = await service.updateStore(params);
    this.setState({ loading: false });
    ElNotification({
      type: response.success ? 'success' : 'error',
      message: response.msg
    });
    if (response && response.success) {
      // 2021.06.24  修改路由配置 去掉 /orgCenter 改为mainData
      MultiTabMobx.closeCurrentToPath('/mainData/store/list');
    }
  }
  handleCancelClick = () => {
    // 2021.06.24  修改路由配置 去掉 /orgCenter 改为mainData
    MultiTabMobx.closeCurrentToPath('/mainData/store/list');
  };

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
    const {
      loading,
      formDataBase,
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
                items: getBaseConfig(
                  type,
                  formDataBase.storeStatus,
                  formDataBase,
                  this
                )
              }}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <AddressTable
            status={formDataBase.storeStatus}
            type={type}
            tableData={addressTableData}
            onRef={(ref) => (this.addressTableRef = ref)}
          />
        </Spin>
      </>
    );
  }
}
