import React from 'react';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import PageHeader from 'components/PageHeader/index';
import HouseEdit from 'modules/HouseEdit/index';
import checkAuthenticated from 'base/checkAuthenticated';
import './style.less';

class HouseUploadPage extends BaseComponent {
    render() {
        const clsPrefix = 'p-house-upload';
        return (
            <MainLayout
                title="南瓜租房 - 房源上传"
            >
                <div className={clsPrefix}>
                    <PageHeader>房源上传</PageHeader>
                    <HouseEdit />
                </div>
            </MainLayout>
        );
    }
}

export default checkAuthenticated(HouseUploadPage);
