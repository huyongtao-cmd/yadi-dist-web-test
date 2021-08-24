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
            lineType: maths.sub(item.factQty || 0, item.accQty || 0) > 0 ? '盘盈' : '盘亏'
          }
        }),
        serialNoSource: invCkDSerialRespVOList
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  }

  // 打印
  print = async () => {
    const { formData, dataSource, proDataSource } = this.state;
    const config = {
      proTitle: '',
      title: '盘点单',
      span: 3,
      orderNum: formData.docNo
    };
    const columns = [
      { title: '商品编码', dataIndex: 'itemCode' },
      { title: '商品名称', dataIndex: 'itemName' },
      { title: '品牌', dataIndex: 'brandName' },
      { title: '商品类型', dataIndex: 'itemTypeName' },
      { title: '库存数', dataIndex: 'accQty' },
      { title: '实际数量', dataIndex: 'factQty' },
      { title: '单位', dataIndex: 'uomName' },
      { title: '备注', dataIndex: 'remark' }
    ];
    const baseInfo = [
      { label: '盘点单编号', value: formData.docNo },
      { label: '门店', value: formData.storeName },
      { label: '仓库', value: formData.whName },
      { label: '创建时间', value: formData.createTime },
      { label: '盘点类型', value: formData.docMethodName },
      { label: '盘点周期', value: formData.docTypeName },
      { label: '盘点范围', value: formData.docModeName },
      { label: '盘点单状态', value: formData.docStatusName },
      { label: '制单人', value: formData.createUserName },
      { label: '备注', value: formData.remark },
    ];
    printFn(config, baseInfo, columns, dataSource, []);
  }

  // 审核
  approve = () => {
    this.setState({
      modalVisible: true
    })
  }

  // 取消
  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  // 审核通过
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
        message: res.msg || ' 操作成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || ' 操作失败'
      });
    }
  }
  // 审核拒绝
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
        message: res.msg || ' 操作成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.data || ' 操作失败'
      });
    }
  }

  onBack = () => {
    this.props.push('/inventory/inventoryCheck/index');
  }

  // 查看车架号
  handleCheckSerialNo = async () => {
    const { dataSource } = this.state;
    console.log(dataSource, 'dataSourcedataSource');
    const filterData = dataSource.filter(item => item.itemType === 'ALL')
    Modal.info({
      title: '',
      width: '60%',
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
              key: 'print',
              text: '打印',
              handleClick: this.print,
              icon: <PrintWhite />
            },
            {
              key: 'checkSerialNo',
              text: '查看车架号',
              handleClick: this.handleCheckSerialNo,
            },
            {
              key: 'approve',
              text: '审核',
              handleClick: this.approve,
              icon: <ImportWhite />,
              disabled: this.state.formData.docStatus !== 'B'
            },
          ]}
          position='top'
          onBack={this.onBack}
        />
        <ElCard key='base' id='base' title='基本信息'>
          <BaseForm
            formData={this.state.formData}
          />
        </ElCard>
        <ElCard key='order' id='order' title='盘点单明细'>
          <DetailTable
            dataSource={this.state.dataSource}
          />
        </ElCard>
        {
          this.state.formData && this.state.formData.docStatus !== 'A' ? (
            <ElCard key='profit' id='profit' title='盘点单盈亏'>
              <ProfitInfoTable
                proDataSource={this.state.proDataSource}
              />
            </ElCard>
          ) : null
        }
        {
          this.state.formData && this.state.formData.docStatus !== 'A' ? (
            <ElCard key='serialNo' id='serialNo' title='盘点单车架号差异'>
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
              title='审核'
              visible={this.state.modalVisible}
              onCancel={this.handleCancel}
              footer={
                [
                  <Button key='cancel' onClick={this.handleCancel} type='primary'>取消</Button>,
                  <Button key='pass' onClick={this.handlePass} type='primary' loading={!!this.state.passLoading}>审核通过</Button>,
                  <Button key='refuse' onClick={this.handleRefuse} type='primary' danger loading={!!this.state.refuseLoading}>审核拒绝</Button>,
                ]
              }
              destroyOnClose
            >
              是否通过审核？
            </Modal>
          ) : null
        }

      </ElPage>
    );
  }
}

export default InventoryCheckView;