import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import UploadHeader from '../coms/UploadHeader/index';
import SingleRoomInfo from './SingleRoomInfo';
import AddRoomButton from './Coms/AddRoomButton/index';
import RoomHeader from './Coms/RoomHeader/index';
import RoomFold from './Coms/RoomFold/index';
import { delRoomInfo, addRoomInfo } from './actions';
import './style.less';

class HouseUpload extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            delRoomId: -1,
            dialogHide: true,
        };
        this.autoBind(
            'handleAddRoom',
            'handleDialogConfirm',
            'handleDialogCancel',
            'handleDel',
        );
    }
    handleAddRoom() {
        this.props.dispatch(addRoomInfo());
    }
    handleDel(roomId) {
        this.setState({
            dialogHide: false,
        });
        this.handleDialogConfirm = () => {
            this.setState({
                dialogHide: true,
                delRoomId: roomId,
            });
            window.setTimeout(() => {
                this.setState({
                    delRoomId: -1,
                });
                this.props.dispatch(delRoomInfo(roomId));
            }, 500);
        };
    }
    handleDialogCancel() {
        this.setState({
            dialogHide: true,
        });
    }
    render() {
        const clsPrefix = 'c-house-info';
        const clsSingleRoom = `${clsPrefix}--single-room`;
        const { rentalType } = this.props;
        const isEntireRent = rentalType === 0;

        return (
            <div className={clsPrefix}>
                <UploadHeader>{this.props.title}</UploadHeader>
                {
                    this.props.roomIds.map(roomId => (
                        <div
                            className={classNames(clsSingleRoom, {
                                [`${clsSingleRoom}__fold`]: this.props.expandRoomId !== roomId,
                            })}
                            key={roomId}
                        >
                            <div className={`${clsSingleRoom}--expand`}>
                                {
                                    isEntireRent ? null :
                                    <RoomHeader
                                        roomId={roomId}
                                        onDel={this.handleDel}
                                    />
                                }
                                <SingleRoomInfo roomId={roomId} />
                            </div>
                            <div
                                className={`${clsSingleRoom}--fold ${this.state.delRoomId === roomId ? `${clsSingleRoom}--fold__del` : ''}`}
                            >
                                <RoomFold
                                    roomId={roomId}
                                    onDel={this.handleDel}
                                />
                            </div>
                        </div>
                    ))
                }
                {
                    isEntireRent ? null :
                    <AddRoomButton
                        onClick={this.handleAddRoom}
                    />
                }
                <ConfirmDialog
                    hide={this.state.dialogHide}
                    onConfirm={this.handleDialogConfirm}
                    onCancel={this.handleDialogCancel}
                >
                    确定要删除此房间吗？
                </ConfirmDialog>
            </div>
        );
    }
}

HouseUpload.propTypes = {
    children: PropTypes.node,
};

HouseUpload.defaultProps = {
    children: null,
};

export default connect(
    (state) => {
        let error = {
            error: false,
        };
        const roomInfoError = state.houseUpload.validateError.roomInfo;
        if (roomInfoError) {
            error = roomInfoError;
        }
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));
        let expandRoomId = -1;
        roomInfo.some((item) => {
            if (item.expand) {
                expandRoomId = item.roomId;
                return true;
            }
            return false;
        });
        const rentalType = state.houseUpload.commonInfo.rentalType;
        return {
            error,
            roomIds,
            expandRoomId,
            rentalType,
        };
    },
)(HouseUpload);
