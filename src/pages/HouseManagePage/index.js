import React from 'react';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import HouseManageList from 'modules/HouseManageList/index';
import './style.less';

class HouseManagePage extends BaseComponent {
    render() {
        return (
            <MainLayout
                title="南瓜租房 - 房源管理"
            >
                <div className="p-house-manage">
                    <HouseManageList />
                </div>
            </MainLayout>
        );
    }
}

export default HouseManagePage;
