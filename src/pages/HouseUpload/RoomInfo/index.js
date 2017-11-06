import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import UploadHeader from '../Coms/UploadHeader/index';
import SingleRoomInfo from './SingleRoomInfo';
import AddRoomButton from './Coms/AddRoomButton/index';
import RoomHeader from './Coms/RoomHeader/index';
import RoomFold from './Coms/RoomFold/index';
import './style.less';

const creatNDimArray = (num, value) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(value);
    }
    return arr;
};

const notSingleNum = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return `${num}`;
};

class HouseUpload extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            editing: 0,
        };
        this.autoBind('handleAddRoom');
    }
    handleAddRoom() {
        this.setState({
            editing: this.props.roomNum,
        });
    }
    render() {
        const clsPrefix = 'c-house-info';
        const clsSingleRoom = `${clsPrefix}--single-room`;

        return (
            <div className={clsPrefix}>
                <UploadHeader>房间信息</UploadHeader>

                {
                    creatNDimArray(this.props.roomNum, null).map((item, index) => (
                        <div
                            className={classNames(clsSingleRoom, {
                                [`${clsSingleRoom}__fold`]: this.state.editing !== index,
                            })}
                            key={index}
                        >
                            <div className={`${clsSingleRoom}--expand`}>
                                <RoomHeader>{`卧室 ${notSingleNum(index + 1)}`}</RoomHeader>
                                <SingleRoomInfo index={index} />
                            </div>
                            <div className={`${clsSingleRoom}--fold`}>
                                <RoomFold index={index} />
                            </div>
                        </div>

                    ))
                }
                <AddRoomButton
                    onClick={this.handleAddRoom}
                />
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
        const roomNum = state.houseUpload.roomInfo.length;
        return {
            roomNum,
        };
    },
)(HouseUpload);
