import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import Tag, { TagPlaceholder } from 'components/Tag/index';
import { switchRoomExpand } from '../../actions';
import './style.less';

const switchReturn = (value, returnValue) => {
    if (!value) return returnValue;
    return value;
};

const notSingleNum = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return `${num}`;
};

const creatNDimArray = (num, value) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(value);
    }
    return arr;
};

class RoomFold extends BaseComponent {
    constructor(props) {
        super(props);
        this.priceType = ['month', 'season', 'halfYear', 'year'];
        this.priceNames = ['月付价', '季付价', '半年价', '年付价'];
        this.autoBind('handleEditClick', 'handleDelClick');
    }
    handleEditClick() {
        this.props.dispatch(switchRoomExpand(this.props.roomId));
        this.props.onEdit(this.props.roomId);
    }
    handleDelClick() {
        this.props.onDel(this.props.roomId);
    }
    render() {
        const clsPrefix = 'c-room-fold';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--base`}>
                    <div className={`${clsPrefix}--base-title`}>{`卧室${notSingleNum(this.props.roomIndex + 1)}`}</div>
                    <div className={`${clsPrefix}--base-info`}><span>16平米</span> | <span>南北</span></div>
                </div>
                <div className={`${clsPrefix}--price`}>
                    {this.priceType.map((item, index) => (
                        <div key={index} className={`${clsPrefix}--price-item`}>
                            {`${this.priceNames[index]}：`}
                            <span className={`${clsPrefix}--price-value`}>
                                {switchReturn(this.props.priceInfo[item].price, '—')}
                            </span>
                            {'元／月； 押金：'}
                            <span className={`${clsPrefix}--price-value`}>
                                {switchReturn(this.props.priceInfo[item].deposit, '—')}
                            </span>
                            {'元'}
                        </div>
                    ))}
                </div>
                <div className={`${clsPrefix}--tags`}>
                    {
                        this.props.tags.map((item, index) => (
                            <Tag key={index} className={`${clsPrefix}--tags-tag`}>{item}</Tag>
                        ))
                    }
                    {
                        creatNDimArray(4 - this.props.tags.length, null).map((item, index) => (
                            <TagPlaceholder key={index} />
                        ))
                    }
                </div>
                <div className={`${clsPrefix}--operate`}>
                    <Button type="confirm" onClick={this.handleEditClick}>编辑</Button>
                    {
                        this.props.roomNum <= 1 ? null :
                        <Button
                            className={`${clsPrefix}--operate-btn`}
                            onClick={this.handleDelClick}
                        >删除</Button>
                    }
                </div>
            </div>
        );
    }
}

RoomFold.propTypes = {
    roomId: PropTypes.number.isRequired,
    onEdit: PropTypes.func,
    onDel: PropTypes.func,
};

RoomFold.defaultProps = {
    onEdit: () => {},
    onDel: () => {},
};

export default connect(
    (state, props) => {
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));
        const roomIndex = roomIds.indexOf(props.roomId);
        const {
            priceInfo,
            roomTag,
            brief,
        } = roomInfo[roomIndex];
        const roomNum = roomIds.length;
        return {
            priceInfo,
            brief,
            roomNum,
            roomIndex,
            tags: roomTag.active,
        };
    },
)(RoomFold);
