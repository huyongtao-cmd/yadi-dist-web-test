import React from 'react';
import { Row, Col } from 'antd';
import { Selection } from '@/components/el/ItemComponent';
import request from '@/utils/request';

interface Props {
  currentData: any;
}

interface State {
  allData: any;
  countryData: string; //国家
  countryList: Array<any>;
  provinceList: any;
  cityList: any;
  distList: any;
  provinceData: string; //省
  cityData: string; //城市
  distData: string; //区
}

class DistrictsSelect extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      allData: {
        country: '',
        province: '',
        city: '',
        dist: ''
      },
      countryData: '', //国家
      countryList: [],
      provinceData: '', //省
      provinceList: [],
      cityData: '', //城市
      cityList: [],
      distData: '', //区
      distList: []
    };
  }

  async componentDidMount() {
    const { currentData } = this.props;
    if (currentData) {
      if (currentData.country) {
        let res = await this.getListByPcode(currentData.country);
        this.setState({
          provinceList: res,
          countryData: currentData.country
        });
      }
      if (currentData.province) {
        let res = await this.getListByPcode(currentData.province);
        this.setState({
          cityList: res,
          provinceData: currentData.province
        });
      }
      if (currentData.city) {
        let res = await this.getListByPcode(currentData.city);
        this.setState({
          distList: res,
          cityData: currentData.city
        });
      }
    }
    this.getCountryList();
  }

  static getDerivedStateFromProps(props, state) {
    props.onChange(state.allData);
  }

  //获取国家下拉数据
  getCountryList = async () => {
    let res = await request('/yst-inv/com/districts/bypcode/country', {
      method: 'get'
    });
    if (res.success) {
      res.data.forEach((element) => {
        element.label = element.name;
        element.value = element.code;
      });
      this.setState({
        countryList: res.data
      });
    }
  };

  //根据父Code获取子数据
  getListByPcode = async (pCode) => {
    let res = await request(`/yst-inv/com/districts/bypcode/${pCode}`, {
      method: 'get'
    });
    if (res.success) {
      res.data.forEach((element) => {
        element.label = element.name;
        element.value = element.code;
      });
      return res.data;
    }
    return [];
  };

  //国家选择
  changeCountry = (value) => {
    this.setState(
      {
        countryData: value
      },
      async () => {
        let res = [];
        if (value) {
          res = await this.getListByPcode(value);
        }
        this.setState({
          allData: {
            country: value,
            province: '',
            city: '',
            dist: ''
          },
          provinceList: res,
          provinceData: '',
          cityData: '',
          cityList: [],
          distList: [],
          distData: ''
        });
      }
    );
  };

  //省份选择
  changeProvince = (value) => {
    this.setState(
      {
        provinceData: value
      },
      async () => {
        let res = [];
        const { allData } = this.state;
        if (value) {
          res = await this.getListByPcode(value);
        }
        this.setState({
          allData: {
            ...allData,
            province: value,
            city: '',
            dist: ''
          },
          cityList: res,
          cityData: '',
          distList: [],
          distData: ''
        });
      }
    );
  };

  //市
  changeCity = (value) => {
    this.setState(
      {
        cityData: value
      },
      async () => {
        let res = [];
        const { allData } = this.state;
        if (value) {
          res = await this.getListByPcode(value);
        }
        this.setState({
          allData: {
            ...allData,
            city: value,
            dist: ''
          },
          distList: res,
          distData: ''
        });
      }
    );
  };

  //区
  changeDist = (value) => {
    const { allData } = this.state;
    this.setState({
      allData: {
        ...allData,
        dist: value
      },
      distData: value
    });
  };

  render() {
    const {
      countryList,
      provinceList,
      countryData,
      provinceData,
      cityData,
      cityList,
      distList,
      distData
    } = this.state;
    const { currentData } = this.props;
    return (
      <Row justify='space-between'>
        <Col span={5}>
          <Selection
            options={countryList}
            onChange={this.changeCountry}
            value={countryData}
          />
        </Col>
        <Col span={5}>
          <Selection
            options={provinceList}
            onChange={this.changeProvince}
            disabled={provinceList.length > 0 ? false : true}
            value={provinceData}
          />
        </Col>
        <Col span={5}>
          <Selection
            options={cityList}
            onChange={this.changeCity}
            disabled={cityList.length > 0 ? false : true}
            value={cityData}
          />
        </Col>
        <Col span={5}>
          <Selection
            options={distList}
            onChange={this.changeDist}
            disabled={distList.length > 0 ? false : true}
            value={distData}
          />
        </Col>
      </Row>
    );
  }
}

export default DistrictsSelect;
