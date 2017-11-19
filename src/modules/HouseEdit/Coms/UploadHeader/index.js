import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const UploadHeader = ({ children }) => {
    const clsPrefix = 'c-upload-header';
    return (
        <div className={clsPrefix}>
            {children}
        </div>
    );
};

UploadHeader.propTypes = {
    children: PropTypes.node,
};

UploadHeader.defaultProps = {
    children: null,
};

export default UploadHeader;
