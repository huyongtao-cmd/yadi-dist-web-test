// 处理form 统一属性配置
export function filledFormConfig(form) {
  form.items.forEach((a) => {
    if (a.span) {
      return;
    }
    a.span = 6;
  });
}

export function setFormDisabledByType(form, disabled) {
  form.items.forEach((a) => {
    if (!a.formOption) {
      a.formOption = {};
    }
    if (!a.formOption.props) {
      a.formOption.props = {};
    }
    if (a.formOption.props.disabled == null)
      a.formOption.props.disabled = disabled;
  });
}

// 处理表格列的统一属性配置
export function filledColumnsConfig(colums) {
  colums.forEach((a) => {
    if (a.align) {
      return;
    }
    a.align = 'center';
  });
}

// forceFieldName:强制使name = dataIndex
export function filledColumnsEditAbleConfig(columns, forceFieldName = false) {
  columns.forEach((a) => {
    if (!a.field) {
      return;
    }
    a.editable = true;
    // 若返回了一个string，则表示编辑类型，其他使用默认参数

    const val = a.field();
    if (typeof val == 'string') {
      a.field = (form) => {
        return {
          formOption: {
            type: val
          },
          name: a.dataIndex
        };
      };
    } else if (typeof val === 'object') {
      if (val.name != null && !forceFieldName) {
        return;
      } // 自定义了name,就不管了
      // 否则name == dataIndex
      val.name = a.dataIndex;
      a.field = (form) => {
        return val;
      };
    }
  });
}

// 根据列配置，获取初始化的行数据结构
export function getInitRowData(columns) {
  let data = {};
  columns.forEach((a) => {
    data[a.dataIndex] = null;
  });

  return data;
}

export function getDefaultEditFieldFunc(column) {
  return (form) => {
    return {
      formOption: {
        type: '$input'
      },
      name: column.dataIndex
    };
  };
}

export function getOptionsYN() {
  return [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ];
}
export function getCellRenderYN() {
  return (value) => (value == 1 ? '是' : '否');
}
