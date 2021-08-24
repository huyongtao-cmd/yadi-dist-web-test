import {makeAutoObservable} from 'mobx'


class DemoStore{
    count = 0;
    constructor(){
        makeAutoObservable(this)
    }

    increaseCount=()=>{
        this.count ++;
    }

    decreaseCount = ()=>{
        this.count --;
    }
}

export default DemoStore;