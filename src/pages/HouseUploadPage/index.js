import React from 'react';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import PageHeader from 'components/PageHeader/index';
import HouseEdit from 'modules/HouseEdit/index';
import Content from 'components/Content';
import PublishRentalUnit from 'modules/PublishRentalUnit/index';
import ShareRentalUnit from 'modules/ShareRentalUnit/index';
import checkAuthenticated from 'base/checkAuthenticated';
import './style.less';

class HouseUploadPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curPageType: 'EDIT',
            curTitle: '',
        };
        this.houseId = null;
        this.pages = {
            EDIT: {
                component: HouseEdit,
                title: '编辑房源',
                onNext: ({ houseId }) => {
                    // 设置houseId
                    this.houseId = houseId;
                    this.handlePageChange('PUBLISH', '上传完成');
                },
            },
            PUBLISH: {
                component: PublishRentalUnit,
                title: '发布房源',
                onNext: () => {
                    this.handlePageChange('SHARE', '发布完成');
                },
            },
            SHARE: {
                component: ShareRentalUnit,
                title: '分享房源',
                onNext: () => {},
            },
        };
    }
    handlePageChange(pageType, title) {
        this.setState({
            curPageType: pageType,
            curTitle: title,
        });
    }
    render() {
        const clsPrefix = 'p-house-upload';
        const subPage = this.pages[this.state.curPageType];

        return (
            <MainLayout
                title="南瓜租房 - 房源上传"
            >
                <div className={clsPrefix}>
                    <PageHeader>房源上传</PageHeader>
                    <Content>
                        {
                            React.createElement(subPage.component, {
                                houseId: this.houseId,
                                title: this.state.curTitle,
                                subTitle: subPage.title,
                                onNext: subPage.onNext,
                            })
                        }
                    </Content>
                </div>
            </MainLayout>
        );
    }
}

export default checkAuthenticated(HouseUploadPage);
