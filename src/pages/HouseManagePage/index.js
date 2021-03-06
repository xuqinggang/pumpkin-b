import React from 'react';
import MainLayout from 'layouts/MainLayout';
import initPage from 'base/initPage';
import BaseComponent from 'components/BaseComponent/index';
import HouseManageList from 'modules/HouseManageList/index';
import checkAuthenticated from 'base/checkAuthenticated';
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

export default checkAuthenticated(initPage(HouseManagePage));
