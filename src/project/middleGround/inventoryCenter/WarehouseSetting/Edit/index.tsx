/** 仓库新增/编辑 */
import React from 'react';
import {
  ElCard,
  ElRowContainer,
  ElNotification,
  ElPage
} from '@/components/el';
import { SaveWhite } from '@/components/el/ElIcon';
import MultiTabMobx from '@/store/multiTab';
import BaseForm from './BaseForm';
import EditTable from './EditTable';
import AddressTable from '@/page/support/orgCenter/components/AddressTable';
import * as service from '../service';

interface Props {
  match: any;
}
interface State {
  loading: boolean;
  formRef: any;
  editTableRef: any;
  formData: Object;
  dataSource: Array<any>;
  type: any;
  id: string | number;
  addrTableRef: any;
  addrDataSource: Array<any>;
}
class AdjustEdit extends React.Component<Props, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      loading: false,
      formRef: null,
      editTableRef: null,
      formData: {},
      dataSource: [],
      addrTableRef: null,
      addrDataSource: [],
      type: this.props.match.params?.id,
      id: ''
    };
  }
  async componentDidMount() {
    if (!this.state.type) {
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      this.setState({ loading: true })
      const res = await service.findAddr(buIdList[0] && buIdList[0].id);
      this.setState({ loading: false })
      if (res.success) {
        const addrDataSource = res.data.orgAddrDetailVO?.orgAddrAddressVos?.map((item) => {
          const regionNames = [];
          if (item.province) { regionNames.push({ label: item.provinceName, value: item.province }) }
          if (item.city) { regionNames.push({ label: item.cityName, value: item.city }) }
          if (item.county) { regionNames.push({ label: item.countyName, value: item.county }) }
          return {
            ...item,
            addressTypeNames: {
              udcVal: item.addressType,
              valDesc: item.addressTypeName
            },
            regionNames: regionNames
          }
        });
        this.setState({
          formData: {
            buId: {
              id: buIdList[0] && buIdList[0].id
            }
          },
          addrDataSource
        });
      }
    } else {
      this.getDetail(this.state.type);
    }
  }

  // form表单ref
  formRef = (ref) => {
    this.setState({
      formRef: ref
    });
  };
  // 可编辑表格ref
  editTableRef = (ref) => {
    this.setState({
      editTableRef: ref
    });
  };

  addrTableRef = (ref) => {
    this.setState({
      addrTableRef: ref
    });
  };
  // 保存
  save = async (data) => {
    this.setState({
      loading: true
    });
    const res = await service.save(data);
    this.setState({
      loading: false
    });
    console.log(res);
    if (res.success) {
      ElNotification({ type: 'success', message: '操作成功！' });
      // 2021年06月24  更改路由配置  把/inventory改为/mainData
      this.multiTabStore.closeCurrentToPath('/mainData/warehousesetting/index');
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  };
  // 查详情
  getDetail = async (data) => {
    console.log(data, 'datadata');
    this.setState({
      loading: true
    });
    const res = await service.findOneInvAj(data);
    console.log(res);
    if (res.success) {
      const { data } = res;
      const addrRes = await service.findAddr(data.buId);
      this.setState({
        loading: false
      });
      console.log(addrRes, 'addrResaddrResaddrRes');
      if (addrRes.success) {
        const addrDataSource = addrRes.data.orgAddrDetailVO?.orgAddrAddressVos;
        this.setState({
          addrDataSource,
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg || res.data || '操作失败！'
        });
      }
      const formData = {
        ...data,
        whType: { udcVal: data.whType, valDesc: data.whTypeName },
        buId: {
          id: data.buId
        }
      };
      const dataSource = data.ydInvWhAreaRespList && data.ydInvWhAreaRespList.map((val) => ({
        ...val,
        areaStatus: { udcVal: val.areaStatus, valDesc: val.areaStatusName }
      }));
      this.setState({
        formData,
        dataSource,
        id: data.id
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  };

  // 处理数据
  proceData = async () => {
    const { formRef, editTableRef, addrTableRef } = this.state;
    const formData = await formRef.validateFields();
    await editTableRef.quitEditState();
    const detailTableValues = await editTableRef.validateTableRows();
    const addrTableValue = await addrTableRef.validateTable();
    if (!detailTableValues.success) {
      return ElNotification({
        type: 'warning',
        message: '请检查必填项！'
      });
    }
    // if (detailTableValues.data.length === 0) {
    //   return ElNotification({
    //     type: 'warning',
    //     message: '请添加明细信息！'
    //   });
    // }
    const params = {
      ...formData,
      id: this.state.id,
      whType: formData.whType?.udcVal,
      buId: formData.buId?.id,
      ydInvWhAreaSaveVOList: detailTableValues.data.map((val) => ({
        ...val,
        areaStatus: val.areaStatus?.udcVal
      }))
    };
    console.log(params, 'paramsparamsparams');
    return params;
  };

  //赋值地址信息
  setAddr = (data) => {
    this.setState({
      addrDataSource: data
    })
  }
  // 保存前
  beforeSave = async () => {
    const data = await this.proceData();
    data && this.save(data);
  };
  // 提交前
  beforeSubmit = async () => {
    const data = await this.proceData();
    // data && this.submit(data);
  };
  // 提交
  submit = async (data) => {
    console.log('提交');
  };

  loading = (data) => {
    this.setState({
      loading: data
    })
  }

  render() {
    return (
      <ElPage spinning={this.state.loading}>
        <ElRowContainer
          blocks={[
            {
              key: 'save',
              text: '保存',
              handleClick: this.beforeSave,
              icon: <SaveWhite />
            }
            // {
            //   key: 'submit',
            //   text: '提交',
            //   handleClick: this.beforeSubmit,
            //   // disabled: !this.state.id,
            //   icon: <SubmitBlue />
            // }
          ]}
          position='top'
        />
        <ElCard key='base' id='base' title='基础信息'>
          <BaseForm
            formRef={this.state.formRef}
            editTableRef={this.state.editTableRef}
            onRef={this.formRef}
            addrTableRef={this.state.addrTableRef}
            formData={this.state.formData}
            setAddr={this.setAddr}
            loading={this.loading}
          />
        </ElCard>
        <ElCard key='item' id='item' title='库位信息'>
          <EditTable
            onRef={this.editTableRef}
            editTableRef={this.state.editTableRef}
            formRef={this.state.formRef}
            dataSource={this.state.dataSource}
          />
        </ElCard>
        <AddressTable
          onRef={this.addrTableRef}
          tableData={this.state.addrDataSource}
          type={this.state.type}
          status={'CLOSED'}
        />
      </ElPage>
    );
  }
}
export default AdjustEdit;
