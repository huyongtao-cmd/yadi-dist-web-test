import { Radio, Tag, Select, Badge } from 'antd';
import React from 'react';

/**
 * 动作类型
 */
export const ACTION_TYPE = {
  SUBMIT: <Tag color='#2db7f5'>提交</Tag>,
  AGREE: <Tag color='#87d068'>通过</Tag>,
  AUTO_AGREE: <Tag color='#87d068'>连续通过</Tag>,
  REJECTED: <Tag color='#FF7F50'>驳回</Tag>,
  REVOKE: <Tag color='#808080'>撤回</Tag>,
  ADD_SIGN_BEFORE: <Tag color='#00CED1'>前加签</Tag>,
  ADD_SIGN_AFTER: <Tag color='#00CED1'>后加签</Tag>,
  DELEGATION: <Tag color='#00CED1'>委派</Tag>,
  TRANSFER: <Tag color='#00CED1'>转办</Tag>,
  INVALID: <Tag color='#f50'>作废</Tag>,
  CHANGE_TASK_ASSIGNESS: <Tag color='#96CDCD'>修改任务负责人</Tag>,
  ADMIN_AGREE: <Tag color='#87d068'>管理员往后推一个节点</Tag>,
  INTERRUPT: <Tag color='#f50'>中断流程</Tag>,
  TODO: <Tag color='#FFA500'>待处理</Tag>
};

/**
 * 接口
 */
export const API = {
  // 流程图编辑相关
  PROC_DEF_XML: '/workflow/api/procDef/xml', // 流程图XML(保存/读取)
  TASK_NODE_CONFIG: '/workflow/api/taskNodeConfig', // 任务节点配置
  TASK_LEADERS_TYPE: '/workflow/api/taskLeadersTypes', // 任务负责人配置类型

  //读取节点配置
  TASK_NODE_CONFIG_BY_PROC_INST_ID:
    '/workflow/api/taskNodeConfig/queryByProcInstId', // 任务节点配置

  // 流程图显示
  PROC_INST_BPMN: '/workflow/api/procInstBpmn/{processInstanceId}', // 流程图(流程实例)
  PROC_DEF_BPMN: '/workflow/api/procDefBpmn/{processDefinitionId}', // 流程图(流程定义)
  COMMENTS: '/workflow/api/comments', // 审批历史

  // 动作相关
  COMPLETE: '/workflow/api/complete', // "通过"动作
  WITHDRAW: '/workflow/api/withdraw', // "撤回"动作
  BACK_NODES: '/workflow/api/backNodes', //  查询可驳回节点
  BACK: '/workflow/api/back', // "驳回"动作
  // ADD_SIGN: '/workflow/api/addSign', // "加签"动作
  DELEGATION: '/workflow/api/delegation', // "委派"动作
  TRANSFER: '/workflow/api/transfer', // "转办"动作
  INVALID: '/workflow/api/invalid', // "作废"动作

  // 流程维护
  CHANGE_TASK_ASSIGNESS: '/workflow/api/changeTaskAssigness', // 修改流程负责人
  INTERRUPT_PROCESS_INSTANCE: '/workflow/api/interruptProcessInstance', //中断流程

  //我的流程
  MY_TODO_TASK: '/workflow/api/myTodoTask', //我的待办任务
  MY_COMPLETED_TASK: '/workflow/api/myCompletedTask', //我的完成任务
  MY_CREATE_PROCESS: '/workflow/api/myCreateProcess', //我的创建流程

  //根据流程实例ID读取当前登录人的正在处理的任务定义KEY,没有返回空数组(参数:procInstId:流程实例ID)
  CURRENT_TASK_KEYS: '/workflow/api/currentTaskKeys',

  //流程角色
  ROLE: '/workflow/api/role'
};

/**
 * 流程类别状态
 */
export const PROC_CATEGORY_STATUS = [
  { label: '全部', value: '' },
  { label: '启用', value: 'Y' },
  { label: '停用', value: 'N' }
];

/**
 * 流程定义状态
 */
export const PROC_DEF_STATUS = [
  { label: '全部', value: '' },
  { label: '草稿', value: 'DRAFT' },
  { label: '运行中', value: 'RUNNING' },
  { label: '运行修改中', value: 'EDIT' }
];

/**
 * 流程定义历史状态
 */
export const PROC_DEF_HISTORY_STATUS = {
  true: (
    <span>
      <Badge status='success' />
      运行中
    </span>
  ),
  false: (
    <span>
      <Badge status='default' />
      停用
    </span>
  )
};

/**
 * 挂起状态
 */
export const SUSPENDED_STATUS = {
  true: <Tag color='#f50'>是</Tag>,
  false: <Tag color='#87d068'>否</Tag>
};

/**
 * 流程实例状态
 */
export const PROC_INST_STATUS = [
  { label: '全部', value: '' },
  { label: '未提交', value: 'NOTSUBMIT' },
  { label: '审批中', value: 'APPROVING' },
  { label: '审批通过', value: 'APPROVED' },
  { label: '审批拒绝', value: 'REJECTED' },
  { label: '作废', value: 'INVALID' },
  { label: '中断执行', value: 'INTERRUPT' }
];
export const PROC_INST_STATUS_EUMN = {
  NOTSUBMIT: (
    <span>
      <Badge status='default' />
      未提交
    </span>
  ),
  APPROVING: (
    <span>
      <Badge status='processing' />
      审批中
    </span>
  ),
  APPROVED: (
    <span>
      <Badge status='success' />
      审批通过
    </span>
  ),
  REJECTED: (
    <span>
      <Badge status='error' />
      审批拒绝
    </span>
  ),
  INVALID: (
    <span>
      <Badge status='error' />
      作废
    </span>
  ),
  INTERRUPT: (
    <span>
      <Badge status='error' />
      中断执行
    </span>
  )
};

export const PROC_INST_STATUS_SELECT = () => {
  return (
    <Select defaultValue=''>
      <Select.Option value=''>全部</Select.Option>
      <Select.Option value='NOTSUBMIT'>未提交</Select.Option>
      <Select.Option value='APPROVING'>审批中</Select.Option>
      <Select.Option value='APPROVED'>审批通过</Select.Option>
      <Select.Option value='REJECTED'>审批拒绝</Select.Option>
      <Select.Option value='INVALID'>作废</Select.Option>
      <Select.Option value='INTERRUPT'>中断执行</Select.Option>
    </Select>
  );
};

/**
 * 流程状态
 */
export const PROC_STATUS = {
  NOTSUBMIT: 'NOTSUBMIT', //未提交             使用<Action>组件
  APPROVING: 'APPROVING', //审批中             使用<Action>组件
  APPROVED: 'APPROVED', //审批通过            显示"审批查看"按钮+其他业务按钮
  REJECTED: 'REJECTED', //审批拒绝              使用<Action>组件
  INVALID: 'INVALID', //作废                  显示"审批查看"按钮 或 其他业务按钮
  INTERRUPT: 'INTERRUPT' //中断流程           相当于没有起过工作流
};

/**
 * 第一个任务节点名称(固定)
 */
export const FIRST_TASK_DEF_KEY = 'createrSubmit';

/**
 * 动作名称
 */
export const ACTION_NAME = {
  COMPLETE: 'COMPLETE', //同意(第一个节点叫做:'提交审批')
  WITHDRAW: 'WITHDRAW', //撤回
  BACK: 'BACK', //驳回
  // ADD_SIGN_BEFORE: 'ADD_SIGN_BEFORE', //前加签
  // ADD_SIGN_AFTER: 'ADD_SIGN_AFTER', //后加签
  DELEGATION: 'DELEGATION', //委派
  TRANSFER: 'TRANSFER', //转办
  INVALID: 'INVALID' //作废
};
