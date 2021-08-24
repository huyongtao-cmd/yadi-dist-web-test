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
import service from '../service';
import { ElEditTable, ElNotification, ElRowContainer } from '@/components/el';
import app from '@/project/utils/appCommon';
import MultiTabMobx from '@/store/multiTab';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import {
  AddBlue,
  DeleteRed,
  ImportBlue,
  SaveWhite
} from '@/components/el/ElIcon';
import { maths } from '@/utils';
import { getInitRowData } from '@/project/utils/tableHelper';
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
  formDataBase: any;
  formDataClass: any;
  addrDataSource: any;
  [props: string]: any;
  orgAddrDetailVOId: any;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  formBaseRef: any;
  addrTableRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    // 2021.06.24 修改菜单配置
    // this.mainPagePath = `/orgCenter/mainData/dealer/list`;
    this.mainPagePath = `/mainData/dealer/list`;
    this.state = {
      loading: false,
      formDataBase: {},
      formDataClass: {},
      addrDataSource: [],
      bankDataSource: [],
      licenceDataSource: [],
      // 简化参数
      type: this.props.match.params?.type,
      id: this.props.match.params?.id,
      orgAddrDetailVOId: null
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
    let res = await service.getDetail(id);
    this.setState({ loading: false });
    if (!res.success) {
      return;
    }
    // 初始化数据
    if (res.data.pid) {
      res.data.buObj = {
        buId: res.data.pid,
        buName: res.data.pidName,
        buTreeId: res.data.buTreeId,
        buTreeDId: res.data.buTreeDId
      };
    }
    let addrList = res.data.orgAddrDetailVO.orgAddrAddressVos;

    this.setState({
      formDataBase: res.data,
      addrDataSource: addrList,
      orgAddrDetailVOId: res.data.orgAddrDetailVO?.id
    });
  }

  componentWillUnmount() { }

  async onSave() {
    const { id, formDataBase } = this.state;
    let formData = await this._getWholeData();
    if (formData == null) {
      return;
    }
    formData.id = id;
    this.setState({ loading: true });
    const res = await service.save(formData);
    this.setState({ loading: false });
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }

    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  }

  async _getWholeData() {
    let newFormDataBase = await this.formBaseRef.validateFields();
    console.error('a3fq34f123rf', newFormDataBase.buObj);
    if (newFormDataBase.buObj) {
      newFormDataBase.pid = newFormDataBase.buObj.buId;
      newFormDataBase.buTreeId = newFormDataBase.buObj.buTreeId;
      newFormDataBase.buTreeDId = newFormDataBase.buObj.buTreeDId;
    }
    // delete newFormDataBase.buObj;

    let retObj = await this.addrTableRef.validateTable();
    if (!!retObj.err[0]) {
      ElNotification({
        type: 'warning',
        message: '地址信息错误：' + retObj.err[0]
      });
      return;
    }
    let addrList = retObj.data;

    // let addrObj = {
    //   orgAddrAddressSaveParams: addrList
    // };
    return {
      ...newFormDataBase,
      // orgAddrSaveParam:addrObj,
      orgAddrSaveParam: {
        id: this.state.orgAddrDetailVOId,
        orgAddrAddressSaveParams: addrList
      }
    };
  }
  handleCancelClick = () => {
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  };
  getButtons = ({ type, formDataBase }) => [
    {
      key: 'save',
      text: '保存',
      icon: <SaveWhite />,
      disabled: type === 'view',
      location: 'left',
      type: 'primary',
      handleClick: () => this.onSave()
    }
  ];
  render() {
    const { loading, formDataBase, type } = this.state;

    return (
      <>
        <Spin spinning={loading}>
          <ElRowContainer
            onBack={this.handleCancelClick}
            blocks={this.getButtons({ type, formDataBase })}
            position='top'
          />

          <ElCard title='基本信息'>
            <ElForm
              formProps={getBaseConfig(type, formDataBase)}
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
        </Spin>
      </>
    );
  }
}
