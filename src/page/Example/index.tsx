import React from 'react'
import { inject, observer } from "mobx-react"
@inject("store")
@observer
class Example extends React.Component {
    render() {
        return (
            <>
                <div>123</div>
            </>
        )
    }
}
export default Example;