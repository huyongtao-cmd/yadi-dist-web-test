//员工编辑
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin } from 'antd';
import ElCard from '@/components/el/ElCard';
import ElForm from '@/components/el/ElForm';
import { getBaseConfig, getWorkPostConfig } from './config';
import './index.less';
import service from '../List/service';
import { ElEditTable } from '@/components/el';
import app from '@/utils/appCommon';
import MultiTabMobx from '@/store/multiTab';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { AddBlue, DeleteRed } from '@/components/el/ElIcon';
import { maths } from '@/utils';
import { getInitRowData } from '@/utils/tableHelper';
import { ElNotification, ElRowContainer } from '@/components/el';
import dayjs from 'dayjs';
import { SubmitWhite, SaveWhite } from '@/components/el/ElIcon';
import AddressTable from '../../components/AddressTable'

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
  addrTableRef: any;
  workPostTableRef: any;
  mainPagePath: string;

  constructor(props) {
    super(props);
    this.mainPagePath = `/orgCenter/empData/list`;
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
  workPostTableActionButtons = (type): Array<ActionButtonProps> => [
    {
      text: '新增',
      key: 'create',
      handleClick: this.addPost,
      location: 'left',
      icon: <AddBlue />,
      disabled: type === 'view'
    },
    {
      text: '删除',
      key: 'del',
      handleClick: this.delPost,
      location: 'left',
      minSelection: 1,
      needConfirm: true,
      icon: <DeleteRed />,
      disabled: type === 'view'
    }
  ];

  async componentDidMount() {
    const { type, id } = this.state;
    // 默认值
    this.setState({
      formDataBase: { idType: 'ID_CARD' }
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
      res.data.buObj = { buId: res.data.buId, buName: res.data.buName };
    }
    if (res.data.userId) {
      res.data.userObj = { id: res.data.userId, username: res.data.userName };
    }
    const addr = res.data.orgAddrDetailVO.orgAddrAddressVos;
    delete res.data.orgAddrDetailVO.orgAddrAddressVos;
    this.setState({
      formDataBase: res.data,
      addrDataSource: addr,
    });
  }

  async onSave() {
    const { id } = this.state;
    let formData = await this._getWholeData();
    if (formData.errList && formData.errList.length > 0) {
      ElNotification({
        type: 'warning',
        message: formData.errList[0]
      })
      return;
    }
    if (this.state.type === 'edit') {
      formData.id = id;
    } else {
      formData.id = null;
    }
    const res = await service.save(formData);
    app.ShowMsg(res);
    if (!res.success) {
      return;
    }
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  }

  async _getWholeData() {
    let errList = [];
    const { type, formDataBase } = this.state;
    let returnObj;
    let newFormDataBase = await this.formBaseRef.validateFields();
    if (newFormDataBase.buObj) {
      newFormDataBase.buId = newFormDataBase.buObj.buId;
    }
    if (newFormDataBase.userObj) {
      newFormDataBase.userId = newFormDataBase.userObj.id;
    }
    if (newFormDataBase.birthDate) {
      newFormDataBase.birthDate = dayjs(newFormDataBase.birthDate).format('YYYY-MM-DD HH:mm:ss')
    }
    const address = await this.addrTableRef.validateTable();
    errList.push.apply(errList, address.err);
    await this.workPostTableRef.quitEditState();
    let postList = this.workPostTableRef.getRows();
    if (errList.length === 0) {
      returnObj = {
        ...newFormDataBase,
        orgAddrSaveParam: {
          addrName: type === 'edit' ? formDataBase.orgAddrDetailVO.addrName : '',
          addrNo: type === 'edit' ? formDataBase.orgAddrDetailVO.addrNo : '',
          addrType: type === 'edit' ? formDataBase.orgAddrDetailVO.addrType : 'EMP',
          id: type === 'edit' ? formDataBase.orgAddrDetailVO.id : '',
          orgAddrAddressSaveParams: address.data,
        }
      }
    } else {
      returnObj = {
        errList
      }
    }
    return returnObj;
  }
  onSwitchChange = (checked) => {
    this.setState({
      needCreateUser: checked
    });
  };
  getButtons = ({ type }) => [
    {
      key: 'save',
      text: '保存',
      icon: <SaveWhite />,
      disabled: type === 'view',
      location: 'left',
      type: 'primary',
      handleClick: () => this.onSave()
    },
  ];
  handleCancelClick = () => {
    MultiTabMobx.closeCurrentToPath(this.mainPagePath);
  }
  render() {
    const { loading, formDataBase, type } = this.state;

    return (
      <>
        <Spin spinning={loading}>
          <ElRowContainer
            onBack={this.handleCancelClick}
            blocks={this.getButtons({ type })}
            position='top'
          />

          <ElCard title='基本信息'>
            <ElForm
              formProps={getBaseConfig({
                type: this.state.type
              })}
              data={formDataBase}
              onRef={(ref) => (this.formBaseRef = ref)}
            ></ElForm>
          </ElCard>
          <AddressTable type={type} tableData={this.state.addrDataSource}
            onRef={(ref) => (this.addrTableRef = ref)} />
          <ElCard title='岗位信息'>
            <ElEditTable
              rowKey='id'
              bordered
              tableId='empListWorkPostTable'
              scroll={{ y: 206 }}
              onRef={(ref) => (this.workPostTableRef = ref)}
              actionButtons={this.workPostTableActionButtons(type)}
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
