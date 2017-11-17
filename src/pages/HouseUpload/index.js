import React from 'react';
import { connect } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import PageHeader from 'components/PageHeader/index';
import StepNav from 'components/StepNav/index';
import StepButton from './Coms/StepButton/index';
import BaseInfo from './BaseInfo/index';
import HousePics from './HousePics/index';
import RoomInfo from './RoomInfo/index';
import HouseDeploy from './HouseDeploy/index';
import './style.less';

class HouseUpload extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
        };
        this.pageInfo = [
            {
                type: 'baseInfo',
                component: BaseInfo,
                describe: '基本信息',
            }, {
                type: 'roomInfo',
                component: RoomInfo,
                describe: '房间信息',
            }, {
                type: 'housePics',
                component: HousePics,
                describe: '房源照片',
            }, {
                type: 'houseDeploy',
                component: HouseDeploy,
                describe: '房源配置',
            },
        ];

        this.autoBind('handleNextStep', 'handlePrevStep');
    }
    handleNextStep() {
        const curPage = this.state.curPage;
        this.setState({
            curPage: curPage === this.pageInfo.length ? curPage : curPage + 1,
        });
    }
    handlePrevStep() {
        const curPage = this.state.curPage;
        this.setState({
            curPage: curPage === 0 ? curPage : curPage - 1,
        });
    }
    render() {
        const clsPrefix = 'p-house-upload';
        const itemComponent = this.pageInfo[this.state.curPage - 1];
        return (
            <MainLayout>
                <div className={clsPrefix}>
                    <PageHeader>房源上传</PageHeader>
                    <StepNav
                        steps={this.pageInfo.map(item => (item.describe))}
                        curStep={this.state.curPage}
                    />
                    <div
                        className={`${clsPrefix}--subPage`}
                    >
                        {
                            this.pageInfo.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ display: `${index + 1 === this.state.curPage ? 'block' : 'none'}` }}
                                >
                                    {
                                        React.createElement(item.component, {
                                            title: item.describe,
                                        })
                                    }
                                </div>
                            ))
                        }
                        <StepButton
                            curPage={this.state.curPage}
                            totalPage={this.pageInfo.length}
                            onNext={this.handleNextStep}
                            onPrev={this.handlePrevStep}
                            pageType={this.pageInfo[this.state.curPage - 1].type}
                        />
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default connect()(HouseUpload);
