import React, { PureComponent } from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';

/*
  * [ 2021/2/3 ]
  * column: 一行的 DescriptionItems 数量，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}
  * dataSource: 接口请求数据 | {}
  * columns: 组装展示数据 | {}
  * title: 描述列表的标题，显示在最顶部
  * layout: 描述布局  horizontal | vertical
  * size: 设置列表的大小。可以设置为 middle 、small, 或不填（只有设置 bordered={true} 生效）
  * labelStyle: 自定义label标签样式
  * contentStyle: 自定义label内容样式
  * span: 包含列的数量
  * nameStyle: label对应的name的值
  *
  *
  * 注：由于antd中  layout: vertical时，
  * labelStyle不起作用，因此暴露nameStyle来控制value的值的样式
  *
  *
  * ...更多属性，见antd Descriptions 组件
  * https://ant.design/components/descriptions-cn/#API
  *
  *
  * example(例子):
    <ElDescriptions
      column={4}
      dataSource={this.dataSource}
      columns={[
        {
          title: 'Product',
          dataIndex: 'product',
          align: 'left',
          span: 2,
          render: (value, record) => {
            console.log(value, record);
            return record.ceshi2;
          }, {
            title: 'Billing Mode',
            dataIndex: 'mode',
          }
        }
    ]}
      title={'基本信息'}
      bordered
    />
  *
*/

interface Props extends DescriptionsProps {
  dataSource?: any;
  columns: Array<ElDescriptionsColumns>;
  title?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  span?: number;
  nameStyle?: React.CSSProperties;
}

interface ElDescriptionsColumns {
  title: React.ReactNode | string;
  dataIndex: string;
  align?: string;
  span?: number;
  render?: Function;
}

class ElDescriptions extends PureComponent<Props, any> {
  static defaultProps = {
    column: 4,
    dataSource: {},
    columns: [],
    layout: 'vertical',
    title: '',
    size: 'small',
    span: 1
  };

  render() {
    const {
      column,
      dataSource,
      columns,
      layout,
      title,
      size,
      labelStyle,
      contentStyle,
      span,
      nameStyle
    } = this.props;

    return (
      <>
        <Descriptions
          {...this.props}
          size={size}
          column={column}
          title={title}
          layout={layout}
        >
          {columns?.map((v: any, i: any) => {
            return (
              <Descriptions.Item
                style={{ textAlign: v.align || 'inherit', ...labelStyle }}
                labelStyle={labelStyle}
                contentStyle={contentStyle}
                key={`${i + 1}`}
                label={v.title}
                span={v.span || span}
              >
                {v.render ? (
                  <div
                    style={{ textAlign: v.align || 'inherit', ...nameStyle }}
                  >
                    {v.render(dataSource[v.dataIndex], dataSource) || ''}
                  </div>
                ) : (
                  <div
                    style={{ textAlign: v.align || 'inherit', ...nameStyle }}
                  >
                    {dataSource[v.dataIndex] || ''}
                  </div>
                )}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </>
    );
  }
}
export type { ElDescriptionsColumns };
export default ElDescriptions;
