# ElForm 使用文档

注意: ElForm是基于antd form的再次封装,通常情况下,antd的原本的属性和方法都可以使用

## 1.formPorps

| 属性  | 类型              | 解释         |
| ----- | ----------------- | ------------ |
| items | Array<ElFormItem> | formitem数组 |

### 1.ElFormItem

此处继承了antd Form 的 FormItemPorps

| 属性       | 类型    | 解释                        |
| ---------- | ------- | --------------------------- |
| title      | string  | formItem的label文本         |
| dataIndex  | string  | formItem的对应字段          |
| hidden     | boolean | formItem是否隐藏            |
| span       | number  | formItem所占栅格数,总数为24 |
| className  | string  | formItem的class             |
| formOption | 见下    | formItem属性                |



### 2.formOption

### 

| 属性    | 类型                                            | 解释                                             |
| ------- | ----------------------------------------------- | ------------------------------------------------ |
| type    | '$input', '$udc', '$switch','$select'...(todo), | Item 类型,具体暂时需要查看组件目录下的utils文件  |
| render  | () =>JSX.ELEMENT                                | 渲染返回的表单Item,如果存在,则其他属性就不再起效 |
| options | 对应type的props属性(todo)                       |                                                  |
|         | 对应type的events事件(todo)                      |                                                  |

## 