import { observable, action, makeAutoObservable } from 'mobx';

class AppStore {
  constructor() {
    //  自定绑定
    makeAutoObservable(this);
  }

  @observable appName = '中燃';
  @observable principal = {};
  @observable
  urlPrefix = `${process.env.REACT_APP_SERVER_HOST}/yst-${process.env.REACT_APP_SECRET_CODE}/com/file/v1/{picId}/download`;

  @action changeAppName(newAppName: string) {
    this.appName = newAppName;
  }
  @action updatePrincipal = (values) => {
    this.principal = values;
  };
  @action getPrincipal = () => {
    sessionStorage.getItem('principalObj')
      ? (this.principal = JSON.parse(sessionStorage.getItem('principalObj')))
      : '';
  };
  @action setPrincipal = () => {
    sessionStorage.setItem('principalObj', JSON.stringify(this.principal));
  };
}

export default new AppStore();
