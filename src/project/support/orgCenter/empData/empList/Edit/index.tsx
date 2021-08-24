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
import { getBaseConfig, getWorkPostConfig } from './config';
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
import { asserts, maths } from '@/utils';
import { getInitRowData } from '@/project/utils/tableHelper';
import AddressTable from '@/page/support/orgCenter/components/AddressTable';

interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  id: string | number;
  formDataBase: any;
  addrDataSource: any;
  workPostDataSource: any;
  needCreateUser: boolean;
  roleList: Array<any>;
  [props: string]: any;
}

export default class Detail extends PureComponent<Props, State> {
  static propTypes = {};
  formBaseRef: any;
  workPostTableRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    // 2021年6月24日  修改路由配置  需删掉/orgCenter
    this.mainPagePath = `/mainData/empData/empList`;
    this.state = {
      loading: false,
      formDataBase: {},
      addrDataSource: [],
      workPostDataSource: [],
      needCreateUser: false,
      roleList: [],
      // 简化参数
      type: this.props.match.params?.type,
      id: this.props.match.params?.id
    };
  }

  addPost = async ({ selectedRowKeys }) => {
    this._addInTable(
      this.workPostTableRef,
      getInitRowData(getWorkPostConfig())
    );
  };
  delPost = async (data) => {
    this._delInTable(this.workPostTableRef, data);
  };

  async _delInTable(tableRef, { selectedRowKeys }) {
    await tableRef.quitEditState();
    tableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  }

  _addInTable(tableRef, value = {}) {
    tableRef.addRow({ ...value, id: maths.genFakeId(-1) });
  }

  workPostTableActionButtons: Array<ActionButtonProps> = [
    {
      text: '新增',
      key: 'create',
      handleClick: this.addPost,
      location: 'left',
      icon: <AddBlue />
    },
    {
      text: '删除',
      key: 'del',
      handleClick: this.delPost,
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
      formDataBase: { idType: 'ID_CARD', roleIds: [], needCreateUser: false }
    });
    // if (type == 'add') {
    //   this.setState({ loading: true });
    //   const roleRes = await service.getAllRoleList();
    //   console.log('角色角色角色角色', roleRes);
    //   this.setState({ loading: false });
    //   if (roleRes.success) {
    //     this.setState({
    //       roleList: roleRes.data.records.map((v) => {
    //         return {
    //           key: v.id,
    //           label: v.name,
    //           value: v.id
    //         };
    //       })
    //     });
    //   }
    //   return;
    // }

    // 编辑的时候也要绑定角色配置
    this.setState({ loading: true });
    const roleRes = await service.getAllRoleList();
    this.setState({ loading: false });
    if (roleRes.success) {
      this.setState({
        roleList: roleRes.data.records.map((v) => {
          return {
            key: v.id,
            label: v.name,
            value: v.id
          };
        })
      });
    }

    this.setState({ loading: true });
    let res = await service.getDetail(id);
    this.setState({ loading: false });
    if (!res.success) {
      return;
    }
    // 初始化数据
    if (res.data.empBuId) {
      res.data.buObj = {
        buId: res.data.empBuId,
        buName: res.data.empBuName,
        buTreeId: res.data.empBuTreeId,
        buTreeDId: res.data.empBuTreeDId
      };
    }
    if (res.data.userDTO) {
      res.data.sysUserName = res.data.userDTO.username;
      res.data.email = res.data.userDTO.email;
      res.data.mobile = res.data.userDTO.mobile;
      res.data.roleIds = res.data.userDTO.roles.map(item => item.toString());
    }
    let addr = res.data.orgAddrDetailVO.orgAddrAddressVos;
    delete res.data.orgAddrAddressDTOS;
    const post = res.data.orgBuDTOS.map((v) => {
      return { id: v.id, buObj: { ...v } };
    });
    delete res.data.buIds;
    this.setState({
      formDataBase: res.data,
      addrDataSource: addr,
      workPostDataSource: post,
      needCreateUser: asserts.isExist(res.data.userDTO?.id) ? true : false
    });
  }

  componentWillUnmount() { }

  async onSave() {
    const { id, formDataBase } = this.state;
    let formData = await this._getWholeData();
    console.log('formData', formData)
    if (formData == null) {
      return;
    }
    formData.empId = id;
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
    if (newFormDataBase.buObj) {
      newFormDataBase.empBuId = newFormDataBase.buObj.buId;
      newFormDataBase.empBuTreeId = newFormDataBase.buObj.buTreeId;
      newFormDataBase.empBuTreeDId = newFormDataBase.buObj.buTreeDId;
    }
    if (
      newFormDataBase.birthDate &&
      newFormDataBase.birthDate.indexOf(':') < 0
    ) {
      newFormDataBase.birthDate = `${newFormDataBase.birthDate} 00:00:00`;
    }
    newFormDataBase.sysUserName = newFormDataBase.mobile;
    newFormDataBase.sysPassword = '888888';
    delete newFormDataBase.buObj;

    await this.workPostTableRef.quitEditState();
    let postList = this.workPostTableRef.getRows();

    return {
      ...newFormDataBase,
      orgAddrSaveParam: {
        orgAddrAddressSaveParams: []
      },
      buIds: postList.filter((a) => a.buObj != null).map((a) => a.buObj.id)
    };
  }
  onSwitchChange = (checked) => {
    this.setState({
      needCreateUser: checked
    });
  };
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
              formProps={getBaseConfig({
                type: this.state.type,
                onSwitchChange: this.onSwitchChange,
                needCreateUser: this.state.needCreateUser,
                roleList: this.state.roleList
              })}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <ElCard title='工位信息'>
            <ElEditTable
              rowKey='id'
              tableId='empListWorkPostTable'
              scroll={{ y: 206 }}
              onRef={(ref) => (this.workPostTableRef = ref)}
              actionButtons={this.workPostTableActionButtons}
              columns={getWorkPostConfig()}
              dataSource={this.state.workPostDataSource}
              rowSelectionConfig={{
                disabledRowIds: [],
                type: 'checkbox',
                fixed: false,
                onChange: ({ selectedRowKeys, selectedRows }) => {
                  this.setState({
                    selectedRowKeys,
                    selectedRows
                  });
                }
              }}
            ></ElEditTable>
          </ElCard>
        </Spin>
      </>
    );
  }
}
