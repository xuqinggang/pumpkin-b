import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const UploadHeader = ({ children }) => (
    <div className="c-upload-header">{children}</div>
);

UploadHeader.propTypes = {
    children: PropTypes.node,
};

UploadHeader.defaultProps = {
    children: null,
};

export default UploadHeader;
