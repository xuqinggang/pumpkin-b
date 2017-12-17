import React from 'react';
import PropTypes from 'prop-types';
import { valueType } from 'base/types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

const notSingleNum = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return `${num}`;
};

class RoomHeader extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleDelClick');
    }
    handleDelClick() {
        this.props.onDel(this.props.roomId);
    }
    render() {
        const clsPrefix = 'c-room-header';
        const roomIndex = this.props.roomIds.indexOf(this.props.roomId);
        return (
            <div className={clsPrefix}>
                <i className={`${clsPrefix}--icon`} />
                <span className={`${clsPrefix}--text`}>{`卧室 ${notSingleNum(roomIndex + 1)}`}</span>
                {
                    this.props.roomNum <= 1 || !this.props.offline ? null :
                    <i
                        role="button"
                        tabIndex={0}
                        className={`${clsPrefix}--del icon-delete`}
                        onClick={this.handleDelClick}
                    />
                }
            </div>
        );
    }
}

RoomHeader.defaultProps = {
    children: null,
    onDel: () => {},
};

RoomHeader.propTypes = {
    children: PropTypes.node,
    onDel: PropTypes.func,
    roomId: valueType.isRequired,
};

export default connect(
    (state, props) => {
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));
        const roomIndex = roomIds.indexOf(props.roomId);

        const roomNum = roomIds.length;
        const {
            offline,
        } = roomInfo[roomIndex];

        return {
            offline,
            roomNum,
            roomIds,
        };
    },
)(RoomHeader);
