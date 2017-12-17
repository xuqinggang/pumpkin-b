import React from 'react';
import { connect } from 'react-redux';
import { valueType } from 'base/types';
import BaseComponent from 'components/BaseComponent/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Textarea from 'components/Textarea/index';
import PropTypes from 'prop-types';
import { changeRoomBrief } from '../../actions';
import { hideValidateError } from '../../../actions';
import { validateRoomInfo } from '../../../coms/ValidateData';
import './style.less';

const validValue = (value) => {
    const maxLength = 500;
    return value.substr(0, maxLength);
};

class RoomBrief extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.brief,
            error: {
                error: false,
                message: '',
            },
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.brief !== this.props.brief) {
            this.setState({
                value: nextProps.brief,
            });
        }
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    handleBlur({ value }) {
        const error = validateRoomInfo.brief(value);
        this.setState({
            error,
        });
    }
    handleChange({ value }) {
        const val = validValue(value);
        this.setState({
            value: val,
            error: {
                ...this.state.error,
                error: false,
            },
        });
        this.props.dispatch(changeRoomBrief(this.props.roomId, { value: val }));
        this.props.dispatch(hideValidateError({ pageType: 'roomInfo' }));
    }
    render() {
        const clsPrefix = 'c-house-intro';
        return (
            <div className={clsPrefix}>
                <Textarea
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    error={this.state.error.error}
                    placeholder="请输入房源介绍（最多500字）"
                    className={`${clsPrefix}--textarea`}
                />
            </div>
        );
    }
}

RoomBrief.propTypes = {
    name: PropTypes.string,
};

RoomBrief.defaultProps = {
    name: '',
};

export default ConnectContextToProps(connect(
    (state, props) => {
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));

        const brief = state.houseUpload.roomInfo[roomIds.indexOf(props.roomId)].brief;

        let error = {
            error: false,
            message: '',
        };
        const roomInfoError = state.houseUpload.validateError.roomInfo;
        if (roomInfoError && roomInfoError.roomId === props.roomId && roomInfoError.type === 'brief') {
            error = roomInfoError;
        }

        return {
            error,
            brief,
        };
    },
)(RoomBrief), {
    roomId: valueType,
});
