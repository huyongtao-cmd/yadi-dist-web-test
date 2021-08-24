// 单据关联图
import React from 'react';
import { Graph, Node } from '@antv/x6';
import dagre from 'dagre';
import './index.less';
interface Props {
  nodeList: Array<any>;
  edgeList: Array<any>;
}

interface State {
  graph: any;
  tempNodes: Array<any>;
  tempEdges: Array<any>;
  dir: String;
}

class FlowChart extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      tempNodes: [],
      tempEdges: [],
      dir: 'LR'
    };
    this.initNode();
    this.initRegisterEdge();
  }

  //自定义边
  initRegisterEdge = () => {
    Graph.registerEdge(
      'org-edge',
      {
        zIndex: -1,
        attrs: {
          line: {
            fill: 'none',
            strokeLinejoin: 'round',
            stroke: '#0099CC',
            strokeWidth: 2,
            sourceMarker: null,
            targetMarker: null
          }
        }
      },
      true
    );
  };

  //自定义节点
  initNode = () => {
    Graph.registerNode(
      'org-node',
      {
        width: 200,
        height: 88,
        strokeLinejoin: 'round',
        markup: [
          {
            tagName: 'rect',
            attrs: {
              class: 'card'
            }
          },
          {
            tagName: 'text',
            attrs: {
              class: 'title'
            }
          },
          {
            tagName: 'text',
            attrs: {
              class: 'docNum'
            }
          }
        ],
        attrs: {
          '.card': {
            rx: 10,
            ry: 10,
            refWidth: '100%',
            refHeight: '100%',
            fill: '#FFF',
            stroke: '#000',
            strokeWidth: 1,
            pointerEvents: 'visiblePainted',
            cursor: 'pointer',
            event: 'node:click'
          },
          '.title': {
            refX: 0.95,
            refY: 0.5,
            fontFamily: 'Courier New',
            fontSize: 20,
            textAnchor: 'end',
            textVerticalAnchor: 'middle'
          },
          '.docNum': {
            refX: 0.95,
            refY: 0.7,
            fontFamily: 'Arial',
            fontSize: 18,
            fontWeight: '600',
            textAnchor: 'end'
          }
        }
      },
      true
    );
  };

  componentDidMount() {
    this.createdGraph();
  }

  //添加自定义事件
  setup = (graph) => {
    const that = this;
    graph.on('node:click', ({ e, node }) => {
      this.clickNode(e, node);
    });
  };

  //节点点击事件
  clickNode = (e, node) => {
    e.stopPropagation();
    console.log('clickNode', e);
    console.log('clickNode', node);
  };

  // 创建画布
  createdGraph = () => {
    const graph = new Graph({
      container: document.getElementById('logisticsChart'),
      grid: true,
      scroller: false,
      snapline: true,
      interacting: false, //连线和点的交互
      connecting: {
        anchor: 'center'
      }
    });
    let tempNodes = this.createNode(graph);
    console.log('tempNodes', tempNodes);

    let tempEdges = this.createEdge(graph);

    console.log('tempEdges', tempEdges);

    graph.resetCells([...tempNodes, ...tempEdges]);
    this.layout(graph);
    graph.zoomTo(0.8);
    graph.centerContent();
    this.setup(graph);
    this.setState({
      graph,
      tempNodes,
      tempEdges
    });
  };

  //创建节点
  createNode = (graph) => {
    const { nodeList } = this.props;
    const tempNodes = nodeList.map((row) => {
      return graph.createNode({
        id: row.id,
        my_name: row.title,
        my_docNum: row.docNum,
        shape: 'org-node',
        attrs: {
          '.card': {
            fill: '#FFFFFF'
          },
          '.title': {
            fill: '#000',
            text: row.title
          },
          '.docNum': {
            fill: '#000',
            text: row.docNum
          }
        }
      });
    });
    return tempNodes;
  };

  //创建关系
  createEdge = (graph) => {
    const { edgeList } = this.props;
    let tempEdges = edgeList.map((row) => {
      return graph.createEdge({
        shape: 'org-edge',
        source: { cell: row.source },
        target: { cell: row.target },
        attrs: {
          line: {
            targetMarker: 'block'
          }
        }
      });
    });
    return tempEdges;
  };

  //布局
  layout = (graph) => {
    const { dir } = this.state;
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: dir, nodesep: 16, ranksep: 16 });
    g.setDefaultEdgeLabel(() => ({}));

    const width = 260;
    const height = 90;
    nodes.forEach((node) => {
      g.setNode(node.id, { width, height });
    });

    edges.forEach((edge) => {
      const source = edge.getSource();
      const target = edge.getTarget();
      g.setEdge(source.cell, target.cell);
    });

    dagre.layout(g);

    graph.freeze();

    g.nodes().forEach((id) => {
      const node = graph.getCell(id);
      if (node) {
        const pos = g.node(id);
        node.position(pos.x, pos.y);
      }
    });

    edges.forEach((edge) => {
      const source = edge.getSourceNode();
      const target = edge.getTargetNode();
      const sourceBBox = source.getBBox();
      const targetBBox = target.getBBox();

      console.log(sourceBBox, targetBBox);

      if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
        const gap =
          dir === 'LR'
            ? targetBBox.x - sourceBBox.x - sourceBBox.width
            : -sourceBBox.x + targetBBox.x + targetBBox.width;
        const fix = dir === 'LR' ? sourceBBox.width : 0;
        const x = sourceBBox.x + fix + gap / 2;
        edge.setVertices([
          { x, y: sourceBBox.center.y },
          { x, y: targetBBox.center.y }
        ]);
      } else if (
        (dir === 'TB' || dir === 'BT') &&
        sourceBBox.x !== targetBBox.x
      ) {
        const gap =
          dir === 'TB'
            ? targetBBox.y - sourceBBox.y - sourceBBox.height
            : -sourceBBox.y + targetBBox.y + targetBBox.height;
        const fix = dir === 'TB' ? sourceBBox.height : 0;
        const y = sourceBBox.y + fix + gap / 2;
        edge.setVertices([
          { x: sourceBBox.center.x, y },
          { x: targetBBox.center.x, y }
        ]);
      } else {
        edge.setVertices([]);
      }
    });

    graph.unfreeze();
  };

  render() {
    return <div id='logisticsChart' className='logisticsChart'></div>;
  }
}

export default FlowChart;
