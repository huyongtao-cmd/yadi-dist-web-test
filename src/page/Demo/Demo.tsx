import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import DemoStore from './Demo.store'

@inject('store')
@observer
class Demo extends Component<any> {
    store:any
    testName: number

    constructor(props){
        super(props);
        // 创建页面自己的store
        this.store = new DemoStore();
        this.testName = 0;
    }

    handleClick=(e)=>{
        this.testName++;
        // 使用props回调修改公共store里的变量
        this.props.store.changeAppName('中燃B2C'+this.testName)
    }

    handeDecreaseClick=(e)=>{
        this.store.decreaseCount();
    }

    handeIncreaseClick=(e)=>{
        this.store.increaseCount();
    }

    render() {
        return (
            <div>
                <div>from inject value {this.props.store.appName}</div>
                <button onClick={this.handleClick}>改变名称</button>
                <button onClick={this.handeDecreaseClick}>-</button>
                test count: {this.store.count}
                <button onClick={this.handeIncreaseClick}>+</button>
            </div>
        )
    }
}
export default Demo;