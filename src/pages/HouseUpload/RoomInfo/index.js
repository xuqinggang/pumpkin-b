import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import UploadHeader from '../Coms/UploadHeader/index';
import SingleRoomInfo from './SingleRoomInfo';
import AddRoomButton from '../Coms/AddRoomButton/index';
import './style.less';

const creatNDimArray = (num, value) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(value);
    }
    return arr;
};

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-info';

        return (
            <div className={clsPrefix}>
                <UploadHeader>房间信息</UploadHeader>
                {
                    creatNDimArray(this.props.roomNum, null).map((item, index) => (
                        <SingleRoomInfo index={index} key={index} />
                    ))
                }
                <AddRoomButton />
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
