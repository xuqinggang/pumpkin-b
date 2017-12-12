import React from 'react';
import { withRouter } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import HouseModifyHeader from 'modules/HouseModifyHeader/index';
import HouseEdit from 'modules/HouseEdit/index';
import PublishRentalUnit from 'modules/PublishRentalUnit/index';
import ShareRentalUnit from 'modules/ShareRentalUnit/index';
import { decodeQuerySting } from 'utils/index';
import checkAuthenticated from 'base/checkAuthenticated';
import './style.less';

class HouseModifyPage extends BaseComponent {
    constructor(props) {
        super(props);
        const search = decodeQuerySting(this.props.history.location.search);
        this.houseId = Number(search.houseId);
        this.state = {
            curPageType: 'EDIT',
            curTitle: '',
        };
        this.pages = {
            EDIT: {
                component: HouseEdit,
                title: '编辑房源',
                onNext: ({ isAllPublished }) => {
                    this.handlePageChange(
                        isAllPublished ? 'SHARE' : 'PUBLISH',
                        '修改完成',
                    );
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
        const subPage = this.pages[this.state.curPageType];
        return (
            <MainLayout
                title="南瓜租房 - 房源编辑"
            >
                <div className="p-house-modify">
                    <HouseModifyHeader houseId={this.houseId} />
                    {
                        React.createElement(subPage.component, {
                            houseId: this.houseId,
                            title: this.state.curTitle,
                            subTitle: subPage.title,
                            onNext: subPage.onNext,
                        })
                    }
                </div>
            </MainLayout>
        );
    }
}

export default checkAuthenticated(withRouter(HouseModifyPage));
