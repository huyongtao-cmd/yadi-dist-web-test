# ElSearchTable 使用文档

注意: ElSearchTable 是基于 antd table 的再次封装,通常情况下,antd 的原本的属性和方法都可以使用

## 1.tableProps

| 属性               | 类型                                                                         | 解释                                                                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rowKey             | string                                                                       | 不传入的情况下默认为 id,表格行的唯一标识                                                                                                                                                                       |
| rowSelectionConfig | {type：‘radio’ \| ‘checkbox’，fixed: boolean， onChange，disabledRowIds: []} | 不传入情况下不会出现表格选中列,radio 为单选,checkbox 为多选,fixed 为 true 时,选中列会固定在左侧，同时 onChange 事件会触发,当传入 disabledRowIds 时,如果 record 的 rowkey 和表格中某一项相等,则禁用该行的选择器 |
| defaultSearchData  | {}                                                                           | 表格默认的查询条件,传入后会设置进搜索表单                                                                                                                                                                      |
| dataSource         | Array<object>                                                                | 表格的数据,当传入 tableProxy 时,此项不会起效                                                                                                                                                                   |
| tableProxy         | object 见下                                                                  | 数据代理                                                                                                                                                                                                       |
| actionButtons      | Array<object>见下                                                            | 事件按钮列表                                                                                                                                                                                                   |
| pageSize           | number                                                                       | 每页表格显示的行数                                                                                                                                                                                             |
| columns            | Array<object>见下                                                            | 表格列配置 目前与原文档一致                                                                                                                                                                                    |
| searchFormProps    | {items: Array<searchFormItemProps>}见 ElForm 使用文档                        | 表格查询表单配置                                                                                                                                                                                               |
| descriptions       | Function => JSX.ELEMENT                                                      | 返回表格事件按钮下方任意渲染的元素                                                                                                                                                                             |
| mode               | {proxy: boolean, search: boolean, action: boolean, pagination: boolean}      | 精简模式,是否隐藏搜索表格的某一块元素                                                                                                                                                                          |
| onRef              | Function                                                                     | (ref) => {}，获取表格实例的方法                                                                                                                                                                                |
| onTableRowClick    | Function                                                                     | 表格点击事件                                                                                                                                                                                                   |
| tabs               | ElTabProps                                                                   | 表格的 tabs 配置                                                                                                                                                                                               |

### 1.tableProxy

| 属性            | 类型                                             | 解释                                                       |
| :-------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| request         | () => Promise                                    | 返回后端请求                                               |
| errCallBack     | Function                                         | 请求失败的回调                                             |
| successCallBack | Function(tableRef)                               | 请求成功的回调                                             |
| props           | {result: string, total: string, success: string} | 在请求返回的 response 里面请求数据,数据总量,是否成功的键名 |

### 2.actionButtons

| text         | string                 | 按钮文字     |
| ------------ | ---------------------- | ------------ |
| disabled     | boolean                | 是否禁用     |
| 属性         | 类型                   | 解释         |
| hidden       | boolean                | 是否隐藏     |
| key          | string                 | 唯一标识     |
| handleClick  | Function(selectedData) | 点击事件     |
| icon         | JSX.ELEMENT            | 按钮图标     |
| overLay      | Array<actionButtons>   | 下拉按钮组   |
| minSelection | number                 | 最小选中数   |
| maxSelection | number                 | 最大选中数   |
| needConfirm  | boolean                | 是否需要确认 |
| confirmText  | string                 | 确认框文字   |

###
