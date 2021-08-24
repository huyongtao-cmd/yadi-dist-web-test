# ElPageHeader 使用文档

注意: ElPageHeader是基于antd PageHeader的再次封装,通常情况下,antd的原本的属性和方法都可以使用

## 1.Porps

| 属性   | 类型                   | 解释              |
| ------ | ---------------------- | ----------------- |
| title  | string                 | 组件最左侧的title |
| blocks | Array<ButtonProps>见下 | 最右侧按钮列表    |

### 1.ButtonProps

| 属性        | 类型                   | 解释     |
| ----------- | ---------------------- | -------- |
| text        | string                 | 按钮文字 |
| disabled    | boolean                | 是否禁用 |
| hidden      | boolean                | 是否隐藏 |
| key         | string                 | 唯一标识 |
| handleClick | Function(selectedData) | 点击事件 |

