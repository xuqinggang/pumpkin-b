import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import { FormItem } from 'components/Form/index';
import Input from 'components/Input/index';
import NoteWord from '../../../coms/NoteWord/index';
import { setRoomArea } from '../../actions';
import { hideValidateError } from '../../../actions';
import { validateRoomInfo } from '../../../coms/ValidateData';

class RoomArea extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
            },
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    handleBlur({ value }) {
        const error = validateRoomInfo.roomArea(value);
        this.setState({
            error,
        });
        if (error.error) {
            // 非法string 置空
            this.props.dispatch(setRoomArea(this.props.roomId, { value: '' }));
        } else {
            // 保留一位小数
            this.props.dispatch(
                setRoomArea(this.props.roomId, {
                    value: Number(value).toFixed(1),
                }),
            );
        }
    }
    handleChange({ value }) {
        this.setState({
            error: {
                error: false,
                message: '',
            },
        });
        this.props.dispatch(setRoomArea(this.props.roomId, { value }));
        this.props.dispatch(hideValidateError({ pageType: 'roomInfo' }));
    }
    render() {
        const clsPrefix = 'c-room-area';
        return (
            <div className={clsPrefix}>
                <FormItem
                    label="房间面积"
                    error={this.state.error}
                >
                    <Input
                        value={this.props.roomArea}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={this.state.error.error}
                    />
                    <NoteWord>平米</NoteWord>
                </FormItem>
            </div>
        );
    }
}

export default ConnectContextToProps(connect(
    (state, props) => {
        let error = {
            error: false,
            message: '',
        };
        const roomInfoError = state.houseUpload.validateError.roomInfo;
        if (roomInfoError && roomInfoError.roomId === props.roomId && roomInfoError.type === 'roomArea') {
            error = roomInfoError;
        }

        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));

        const roomArea = roomInfo[roomIds.indexOf(props.roomId)].roomArea;
        return {
            error,
            roomArea,
        };
    },
)(RoomArea), {
    roomId: PropTypes.number,
});
