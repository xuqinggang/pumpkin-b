import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import UploadHeader from '../coms/UploadHeader/index';
import SingleRoomInfo from './SingleRoomInfo';
import AddRoomButton from './coms/AddRoomButton/index';
import RoomFold from './coms/RoomFold/index';
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
    handleDel(roomStatus) {
        return (roomId) => {
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
                }, roomStatus === 'fold' ? 500 : 0);
            };
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
                                <SingleRoomInfo
                                    roomId={roomId}
                                    showHeader={!isEntireRent}
                                    onDel={this.handleDel('expand')}
                                />
                            </div>
                            <div
                                className={`${clsSingleRoom}--fold ${this.state.delRoomId === roomId ? `${clsSingleRoom}--fold__del` : ''}`}
                            >
                                <RoomFold
                                    roomId={roomId}
                                    onDel={this.handleDel('fold')}
                                />
                            </div>
                        </div>
                    ))
                }
                {
                    (isEntireRent || this.props.houseType.room <= this.props.roomIds.length)
                        ? null
                        : (
                            <AddRoomButton
                                onClick={this.handleAddRoom}
                            />
                        )
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
        const { rentalType, houseType } = state.houseUpload.commonInfo;
        return {
            error,
            roomIds,
            expandRoomId,
            rentalType,
            houseType,
        };
    },
)(HouseUpload);
