import React from 'react';
import { Alert, Result, Input } from 'antd';
import { ElCard, ElForm } from '@/components/el';
import { FIRST_TASK_DEF_KEY } from '../constance';
import { ElFormProps } from '@/components/el/ElForm';
import {
  getTaskNodeConfigList,
  getProcessUser,
  getProcessRoles,
  getOrgRoles,
  getPosts,
  getTaskNodeConfig,
  saveTaskNodeConfig
} from './service';
interface State {
  modalVisible: boolean;
  bpmnModelerRef: any;
  taskNodeConfig: Array<any>;
  tempTaskNodeConfig: string;
  formData: object;
  expression: string;
}
interface Props {
  onRef?: Function;
  procDefKey?: string;
  rowData?: any;
  element?: any;
  updateCondition?: Function;
  updateProperties?: Function;
}
const propertiesPanelFormProps = ({
  taskNodeConfig,
  setTempTaskNodeConfig,
  tempTaskNodeConfig,
  saveTaskNodeConfig
}): ElFormProps => {
  let actionItem = [];
  switch (tempTaskNodeConfig) {
    case 'DYNAMIC':
      actionItem = [
        {
          title: '自定义参数',
          span: 24,
          name: 'customParams',
          formOption: {
            type: '$input',
            props: {
              placeholder: '自定义参数'
            }
          }
        }
      ];
      break;
    case 'FIXED_USERS':
      actionItem = [
        {
          title: '选择处理人',
          span: 24,
          name: 'assigneeUserIds',
          formOption: {
            type: '$select',
            props: {
              request: getProcessUser,
              placeholder: '选择处理人',
              multiple: true
            },
            events: {
              onSelectChange: (value) => {
                saveTaskNodeConfig(value, 'assigneeUserIds');
              }
            }
          }
        }
      ];
      break;
    case 'FIXED_ROLES':
      actionItem = [
        {
          title: '选择流程角色',
          span: 24,
          name: 'assigneeRoleIds',
          formOption: {
            type: '$select',
            props: {
              request: getProcessRoles,
              placeholder: '选择流程角色',
              multiple: true
            },
            events: {
              onSelectChange: (value) => {
                saveTaskNodeConfig(value, 'assigneeRoleIds');
              }
            }
          }
        }
      ];
      break;
    case 'FIXED_ORG_ROLES':
      actionItem = [
        {
          title: '选择组织角色',
          span: 24,
          name: 'assigneeOrgRoleIds',
          formOption: {
            type: '$select',
            props: {
              request: getOrgRoles,
              placeholder: '选择组织角色',
              multiple: true
            },
            events: {
              onSelectChange: (value) => {
                saveTaskNodeConfig(value, 'assigneeOrgRoleIds');
              }
            }
          }
        }
      ];
      break;
    case 'FIXED_POST':
      actionItem = [
        {
          title: '选择岗位',
          span: 24,
          name: 'assigneePostIds',
          formOption: {
            type: '$select',
            props: {
              request: getPosts,
              placeholder: '选择岗位',
              multiple: true
            },
            events: {
              onSelectChange: (value) => {
                saveTaskNodeConfig(value, 'assigneePostIds');
              }
            }
          }
        }
      ];
      break;
  }
  return {
    items: [
      {
        title: '处理人类型',
        span: 24,
        name: 'assigneeType',
        formOption: {
          type: '$select',
          props: {
            options: taskNodeConfig
          },
          events: {
            onSelectChange: (value) => {
              setTempTaskNodeConfig(value);
            }
          }
        }
      },
      ...actionItem,
      {
        title: '支持该节点撤回',
        span: 24,
        name: 'supportWithdraw',
        formOption: {
          type: '$switch'
        }
      },
      {
        title: '支持该节点驳回',
        span: 24,
        name: 'supportRejectedFrom',
        formOption: {
          type: '$switch',
          events: {
            onSwitchChange: (value) => {
              saveTaskNodeConfig(value, 'supportRejectedFrom');
            }
          }
        }
      },
      {
        title: '支持驳回到该节点',
        span: 24,
        name: 'supportRejectedTo',
        formOption: {
          type: '$switch',
          events: {
            onSwitchChange: (value) => {
              saveTaskNodeConfig(value, 'supportRejectedTo');
            }
          }
        }
      },
      {
        title: '支持该节点委派',
        span: 24,
        name: 'supportDelegation',
        formOption: {
          type: '$switch',
          events: {
            onSwitchChange: (value) => {
              saveTaskNodeConfig(value, 'supportDelegation');
            }
          }
        }
      },
      {
        title: '支持该节点后转办',
        span: 24,
        name: 'supportTransfer',
        formOption: {
          type: '$switch',
          events: {
            onSwitchChange: (value) => {
              saveTaskNodeConfig(value, 'supportTransfer');
            }
          }
        }
      },
      {
        title: '支持该节点连续审批',
        span: 24,
        name: 'supportContinuousComplete',
        formOption: {
          type: '$switch',
          events: {
            onSwitchChange: (value) => {
              saveTaskNodeConfig(value, 'supportContinuousComplete');
            }
          }
        }
      }
    ]
  };
};
class PropertiesPanel extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      bpmnModelerRef: null,
      taskNodeConfig: [],
      tempTaskNodeConfig: '',
      formData: {},
      expression: ''
    };
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.element) === JSON.stringify(this.props.element)
    ) {
      return false;
    }
    return true;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.getTaskNodeConfig(this.props.element);
    }
  }
  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef({});
    }
    this.getTaskNodeConfigList();
  }
  setTempTaskNodeConfig = (value) => {
    this.setState({
      tempTaskNodeConfig: value
    });
  };
  getTaskNodeConfig = async (element) => {
    if (element && element.type) {
      if (element.type == 'bpmn:UserTask' && element.id) {
        const { rowData } = this.props;
        const res = await getTaskNodeConfig(rowData.procDefKey, element.id);
        if (res.success) {
          this.setState({
            formData: res.data,
            tempTaskNodeConfig: res.data.assigneeType
          });
        }
      } else if (element.type === 'bpmn:SequenceFlow') {
        this.setState({
          expression: element.businessObject.conditionExpression?.body
        });
      }
    }
    // // const
  };
  saveTaskNodeConfig = async (value, type) => {
    const data = {
      ...this.state.formData,
      [type]: value,
      assigneeType: this.state.tempTaskNodeConfig,
      procDefKey: this.props.rowData.procDefKey
    };
    const res = await saveTaskNodeConfig(data);
    if (res.success) {
      this.setState({
        formData: {
          ...data,
          id: res.data
        }
      });
    }
  };
  getTaskNodeConfigList = async () => {
    const res = await getTaskNodeConfigList();
    if (res.success) {
      this.setState({
        taskNodeConfig: res.data
      });
    }
  };
  render() {
    const { element } = this.props;
    if (!element) {
      return null;
    } else {
      const { id, type } = element;
      return (
        <ElCard title={1} style={{ height: '100%', width: 420 }}>
          {id == FIRST_TASK_DEF_KEY ? (
            <Result title='第一个节点无需配置' />
          ) : (
            <>
              {/* 连接线 */}
              {type == 'bpmn:SequenceFlow' ? (
                <>
                  <Alert
                    message='修改下面参数需要保存流程图,并且部署流程'
                    type='warning'
                    style={{ marginBottom: 20 }}
                    showIcon
                  />
                  <Input
                    defaultValue={this.state.expression}
                    onChange={({ target: { value } }) => {
                      // 修改条件
                      this.props.updateCondition(element, value);
                    }}
                  />
                  <Alert
                    message='表达式示例:'
                    description={
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            "${days<=1}<br/>${days>1 && days<5}<br/>${!sex}<br/>${gender == 'Male'}<br/> <strong>注意:当流程有分支时,请确保有流程变量供分支判断</br>"
                        }}
                      />
                    }
                    type='success'
                  />
                </>
              ) : null}
              {/* 任务节点 */}
              {type == 'bpmn:Task' ? (
                <Alert message='请选择具体的Task类型,如UserTask' type='error' />
              ) : null}
              {/* 用户任务节点 */}
              {type == 'bpmn:UserTask' ? (
                <>
                  <Alert
                    message='修改下面参数无需保存流程图,无需部署流程'
                    type='info'
                    style={{ marginBottom: 20 }}
                    showIcon
                  />
                  <ElForm
                    data={this.state.formData}
                    formProps={propertiesPanelFormProps({
                      taskNodeConfig: this.state.taskNodeConfig,
                      setTempTaskNodeConfig: this.setTempTaskNodeConfig,
                      tempTaskNodeConfig: this.state.tempTaskNodeConfig,
                      saveTaskNodeConfig: this.saveTaskNodeConfig
                    })}
                  />
                </>
              ) : null}
            </>
          )}
        </ElCard>
      );
    }
  }
}
export default PropertiesPanel;
