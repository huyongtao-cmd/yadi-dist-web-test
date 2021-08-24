import React from 'react';
import { Modal } from 'antd';
import Modeler from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import './bpmnView.less';
interface Props {
  processDefinitionId: string;
  request: Function;
}
class BpmnViewer extends React.Component<Props, {}> {
  componentDidMount() {
    this.initModeler();
  }
  initModeler = async () => {
    const { processDefinitionId, request } = this.props;
    const res = await request(processDefinitionId);
    if (res.success) {
      const modeler = new Modeler({
        container: document.getElementById('bpmnViewerContainer')
      });

      // 导入xml
      modeler.importXML(res.data.xml, (err) => {
        if (err) {
          Modal.error({
            title: '加载xml错误',
            content: err
          });
        } else {
          const canvas = modeler.get('canvas');
          canvas.zoom('fit-viewport');
          // 划线
          res.data.actInsts?.forEach((actInst) => {
            canvas.addMarker(actInst.actDefKey, actInst.className);
          });
        }
      });
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <div
          id='bpmnViewerContainer'
          style={{ width: '100%', height: '40vh' }}
        />
        {/* 绿色箭头 */}
        <svg width='0' height='0'>
          <marker
            id='green-arrow'
            viewBox='0 0 20 20'
            refX='11'
            refY='10'
            markerWidth='10'
            markerHeight='10'
            orient='auto'
          >
            <path
              d='M 1 5 L 11 10 L 1 15 Z'
              style={{
                fill: 'green',
                strokeWidth: '1px',
                strokeLinecap: 'round',
                strokeDasharray: '10000px, 1px',
                stroke: 'green'
              }}
            />
          </marker>
        </svg>
      </>
    );
  }
}
export default BpmnViewer;
