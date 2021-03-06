import React from 'react';
import { history, push } from 'react-router-dom';
import { ElCard, ElNotification, ElPage, ElRowContainer } from '@/components/el';
import { ImportWhite, PrintWhite } from '@/components/el/ElIcon';
import BaseForm from './BaseForm';
import CheckCodeModal from '../checkCodeModal';
import DetailTable from './DeatiledTable';
import SerialNoDetailTable from './SerialNoDetailTable';
import ProfitInfoTable from './profitInfoTable';
import { Button, Modal } from 'antd';
import * as service from '../service';
import { omit } from 'ramda';
import { maths } from '@/utils';
import { printFn } from '@/project/utils/printUtils';

interface Props {
  match: any;
  history: history;
  push: push;
}

interface State {
  loading: boolean;
  formData: Ob;
  dataSource: Array<any>;
  proDataSource: Array<any>;
  serialNoSource: Array<any>;
  modalVisible: boolean;
  passLoading: boolean;
  refuseLoading: boolean;
}
interface Ob {
  docNo?: string;
  docStatus?: String;
  storeName?: String;
  whName?: String;
  createTime?: String;
  docMethodName?: String;
  docTypeName?: String;
  docModeName?: String;
  docStatusName?: String;
  createUserName?: String;
  remark?: string;
}

class InventoryCheckView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formData: {
        docStatus: '',
      },
      dataSource: [],
      proDataSource: [],
      serialNoSource: [],
      modalVisible: false,
      passLoading: false,
      refuseLoading: false
    }
  }

  componentDidMount() {
    this.getDetails(this.props.match.params.id);
  }

  getDetails = async (id) => {
    console.log(id);
    this.setState({
      loading: true
    });
    const res = await service.getDetailsById(id);
    this.setState({
      loading: false
    });
    if (res.success) {
      console.log(res, 'res');
      const { ydInvCkDRespVoList = [], invCkDSerialRespVOList = [], docMethod = '' } = res.data;
      const dataSource = ydInvCkDRespVoList.map(item => {
        return {
          ...item,
          docMethod,
          accQty1: docMethod === 'A' ? '***' : item.accQty,
          serialNoList: item.serialNoNew || []
        }
      });
      const proDataSource = ydInvCkDRespVoList.filter(item => item.diffQty !== 0);
      this.setState({
        formData: {
          ...omit(['ydInvCkDRespVoList'], res.data),
        },
        dataSource,
        proDataSource: proDataSource.map(item => {
          return {
            ...item,
            docMethod,
            accQty1: docMethod === 'A' ? '***' : item.accQty,
            diffQty: maths.sub(item.factQty || 0, item.accQty || 0),
            lineType: maths.sub(item.factQty || 0, item.accQty || 0) > 0 ? '??????' : '??????'
          }
        }),
        serialNoSource: invCkDSerialRespVOList
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '???????????????'
      });
    }
  }

  // ??????
  print = async () => {
    const { formData, dataSource, proDataSource } = this.state;
    const config = {
      proTitle: '',
      title: '?????????',
      span: 3,
      orderNum: formData.docNo
    };
    const columns = [
      { title: '????????????', dataIndex: 'itemCode' },
      { title: '????????????', dataIndex: 'itemName' },
      { title: '??????', dataIndex: 'brandName' },
      { title: '????????????', dataIndex: 'itemTypeName' },
      { title: '?????????', dataIndex: 'accQty' },
      { title: '????????????', dataIndex: 'factQty' },
      { title: '??????', dataIndex: 'uomName' },
      { title: '??????', dataIndex: 'remark' }
    ];
    const baseInfo = [
      { label: '???????????????', value: formData.docNo },
      { label: '??????', value: formData.storeName },
      { label: '??????', value: formData.whName },
      { label: '????????????', value: formData.createTime },
      { label: '????????????', value: formData.docMethodName },
      { label: '????????????', value: formData.docTypeName },
      { label: '????????????', value: formData.docModeName },
      { label: '???????????????', value: formData.docStatusName },
      { label: '?????????', value: formData.createUserName },
      { label: '??????', value: formData.remark },
    ];
    printFn(config, baseInfo, columns, dataSource, []);
  }

  // ??????
  approve = () => {
    this.setState({
      modalVisible: true
    })
  }

  // ??????
  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  // ????????????
  handlePass = async () => {
    this.setState({
      passLoading: true,
    })
    const res = await service.approvePass(this.props.match.params.id);
    this.setState({
      loading: false,
    });
    if (res?.success) {
      this.setState({
        modalVisible: false,
      });
      this.getDetails(this.props.match.params.id);
      ElNotification({
        type: 'success',
        message: res.msg || ' ????????????'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || ' ????????????'
      });
    }
  }
  // ????????????
  handleRefuse = async () => {
    this.setState({
      refuseLoading: true,
    })
    const res = await service.approveRefuse(this.props.match.params.id);
    this.setState({
      refuseLoading: false,
    });
    if (res?.success) {
      this.setState({
        modalVisible: false
      });
      this.getDetails(this.props.match.params.id);
      ElNotification({
        type: 'success',
        message: res.msg || ' ????????????'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || ' ????????????'
      });
    }
  }

  onBack = () => {
    this.props.push('/inventory/inventoryCheck/index');
  }

  // ???????????????
  handleCheckSerialNo = async () => {
    const { dataSource } = this.state;
    console.log(dataSource, 'dataSourcedataSource');
    const filterData = dataSource.filter(item => item.itemType === 'ALL')
    Modal.info({
      title: '',
      width: '60%',
      content: <CheckCodeModal dataSource={filterData} />,
      okText: '??????',
      icon: null
    })
  }


  render() {
    return (
      <ElPage spinning={this.state.loading}>
        <ElRowContainer
          blocks={[
            {
              key: 'print',
              text: '??????',
              handleClick: this.print,
              icon: <PrintWhite />
            },
            {
              key: 'checkSerialNo',
              text: '???????????????',
              handleClick: this.handleCheckSerialNo,
            },
            {
              key: 'approve',
              text: '??????',
              handleClick: this.approve,
              icon: <ImportWhite />,
              disabled: this.state.formData.docStatus !== 'B'
            },
          ]}
          position='top'
          onBack={this.onBack}
        />
        <ElCard key='base' id='base' title='????????????'>
          <BaseForm
            formData={this.state.formData}
          />
        </ElCard>
        <ElCard key='order' id='order' title='???????????????'>
          <DetailTable
            dataSource={this.state.dataSource}
          />
        </ElCard>
        {
          this.state.formData && this.state.formData.docStatus !== 'A' ? (
            <ElCard key='profit' id='profit' title='???????????????'>
              <ProfitInfoTable
                proDataSource={this.state.proDataSource}
              />
            </ElCard>
          ) : null
        }
        {
          this.state.formData && this.state.formData.docStatus !== 'A' ? (
            <ElCard key='serialNo' id='serialNo' title='????????????????????????'>
              <SerialNoDetailTable
                serialNoSource={this.state.serialNoSource}
              />
            </ElCard>
          ) : null
        }
        {
          this.state.modalVisible ? (
            <Modal
              width='40%'
              title='??????'
              visible={this.state.modalVisible}
              onCancel={this.handleCancel}
              footer={
                [
                  <Button key='cancel' onClick={this.handleCancel} type='primary'>??????</Button>,
                  <Button key='pass' onClick={this.handlePass} type='primary' loading={!!this.state.passLoading}>????????????</Button>,
                  <Button key='refuse' onClick={this.handleRefuse} type='primary' danger loading={!!this.state.refuseLoading}>????????????</Button>,
                ]
              }
              destroyOnClose
            >
              ?????????????????????
            </Modal>
          ) : null
        }

      </ElPage>
    );
  }
}

export default InventoryCheckView;