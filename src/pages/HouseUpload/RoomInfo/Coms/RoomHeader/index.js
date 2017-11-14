import React from 'react';
import PropTypes from 'prop-types';
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
                    this.props.roomNum <= 1 ? null :
                    <i
                        role="button"
                        tabIndex={0}
                        className={`${clsPrefix}--del`}
                        onClick={this.handleDelClick}
                    >删除</i>
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
    roomId: PropTypes.number.isRequired,
};

export default connect(
    (state) => {
        const roomIds = state.houseUpload.roomInfo.map(item => (item.roomId));
        const roomNum = roomIds.length;

        return {
            roomNum,
            roomIds,
        };
    },
)(RoomHeader);
