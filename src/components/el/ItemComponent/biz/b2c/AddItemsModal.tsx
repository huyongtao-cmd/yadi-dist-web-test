/** 添加商品弹框 */
import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ElNotification, ElSearchTable } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { ElSearchTableColumns } from '@/components/el/ElSearchTable';
import { Statistic } from '@/components/el/ItemComponent';
import request from '@/utils/request';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

interface Props extends ModalProps {
  visible?: boolean;
  onSubmit?: Function;
}

interface ItemData {
  id: string | number;
  [props: string]: any;
}
interface State {
  itemData: ItemData;
  tableRef: any;
}

class AddItemsModal extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // 添加商品详情
      itemData: {
        id: ''
      },
      tableRef: null
    };
  }

  tableRef: any;

  /** 加入订单按钮 */
  addOrder = () => {
    const { selectedRows, selectedRowKeys } = this.tableRef.getSelectionData();

    if (selectedRows.length < 1) {
      return ElNotification({
        type: 'warning',
        message: '请至少选择一条商品'
      });
    }

    let cloneData = selectedRows;

    if (this.props.onSubmit) {
      this.props.onSubmit(cloneData, selectedRowKeys);
    }
  };

  /**
   * 添加商品 change
   * @param name
   * @param value
   */
  handleChange = (name = '', value: any) => {
    // 数量change
    if (name === 'num') {
      this.setState({
        itemData: {
          ...this.state.itemData,
          num: value
        }
      });
    }
    // 属性-颜色
    if (name === 'color') {
      this.setState({
        itemData: {
          ...this.state.itemData,
          color: value
        }
      });
    }
    // 属性-尺寸
    if (name === 'size') {
      this.setState({
        itemData: {
          ...this.state.itemData,
          size: value
        }
      });
    }
  };

  getTableSearchFormItems = (): ElFormProps => ({
    items: [
      {
        title: '输入搜索',
        name: 'keyword',
        span: 7,
        formOption: {
          type: '$input',
          props: {
            size: 'small',
            placeholder: '商品名称/商品货号'
          }
        }
      },
      {
        title: '商品分类',
        name: 'categoryComVO',
        span: 7,
        formOption: {
          type: '$b2c-cascader-classify',
          props: { placeholder: '请选择商品分类', size: 'small' }
        }
      },
      {
        title: '商品品牌',
        name: 'itmBrandId',
        span: 7,
        formOption: {
          type: '$b2c-selection-brand',
          props: {
            placeholder: '请选择品牌',
            size: 'small'
          }
        }
      }
    ]
  });

  getTableColumns = (): Array<ElSearchTableColumns> => {
    return [
      {
        title: '序号',
        width: 50,
        align: 'center',
        dataIndex: 'SN',
        render: (value, record, index) => {
          return index + 1;
        }
      },
      {
        title: '商品名称',
        width: 170,
        align: 'center',
        dataIndex: 'name'
      },
      {
        title: '货号',
        width: 160,
        align: 'center',
        dataIndex: 'code'
      },
      {
        title: '分类',
        width: 200,
        align: 'center',
        dataIndex: 'itmCategory',
        render: (value) => {
          return `${value?.itmCategoryName1}${
            value?.itmCategoryName2 ? '>' + value.itmCategoryName2 : ''
          } ${value?.itmCategoryName3 ? '>' + value.itmCategoryName3 : ''}`;
        }
      },
      {
        title: '品牌',
        width: 140,
        align: 'center',
        dataIndex: 'brandName'
      },
      {
        title: '价格',
        width: 80,
        align: 'right',
        dataIndex: 'price',
        render: (value) => {
          return (
            <div
              style={{
                display: 'flex',
                lineHeight: '20px',
                float: 'right'
              }}
            >
              <div>￥</div>
              <Statistic
                value={value}
                precision={2}
                style={{ lineHeight: '14px' }}
              />
            </div>
          );
        }
      }
    ];
  };

  render() {
    const { visible } = this.props;
    return (
      <Modal
        {...this.props}
        title='添加商品'
        visible={visible}
        onOk={this.addOrder}
        width='60%'
      >
        <Button
          style={{ marginRight: 10 }}
          icon={<SearchOutlined />}
          type='primary'
          className='proxy-button'
          onClick={() => this.tableRef.getTableData()}
        >
          查询
        </Button>
        <Button
          icon={<ReloadOutlined />}
          className='proxy-button'
          onClick={() => this.tableRef.resetForm()}
        >
          重置
        </Button>

        <ElSearchTable
          rowKey='id'
          // rowSelectionConfig={{
          //   fixed: false,
          //   type: 'checkbox'
          // }}
          tableProxy={{
            request: async (paramData) => {
              let itmCategoryId: any = {};
              paramData.categoryComVO?.forEach((item, index) => {
                index === 0 && (itmCategoryId.itmCategoryId1 = item);
                index === 1 && (itmCategoryId.itmCategoryId2 = item);
                index === 2 && (itmCategoryId.itmCategoryId3 = item);
              });
              const newparams = {
                ...paramData,
                categoryComVO:
                  itmCategoryId && Object.keys(itmCategoryId)?.length > 0
                    ? itmCategoryId
                    : undefined
              };
              const res = await request(`/yd-user/itm/item/queryByPage`, {
                method: 'post',
                query: newparams
              });
              return res;
              // if(res&&res.success){
              //   const {records}=res.data
              // }
            },
            successCallBack: () => {},
            errCallBack: () => {
              console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },

            autoLoad: true
          }}
          mode={{
            // 精简模式,是否隐藏搜索表格的某一块元素
            proxy: false, // 筛选器
            search: true, // SearchForm
            action: true, // actionButtons
            pagination: true, // 分页
            descriptions: false, // descriptions
            tabs: false
          }}
          searchFormProps={this.getTableSearchFormItems()}
          columns={this.getTableColumns()}
          onRef={(e) => {
            this.tableRef = e;
          }}
          scroll={{ x: '600px', y: '300px' }}
        />
      </Modal>
    );
  }
}
export default AddItemsModal;
