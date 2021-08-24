import { makeAutoObservable, observable, action } from 'mobx';
class AuthMobx {
  @observable authActionList: [] = [];
  @observable authMenuList: [] = [];
  constructor() {
    //  自定绑定
    makeAutoObservable(this);
  }

  @action saveAuthActionList = (authActionList) => {
    this.authActionList = authActionList;
  };
  @action saveAuthMenuList = (authMenuList) => {
    this.authMenuList = authMenuList;
  };
}
export default new AuthMobx();
