import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import roomStatusMap from 'base/roomStatusMap';
import { showMessage } from 'modules/Message/actions';
import { valueType } from 'base/types';
import classNames from 'classnames';
import Content from 'components/Content';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ConfirmDialog from 'components/ConfirmDialog/index';
import BaseComponent from 'components/BaseComponent/index';
import Checkbox from 'components/Checkbox/index';
import Button from 'components/Button/index';
import { expandSingleNum } from 'utils/index';
import './style.less';

class PublishRentalUnit extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            unitStatus: [],
            isPublishLoading: false,
            dialogHide: true,
        };
        this.canPublish = (unitStatus) => {
            const canPublishStatus = [
                'FINISHED',
                'OFFLINE',
                'OCCUPIED',
            ];
            return canPublishStatus.indexOf(unitStatus) !== -1;
        };
        this.autoBind(
            'handleCheck',
            'handleReturnBack',
            'handlePublish',
            'handleDialogConfirm',
            'handleDialogCancel',
        );
    }
    handleCheck(item) {
        return ({ checked }) => {
            this.setState({
                unitStatus: this.state.unitStatus.map(unit => ({
                    ...unit,
                    ...(item.id === unit.id ? { checked } : {}),
                })),
            });
        };
    }
    handlePublish() {
        const readyPublishUnits = this.state.unitStatus.filter(value => (value.checked));
        if (readyPublishUnits.length === 0) {
            this.props.dispatch(showMessage('请选择要发布的房间'));
            return;
        }

        this.setState({
            isPublishLoading: true,
        });
        axios.put('/v1/rentUnits/houseStatus',
            readyPublishUnits.map(item => ({
                id: item.id,
                status: 'PUBLISHED',
            })),
        )
            .then((res) => {
                if (res.data.code === 200) {
                    return new Promise((resolve) => {
                        resolve('SUCCESS');
                    });
                }
                return new Promise((resolve) => {
                    resolve('FAILED');
                });
            })
            .catch(() => (
                new Promise((resolve) => {
                    resolve('FAILED');
                })
            ))
            .then(netStatus => (
                new Promise((resolve) => {
                    this.setState({
                        isPublishLoading: false,
                    }, () => {
                        resolve(netStatus);
                    });
                })
            ))
            .then((netStatus) => {
                if (netStatus === 'SUCCESS') {
                    this.props.onNext();
                }
            });
    }
    handleDialogConfirm() {
        this.setState({
            dialogHide: true,
        }, () => {
            this.props.history.push('/house-manage');
        });
    }
    handleDialogCancel() {
        this.setState({
            dialogHide: true,
        });
    }
    handleReturnBack() {
        this.setState({
            dialogHide: false,
        });
    }
    componentDidMount() {
        axios.get(`/v1/houses/${this.props.houseId}/houseStatus`)
            .then((res) => {
                if (res.data.code === 200) {
                    const unitStatus = res.data.data.map(unit => ({
                        id: unit.id,
                        status: unit.status,
                        ...(this.canPublish(unit.status) ? { checked: true } : { checked: false }),
                    }));
                    this.setState({
                        unitStatus,
                    });
                }
            });
    }
    render() {
        const clsPrefix = 'm-publish-rental-unit';
        const unitsCls = classNames(`${clsPrefix}--units`, {
            [`${clsPrefix}--units__center`]: this.state.unitStatus.length < 3,
        });
        return (
            <Content>
                <div className={`${clsPrefix}--titles`}>
                    <h2 className={`${clsPrefix}--title`}>房源{this.props.title}</h2>
                    <span className={`${clsPrefix}--subTitle`}>你可以去{this.props.subTitle}啦~ </span>
                </div>
                <div
                    className={unitsCls}
                >
                    {
                        this.state.unitStatus.map((item, index) => (
                            <Checkbox
                                key={item.id}
                                className={`${clsPrefix}--unit`}
                                checked={item.checked}
                                onChange={this.handleCheck(item)}
                                disabled={item.status === 'PUBLISHED'}
                                title={
                                    roomStatusMap[item.status].text
                                    || roomStatusMap.UNKNOWN.text
                                }
                            >卧室{expandSingleNum(index + 1)}</Checkbox>
                        ))
                    }
                </div>
                <div className={`${clsPrefix}--btns`}>
                    <Button
                        type="confirm"
                        size="huge"
                        className={`${clsPrefix}--btn`}
                        onClick={this.handlePublish}
                        disabled={this.state.isPublishLoading}
                    >一键发布</Button>
                    <Button
                        className={`${clsPrefix}--btn`}
                        size="huge"
                        onClick={this.handleReturnBack}
                    >返回房源管理</Button>
                </div>
                <ConfirmDialog
                    hide={this.state.dialogHide}
                    onConfirm={this.handleDialogConfirm}
                    onCancel={this.handleDialogCancel}
                    onClose={this.handleDialogCancel}
                >
                    <div
                        className={`${clsPrefix}--dialog-content`}
                    >您有房源未发布，用户将无法在南瓜租房上查找到，确定离开吗？</div>
                </ConfirmDialog>
            </Content>
        );
    }
}

PublishRentalUnit.propTypes = {
    houseId: valueType.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
};

export default connect()(withRouter(PublishRentalUnit));
