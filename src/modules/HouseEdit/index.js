import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import StepNav from 'components/StepNav/index';
import StepButton from './Coms/StepButton/index';
import BaseInfo from './BaseInfo/index';
import HousePics from './HousePics/index';
import RoomInfo from './RoomInfo/index';
import HouseDeploy from './HouseDeploy/index';
import { initHouseEditData } from './actions';
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
    componentDidMount() {
        this.props.dispatch(initHouseEditData(this.props.houseId));
    }
    componentWillUnmount() {
        // 清空数据
        this.props.dispatch(initHouseEditData(false));
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

                <div
                    className={`${clsPrefix}--subPage`}
                >
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
                        pageType={this.pageInfo[this.state.curPage - 1].type}
                    />
                </div>
            </div>
        );
    }
}

HouseUpload.defaultProps = {
    houseId: null,
};
HouseUpload.propTypes = {
    houseId: PropTypes.number,
};

export default connect()(HouseUpload);
