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
import { getBaseConfig, getPostConfig, getClassCodeConfig } from './config';
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
import AddressTable from '@/page/support/orgCenter/components/AddressTable';
import { getInitRowData } from '@/project/utils/tableHelper';

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
  postDataSource: any;
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  formBaseRef: any;
  formClassRef: any;
  addrTableRef: any;
  postTableRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    // 2021.06.24  修改路由配置 去掉 /orgCenter
    this.mainPagePath = `/mainData/servingStation/list`;
    this.state = {
      loading: false,
      formDataBase: {},
      formDataClass: {},
      addrDataSource: [],
      postDataSource: [],
      // 简化参数
      type: this.props.match.params?.type,
      id: this.props.match.params?.id
    };
  }

  addAddr = async ({ selectedRowKeys }) => { };
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

  addPost = async ({ selectedRowKeys }) => {
    this._addInTable(this.postTableRef);
  };
  delPost = async (data) => {
    this._delInTable(this.postTableRef, data);
  };

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
  getPostTableActionButtons(type) {
    let btns: Array<ActionButtonProps> = [
      {
        text: '新增',
        key: 'create',
        handleClick: this.addPost,
        location: 'left',
        disabled: type == 'view',
        icon: <AddBlue />
      },
      {
        text: '删除',
        key: 'del',
        handleClick: this.delPost,
        location: 'left',
        minSelection: 1,
        needConfirm: true,
        disabled: type == 'view',
        icon: <DeleteRed />
      }
    ];
    return btns;
  }

  async componentDidMount() {
    const { type, id } = this.state;
    // 默认值
    this.setState({
      formDataBase: { storeType: 'B' }
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
    if (res.data.buId) {
      res.data.buObj = {
        buId: res.data.buId,
        buName: res.data.buName,
        buTreeId: res.data.buTreeId,
        buTreeDId: res.data.buTreeDId
      };
    }

    res.data.orgBuDetailsVOS.forEach((a) => {
      if (a.buStatus) {
        a.buStatusObj = {
          udcVal: a.buStatus,
          valDesc: a.buStatusName
        };
      }
    });
    const addr = res.data.orgAddrDetailVO.orgAddrAddressVos;
    const post = res.data.orgBuDetailsVOS;

    this.setState({
      formDataBase: res.data,
      addrDataSource: addr,
      postDataSource: post
    });
  }

  componentWillUnmount() { }

  async onSave() {
    const { id, formDataBase } = this.state;
    let formData = await this._getWholeData();
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
    console.log(newFormDataBase, 'newFormDataBasenewFormDataBase')
    if (newFormDataBase.buObj) {
      newFormDataBase.buId = newFormDataBase.buObj.buId;
      newFormDataBase.buTreeId = newFormDataBase.buObj.buTreeId;
      newFormDataBase.buTreeDId = newFormDataBase.buObj.buTreeDId;
    }
    delete newFormDataBase.buObj;


    delete newFormDataBase.storeObj;

    let retObj = await this.addrTableRef.validateTable();
    if (!!retObj.err[0]) {
      ElNotification({
        type: 'warning',
        message: '地址信息错误：' + retObj.err[0]
      });
      return;
    }
    let addrList = retObj.data;
    await this.postTableRef.quitEditState();
    let postList = this.postTableRef.getRows();
    postList.forEach((a) => {
      a.buStatus = a.buStatusObj?.udcVal;
      a.buStatusName = a.buStatusObj?.valDesc;
    });

    return {
      ...newFormDataBase,
      orgAddrSaveParam: { orgAddrAddressSaveParams: addrList },
      orgBuSaveParams: postList
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
              formProps={getBaseConfig(type)}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <ElCard title='工位信息'>
            <ElEditTable
              rowKey='id'
              tableId='postAddrTable'
              scroll={{ y: 206 }}
              onRef={(ref) => (this.postTableRef = ref)}
              actionButtons={this.getPostTableActionButtons(type)}
              columns={getPostConfig()}
              dataSource={this.state.postDataSource}
              rowSelectionConfig={{
                disabledRowIds: [],
                type: 'checkbox',
                fixed: false
              }}
            ></ElEditTable>
          </ElCard>
          <AddressTable
            tableData={this.state.addrDataSource}
            onRef={(ref) => (this.addrTableRef = ref)}
            type={'Edit'}
            status={''}
          ></AddressTable>
        </Spin>
      </>
    );
  }
}
