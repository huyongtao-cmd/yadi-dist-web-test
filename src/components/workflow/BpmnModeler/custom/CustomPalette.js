export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  // 这个函数就是绘制palette的核心
  getPaletteEntries(element) {
    const { bpmnFactory, create, elementFactory, translate } = this;

    function createTask() {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:UserTask'); // 其实这个也可以不要
        const shape = elementFactory.createShape({
          type: 'bpmn:UserTask',
          businessObject
        });
        console.log(shape); // 只在拖动或者点击时触发
        create.start(event, shape);
      };
    }

    return {
      'create.user-task': {
        group: 'model',
        className: 'bpmn-icon-user-task',
        title: translate('创建一个用户任务节点'),
        action: {
          dragstart: createTask(),
          click: createTask()
        }
      }
    };
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];
