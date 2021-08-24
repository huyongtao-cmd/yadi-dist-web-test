import React, { PureComponent } from "react";
import { history } from 'react-router-dom';
import { Spin } from 'antd';
import {
    ElCard,
    ElForm,
    ElRowContainer,
} from '@/components/el'

import * as service from '../service';
import './index.less';

import { getBaseConfig } from './config';
import AddressTable from '../../components/AddressTable'
import BankTable from '../../components/BankTable'
import LicensesTable from '../../components/LicensesTable'
interface Props {
    history: history;

}

interface State {
    type: string | 'add' | 'edit' | 'view';
    id: string | number;
    loading: boolean;
    formData: any;
}

export default class Query extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        const { path, params } = props.match;
        this.state = {
            id: params.id,
            type: 'view',
            loading: true,
            formData: {}
        }
    }

    componentDidMount() {
        const { id } = this.state;
        if (id) {
            this.getDetail(id);
        }
    }

    getDetail = async (id) => {
        const res = await service.getDetail(id);
        if (res?.success) {
            this.setState({
                loading: false,
                formData: res.data
            })
        }
    }


    render() {
        const { loading, formData, type } = this.state;
        return (
            <>
                <ElRowContainer
                    blocks={[
                        // {
                        //     text: '保存',
                        //     key: 'save',
                        //     icon: <SaveWhite />,
                        //     disabled: type === 'view',
                        //     // hidden: !isAdd,
                        //     type: 'primary',
                        //     handleClick: () => {
                        //         // this.handleReview([formData], true)
                        //     }
                        // }
                    ]}
                    position='top'
                />
                <Spin spinning={loading}>
                    <ElCard title='基本信息' className='baseData'>
                        <ElForm
                            formProps={{
                                items: getBaseConfig(),
                                labelCol: { span: 7 },
                                wrapperCol: { span: 17 }
                            }}
                            data={formData} ></ElForm>
                    </ElCard>
                    <AddressTable type={type} tableData={formData.orgAddrAddressVos} />
                    <BankTable type={type} tableData={formData.orgAddrBankAccVos} />
                    <LicensesTable type={type} tableData={formData.orgAddrQualifyVos} />
                </Spin>
            </>)
    }
}