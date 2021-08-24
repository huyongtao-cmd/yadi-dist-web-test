import { observable, action, makeAutoObservable } from 'mobx';

class AppStore {
  @observable appName = '中燃';

  @action changeAppName(newAppName: string) {
    this.appName = newAppName;
  }
  constructor() {
    //  自定绑定
    makeAutoObservable(this);
  }
}
export default AppStore;
