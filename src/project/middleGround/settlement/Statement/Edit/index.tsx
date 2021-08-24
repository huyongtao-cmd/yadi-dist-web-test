// 采购结算单审核、采购结算单明细查看
import React, { lazy } from 'react';
import { Spin } from 'antd';
import { ElForm, ElNotification, ElRowContainer, ElCard } from '@/components/el'
import {
  SubmitWhite,
  CancelWhite,
  ShelvesWhite
} from '@/components/el/ElIcon';
import { approved, rejected, pending, searchBasic, review } from '../service';
// import MultiTabMobx from '@/store/multiTab';
const BasicForm = lazy(() => import('./components/BasicForm'));
const InvoiceTable = lazy(() => import('./components/InvoiceTable'));
const PurcTable = lazy(() => import('./components/PurcTable'));
const PaymentTable = lazy(() => import('./components/PaymentTable'));

interface Props {
  [x: string]: any;
  history: any;
  match: any;
}

interface State {
  type: string | number;
  basicRef: any;
  basicFormData: { [key: string]: any };
  // selectId: any,
  loading: boolean,
  state: string,
}

class PurcStatement extends React.Component<Props, State> {
  // multiTabStore: any;

  constructor(props) {
    super(props);
    // this.multiTabStore = MultiTabMobx;
    this.state = {
      basicRef: null,
      basicFormData: {},
      type: this.props?.match?.params?.type,
      loading: false,//控制页面loading
      state: '',
    }
  }
  async componentDidMount() {
    this.setState({
      type: this.props?.match?.params?.type,
    })
    this.findDeatil(this.props?.match?.params?.type)
  }


  // 查询单据详情
  findDeatil = async (id) => {
    this.setState({
      loading: true
    })
    const res = await searchBasic({ id: id })
    console.log(res, '详情信息')
    if (res && res.success) {
      this.setState({
        // selectId: res.data.relationNumber,
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
 /* 处理请求后的操作
   * @param res 请求结果
   */
  handleRequestResult = (res) => {
    if (res && res.success) {
      ElNotification({
        type: 'success',
        message: res.msg || '操作成功'
      })
      this.findDeatil(this.state.type);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || '操作失败'
      })
    }
  }

  // 复核功能暂时隐藏
  // handleReviewPass= async () => {
  //   // if(this.state.state === 'APPROVED') {
  //     const res = await review([this.state.type])
  //     console.log(res)
  //     this.handleRequestResult(res);
  // }

  // 审核通过
  handleApprovePass = async () => {
    const res = await approved([this.state.type])
    this.handleRequestResult(res);
  }

  // 审核拒绝
  handleApproveRefused = async () => {
    const res = await rejected([this.state.type])
    this.handleRequestResult(res);
  }
  // 暂挂 暂时隐藏
  handlePending = async () => {
    const res = await pending([this.state.type])
    this.handleRequestResult(res);
  }

  getButtons = ({ type }) => {
    return (
      this.state.state === 'DRAFT' ? [
        // {
        //   key: 'reviewPass',
        //   text: '复核通过',
        //   icon: <SubmitWhite />,
        //   hidden: type === 'view',
        //   location: 'left',
        //   needConfirm: true,
        //   confirmText: '确认要复核此数据吗？',
        //   handleClick: this.handleReviewPass
        // },
        {
          key: 'approvePass',
          text: '审核通过',
          icon: <SubmitWhite />,
          hidden: type === 'view',
          location: 'left',
          needConfirm: true,
          confirmText: '确认要审核此数据吗？',
          handleClick: this.handleApprovePass
        },
        {
          key: 'approveRefused',
          text: '审核拒绝',
          icon: <CancelWhite />,
          hidden: type === 'view',
          location: 'left',
          needConfirm: true,
          confirmText: '确认要拒绝数据吗？',
          handleClick: this.handleApproveRefused
        },
        // {
        //   key: 'pending',
        //   text: '暂挂',
        //   icon: <ShelvesWhite />,
        //   hidden: type === 'view',
        //   location: 'left',
        //   needConfirm: true,
        //   confirmText: '确认要暂挂数据吗？',
        //   handleClick: this.handlePending
        // }
      ] : []
    )
  }
  //基本信息ref
  basicRef = (ref) => {
    this.setState({
      basicRef: ref
    });
  };
  onBack = () => {
    const { push } = this.props;
    push('/purcSettlement/statement')
    // this.multiTabStore.closeCurrentToPath('/purcSettlement/statement');

  }
  render() {
    const { type, basicFormData, loading, state } = this.state;

    return (
      <Spin spinning={loading}>
        <ElRowContainer
          blocks={this.getButtons({ type })}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息' >
          <BasicForm onRef={this.basicRef} formData={this.state.basicFormData} type={type} />
        </ElCard>
        <ElCard title='关联发票明细' >
          <InvoiceTable type={type} />
        </ElCard>
        <ElCard title='关联采购明细' >
          {/*selectId  */}
          <PurcTable type={type} />
        </ElCard>
        <ElCard title='付款核销明细' >
          <PaymentTable type={type} />
        </ElCard>
      </Spin>)
  }
}

export default PurcStatement;