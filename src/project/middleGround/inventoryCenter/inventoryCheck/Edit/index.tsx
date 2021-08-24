import React from 'react';
import { ElCard, ELImportExcel, ElNotification, ElPage, ElRowContainer } from '@/components/el';
import { PrintBlue, PrintWhite, SaveWhite, SubmitWhite } from '@/components/el/ElIcon';
import BaseForm from './BaseForm';
import DetailedTable from './DetailedTable';
import * as service from '../service';
import { omit } from 'ramda';
import moment from 'moment';
import store from '@/store';
import MultiTabMobx from '@/store/multiTab';
import CheckCodeModal from '../checkCodeModal';
import { Modal } from 'antd';


interface Props {
  match: any;
}

interface State {
  loading: boolean;
  formRef: any;
  formData: Object;
  editTableRef: any;
  dataSource: Array<any>;
  type: String;
  getInvDisabled: boolean;
  resetCheckDisabled: boolean;
}


class InventoryCheckEdit extends React.Component<Props, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      loading: false,
      formRef: null,
      formData: {},
      editTableRef: null,
      dataSource: [],
      type: null,    // 页面状态   创建和修改
      getInvDisabled: false,   // 创建初始化可以点击
      resetCheckDisabled: true,   // 创建初始化不可以点击

    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      // 修改  id
      this.setState({ type: this.props.match.params.id });
      this.getDetail(this.props.match.params.id);
    } else {
      // 创建  undefined  获取仓库下拉
      this.getWhData();
    }
  }

  getDetail = async (id) => {
    this.setState({
      loading: true
    });
    const res = await service.getDetailsById(id);
    this.setState({
      loading: false
    });
    if (res.success) {
      console.log(res, 'res');
      const { buId = '', whId = '', docMethod = '', ydInvCkDRespVoList = [] } = res.data;
      const dataSource = ydInvCkDRespVoList.map(item => {
        return {
          ...item,
          itemName: {
            id: item.itemId,
            itemName: item.itemName,
            itemCode: item.itemCode,
            brand: item?.brand,
            brandName: item?.brandName
          },
          dbrand: item?.brand,
          itemType: {
            udcVal: item.itemType,
            valDesc: item.itemTypeName,
          },
          uom: {
            udcVal: item.uom,
            valDesc: item.uomName
          },
          docMethod,
          buId: {
            id: buId,
          },
          whId,
          serialNoList: item.serialNoNew || []
        }
      });
      this.setState({
        formData: {
          ...omit(['ydInvCkDRespVoList'], res.data),
          buId: {
            id: buId
          },
          whId,
        },
        dataSource
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  }

  getWhData = async () => {
    const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
    const storeIds = buIdList && buIdList.map((item) => item.id);
    const data = {
      current: 1,
      size: 99999,
      buId: buIdList[0] && buIdList[0].id,
      storeIds
    };
    this.setState({ loading: true })
    const res = await service.findOneInv(data);
    this.setState({ loading: false });
    if (res.success) {
      const param = res.data.records?.map(item => {
        if (item.whStatus === 'ACTIVE') {
          return {
            value: item.id,
            label: item.whName
          }
        }
      }).filter(Boolean);
      this.setState({
        formData: {
          buId: {
            id: buIdList[0] && buIdList[0].id,
          },
          whId: param[0] && param[0].value
          // buId: { id: '24' },
          // whId: '418481155286822912',
          // itemType: 'ALL'
        }
      });
    }
  }



  formRef = (ref) => {
    this.setState({
      formRef: ref
    })
  };

  editTabeRef = (ref) => {
    this.setState({
      editTableRef: ref
    })
  };

  handleLoading = (flag) => {
    this.setState({
      loading: !!flag
    })
  };

  handleButtonDisabled = async (option, flag) => {
    console.log(option, flag);
    if (option === 'getInv') {
      this.setState({ getInvDisabled: flag, resetCheckDisabled: !flag });
    } else {
      // 重置盘点  页面初始
      const buIdList = JSON.parse(localStorage.getItem('BuIdList'))?.records;
      const storeIds = buIdList && buIdList.map((item) => item.id);
      const data = {
        current: 1,
        size: 99999,
        buId: buIdList[0] && buIdList[0].id,
        storeIds
      };
      this.setState({ loading: true })
      const res = await service.findOneInv(data);
      this.setState({ loading: false });
      if (res.success) {
        const param = res.data.records?.map(item => {
          if (item.whStatus === 'ACTIVE') {
            return {
              value: item.id,
              label: item.whName
            }
          }
        }).filter(Boolean);
        this.setState({
          getInvDisabled: flag,
          resetCheckDisabled: !flag,
          formData: {
            buId: {
              id: buIdList[0] && buIdList[0].id,
            },
            whId: param[0] && param[0].value
          },
          dataSource: [],
        });
      }
    }
  }

  // 重置明细
  handleResetDetails = async (dataSource) => {
    console.log(dataSource, 'dataSourcedataSourcedataSource');
    await this.state.editTableRef.clearRows();
    this.state.editTableRef.addRows(dataSource);
    this.setState({
      dataSource
    })
  }

  // 保存
  save = async () => {
    await this.state.editTableRef.quitEditState();
    console.log(this.state.formRef.getFieldsValue());
    const values = await this.state.formRef.validateFields();
    const detailTableValues = await this.state.editTableRef.validateTableRows();
    console.log(values, detailTableValues.data, 'pppppppppppppp')
    // const qtyNum = detailTableValues.data?.filter((item)=>item.qty <= 0)
    if (detailTableValues.data.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '请添加明细信息'
      });
    }
    if (!detailTableValues.success) {
      return ElNotification({
        type: 'warning',
        message: '请检查必填项'
      });
    }
    const params = {
      ...values,
      ...this.state.formData,
      buId: values.buId.id,
      whId: values.whId,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      createUserId: store.principal['id'],
      createUserName: store.principal['firstName'],
      ydInvCkDSaveVOList: detailTableValues.data.map(item => {
        return {
          ...item,
          itemName: item.itemName.itemName,
          itemId: item.itemName?.id,
          itemCode: item.itemName?.itemCode,
          itemType: item.itemType?.udcVal,
          uom: item.uom?.udcVal,
          brand: item.itemName?.brand,
          buId: item.buId.id,
          whId: item.whId,
          serialnoListNew: item.serialNoList,
          serialnoListlod: Object.keys(item).includes('serialNoLod') ? item.serialNoLod : [],
          serialNoNew: item.serialNoList || [],
          serialNoNow: Object.keys(item).includes('serialNoLod') ?
            Array.from(new Set([...item.serialNoLod || [], ...item.serialNoList || []]))
            : [...item.serialNoList || []]
        }
      })
    };
    console.log(params, 'paramsparams')
    this.setState({
      loading: true
    });
    const res = await service.save(params);
    this.setState({
      loading: false
    });
    if (res.success) {
      const para = res.data;
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      // this.multiTabStore.closeCurrentToPath('/inventory/inventorysearch/account');
      this.multiTabStore.closeCurrentToPath(`/inventory/inventoryCheck/view/${para}`);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  }

  // 操作失败
  submit = async () => {
    await this.state.editTableRef.quitEditState();
    console.log(this.state.formRef.getFieldsValue());
    const values = await this.state.formRef.validateFields();
    const detailTableValues = await this.state.editTableRef.validateTableRows();
    console.log(values, detailTableValues.data, 'pppppppppppppp')
    // const qtyNum = detailTableValues.data?.filter((item)=>item.qty <= 0)
    if (detailTableValues.data.length === 0) {
      return ElNotification({
        type: 'warning',
        message: '请添加明细信息'
      });
    }
    if (!detailTableValues.success) {
      return ElNotification({
        type: 'warning',
        message: '请检查必填项'
      });
    }
    const params = {
      ...values,
      ...this.state.formData,
      buId: values.buId.id,
      whId: values.whId,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      createUserId: store.principal['id'],
      createUserName: store.principal['firstName'],
      ydInvCkDSaveVOList: detailTableValues.data.map(item => {
        return {
          ...item,
          itemName: item.itemName.itemName,
          itemId: item.itemName?.id,
          itemCode: item.itemName?.itemCode,
          itemType: item.itemType?.udcVal,
          uom: item.uom?.udcVal,
          brand: item.itemName?.brand,
          buId: item.buId.id,
          whId: item.whId,
          serialnoListNew: item?.serialNoList || [],
          serialnoListlod: Object.keys(item).includes('serialNoLod') ? item.serialNoLod : [],
          serialNoNew: item?.serialNoList || [],
          serialNoNow: Object.keys(item).includes('serialNoLod') ?
            Array.from(new Set([...item.serialNoLod || [], ...item?.serialNoList || []]))
            : [...item?.serialNoList || []]
        }
      })
    };
    console.log(params, 'paramsparams')
    this.setState({
      loading: true
    });
    const res = await service.submit(params);
    this.setState({
      loading: false
    });
    if (res.success) {
      console.log(res, 'e233333333333');
      const para = res.data;
      console.log(para, 'submitsubmitsubmit');
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      });
      // this.multiTabStore.closeCurrentToPath('/inventory/inventorysearch/account');
      this.multiTabStore.closeCurrentToPath(`/inventory/inventoryCheck/view/${para}`);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      });
    }
  }

  // 查看车架号
  handleCheckSerialNo = async () => {
    await this.state.editTableRef.quitEditState();
    const detailTableValues = await this.state.editTableRef.validateTableRows();
    console.log(detailTableValues.data, '22222222222222222');
    const filterData = detailTableValues.data.filter(item => item.itemType?.udcVal === 'ALL')
    Modal.info({
      title: '',
      width: '50%',
      content: <CheckCodeModal dataSource={filterData} />,
      okText: '确认',
      icon: null
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
              handleClick: this.save,
              icon: <SaveWhite />
            },
            {
              key: 'submit',
              text: '提交盘点',
              handleClick: this.submit,
              icon: <SubmitWhite />
            },
            {
              key: 'checkSerialNo',
              text: '查看车架号',
              handleClick: this.handleCheckSerialNo,
              disabled: !this.state.type
            },
          ]}
          position='top'
        />
        <ElCard key='base' id='base' title='基本信息'>
          <BaseForm
            formRef={this.state.formRef}
            onRef={this.formRef}
            editTableRef={this.state.editTableRef}
            formData={this.state.formData}
            loading={this.handleLoading}
            type={this.state.type}
            getInvDisabled={this.state.getInvDisabled}
            resetCheckDisabled={this.state.resetCheckDisabled}
            handleButtonDisabled={this.handleButtonDisabled}
            handleResetDetails={this.handleResetDetails}
          />
        </ElCard>
        <ElCard key='item' id='item' title='盘点单明细'>
          <DetailedTable
            onRef={this.editTabeRef}
            editTableRef={this.state.editTableRef}
            dataSource={this.state.dataSource}
            formData={this.state.formData}
            handleLoading={this.handleLoading}
            formRef={this.state.formRef}
            type={this.state.type}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default InventoryCheckEdit;