/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 10:59:42
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-24 11:00:12
 */
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin } from 'antd';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import { getBaseConfig } from './config';
import './index.less';
import service from './service';
import { ElEditTable, ElNotification } from '@/components/el';
import app from '@/project/utils/appCommon';
import MultiTabMobx from '@/store/multiTab';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { AddBlue, DeleteRed, ImportBlue } from '@/components/el/ElIcon';
import { maths } from '@/utils';
import { getInitRowData } from '@/project/utils/tableHelper';
import AddressTable from '@/page/support/orgCenter/components/AddressTable';
import BankTable from '@/page/support/orgCenter/components/BankTable';
import LicensesTable from '@/page/support/orgCenter/components/LicensesTable';
// import { null } from 'mathjs';

interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  id: string | number;
  formDataBase: any;
  formDataClass: any;
  addrDataSource: any;
  bankDataSource: any;
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  formBaseRef: any;
  addrTableRef: any;
  bankTableRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    this.mainPagePath = `/salesCenter/ouDatas/list`;
    this.state = {
      loading: false,
      formDataBase: {},
      formDataClass: {},
      addrDataSource: [],
      bankDataSource: [],
      licenceDataSource: [],
      // 简化参数
      type: this.props.match.params?.type,
      id: this.props.match.params?.id
    };
  }

  addAddr = async ({ selectedRowKeys }) => {
    this._addInTable(this.addrTableRef);
  };
  delAddr = async (data) => {
    this._delInTable(this.addrTableRef, data);
  };

  async _delInTable(tableRef, { selectedRowKeys }) {
    await tableRef.quitEditState();
    tableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  _addInTable(tableRef, value = {}) {
    tableRef.addRow({ ...value, id: maths.genFakeId(-1) });
  }

  addrTableActionButtons: Array<ActionButtonProps> = [
    {
      text: '新增',
      key: 'create',
      handleClick: this.addAddr,
      location: 'left',
      icon: <AddBlue />
    },
    {
      text: '删除',
      key: 'del',
      handleClick: this.delAddr,
      location: 'left',
      minSelection: 1,
      needConfirm: true,
      icon: <DeleteRed />
    }
  ];
  async componentDidMount() {
    const { type, id } = this.state;
    // 默认值
    this.setState({
      formDataBase: {}
    });
    if (type == 'add') {
      return;
    }

    this.setState({ loading: true });
    let res = await service.details(id);
    console.log(res.data, 'iiiiii')
    // whType: { udcVal: data.whType, valDesc: data.whTypeName },
    this.setState({ loading: false });
    if (!res.success) {
      return;
    }
    const formData = {
      ...res.data,
      // custType: { udcVal: res.data.custType, valDesc: '1111' },
    };
    // 初始化数据
    // if (res.data != null && res.data.pid) {
    //   res.data.buObj = {
    //     buId: res.data.pid,
    //     buName: res.data.pidName,
    //     buTreeId: res.data.buTreeId,
    //     buTreeDId: res.data.buTreeDId
    //   };
    // }
    // console.log(res.data, 'res.data')
    // let addrList = '';
    // let addrList = res.data.orgAddrDetailVO.orgAddrAddressVos;
    let addrList = res.data.orgAddrDetailDTO?.orgAddrAddressVos;
    let bankList = res.data.orgAddrDetailDTO?.orgAddrBankAccVos;

    this.setState({
      formDataBase: formData,
      addrDataSource: addrList,
      bankDataSource: bankList
    });
  }

  componentWillUnmount() { }

  async onSave() {
    const { id, formDataBase, type } = this.state;
    console.log(formDataBase, type, 'kkkkk')
    let formData = await this._getWholeData();
    console.log(formData, 'formData99999')
    if (formData == null) {
      return;
    }
    this.setState({
      loading: true
    })
    const params = {
      // ...formDataBase,
      ...formData,
      custCode: type === 'edit' ? formDataBase.custCode : formData.custCode,
      newCustCode: type === 'edit' ? formDataBase.custCode === formData.custCode ? null : formData.custCode : null
      // custCode: id,
    };
    console.log(params, 'params00000')
    formData.id = formDataBase.id;
    formData.custCode = formDataBase.custCode;
    if (type == 'edit') {
      const res = await service.updates(params);
      this.setState({
        loading: false
      })
      app.ShowMsg(res);
      if (!res.success) {
        return;
      }
      MultiTabMobx.closeCurrentToPath(this.mainPagePath);
    } else {
      const res = await service.save(params);
      this.setState({
        loading: false
      })
      app.ShowMsg(res);
      if (!res.success) {
        return;
      }
      MultiTabMobx.closeCurrentToPath(this.mainPagePath);
    }
  }

  async _getWholeData() {
    let newFormDataBase = await this.formBaseRef.validateFields();
    // console.log('a3fq34f123rf', this.state.formDataBase);
    // if (newFormDataBase.buObj) {
    //   newFormDataBase.pid = newFormDataBase.buObj.buId;
    //   newFormDataBase.buTreeId = newFormDataBase.buObj.buTreeId;
    //   newFormDataBase.buTreeDId = newFormDataBase.buObj.buTreeDId;
    // }
    // delete newFormDataBase.buObj;
    const { formDataBase } = this.state;
    // console.log(formDataBase, 'formDataBase098766666')

    let retObj = await this.addrTableRef.validateTable();
    console.log(retObj, 'bankList')
    if (!!retObj.err[0]) {
      ElNotification({
        type: 'warning',
        message: '地址信息错误：' + retObj.err[0]
      });
      return;
    }


    // let retObj = await this.addrTableRef.validateTable();
    let bankObj = await this.bankTableRef.validateTable();
    console.log(bankObj, 'bankList')
    if (!!bankObj.err[0]) {
      ElNotification({
        type: 'warning',
        message: '银行信息错误：' + bankObj.err[0]
      });
      return;
    }
    let addrList = retObj.data;
    let bankList = bankObj.data;
    console.log(newFormDataBase, 'bankList2222')
    let formDataBasearr = Object.keys(formDataBase);
    if (formDataBasearr.length > 0) {
      return {
        ...newFormDataBase,
        orgAddrAddressSaveParams: addrList,
        orgAddrBankAccSaveParams: bankList,
        orgAddrDetailDTO: {
          addrNo: formDataBase?.orgAddrDetailDTO?.addrNo,
          id: formDataBase?.orgAddrDetailDTO?.id,
        }
      };
    } else {
      return {
        ...newFormDataBase,
        orgAddrAddressSaveParams: addrList,
        orgAddrBankAccSaveParams: bankList,
      };
    }

  }
  render() {
    const { loading, formDataBase, type } = this.state;

    return (
      <>
        <Spin spinning={loading}>
          <div style={{ padding: '8px' }}>
            <Button
              type='primary'
              key='save'
              onClick={() => {
                this.onSave();
              }}
              className='action-button'
            >
              保存
            </Button>
          </div>

          <ElCard title='基本信息'>
            <ElForm
              formProps={getBaseConfig(type)}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <AddressTable
            tableData={this.state.addrDataSource}
            onRef={(ref) => (this.addrTableRef = ref)}
            type={type}
            status={''}
          ></AddressTable>
          <BankTable
            tableData={this.state.bankDataSource}
            onRef={(ref) => (this.bankTableRef = ref)}
            type={type}
            status={''}
          ></BankTable>
        </Spin>
      </>
    );
  }
}

