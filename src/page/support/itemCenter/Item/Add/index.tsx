
import React, { PureComponent } from 'react';
import { Button, Card } from 'antd';
import ElForm from '@/components/el/ElForm';
import { ElTab } from '@/components/el';
import {
  getTableFormItems
} from './config';
import Gallery from './Gallery';
import DealInfo from './Deal';
import WarehouseInfo from './Warehouse';
import ServiceInfo from './ServiceInfo';
import Attribute from './Attribute';
import ItemTag from './Tag';
import CustomParams from './Params';
import './index.less';
import * as service from './service';
import MultiTabMobx from '@/store/multiTab';
import ElNotification from '@/components/el/ElNotification';
import { ElRowContainer } from '@/components/el';
import { SaveWhite, CancelBlack } from '@/components/el/ElIcon';


interface Props {
  match: any;
}

interface State {
  submitIndex: number;
  formData: any;
  type: string;
  defaultActiveKey: string;
  formInfo: any,
  id: string | number;
  attributeData: any;
  defaultFormData: any;
  majorId: any;
  loading: boolean;
}

export default class AddItem extends PureComponent<Props, State> {
  static propTypes = {};
  basicRef: any;
  galleryRef: any;
  serviceRef: any;
  warehouseRef: any;
  dealRef: any;
  attributeRef: any;
  itemTagRef: any;
  customParamsRef: any;
  multiTabStore: any;
  ItmCateArray: any;
  loaded: boolean;

  constructor(props) {
    super(props);
    this.multiTabStore = MultiTabMobx;
    this.ItmCateArray = [];
    this.state = {
      type: this.props.match.params?.type,
      submitIndex: 1,
      defaultActiveKey: '1',
      formData: {
        itemCatePath: [],
        itemProps: []
      },
      formInfo: [],
      id: this.props.match.params?.id,
      attributeData: {},
      defaultFormData: {},
      majorId: '',
      loading: false,
    };

  }
  async componentDidMount() {
    if (this.state.type === 'add') {
      this.setState({
        formData: {
          itemCatePath: this.props.match.params.id.split(','),
        },
        id: null
      }, async () => {
        await this.getItmCate();
        // await this.getItmParamsData();
      })
    } else if (this.state.type === 'edit' || this.state.type === 'view') {
      this.getItemDetail(this.state.id);
    }

  }
  //??????????????????????????????
  getCatePathCode = (data) => {
    let result = [];
    if (!data) {
      return result;
    }
    result.push(data[0].itemCateCode);
    if (!data[0].treeNodes) {
      return result;
    }
    result.push(...this.getCatePathCode(data[0].treeNodes));
    return result;
  }

  //??????????????????
  getItemDetail = async (id) => {
    const res = await service.getItemDetail(id);
    if (res.success) {
      const itemCatePath = this.getCatePathCode(res.data.itemCatePath);
      res.data.itemCatePath = itemCatePath;
      res.data.brand = {
        id: res.data.brandId,
        brandName: res.data.brandName,
        brandCode: res.data.brand
      }
      res.data.itemTags && res.data.itemTags.forEach((item) => {
        item.tagGroupName = item.upperTagName
      })
      res.data.itemCustProps && res.data.itemCustProps.forEach((item) => {
        item.tagCode = item.custPropKey;
        item.tagName = item.custPropValue;
      })
      this.setState({
        formData: res.data
      }, async () => {
        await this.getItmCate();
        this.loaded = true;
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  }
  //??????????????????
  getItmParamsData = async () => {
    const { formData } = this.state
    const res = await service.getItemParamsData(formData.itemCatePath[formData.itemCatePath.length - 1]);
    if (res.success) {
      return
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  }
  //??????????????????
  getItmCate = async () => {
    const { formData } = this.state
    const res = await service.getItmCate(formData.itemCatePath[formData.itemCatePath.length - 1]);
    let formInfo = [];
    this.ItmCateArray = res.data;
    res.data && res.data.length > 0 && res.data.forEach(record => {
      Array.isArray(record.values) && (record.values.forEach(a => {
        a.label = a.propValueName;
        a.value = a.propValueName;
      }))

      formInfo.push({
        title: record.catePropName,
        name: record.id,
        span: 6,
        wrapperCol: { span: 18 },
        formOption: {
          type: record.isHand ? '$input' : '$select',
          props: {
            disabled: this.state.type === 'view',
            placeholder: record.isHand ? '?????????' : '?????????',
            options: record.values,
            multiple: record.isBox,
          }
        },
        rules: [{ required: record.isMust, message: record.catePropName + '?????????' }]
      })
    })
    this.setState({ formInfo }, () => {
      let attributeData = {};
      this.state.formData.itemProps && this.state.formData.itemProps.forEach((item) => {
        formInfo.map(info => {
          if (info.title === item.catePropName) {
            if (item.propValue) {
              if (item.propValue?.indexOf(',') > -1) {
                item.propValue = item.propValue.split(',');
              }
              attributeData[info.name] = item.propValue;
            }

          }
        });
      })
      this.setState({ attributeData })
    })
  }
  setTabs = () => {
    const { submitIndex, formData, type, formInfo, attributeData } = this.state;

    return [
      {
        name: '????????????',
        key: '1',
        render: () => (
          <Gallery
            submitIndex={submitIndex}
            type={type}
            data={type === 'add' ? [] : formData.images
            }
            onRef={this.handleGalleryRef}
            majorId={(e) => {
              this.majorIdFn(e);
            }}
          />
        )
      },
      {
        name: '????????????',
        key: '2',
        render: () => <DealInfo
          submitIndex={submitIndex}
          type={type}
          data={type === 'add' ? {} : {
            uom: formData.uom,
            purcUom: formData.purcUom,
            saleUom: formData.saleUom,
            pricingUom: formData.pricingUom,
            taxCode: formData.taxCode,
          }}
          loaded={this.loaded}
          onRef={this.handleDealRef} />
      },
      {
        name: '??????????????????',
        key: '3',
        render: () => <WarehouseInfo submitIndex={submitIndex}
          type={type}
          data={type === 'add' ? {} : {
            lotFlag: formData.lotFlag,
            snFlag: formData.snFlag,
            guaranteeFlag: formData.guaranteeFlag,
            packageSpec: formData.packageSpec,
            storeCondition: formData.storeCondition,
            transCondition: formData.transCondition,
            guaranteePeriod: formData.guaranteePeriod,
            itemLength: formData.itemLength,
            itemWidth: formData.itemWidth,
            itemHeight: formData.itemHeight,
            volume: formData.volume,
            grossWeight: formData.grossWeight,
            netWeight: formData.netWeight,
            volumeUom: formData.volumeUom,
            weightUom: formData.weightUom,
            guaranteePeriodUnit: formData.guaranteePeriodUnit,
            dimensionUom: formData.dimensionUom
          }}
          loaded={this.loaded}
          onRef={this.handleWarehouseRef} />
      },
      {
        name: '????????????',
        key: '4',
        render: () => (
          <ServiceInfo
            submitIndex={submitIndex}
            type={type}
            data={type === 'add' ? {} : {
              installFlag: formData.installFlag,
              returnExchangeFlag: formData.returnExchangeFlag,
              warrantyFlag: formData.warrantyFlag,
              warrantyPeriod: formData.warrantyPeriod,
              warrantyPeriodUnit: formData.warrantyPeriodUnit
            }}
            loaded={this.loaded}
            onRef={this.handleServiceRef}
          />
        )
      },
      {
        name: '????????????',
        key: '5',
        render: () => {
          return <Attribute
            submitIndex={submitIndex}
            type={type}
            loaded={this.loaded}
            formInfo={formInfo}
            data={type === 'add' ? [] : attributeData}
            onRef={this.handleAttributeRef} />
        }

      },
      {
        name: '????????????',
        key: '6',
        render: () => {
          return <ItemTag
            submitIndex={submitIndex}
            type={type}
            loaded={this.loaded}
            data={type === 'add' ? [] : formData.itemTags
            }
            onRef={this.handleItemTagRef} />
        }
      },
      {
        name: '?????????????????????',
        key: '7',
        render: () => {
          return <CustomParams
            submitIndex={submitIndex}
            type={type}
            loaded={this.loaded}
            data={type === 'add' ? [] : formData.itemCustProps
            }
            onRef={this.handleCustomParamsRef} />
        }
      }
    ];
  };

  handleGalleryRef = (ref) => {
    this.galleryRef = ref;
  };
  handleWarehouseRef = (ref) => {
    this.warehouseRef = ref;
  }
  handleServiceRef = (ref) => {
    this.serviceRef = ref;
  };
  handleDealRef = (ref) => {
    this.dealRef = ref;
  }
  handleAttributeRef = (ref) => {
    this.attributeRef = ref;
  }
  handleItemTagRef = (ref) => {
    this.itemTagRef = ref;
  }
  handleCustomParamsRef = (ref) => {
    this.customParamsRef = ref;
  }
  majorIdFn(value) {
    this.setState({
      majorId: value
    });
  }

  validateForms = () => {
    // ???????????????????????????
    let params = {};
    let errList = [];
    let promiseList = [];

    // ??????????????????
    promiseList.push(
      this.basicRef
        .validateFields()
        .then((values) => {
          const basic = values;
          params = { ...params, ...basic, brand: basic.brand.brandCode, itemCateCode: basic.itemCatePath[basic.itemCatePath.length - 1] };
        })
        .catch((err) => {
          console.log('err', err);
          errList.push(err.errorFields);
        })
    );

    // ????????????
    promiseList.push(
      this.dealRef &&
      this.dealRef
        .validateFields()
        .then((values) => {
          params = { ...params, ...values };
        })
        .catch((err) => {
          console.log('err', err);
          errList.push(err.errorFields);
        })
    );
    //????????????????????????
    promiseList.push(
      this.galleryRef && this.galleryRef
        .validateTableRows()
        .then((err) => {
          if (!err.success) {
            console.log(err);
            errList.push(err?.msg?.errors);
          } else {
            if (
              this.galleryRef.getRows() &&
              this.galleryRef.getRows()?.length > 0
            ) {
              params = {
                ...params,
                images: this.galleryRef.getRows().map((item) => {
                  return {
                    fileId: item.picId[0],
                    major: this.state.majorId === item?.id,
                    imgSize: item.size,
                    fileSize: item.picSize,
                    fileName: item.picName
                  };
                })
              };
            } else {
              errList.push('????????????????????????');
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
          errList.push(err.errorFields);
        })
    );
    //????????????
    promiseList.push(
      this.warehouseRef &&
      this.warehouseRef
        .validateFields()
        .then((values) => {
          const basic = values;
          params = { ...params, ...basic };
        })
        .catch((err) => {
          console.log('err', err);
          errList.push(err.errorFields);
        })
    );
    // ????????????
    promiseList.push(
      this.serviceRef && this.serviceRef.validateFields()
        .then((values) => {
          console.log(values)
          const basic = values;
          params = { ...params, ...basic };
        })
        .catch((err) => {
          console.log('err', err);
          errList.push(err.errorFields);
        })
    );

    // ????????????
    promiseList.push(
      this.attributeRef && this.attributeRef.validateFields()
        .then((values) => {
          let itemSaveProps = [];
          for (var i in values) {
            const filter = this.ItmCateArray.filter(item => item.id === i)
            itemSaveProps.push({
              catePropCode: filter[0].catePropCode,
              catePropName: filter[0].catePropName,
              propValue: Array.isArray(values[i]) ? values[i].join(',') : values[i],
              catePropType: '',
              id: filter[0].id
            })
          }
          params = { ...params, itemSaveProps: itemSaveProps };
        })
        .catch((err) => {
          console.log('err', err);
          errList.push(err.errorFields);
        })
    );

    // ????????????
    promiseList.push(
      this.itemTagRef.quitEditState(() => {
        this.itemTagRef
          .validateTableRows()
          .then((values) => {
            const itemSaveTags = this.itemTagRef.getRows().map(item => ({
              tagCode: item.tagCode,
              tagName: item.tagName,
              upperTagCode: item.tagGroupCode,
              upperTagName: item.tagGroupName
            }))
            params = { ...params, itemSaveTags }
          })
          .catch((err) => {
            console.log('err', err);
            errList.push(err.errorFields);
          })
      })
    );
    // ???????????????
    promiseList.push(
      this.customParamsRef && this.customParamsRef.quitEditState(() => {
        this.customParamsRef
          .validateTableRows()
          .then((values) => {
            const itemSaveCustProps = this.customParamsRef.getRows().map(item => ({
              custPropKey: item.tagCode,
              custPropValue: item.tagName
            }))
            params = { ...params, itemSaveCustProps }
          })
          .catch((err) => {
            console.log('err', err);
            errList.push(err.errorFields);
          })
      })
    );


    Promise.all(promiseList).then((values) => {
      if (errList.length === 0) {
        this.save(params);
      } else {
        console.log(errList);
        this.setState({ loading: false });
        ElNotification({
          type: 'warning',
          message: '?????????????????????'
        });
      }
    });
  };

  //????????????
  save = async (params) => {
    params.id = this.state.id ? this.state.id : '';
    const res = await service.createItem(params);
    ElNotification({
      type: res.success ? 'success' : 'error',
      message: res.msg
    });
    this.setState({ loading: false });
    if (res && res.success) {
      this.handleCancel();
    }
  }

  handleSave = async () => {
    this.setState({ loading: true });
    this.validateForms();
  };

  handleCancel = () => {
    this.multiTabStore.closeCurrentToPath('/itemCenter/item/list');
  };

  render() {
    const { formData, type, loading } = this.state;
    const { children } = this.props;
    return (
      <div className='item-center-addition-wrapper'>
        {/* {
          !(type === 'view') &&
          <div className='action-btn-group'>
            <Button
              type='primary'
              icon={<SaveOutlined />}
              onClick={this.handleSave}
              disabled={type === 'view'}
              loading={loading}
            >
              ??????
          </Button>
            <Button icon={<CloseCircleOutlined />} loading={loading} onClick={this.handleCancel}>
              ??????
          </Button>
          </div>
        } */}
        <ElRowContainer
          onBack={this.handleCancel}
          blocks={[
            {
              key: 'save',
              text: '??????',
              icon: <SaveWhite />,
              type: 'primary',
              handleClick: this.handleSave
            },
            {
              key: 'save',
              text: '??????',
              icon: <CancelBlack />,
              handleClick: this.handleCancel
            }
          ]}
          position='top'
        />
        <Card>
          <ElForm
            title={'????????????'}
            data={formData}
            onRef={(e) => (this.basicRef = e)}
            formProps={getTableFormItems(type)}
          />
          {children}
        </Card>
        <ElTab defaultActiveKey='1' tabs={this.setTabs()} />
      </div>
    );
  }
}
