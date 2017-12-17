import React from 'react';
import PropTypes from 'prop-types';
import { valueType } from 'base/types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import Tag from 'components/Tag/index';
import PriceDisplay from '../PriceDisplay';
import DepositDisplay from '../DepositDisplay';
import { switchRoomExpand } from '../../actions';
import directMap from '../../directMap';
import './style.less';

const notSingleNum = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return `${num}`;
};

class RoomFold extends BaseComponent {
    constructor(props) {
        super(props);
        this.priceType = ['season', 'month', 'halfYear', 'year'];
        this.priceNames = ['季付价', '月付价', '半年价', '年付价'];
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
        const { allTag, tagValues } = this.props;
        const allTagValues = allTag.map(item => (item.value));
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--base`}>
                    <div className={`${clsPrefix}--base-title`}>{`卧室${notSingleNum(this.props.roomIndex + 1)}`}</div>
                    <div className={`${clsPrefix}--base-info`}>
                        <span>
                            {this.props.roomArea}平米
                        </span> | <span>{directMap[this.props.direct]}</span>
                    </div>
                </div>
                <div className={`${clsPrefix}--price`}>
                    {this.priceType.map((item, index) => (
                        <div key={index} className={`${clsPrefix}--price-item`}>
                            {`${this.priceNames[index]}：`}
                            <div
                                className={`${clsPrefix}--price-price`}
                            >
                                <PriceDisplay
                                    empty={!this.props.priceInfo[item].checked
                                    || this.props.priceInfo[item].price === ''}
                                >
                                    {this.props.priceInfo[item].price}
                                </PriceDisplay>
                            </div>
                            {'元／月； 押金：'}
                            <div className={`${clsPrefix}--price-deposit`}>
                                <DepositDisplay
                                    empty={!this.props.priceInfo[item].checked
                                    || this.props.priceInfo[item].deposit === ''}
                                >
                                    {this.props.priceInfo[item].deposit}
                                </DepositDisplay>
                            </div>
                            {'元'}
                        </div>
                    ))}
                </div>
                <div className={`${clsPrefix}--tags`}>
                    {
                        tagValues.map((tagVal, index) => (
                            <Tag key={index} className={`${clsPrefix}--tags-tag`}>
                                {
                                    allTagValues.indexOf(tagVal) === -1
                                    ? '未知标签'
                                    : allTag[allTagValues.indexOf(tagVal)].text
                                }
                            </Tag>
                        ))
                    }
                </div>
                <div className={`${clsPrefix}--operate`}>
                    <Button type="confirm" onClick={this.handleEditClick}>编辑</Button>
                    {
                        this.props.roomNum <= 1 || !this.props.offline ? null :
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
    roomId: valueType.isRequired,
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
            offline,
            roomArea,
            direct,
        } = roomInfo[roomIndex];
        const roomNum = roomIds.length;

        const { allTag } = state.houseUpload.roomTags;
        return {
            priceInfo,
            brief,
            roomArea,
            direct,
            offline,
            roomNum,
            roomIndex,
            allTag,
            tagValues: roomTag.active,
        };
    },
)(RoomFold);
