# ElEditTable 使用文档

注意: ElEditTable 是基于 antd table 的再次封装,通常情况下,antd 的原本的属性和方法都可以使用

双击编辑,esc 退出编辑

## 1.tableProps

| 属性               | 类型                                                               | 解释                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rowKey             | string                                                             | 不传入的情况下默认为 id,表格行的唯一标识                                                                                                                                                                      |
| rowSelectionConfig | {type：‘radio’ \|\| ‘checkbox’，fixed: boolean,disabledRowIds: []} | 不传入情况下不会出现表格选中列,radio 为单选,checkbox 为多选,fixed 为 true 时,选中列会固定在左侧,同时 onChange 事件会触发,当传入 disabledRowIds 时,如果 record 的 rowkey 和表格中某一项相等,则禁用该行的选择器 |
| dataSource         | Array<object>                                                      | 表格的数据,当传入 tableProxy 时,此项不会起效                                                                                                                                                                  |
| disabledTable      | boolean                                                            | 是否禁用表格编辑功能                                                                                                                                                                                          |
| tableProxy         | object 见下                                                        | 数据代理                                                                                                                                                                                                      |
| actionButtons      | Array<object>见下                                                  | 事件按钮列表                                                                                                                                                                                                  |
| pageSize           | number                                                             | 每页表格显示的行数                                                                                                                                                                                            |
| columns            | Array<object>见下                                                  | 表格列配置                                                                                                                                                                                                    |
| descriptions       | () => JSX.ELEMENT                                                  | actionsButtons 下方的插槽,可以插入任意的 jsx                                                                                                                                                                  |
| onRef              | (ref) => {}                                                        | 第一个入参 ref 即可编辑表格暴露出来的方法                                                                                                                                                                     |
| editFocusName      | string                                                             | 当进入编辑状态时,会去找对应的编辑列并进行聚焦                                                                                                                                                                 |
| getNewDataExtra    | () => {return {}}                                                  | 返回的值会在可编辑表格新增一行的时候进行数据补充，如果配置为                                                                                                                                                  |
| dealDataToForm     | (record) => {return {}}                                            | 入参为即将进入编辑的行数据,返回值会作为编辑状态的行的数据                                                                                                                                                     |
| dealFormToData     | ({data, record, formRef}) => {return {}}                           | 入参为对象,data 是结构赋值的行数据和编辑状态的数据混合,record 是行数据,formRef 是 formInstance,返回的值会作为行数据进行保存                                                                                   |

### 1.tableProxy

| 属性            | 类型                                              | 解释                                                       |
| :-------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| request         | () => Promise                                     | 返回后端请求                                               |
| errCallBack     | Function                                          | 请求失败的回调                                             |
| successCallBack | Function(tableRef)                                | 请求成功的回调                                             |
| props           | {result: string, total: string, success: boolean} | 在请求返回的 response 里面请求数据,数据总量,是否成功的键名 |

### 2.actionButtons

| 属性         | 类型                   | 解释         |
| ------------ | ---------------------- | ------------ |
| text         | string                 | 按钮文字     |
| disabled     | boolean                | 是否禁用     |
| hidden       | boolean                | 是否隐藏     |
| key          | string                 | 唯一标识     |
| handleClick  | Function(selectedData) | 点击事件     |
| icon         | JSX.ELEMENT            | 按钮图标     |
| overLay      | Array<actionButtons>   | 下拉按钮组   |
| minSelection | number                 | 最小选中数   |
| maxSelection | number                 | 最大选中数   |
| needConfirm  | boolean                | 是否需要确认 |
| confirmText  | string                 | 确认框文字   |

### 3.columns

| 属性            | 类型                                                      | 解释                                                                                                                                               |
| --------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | string                                                    | 列 title                                                                                                                                           |
| width           | number                                                    | 列宽度                                                                                                                                             |
| dataIndex       | string                                                    | 列字段                                                                                                                                             |
| editable        | boolean                                                   | 是否可编辑                                                                                                                                         |
| field           | () => {return {}}                                         | 具体见下                                                                                                                                           |
| renderDataIndex | string                                                    | 在可编辑的 cell 不处于编辑状态时,覆盖原来的 dataIndex                                                                                              |
| cellRender      | (text, record, index) => JSX.ELEMENT                      | 表格在非编辑状态下的 render 方法                                                                                                                   |
| selectMapping   | ({changedValues,allValues,record,formRef}) => {return {}} | changedValues 当前改变的值,allValues 所有的 form 的值, record,当前编辑的行的表格的数据,formRef,formInstance， 返回的值会对当前编辑的 form 进行赋值 |

### 5.onRef 获取的方法

| 方法名                                                                            | 解释                                                                                                                                         |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| getActiveRow: ()=> obj                                                            | 获取当前编辑的行的数据                                                                                                                       |
| setActiveRow: (data) => void                                                      | 设置当前编辑的行的数据                                                                                                                       |
| getActiveRecord: () => obj                                                        | 获取当前编辑的行的表格的数据                                                                                                                 |
| clearActiveRow: () => void                                                        | 清空当前编辑的行的数据                                                                                                                       |
| quitEditState: () => void                                                         | 保存并退出编辑状态                                                                                                                           |
| getRows:() => dataSource                                                          | 获取 dataSource                                                                                                                              |
| addRow: (data) => void                                                            | 新增一行,data 会加入 dataSource                                                                                                              |
| addRows: (data: Array) => void                                                    | 新增多行                                                                                                                                     |
| reloadTableData: () =>                                                            | 重新获取表格数据                                                                                                                             |
| getRowByIndex:(index) => data                                                     | 返回 dataSource[index]的值                                                                                                                   |
| clearRows: () => void                                                             | 清空表格                                                                                                                                     |
| removeRowByKey:(key:any, type?: 'index'\| 'rowKey') => newDataSource              | 删除指定的 key 对应的 dataSource 中的数据,当 type 为 index 时,删除 dataSource[index]，当为 rowKey 时,删除 dataSource[rowKey=key]             |
| removeRowsByKeys: (keys: Array<any>, type?: 'index' \| 'rowKey') => newDataSource | 删除指定的 keys 数组中 key 对应的 dataSource 中的数据,当 type 为 index 时,删除 dataSource[index]，当为 rowKey 时,删除 dataSource[rowKey=key] |
| validateTableRows:() => Promise                                                   | 校验全表格                                                                                                                                   |
| getSelectionData: () => obj                                                       | 返回 selectionData 信息                                                                                                                      |
| setSelectionData:(data) => void                                                   | 设置 selectionData 信息                                                                                                                      |
| clearSelectionData: () => void                                                    | 清空 selectionData 信息                                                                                                                      |
| getFormRef: () => FormInstance                                                    | 获取 form 对象                                                                                                                               |
| setUpRow:(index: number) => void                                                  | 将 index 对应的 record 向上移                                                                                                                |
| setDownRow:(index: number) => void                                                | 将 index 对应的 reocrd 向下移                                                                                                                |
| swapRow:(index1: number, index2: number) => void                                  | 交换两个入参对应的 record 位置                                                                                                               |
| setLoading                                                                        | 设置表格的 loading 状态                                                                                                                      |
| setCurrentColumns                                                                 | 设置列配置                                                                                                                                   |
| getCurrentColumns                                                                 | 获取当前列配置                                                                                                                               |
| refreshCurrentColumns                                                             | 刷新表格列配置,会引起表格重载                                                                                                                |
| updateTableData: (data: object) => void                                           | 通过传入的 data,更新表格每一行数据，可以覆盖 dataSource 本身的数据                                                                           |
| updateRows:(data: object,rowKeyList:Array<string> ) => void                       | 通过传入的 data,更新所有 rowKey 在 rowKeyList 中存在的行，正常情况传入 selectedRowKeys 即可                                                  |
