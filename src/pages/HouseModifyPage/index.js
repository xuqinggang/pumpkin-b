import React from 'react';
import { withRouter } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import HouseModify from 'modules/HouseModify/index';
import './style.less';

class HouseModifyPage extends BaseComponent {
    render() {
        return (
            <MainLayout
                title="南瓜租房 - 房源编辑"
            >
                <div className="p-house-modify">
                    <HouseModify />
                </div>
            </MainLayout>
        );
    }
}

export default withRouter(HouseModifyPage);
