import Cascader from '../../../Cascader';
import * as React from 'react';
import requests from '@/utils/request';

interface Props {
  onChange?: Function;
  value?: any;
  level?: string | number;
  disabled?: boolean;
}
// 陈英杰修改 加入onChange  value的入参

const getProvinceList = (value, level) => {
  return requests('/yd-user/com/comArea/findAllProvince', {
    method: 'post',
    query: {
      ids: value,
      level
    }
  });
};
const findChildrenById = (id: number | string) => {
  return requests(`/yd-user/com/comArea/findChildrenById/${id}`, {
    method: 'get'
  });
};

class RegionCascader extends React.Component<Props> {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { value, onChange, level, disabled } = this.props;
    return (
      <Cascader
        request={getProvinceList}
        getData={findChildrenById}
        value={value}
        level={level}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }
}
export default RegionCascader;
