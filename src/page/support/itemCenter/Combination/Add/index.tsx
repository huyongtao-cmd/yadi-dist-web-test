/*
 * @Descripttion:
 * @version:
 * @Author: Dwyer
 * @Date: 2021-02-24 11:01:06
 * @LastEditors: Dwyer
 * @LastEditTime: 2021-02-24 11:01:38
 */
import React, { PureComponent } from 'react';
import { history } from 'react-router-dom';
import { Button, Spin, Modal } from 'antd';
import MultiTabMobx from '@/store/multiTab';
import {
  CloseCircleOutlined, SaveOutlined
} from '@ant-design/icons';

import ElPageHeader from '@/components/el/ElPageHeader';
import ElForm from '@/components/el/ElForm';
import ElTab, { ElTabProps, ElTabPaneProps } from "@/components/el/ElTab";
import ElEditTable, { ElEditTableProps } from "@/components/el/ElEditTable";
import ElNotification from '@/components/el/ElNotification';
import Items from './Items';
import ItemTag from './Tags';
// import SelectItemModal from '../modal/SelectItemModal';
// import SelectTagModal from '../modal/SelectTagModal';

import PropTypes from 'prop-types';
import { getBasicFormItems } from "./config";

import * as service from '../service';

import './index.less'
import { resolve } from '@antv/x6/lib/registry/router/manhattan/options';
import { reject } from 'ramda';
import { callbackify } from 'util';
interface Props {
  history: history;
  match: any;
}

interface State {
  loading: boolean;
  isNew: boolean;
  id: any;
  addItemModelVisable: boolean;
  addTagModelVisable: boolean;
  formData: any;
  itemsList: Array<any>;
  tagsList: Array<any>;
  tableIndex: number;
  submitIndex: number;
}

type tabKeys = string | 'itemsList' | 'tagsList';

export default class Add extends PureComponent<Props, State> {
  static propTypes = {};
  formRef: any;
  itemsTableRef: any;
  tagsTableRef: any;
  addItemModalRef: any;
  addTagModalRef: any;
  multiTabStore: any;

  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.itemsTableRef = {};
    this.tagsTableRef = {};
    this.addItemModalRef = {};
    const { path, params } = props.match
    let isNew = true;
    let id = '';
    if (path.includes('/add')) {
      if (params.id !== 'new') {
        id = params.id
      }
    }
    if (path.includes('/edit')) {
      isNew = false;
      id = params.id
    }

    this.state = {
      loading: false,
      isNew,
      id,
      addItemModelVisable: false,
      addTagModelVisable: false,
      formData: {
        itemComboCode: '',
      },
      itemsList: [],
      tagsList: [],
      tableIndex: 1,
      submitIndex: 1
    }
  }

  componentDidMount() {
    const { isNew } = this.state
    if (isNew) {
      this.getItemCateCode();
    } else {
      this.getDetailInfo();
    }
  }

  getItemCateCode = async () => {
    const { formData } = this.state;
    const res: any = await service.getItemCateCode();
    if (res && res.success) {
      this.setState({
        formData: {
          ...formData,
          itemComboCode: res.data
        }
      });
    }
  }

  /**
   * ????????????????????????
   */
  getDetailInfo = async () => {
    const { id, formData } = this.state
    const formRef = this.formRef;
    this.setState({
      loading: true
    });
    const res: any = await service.getItemDetail(id);
    if (res && res.success) {
      this.setState({
        formData: res.data,
        itemsList: res.data.itmComboDVOList,
        tagsList: res.data.itmComboTagVOList,
      })
    } else {
      ElNotification({ type: 'error', message: '??????????????????????????????' })
    }
    this.setState({
      loading: false
    })

  }

  /**
   * ??????
   */
  saveHandle = async () => {
    const { isNew, id } = this.state;
    const formRef = this.formRef;
    const itemComboCode = formRef.getFieldValue().itemComboCode;
    const itemsRef = this.itemsTableRef;
    const tagsRef = this.tagsTableRef;
    let formData = {}
    await Promise.all([
      formRef.validateFields(),
      new Promise((resolve, reject) => {
        itemsRef.quitEditState(() => {
          itemsRef.validateTableRows()
            .then((info, val) => {
              if (!info.success) {
                ElNotification({
                  type: 'warning',
                  message: '??????????????????'
                });
                reject(info);
              } else {
                const list = itemsRef.getRows().map(item => ({
                  id: item.id,
                  itemCode: item.itemCode,
                  itemComboCode,
                  status: item.status,
                  qty: item.qty
                }))
                //?????????????????????
                if (!list.every((item) => item.itemCode)) {
                  ElNotification({
                    type: 'warning',
                    message: '????????????????????????'
                  });
                  reject('?????????????????????');
                }
                resolve(list);
              }
            })
            .catch((err) => {
              ElNotification({
                type: 'warning',
                message: '??????????????????'
              });
              reject(err);
            });
        });
      }),
      new Promise(resolve => {
        //tags 
        resolve(tagsRef.getRows().map(item => ({
          // id: item.id,
          itemComboCode,
          // status: item.status,
          tagCode: item.tagCode,
          tagGroupCode: item.tagGroupCode
        })));
      }),
    ])
      .then(async (res) => {
        formData = {
          id: isNew ? undefined : id,
          status: 'DRAFT',
          ...res[0],
          itmComboDSaveParamList: res[1],
          itmComboTagSaveParamList: res[2]
        }
        console.log(formData);
        this.setState({
          loading: true
        })
        if (isNew) {
          return await service.addComboItem(formData);
        } else {
          return await service.saveComboItem(formData);
        }
      })
      .then((res: any) => {
        this.setState({
          loading: false
        });
        if (res?.success) {
          ElNotification({
            type: 'success',
            message: '????????????'
          });
          this.closePage();
        } else {
          ElNotification({
            type: 'warning',
            message: '????????????'
          });
        }
      })
      .catch((obj) => {
        console.log(obj);
        this.setState({
          loading: false
        });
        if (obj?.callback) {
          obj.callback();
        }
      });
  }


  /**
   * ????????????
   */
  closePage = () => {
    this.multiTabStore.closeCurrentToPath('/itemCenter/combination/list');
  }

  /** tab ?????? */
  setTabList = (): Array<ElTabPaneProps> => {
    const {
      itemsList,
      tagsList,
      tableIndex,
      submitIndex
    } = this.state;

    // ????????????
    let tabList = [
      {
        name: '??????????????????',
        key: 'itemsList',
        render: () => {
          return (
            <Items
              key='itemsList'
              type='add'
              data={
                itemsList.length > 0
                  ? itemsList
                  : []
              }
              tableIndex={tableIndex}
              onRef={(ref) => this.itemsTableRef = ref}
            />
          );
        }
      },
      {
        name: '????????????',
        key: 'tagsList',
        render: () => {
          return (
            <ItemTag
              key='tagsList'
              onRef={(ref) => this.tagsTableRef = ref}
              data={tagsList}
              submitIndex={submitIndex}
              type='add'
            />
          );
        }
      },
    ];
    return tabList;
  };

  render() {
    const { loading, formData } = this.state;
    return (
      <>
        <Spin spinning={loading}>
          <div className='addCommodity'>
            <div className='actionBtnBar'>
              <Button type='primary' icon={<SaveOutlined />} onClick={this.saveHandle}>??????</Button>
              <Button icon={<CloseCircleOutlined />} onClick={this.closePage}>??????</Button>
            </div>
            <div className='main'>
              <ElPageHeader title='????????????' />
              <ElForm
                data={formData}
                onRef={(ref) => (this.formRef = ref)}
                rowClassName='basic-info-form'
                formProps={{
                  items: getBasicFormItems(),
                  labelCol: { span: 9 },
                  wrapperCol: { span: 7 },
                }}
              />
              <ElTab tabs={this.setTabList()} />
            </div>
          </div>
        </Spin>
      </>
    )
  }
}