import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import errorNote from 'base/errorNote';
import BaseComponent from 'components/BaseComponent/index';
import { showMessage } from 'modules/Message/actions';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import { splitArrayWithIndex } from 'utils/index';
import { rentUnitType } from 'base/types';
import {
    showStatusChangeDialog,
    updateRentalUnitStatus,
    showShareLinkDialog,
} from '../HouseManageList/actions';
import './style.less';

class RoomStatusManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.operates = [
            {
                type: 'PUBLISHED',
                text: '发布',
            }, {
                type: 'OCCUPIED',
                text: '入住',
            }, {
                type: 'OFFLINE',
                text: '下架',
            }, {
                // 目前需求不做
                type: 'DELETE',
                text: '删除',
            }, {
                type: 'SHARE',
                text: '分享',
            }];
        this.statusMapOperates = {
            FINISHED: {
                text: '待发布',
                operates: splitArrayWithIndex(this.operates, 0),
            },
            PUBLISHED: {
                text: '已发布',
                operates: splitArrayWithIndex(this.operates, 1, 2, 4),
            },
            OCCUPIED: {
                text: '已入住',
                operates: splitArrayWithIndex(this.operates, 0),
            },
            OFFLINE: {
                text: '已下架',
                operates: splitArrayWithIndex(this.operates, 0),
            },
        };

        this.autoBind('handleClick');
    }
    handleClick(type) {
        return () => {
            if (type === 'SHARE') {
                axios.get('/v1/rentUnit/shareUrls', {
                    params: {
                        rentUnitIds: this.props.renUnit.id,
                    },
                })
                .then((res) => {
                    if (res.data.code === 200) {
                        const url = res.data.data.shareUrls[0];
                        this.props.dispatch(showShareLinkDialog(url));
                        return 'SUCCESS';
                    }
                    return 'FAILED';
                })
                .catch(() => ('FAILED'))
                .then((fetchType) => {
                    if (fetchType === 'FAILED') {
                        this.props.dispatch(showMessage('获取分享链接失败'));
                    }
                });

                return;
            }
            this.props.dispatch(showStatusChangeDialog(type, ({ value }) => {
                // TODO: 针对不同的type发送请求
                axios.put(`/v1/rentUnits/${this.props.renUnit.id}/houseStatus`, {
                    status: type,
                    ...(type === 'OCCUPIED' ? { gender: value } : {}),
                })
                .then((res) => {
                    if (res.data.code === 200) {
                        this.props.dispatch(updateRentalUnitStatus(
                            this.props.houseId,
                            this.props.renUnit.id,
                            type));
                    } else {
                        this.props.dispatch(showMessage(res.data.msg));
                    }
                })
                .catch((e) => {
                    const response = e.response;
                    let msg = errorNote.OTHER_ERR;
                    if (!response) {
                        msg = errorNote.NETWORK_ERR;
                    } else if (errorNote[response.status]) {
                        msg = errorNote[response.status];
                    }
                    this.props.dispatch(showMessage(msg));
                });
            }));
        };
    }
    render() {
        const clsPreix = 'm-room-status-manage';
        const cls = classNames(clsPreix, {
            [`${clsPreix}__${this.props.renUnit.status.toLowerCase()}`]: true,
        });
        const curOperates = this.statusMapOperates[this.props.renUnit.status];
        return (
            <div className={cls}>
                <div
                    className={classNames(`${clsPreix}--title`, {
                        [`${clsPreix}--title__whole`]: this.props.rentalType === 'WHOLE',
                    })}
                >
                    {this.props.title}
                </div>
                <div className={`${clsPreix}--status`}>
                    <i className={`${clsPreix}--indicator`} />
                    <span>{curOperates.text}</span>
                </div>
                <div className={`${clsPreix}--operate`}>
                    {
                        curOperates.operates.map(item => (
                            <button
                                key={item.text}
                                className={`${clsPreix}--btn`}
                                onClick={this.handleClick(item.type)}
                            >{item.text}</button>
                        ))
                    }
                </div>
            </div>
        );
    }
}

RoomStatusManage.defaultProps = {
    title: '',
    renUnit: rentUnitType.isRequired,
    rentalType: 'SHARED',
};

RoomStatusManage.propTypes = {
    title: PropTypes.string,
    rentalType: PropTypes.oneOf(['SHARED', 'WHOLE']),
};

export default ConnectContextToProps(connect(
    (state, props) => ({
        houseId: props.houseId,
    }),
)(RoomStatusManage), {
    houseId: PropTypes.number,
});
