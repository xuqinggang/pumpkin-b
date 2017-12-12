import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
        this.setState({
            isPublishLoading: true,
        });
        axios.put('/v1/rentUnits/houseStatus',
            this.state.unitStatus.filter(value => (value.checked)).map(item => ({
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
    handleReturnBack() {
        this.props.history.push('/house-manage');
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
        return (
            <div>
                <div className={`${clsPrefix}--titles`}>
                    <h2 className={`${clsPrefix}--title`}>房源{this.props.title}</h2>
                    <span className={`${clsPrefix}--subTitle`}>你可以去{this.props.subTitle}啦~ </span>
                </div>
                <div
                    className={`${clsPrefix}--units`}
                >
                    {
                        this.state.unitStatus.map((item, index) => (
                            <Checkbox
                                key={item.id}
                                className={`${clsPrefix}--unit`}
                                checked={item.checked}
                                onChange={this.handleCheck(item)}
                                disabled={item.status === 'PUBLISHED'}
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
            </div>
        );
    }
}

PublishRentalUnit.propTypes = {
    houseId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
};

export default withRouter(PublishRentalUnit);
