import React, { lazy } from 'react';
import { Spin, Modal, Input } from 'antd';
import { ElForm, ElNotification, ElRowContainer, ElCard, ElTab } from '@/components/el'
import {
  SubmitBlue,
  CancelRed,
  SubmitWhite,
  CancelWhite,
  ExportWhite,
} from '@/components/el/ElIcon';
import { commonExport } from '@/utils/utils'; // 导出
import { ElTabPaneProps } from '@/components/el/ElTab';
import { approved, rejected, pending, searchBasic } from '../service';

const BasicForm = lazy(() => import('./components/BasicForm'));
// const Merchant = lazy(() => import('./components/Merchant'));
const SaleTable = lazy(() => import('./components/SaleTable'));
// const KocAllot = lazy(() => import('./components/KocAllot'));

interface Props {
  [x: string]: any;
  push: any;
  match: any;
  selectId: string | number;
}

interface State {
  basicRef: any;
  basicFormData: { [key: string]: any };
  id: string | number;
  loading: boolean;
  state: string;
  areaValue: string;
}

class SaleDetail extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      basicRef: null,
      basicFormData: {},
      id: '',//路由拿到的id
      loading: false,//页面级loading
      state: '',//单据状态
      areaValue: '',
    }
  }

  async componentDidMount() {
    this.setState({
      id: this.props?.match?.params?.id,
    })
    this.getFormData()
  }
  // 获取主表数据
  async getFormData() {
    this.setState({ loading: true })
    const res = await searchBasic({ id: this.props?.match?.params?.id })
    if (res && res.success) {
      this.setState({
        basicFormData: res.data,
        loading: false,
        state: res.data.state
      })
    } else {
      this.setState({
        loading: false
      })
      ElNotification({
        type: 'error',
        message: res.msg || '查询详情失败'
      })
    }
  }
  /**
   * 审核通过
   */
  handleApprovePass = async () => {
    const { id } = this.state
    const res = await approved([id])
    if (res && res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      })
      // const {push} = this.props
      // push('/saleSettlement/statement')
      this.getFormData()
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      })
    }
  }


  // 点击审核拒绝
  handleApproveRefused = async () => {
    const { TextArea } = Input
    Modal.confirm({
      width: 500,
      centered: true,
      title: '审批拒绝理由',
      onOk: (e) => this.refused(e),
      onCancel: () => { return },
      content: (
        <TextArea
          onChange={this.areaChange}
          autoSize={{ minRows: 8, maxRows: 10 }}
          // value={areaValue}
          placeholder='请输入理由（一百个字以内）'
        />
      ),
      cancelText: '取消',
      okText: '确认'
    });
  }
  // 审批拒绝确认
  async refused(e) {
    if (!this.state.areaValue) {
      ElNotification({
        type: 'warning',
        message: '请填写拒绝理由'
      })
      e.preventDefault()
    }else if(this.state.areaValue.length>100){
      ElNotification({
        type: 'warning',
        message: '拒绝理由超过一百个字'
      })
      e.preventDefault()
    }else{
      const params = { ids: [this.state.id], reason: this.state.areaValue }
      const res = await rejected(params)
      if (res && res.success) {
        ElNotification({
          type: 'success',
          message: res.msg || '操作成功'
        })
        // const {push} = this.props
        // push('/saleSettlement/statement')
        this.getFormData()
      } else {
        ElNotification({
          type: 'error',
          message: res.msg || '操作失败'
        })
      }
    }
  }
  areaChange = ({ target: { value } }) => {
    this.setState({ areaValue: value });
  };
  
  // 导出
  handleExport = async () => {
    const {id} = this.state
    commonExport({
      url: '/yst-fin/fin/salSettle/exportDtl',
      params:{salSettleId:id},
      fileName: '销售结算单审核查看'
    });
  }

  // 暂挂
  // handlePending = async () => {
  //   const { id } = this.state
  //   const res = await pending([id])
  //   if (res && res.success) {
  //     ElNotification({
  //       type: 'success',
  //       message: res.msg || '操作成功'
  //     })
  //     // const {push} = this.props
  //     // push('/saleSettlement/statement')
  //     this.getFormData()
  //   } else {
  //     ElNotification({
  //       type: 'error',
  //       message: res.msg || '操作失败'
  //     })
  //   }
  // }
  getButtons = (state) => [
    {
      key: 'approvePass',
      text: '审核通过',
      icon: <SubmitWhite />,
      location: 'left',
      disabled: (state === 'DRAFT' || state === 'PENDING') ? false : true,
      handleClick: this.handleApprovePass
    },
    {
      key: 'approveRefused',
      text: '审核拒绝',
      icon: <CancelWhite />,
      location: 'left',
      disabled: (state === 'DRAFT' || state === 'PENDING') ? false : true,
      handleClick: this.handleApproveRefused
    },
    {
      key: 'export',
      text: '导出',
      location: 'left',
      icon: <ExportWhite />,
      disabled: false,
      hidden: false,
      // minSelection: 1,
      handleClick: this.handleExport
    }
  ];

  //基本信息ref
  basicRef = (ref) => {
    this.setState({
      basicRef: ref
    });
  };

  /** tab 列表 */
  // setTabList = (): Array<ElTabPaneProps> => {
  //   return [
  //     {
  //       name: '商户分配',
  //       key: 'merchant',
  //       render: (record) => (
  //         <Spin spinning={false}>
  //           <Merchant numbers={this.props.match.params.numbers} />
  //         </Spin>
  //       )
  //     },
  //     {
  //       name: 'KOC分配',
  //       key: 'grid',
  //       render: (record) => {
  //         return (
  //           <Spin spinning={false}>
  //             <KocAllot numbers={this.props.match.params.numbers} />
  //           </Spin>
  //         );
  //       }
  //     },
  //   ];
  // };

  onBack = () => {
    const { push } = this.props
    push('/saleSettlement/statement')
  }
  
  render() {
    const { state,basicFormData } = this.state;
    const { id } = this.props.match.params;
    return (
      <Spin spinning={false}>
        <ElRowContainer
          blocks={this.getButtons(state)}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='销售结算单' >
          <BasicForm onRef={this.basicRef} formData={basicFormData} />
        </ElCard>
        <ElCard title='销售结算单明细'>
          <SaleTable selectId={id} num={basicFormData.salSettleNumber} />
        </ElCard>
        {/* <ElTab tabs={this.setTabList()} /> */}
      </Spin>)
  }
}

export default SaleDetail;