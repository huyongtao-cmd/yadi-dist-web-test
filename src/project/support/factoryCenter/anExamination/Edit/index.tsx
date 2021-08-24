import React from 'react';
import {
  ElNotification,
  ElRowContainer,
  ElPage,
  ElCard
} from '@/components/el';
import BaseForm from './BaseForm';
import DetailTable from './DetailTable';
import { FormInstance } from 'antd/lib/form';
import MultiTabMobx from '@/store/multiTab';
import store from '@/store';
import * as service from '../service';
import { omit } from 'ramda';
import { SubmitWhite } from '@/components/el/ElIcon';
import { submit } from './service';

interface Props {
  formRef: any;
  onRef: any;
  editTableRef: any;
  formData: Object;
  loading: any;
  type: String;
  getInvDisabled: boolean;
  resetCheckDisabled: boolean;
  handleButtonDisabled: Function;
  handleResetDetails: Function;
  router?: Record<string, any>;
}

interface State {
  formRef: FormInstance;
  editTableRef: any;
  formData: { [key: string]: any };
  tableData: Array<any>;
  pageLoading: boolean;
  type: any;
}

class Edit extends React.Component<any, State> {
  multiTabStore: any;
  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.state = {
      formRef: null,
      editTableRef: null,
      formData: {},
      tableData: [],
      pageLoading: false,
      type: this.props.match.params?.type
    };
  }

  componentDidMount() {
    const rowType = location.search.slice(1).split('=')[1];

    if (this.props.match.params.id) {
      // 自检还是复检
      this.setState({ type: this.props.match.params.type });
      this.getDetail({
        inspectionId: this.props.match.params.id,
        testType: this.props.match.params.type
      });
    }
  }

  getDetail = async (param) => {
    this.setState({
      pageLoading: true
    });
    const res = await service.getDetailsById(param);
    this.setState({
      pageLoading: false
    });
    if (res.success) {
      // console.log(res, 'res');
      const { selfStoreScoreDVOList = [] } = res.data;
      const dataSource = selfStoreScoreDVOList.map((item, index) => {
        return {
          ...item,
          parentType: res.data.testType,
          sortNo: index + 1
        };
      });

      this.setState({
        formData: {
          ...omit(['selfStoreScoreDVOList'], res.data)
        },

        tableData: dataSource
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg || res.data || '操作失败！'
      });
    }
  };
  formRef = (ref) => {
    this.setState({
      formRef: ref
    });
  };

  tableRef = (ref) => {
    this.setState({
      editTableRef: ref
    });
  };

  //提交
  handleSubmit = async () => {
    // dataArr为所有提交数据，和formData一起提交
    const dataArr = this.state.tableData;

    // totalScore为合计总分，合计总分进行小数点保留1位处理
    let totalScore: any = dataArr.reduce((sum, next) => {
      return (sum += Number(next.score) || 0);
    }, 0);

    // console.log(totalScore, '合计金额');
    totalScore = totalScore.toFixed(1);
    const { retestPerson, selfTestPerson, ...params } = this.state.formData;

    const sendData: Record<string, any> = {
      ...params,
      testType: this.state.type,
      selfStoreScoreDVOList: dataArr
    };
    const username = store.principal['username'];

    // 判断自检或者复检
    let rowType: string = this.state.formData.testType;
    console.log(rowType, 'rowTyperowTyperowType');
    sendData[rowType == 'B' ? 'retestPerson' : 'selfTestPerson'] = username;
    sendData[this.state.type == 'B' ? 'selfTestScore' : 'retestScore'] =
      totalScore;

    // 提交给后台所要的查询信息以及列表明细
    this.setState({
      pageLoading: true
    });
    await submit(sendData)
      .then((res) => {
        if (res.success) {
          ElNotification({
            type: 'success',
            message: res.msg || res.data || '操作成功！'
          });
          this.multiTabStore.closeCurrentToPath(
            `/factoryCenter/anExamination/list`
          );
        } else {
          ElNotification({
            type: 'success',
            message: res.msg || res.data || '操作失败！'
          });
        }
      })
      .finally(() => {
        this.setState({
          pageLoading: false
        });
      });
  };

  //返回
  onBack = () => {
    this.props.push('/factoryCenter/anExamination/list');
  };

  // 填写的分数放入对应的scroe字段里传给后台
  rowChange = (row: object, val: string) => {
    this.state.tableData.some((item) => {
      if (item === row) {
        item.score = +val;
        return true;
      }
    });
  };
  disabledSubmitBtn() {
    let flag = true;
    if (this.state.type == 'B') {
      flag = this.state.formData.testType === 'C';
    } else if (this.state.type == 'C') {
      flag = this.state.formData.testType === 'A';
    }
    return flag;
  }
  render() {
    return (
      <ElPage spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={[
            {
              text: '提交',
              key: 'submit',
              icon: <SubmitWhite />,
              disabled: this.disabledSubmitBtn(),
              handleClick: this.handleSubmit
            }
          ]}
          onBack={this.onBack}
          position='top'
        />
        <ElCard title='基本信息'>
          <BaseForm
            formRef={this.state.formRef}
            onRef={this.formRef}
            editTableRef={this.state.editTableRef}
            formData={this.state.formData}
            type={this.state.type}
          />
        </ElCard>
        <ElCard title='自评信息'>
          <DetailTable
            editTableRef={this.state.editTableRef}
            change={this.rowChange}
            onRef={this.tableRef}
            type={this.state.type}
            dataSource={this.state.tableData}
          />
        </ElCard>
      </ElPage>
    );
  }
}

export default Edit;
