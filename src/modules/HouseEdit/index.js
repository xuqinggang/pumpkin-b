import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import initPage from 'base/initPage';
import { withRouter } from 'react-router-dom';
import Content from 'components/Content';
import BaseComponent from 'components/BaseComponent/index';
import StepNav from 'components/StepNav/index';
import houseLocalStorage from './houseLocalStorage';
import StepButton from './coms/StepButton/index';
import LeavePrompt from './coms/LeavePrompt/index';
import EnterPrompt from './coms/EnterPrompt/index';
import { isDataInput } from './coms/ValidateData/index';
import BaseInfo from './BaseInfo/index';
import HousePics from './HousePics/index';
import RoomInfo from './RoomInfo/index';
import HouseDeploy from './HouseDeploy/index';
import { fetchHouseEditData, hideValidateError, resetState } from './actions';

class HouseUpload extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            curPage: 1,
            enterBlock: false,
            leaveBlock: true,
        };

        this.pageInfo = [
            {
                type: 'baseInfo',
                component: initPage(BaseInfo),
                describe: '基本信息',
            }, {
                type: 'roomInfo',
                component: initPage(RoomInfo),
                describe: '房间信息',
            }, {
                type: 'housePics',
                component: initPage(HousePics),
                describe: '房源照片',
            }, {
                type: 'houseDeploy',
                component: initPage(HouseDeploy),
                describe: '房源配置',
            },
        ];

        this.autoBind(
            'handleNextStep',
            'handlePrevStep',
            'handleDialogCancel',
            'handleDialogConfirm',
            'handleSubmitSuccess',
            'handlePageUnmount',
        );
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.houseId !== nextProps.houseId) {
            this.props.dispatch(fetchHouseEditData(nextProps.houseId));
        }
    }
    handleNextStep() {
        const curPage = this.state.curPage;
        this.setState({
            curPage: curPage === this.pageInfo.length ? curPage : curPage + 1,
        }, () => {
            this.props.dispatch(
                hideValidateError({
                    pageType: this.pageInfo[this.state.curPage - 1].type,
                }),
            );
        });
    }
    handlePrevStep() {
        const curPage = this.state.curPage;
        this.setState({
            curPage: curPage === 0 ? curPage : curPage - 1,
        });
    }
    handleSubmitSuccess({ type, houseId }) {
        const { isAllPublished } = this.props.houseState;
        this.setState({
            leaveBlock: false,
        }, () => {
            this.props.onNext({
                houseId,
                isAllPublished,
            });
            // this.props.history.push({
            //     pathname: '/house-manage',
            // });
        });

        // clear localStorage about house info
        if (type === 'NEW') {
            houseLocalStorage.clear();
        }
    }
    showEnterPrompt() {
        this.setState({
            enterBlock: true,
        });
    }
    handlePageUnmount(e) {
        const tip = '系统可能不会保存您所做的更改';
        e.returnValue = tip;

        // 离开页面保存数据
        const houseState = this.props.houseState;
        if (this.props.houseId === null && isDataInput(houseState)) {
            // for new and data change
            houseLocalStorage.set(houseState);
        }
        return tip;
    }
    handleInitPage() {
        const localHouseState = houseLocalStorage.get();

        if (this.props.houseId === null && localHouseState) {
            // for new and localStorage
            this.showEnterPrompt();
        }
        // 编辑请求房源数据
        if (this.props.houseId) {
            this.props.dispatch(fetchHouseEditData(this.props.houseId));
        }
    }

    componentDidMount() {
        this.handleInitPage();

        // 只在离开页面时保存数据
        window.addEventListener('beforeunload', this.handlePageUnmount);
    }
    componentWillUnmount() {
        this.props.dispatch(resetState());
        window.removeEventListener('beforeunload', this.handlePageUnmount);
    }
    render() {
        const clsPrefix = 'm-house-edit';
        const itemComponent = this.pageInfo[this.state.curPage - 1];
        return (
            <div className={clsPrefix}>
                {
                    this.props.houseId
                    ? null :
                    <StepNav
                        steps={this.pageInfo.map(item => (item.describe))}
                        curStep={this.state.curPage}
                    />
                }

                <Content>
                    <div>
                        {
                            React.createElement(itemComponent.component, {
                                title: itemComponent.describe,
                            })
                        }
                        <StepButton
                            curPage={this.state.curPage}
                            totalPage={this.pageInfo.length}
                            onNext={this.handleNextStep}
                            onPrev={this.handlePrevStep}
                            onSubmit={{ success: this.handleSubmitSuccess }}
                            pageType={this.pageInfo[this.state.curPage - 1].type}
                        />
                    </div>
                </Content>
                <EnterPrompt when={this.state.enterBlock} />
                <LeavePrompt when={this.state.leaveBlock} />
            </div>
        );
    }
}

HouseUpload.defaultProps = {
    houseId: null,
    onNext: () => {},
};
HouseUpload.propTypes = {
    houseId: PropTypes.number,
    onNext: PropTypes.func,
};

export default connect(
    state => ({
        houseState: state.houseUpload,
    }),
)(withRouter(HouseUpload));
