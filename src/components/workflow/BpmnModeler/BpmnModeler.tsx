import React from 'react';
import { Modal, message } from 'antd';
import Modeler from 'bpmn-js/lib/Modeler';
import { QuestionCircleOutlined } from '@ant-design/icons';

// 属性面板
import PropertiesPanel from './PropertiesPanel';
// 自定义调色板
import custom from './custom';

// 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

//import { request } from 'umi';
import { getProcessXml, saveProcessXml } from './service';

// 自定义样式
import './index.less';

interface State {
  element: any;
  bpmnModeler: any;
  oldXml: string;
}
interface Props {
  rowData: any;
  onRef?: Function;
}
export default class BpmnModeler extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      element: null,
      bpmnModeler: null,
      oldXml: ''
    };
  }
  // const containerRef = useRef(null);

  // const [bpmnModeler, setBpmnModeler] = useState(null);
  // const [element, setElement] = useState(null);

  // const [oldXml, setOldXml] = useState(null);

  // /**
  //  * 暴露给父组件调用
  //  */
  //   (ref, () => ({
  //   // 保存xml
  //   saveXml: (callBack) => {
  //     saveXml(callBack);
  //   }
  // }));
  componentDidMount() {
    const { onRef } = this.props;
    onRef &&
      onRef({
        saveXml: this.saveXml
      });
    this.initModeler();
  }

  /**
   * 初始化bpmnModeler
   */
  initModeler = () => {
    const modeler = new Modeler({
      container: document.getElementById('bpmnModelerContainer'),
      additionalModules: [
        // 自定义palette+ContextPad
        custom
      ]
    });
    modeler.on('import.done', (event) => {
      const { error, warnings } = event;
      if (error) {
        Modal.error({
          title: '加载xml错误',
          content: error
        });
      }
      modeler.get('canvas').zoom('fit-viewport');
    });
    const eventBus = modeler.get('eventBus');

    // 选择变化
    eventBus.on('selection.changed', (event) => {
      this.setState({
        element: event.newSelection[0]
      });
      // setElement(event.newSelection[0]);
    });
    this.setState(
      {
        bpmnModeler: modeler
      },
      () => {
        this.getProcessXml();
      }
    );
  };
  /**
   * 查询xml
   */
  getProcessXml = async () => {
    const { rowData } = this.props;
    const res = await getProcessXml(rowData.id);
    if (res.success) {
      let xml = res.data;
      if (!xml) {
        xml =
          "<?xml version='1.0' encoding='UTF-8'?>\n" +
          '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://flowable.org/test">\n' +
          '  <process id="PROCESS_ID" name="PROCESS_NAME" isExecutable="true">\n' +
          '    <startEvent id="startEvent1" flowable:initiator="initiator"/>\n' +
          '    <userTask id="createrSubmit" name="创建人提交" flowable:assignee="${initiator}" />\n' +
          '    <sequenceFlow id="sequenceFlow1" sourceRef="startEvent1" targetRef="createrSubmit"/>\n' +
          '  </process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_PROCESS_ID">\n' +
          '    <bpmndi:BPMNPlane bpmnElement="PROCESS_ID" id="BPMNPlane_PROCESS_ID">\n' +
          '      <bpmndi:BPMNShape bpmnElement="startEvent1" id="BPMNShape_startEvent1">\n' +
          '        <omgdc:Bounds height="30.0" width="30.0" x="100.0" y="163.0"/>\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape bpmnElement="createrSubmit" id="BPMNShape_createrSubmit">\n' +
          '        <omgdc:Bounds height="80.0" width="100.0" x="175.0" y="138.0"/>\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNEdge bpmnElement="sequenceFlow1" id="BPMNEdge_sequenceFlow1">\n' +
          '        <omgdi:waypoint x="129.9499984899576" y="178.0"/>\n' +
          '        <omgdi:waypoint x="174.9999999999917" y="178.0"/>\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</definitions>';

        xml = xml.replaceAll('PROCESS_ID', rowData.procDefKey);
        xml = xml.replaceAll('PROCESS_NAME', rowData.procDefName);
      }
      this.setState({
        oldXml: xml
      });
      this.state.bpmnModeler.importXML(xml);
    }
  };

  /**
   * 更新属性(给子组件使用)
   */
  updateProperties = (element, value) => {
    const { bpmnModeler } = this.state;
    bpmnModeler.get('modeling').updateProperties(element, value);
  };

  /**
   * 更新条件(给子组件使用)
   */
  updateCondition = (element, value) => {
    const { bpmnModeler } = this.state;
    const newCondition = bpmnModeler
      .get('moddle')
      .create('bpmn:FormalExpression', {
        body: value
      });
    this.updateProperties(element, {
      conditionExpression: newCondition
    });
  };
  saveProcessXml = async (data, callBack) => {
    const res = await saveProcessXml(data);
    if (res.success) {
      this.setState(
        {
          oldXml: data.xml
        },
        () => {
          // 提示
          message.success('流程图保存成功');
          // 回调
          callBack && callBack();
        }
      );
    }
  };
  /**
   * 保存xml
   */
  saveXml = async (callBack) => {
    const { oldXml, bpmnModeler } = this.state;
    const { rowData } = this.props;
    const { xml } = await bpmnModeler.saveXML({ format: true });
    // console.log('------------新的:', xml);

    if (xml == oldXml) {
      if (callBack) {
        // 回调
        callBack();
      } else {
        message.info('流程图未修改,无需保存');
      }
    } else {
      Modal.confirm({
        title: '是否要保存流程图?',
        icon: <QuestionCircleOutlined />,
        okText: '保存流程图',
        cancelText: '取消',
        onOk: async () => {
          this.saveProcessXml(
            {
              id: rowData.id,
              xml
            },
            callBack
          );
        },
        onCancel: () => {
          // 回调
          callBack && callBack();
        }
      });
    }
  };

  /**
   * 渲染
   */
  render() {
    return (
      <>
        <div style={{ height: '100%', width: '100%', display: 'flex' }}>
          {/* bpmn设计面板 */}
          <div style={{ height: '100%', flex: 1 }} id='bpmnModelerContainer' />
          {/* 属性面板 */}
          <PropertiesPanel
            rowData={this.props.rowData}
            element={this.state.element}
            updateCondition={this.updateCondition}
            updateProperties={this.updateProperties}
          />
        </div>
      </>
    );
  }
}
