import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import UploadHeader from '../Coms/UploadHeader/index';
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
            editingRoomKey: 0,
            dialogHide: true,
        };
        this.autoBind(
            'handleAddRoom',
            'handleEdit',
            'handleDialogConfirm',
            'handleDialogCancel',
            'handleDel',
        );
    }
    componentWillReceiveProps(nextProps) {
        let { editingRoomKey } = this.state;
        if (nextProps.roomKeys.length === 1) {
            editingRoomKey = nextProps.roomKeys[0];
        }
        // 房间增加
        if (nextProps.roomKeys.length > this.props.roomKeys.length) {
            editingRoomKey = nextProps.roomKeys[nextProps.roomKeys.length - 1];
        }

        this.setState({
            editingRoomKey,
        });
    }
    handleAddRoom() {
        this.props.dispatch(addRoomInfo());
    }
    handleEdit(roomIndex) {
        this.setState({
            editingRoomKey: this.props.roomKeys[roomIndex],
        });
    }
    delAnimation(roomIndex) {

    }
    handleDel(roomIndex) {
        this.setState({
            dialogHide: false,
        });
        this.handleDialogConfirm = () => {
            this.setState({
                dialogHide: true,
            });
            this.props.dispatch(delRoomInfo(roomIndex));
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
                    this.props.roomKeys.map((key, index) => (
                        <div
                            className={classNames(clsSingleRoom, {
                                [`${clsSingleRoom}__fold`]: this.state.editingRoomKey !== key,
                            })}
                            key={key}
                        >
                            <div className={`${clsSingleRoom}--expand`}>
                                {
                                    isEntireRent ? null :
                                    <RoomHeader
                                        index={index}
                                        onDel={this.handleDel}
                                    />
                                }
                                <SingleRoomInfo index={index} />
                            </div>
                            <div className={`${clsSingleRoom}--fold`}>
                                <RoomFold
                                    index={index}
                                    onEdit={this.handleEdit}
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
        const roomKeys = state.houseUpload.roomInfo.map(item => (item.key));
        const rentalType = state.houseUpload.commonInfo.rentalType;
        return {
            roomKeys,
            rentalType,
        };
    },
)(HouseUpload);
