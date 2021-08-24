//顾客信息
import React from 'react';
import ElForm from '@/components/el/ElForm';
import { getFormItems } from './config';
import * as service from '../service';
import {
  ElCard,
  ElNotification,
  ElPage
} from '@/components/el';
import dayjs from 'dayjs';
import { asserts } from '@/utils';

interface Props {
  handleLoading: any;
  customerFormRef: any;
  setcustomerFormRefValue: any;
  handleCardisTrue: any;
  baseFormRef: any;
  onRef: any;
  data: any;
  reprCertIsRequired: boolean;
  ageIsRequired: boolean;
}


class CustomerForm extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      // setcustomerFormRefValue
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let data = { "current": 1, "size": 999999, };      // storeType: "A"
    const formData = await service.searchUserOrgBu(data);
    console.log(formData, 'formData')
    if (formData.success) {
      this.setState({ loading: false });
      const newData = formData.data.records?.map((item) => ({ ...item, name: item.storeName }));
      const filterData = newData && newData.filter((item) => item.storeStatus === 'ACTIVE');
      this.props.customerFormRef?.setFieldsValue({
        storeId: filterData[0].id
      });
    } else {
      ElNotification({
        type: 'error',
        message: formData.msg
      });
    }
  }

  // 手机号失去焦点带出信息
  onBlur = async (e) => {
    let phone = e.target.value;
    let reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if ((reg.test(phone))) {
      let params = {
        reprCertMobile: phone
      }
      this.props.handleLoading(true)
      const res = await service.searchCustomer(params);
      if (res.success) {
        this.props.handleLoading(false)
        this.props.customerFormRef.setFieldsValue({
          custName: res.data?.custName,
          reprCertMobile: res.data?.reprCertMobile != null ? res.data?.reprCertMobile : phone,
          reprCertNo: res.data?.reprCertNo,
          vipGender: res.data?.vipGender,
          reprCertType: res.data?.reprCertType,
          vipBirthDate: res.data?.vipBirthDate,
          registerAddress: res.data?.registerAddress,
        });
        if (res.data?.reprCertType === 'ID_CARD' && asserts.isExist(res.data?.reprCertNo)) {
          const { isTrue = '' } = this.getBirthday(res.data?.reprCertNo);
          this.props.handleCardisTrue(isTrue);
        }
        // this.props.setcustomerFormRefValue({ id: res.data?.id })
        this.props.setcustomerFormRefValue({ data: res.data })
        this.setState({
          flag: true
        })
      } else {
        this.props.handleLoading(false)
        ElNotification({
          type: 'error',
          message: res.message || res.data || '操作失败！'
        });
      }
    } else {
      ElNotification({
        type: 'error',
        message: '手机号输入有误'
      });
    }
  }

  // 从身份证号中截取出生年月日
  getBirthday = (card) => {
    let year = null;
    let month = null;
    let day = null;
    let birthday = null;
    // 身份证号长度为15
    if (card.length === 15) {
      let re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      let arr_data = card.match(re_fifteen);
      year = "19" + arr_data[2];
      month = arr_data[3];
      day = arr_data[4];
      birthday = new Date(year + "/" + month + "/" + day);
    }
    // 身份证号长度为18
    if (card.length === 18) {
      let re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
      let arr_data = card.match(re_eighteen);
      year = arr_data[2];
      month = arr_data[3];
      day = arr_data[4];
      birthday = new Date(year + "/" + month + "/" + day);
    }
    return { isTrue: this.verifyBirthday(year, month, day, birthday), birthday };
  }

  // 输入身份证号  显示  生日
  reprCertNoOnBlur = async (e) => {
    let reprCertTypes = this.props.customerFormRef.getFieldValue('reprCertType');
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let reprCertNo = e.target.value;
    if (reprCertTypes == 'ID_CARD') {
      if ((reg.test(reprCertNo))) {
        //  let birth = reprCertNo.substring(6, 10) + "-" + reprCertNo.substring(10, 12) + "-" + reprCertNo.substring(12, 14);
        const { isTrue = '', birthday = '' } = this.getBirthday(reprCertNo);
        this.props.handleCardisTrue(isTrue);
        if (isTrue === true) {
          this.props.customerFormRef.setFieldsValue({
            vipBirthDate: dayjs(birthday).format('YYYY-MM-DD'),
          });
        } else {
          this.props.customerFormRef.setFieldsValue({
            vipBirthDate: '',
          });
          ElNotification({
            type: 'error',
            message: '请输入合法的身份证号'
          });
        }
      } else {
        this.props.handleCardisTrue(false);
        ElNotification({
          type: 'error',
          message: '请输入合法的身份证号'
        });
      }
    } else {
      this.props.handleCardisTrue(true);
      this.props.customerFormRef.setFieldsValue({
        vipBirthDate: '',
      });
    }
  }

  onValuesChange = async (changedFields) => {
    console.log(changedFields.reprCertType, 'changedFields.reprCertTypechangedFields.reprCertType')
    let reprCertNos = this.props.customerFormRef.getFieldValue('reprCertNo');
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (changedFields.reprCertType) {
      if (changedFields.reprCertType === 'ID_CARD') {
        if (reprCertNos != undefined) {
          if (reg.test(reprCertNos)) {
            console.log(reprCertNos.length, 'reprCertNos.lengthreprCertNos.length')
            const { isTrue = '', birthday = '' } = this.getBirthday(reprCertNos);
            this.props.handleCardisTrue(isTrue);
            if (isTrue === true) {
              this.props.customerFormRef.setFieldsValue({
                vipBirthDate: dayjs(birthday).format('YYYY-MM-DD'),
              });
            } else {
              this.props.customerFormRef.setFieldsValue({
                vipBirthDate: '',
              });
              ElNotification({
                type: 'error',
                message: '请输入合法的身份证号'
              });
            }
          } else {
            this.props.handleCardisTrue(false);
            ElNotification({
              type: 'error',
              message: '请输入合法的身份证号'
            });
          }
        }
      } else {
        this.props.handleCardisTrue(true);
        this.props.customerFormRef.setFieldsValue({
          vipBirthDate: '',
        });
      }
    }
  }

  verifyBirthday = function (year, month, day, birthday) {
    console.log(birthday, 'birthdaybirthdaybirthday')
    let now = new Date();
    let now_year = now.getFullYear();
    // 年月日是否合理
    if (
      birthday &&
      birthday.getFullYear() == year &&
      birthday.getMonth() + 1 == month &&
      birthday.getDate() == day
    ) {
      // 判断年份的范围（3岁到100岁之间)
      let time = now_year - year;
      if (time >= 3 && time <= 100) {
        return true;
      }
      return false;
    }
    return false;
  };

  checkDateFormate(birth) {
    var mp = /\d{4}-\d{2}-\d{2}/;
    var matchArray = birth.match(mp);
    if (matchArray == null) return false;
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var iaDate = new Array(3);
    var year, month, day;
    iaDate = birth.split("-");
    year = parseFloat(iaDate[0])
    month = parseFloat(iaDate[1])
    day = parseFloat(iaDate[2])
    if (year < 1900 || year > 2100) return false;
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > iaMonthDays[month - 1]) return false;
    return true;
  }

  render() {
    return (
      <ElForm
        formProps={{
          items: getFormItems(this.onBlur, this.reprCertNoOnBlur, this.state.flag, this.props.customerFormRef, this.props.reprCertIsRequired, this.props.ageIsRequired),
          onValuesChange: this.onValuesChange
        }}
        onRef={this.props.onRef}
        data={this.props.data}
      />
    );
  }
}

export default CustomerForm;
