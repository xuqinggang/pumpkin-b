import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ConvtCatchNetErrorMessage } from 'base/errorNote';
import BaseComponent from 'components/BaseComponent/index';
import { showMessage } from 'modules/Message/actions';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import roomStatusMap from 'base/roomStatusMap';
import { valueType, rentUnitType } from 'base/types';
import {
    showStatusChangeDialog,
    updateRentalUnitStatus,
    showShareLinkDialog,
} from '../HouseManageList/actions';
import './style.less';

class RoomStatusManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.roomStatusMap = roomStatusMap;

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
                    const msg = ConvtCatchNetErrorMessage(e);
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
        const curStatus = this.roomStatusMap[this.props.renUnit.status];
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
                    <span>{curStatus.text}</span>
                </div>
                <div className={`${clsPreix}--operate`}>
                    {
                        curStatus.operates.map(item => (
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
    houseId: valueType,
});
