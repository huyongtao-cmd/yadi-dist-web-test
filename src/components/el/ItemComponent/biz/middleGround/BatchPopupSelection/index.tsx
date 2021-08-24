//批次选择
import React from 'react';
import { message } from 'antd';
import PopupSelection from '../../../PopupSelection';
import { omit } from 'ramda';
import request from '@/utils/request';
import { Statistic } from '@/components/el/ItemComponent';
interface Props {
  value?: any;
  onChange?: Function;
  paramData?: any;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
class BatchPopupSelection extends React.Component<Props, State> {
  static defaultProps = {
    paramData: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null // 通过ref获取inputValue   popupSelection.state.inputValue
    };
  }
  componentDidMount() {}
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  onRequest = async (data) => {
    return request(`/yst-inv/inv/invStk/searchD`, {
      method: 'post',
      query: {
        ...data,
        // orders: [{ asc: false, column: 'createTime' }],
        ...this.props.paramData
      }
    });
  };
  render() {
    return (
      <>
        <PopupSelection
          overLayWidth={800}
          rowKey='id'
          tableProxy={{
            request: this.onRequest,
            errCallBack: (res) => {
              message.error(res.msg || '操作失败');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          modalTableColumns={[
            {
              title: '可供量',
              dataIndex: 'avalQty',
              align: 'right',
              width: 80
            },
            {
              title: '批次',
              dataIndex: 'lotNo',
              align: 'center',
              width: 140
            },
            {
              title: '生产日期',
              dataIndex: 'manuDate',
              valueType: 'date',
              align: 'center',
              width: 140
            },
            {
              title: '过期日期',
              dataIndex: 'expireDate',
              valueType: 'date',
              align: 'center',
              width: 140
            },
            {
              title: '商品编码',
              dataIndex: 'itemCode',
              align: 'center',
              width: 140
            },
            {
              title: '商品名称',
              dataIndex: 'itemName',
              align: 'center',
              width: 200
            },
            {
              title: '商品规格',
              dataIndex: 'packageSpec',
              align: 'center',
              width: 120
            },
            {
              title: '公司编码',
              dataIndex: 'ouCode',
              align: 'center',
              width: 120
            },
            {
              title: '公司名称',
              dataIndex: 'ouName',
              align: 'center',
              width: 180
            },
            {
              title: '功能库区',
              dataIndex: 'deter2Name',
              align: 'center',
              width: 140
            },
            {
              title: '仓库编码',
              dataIndex: 'whCode',
              align: 'center',
              width: 120
            },
            {
              title: '仓库名称',
              dataIndex: 'whName',
              align: 'center',
              width: 160
            },
            {
              title: '客户标识',
              dataIndex: 'deter3',
              align: 'center',
              width: 120
            },
            {
              title: '库存数量',
              dataIndex: 'ohQty',
              align: 'right',
              width: 120
            },
            {
              title: 'SO硬承诺量',
              dataIndex: 'rsvQty',
              align: 'right',
              width: 120
            },
            {
              title: '箱系数',
              dataIndex: 'en1',
              align: 'right',
              width: 100
            },
            // {
            //   title: '库存数量（箱）',
            //   dataIndex: 'pOhQty',
            //   align: 'right',
            //   width: 160,
            //   render: (text, record, index) => {
            //     if (record.en1) {
            //       return `${parseInt(
            //         record.ohQty / (record.en1 ? record.en1 : 0),
            //       )}箱${record.ohQty % (record.en1 ? record.en1 : 0)}个`;
            //     } else {
            //       return '';
            //     }
            //   },
            // },
            {
              title: '库存数量（CT）',
              dataIndex: 'tohQty',
              align: 'right',
              width: 140,
              render: (value) => <Statistic value={value} precision={2} />
            },
            // {
            //   title: '承诺量（箱）',
            //   dataIndex: 'pRsvQty',
            //   align: 'right',
            //   width: 160,
            //   render: (text, record, index) => {
            //     if (record.en1) {
            //       return `${parseInt(record.rsvQty / (record.en1 ? record.en1 : 0))}箱${record.rsvQty % (record.en1 ? record.en1 : 0)}个`;
            //     } else {
            //       return '';
            //     }
            //   },
            // },
            {
              title: '承诺量（CT）',
              dataIndex: 'trsvQty',
              align: 'right',
              width: 140,
              render: (value) => <Statistic value={value} precision={2} />
            },
            {
              title: '可供量（CT）',
              dataIndex: 'tavalQty',
              align: 'right',
              width: 140,
              render: (value) => <Statistic value={value} precision={2} />
            },
            {
              title: '单位',
              dataIndex: 'uomName',
              align: 'center',
              width: 140
            },
            {
              title: '生产批号',
              dataIndex: 'manuLotNo',
              align: 'center',
              width: 140
            },
            {
              title: '品牌编码',
              dataIndex: 'brand',
              align: 'center',
              width: 140
            },
            {
              title: '品牌名称',
              dataIndex: 'brandName',
              align: 'center',
              width: 140
            },
            {
              title: '系统保质期',
              dataIndex: 'storeExpireDays',
              align: 'right',
              width: 120
            },
            {
              title: '保质期天数',
              dataIndex: 'expireDays',
              align: 'right',
              width: 140
            },
            {
              title: '保质期剩余天数',
              dataIndex: 'untilExpireDays',
              align: 'right',
              width: 140
            },
            {
              title: '新鲜度',
              dataIndex: 'fressTypeName',
              align: 'right',
              width: 120
            },
            {
              title: '单位体积',
              dataIndex: 'volume',
              align: 'right',
              width: 120,
              render: (value) => <Statistic value={value} precision={6} />
            },
            {
              title: '单位毛重',
              dataIndex: 'grossWeight',
              align: 'right',
              width: 120,
              render: (value) => <Statistic value={value} precision={2} />
            },
            {
              title: '单位重',
              dataIndex: 'netWeight',
              align: 'right',
              width: 120,
              render: (value) => <Statistic value={value} precision={2} />
            },
            {
              title: '总体积',
              dataIndex: 'tvolume',
              align: 'right',
              width: 120,
              render: (value) => <Statistic value={value} precision={6} />
            },
            {
              title: '总毛重',
              dataIndex: 'tgrossWeight',
              align: 'right',
              width: 120,
              render: (value) => <Statistic value={value} precision={2} />
            },
            {
              title: '总净重',
              dataIndex: 'tnetWeight',
              align: 'right',
              width: 120,
              render: (value) => <Statistic value={value} precision={2} />
            },
            {
              title: '进口/国产',
              dataIndex: 'itemType3Name',
              align: 'center',
              width: 120
            }
          ]}
          columns={[
            {
              title: '批次',
              dataIndex: 'lotNo',
              align: 'center'
            },
            {
              title: '商品编码',
              dataIndex: 'itemCode',
              align: 'center'
            },
            {
              title: '商品名称',
              dataIndex: 'itemName',
              align: 'center'
            },
            {
              title: '可供量',
              dataIndex: 'avalQty',
              align: 'right'
            },
            {
              title: '可供量CT',
              dataIndex: 'tavalQty',
              align: 'right',
              render: (value: string | number | undefined) => (
                <Statistic value={value} precision={2} />
              )
            },
            {
              title: '仓库编码',
              dataIndex: 'whCode',
              align: 'center'
            },
            {
              title: '功能区',
              dataIndex: 'deter2Name',
              align: 'center'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '批次',
                name: 'lotNo',
                span: 6,
                formOption: { type: '$input', props: {} }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          {...omit(
            ['searchFormProps', 'columns', 'modalTableColumns', 'tableProxy'],
            this.props
          )}
        />
      </>
    );
  }
}
export default BatchPopupSelection;
