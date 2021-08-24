import React from 'react';
import AuthMobx from '@/store/auth';
import { observer } from 'mobx-react';
interface Props {
  authCode?: string;
}
/**
 * 校验当前用户是否有能力编码对应的权限
 * @param {string} authCode
 * @param {Array<object>} authCode
 */
export function checkAuth(authCode, authActionList) {
  if (authCode) {
    if (
      Array.isArray(authActionList) &&
      authActionList.some((v) => v.code === authCode)
    ) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}

/**
 * 权限组件封装
 */
@observer
class AuthWrapper extends React.Component<Props, {}> {
  authMobx: any;
  constructor(props) {
    super(props);
    this.authMobx = AuthMobx;
  }
  render() {
    return (
      checkAuth(this.props.authCode, this.authMobx.authActionList) &&
      this.props.children
    );
  }
}
export default AuthWrapper;
