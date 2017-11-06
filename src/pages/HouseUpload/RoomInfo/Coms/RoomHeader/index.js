import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const RoomHeader = ({ children }) => {
    const clsPrefix = 'c-room-header';
    return (
        <div className={clsPrefix}>
            <i className={`${clsPrefix}--icon`} />
            <span className={`${clsPrefix}--text`}>{children}</span>
        </div>
    );
};

RoomHeader.defaultProps = {
    children: null,
};

RoomHeader.propTypes = {
    children: PropTypes.node,
};

export default RoomHeader;
