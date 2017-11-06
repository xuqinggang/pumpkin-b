import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import Tag, { TagPlaceholder } from 'components/Tag/index';
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
    }
    render() {
        const clsPrefix = 'c-room-fold';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--base`}>
                    <div className={`${clsPrefix}--base-title`}>{`卧室${notSingleNum(this.props.index + 1)}`}</div>
                    <div className={`${clsPrefix}--base-info`}><span>16平米</span> | <span>南北</span></div>
                    <Button>编辑</Button>
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
            </div>
        );
    }
}

RoomFold.propTypes = {
    index: PropTypes.number.isRequired,
};

export default connect(
    (state, props) => {
        const {
            priceInfo,
            roomTag,
            brief,
        } = state.houseUpload.roomInfo[props.index];
        return {
            priceInfo,
            brief,
            tags: roomTag.active,
        };
    },
)(RoomFold);
