import React from 'react';
import Button from 'components/Button/index';
import PropTypes from 'prop-types';
import './style.less';

const UploadButton = ({ children }) => {
    const clsPrefix = 'c-upload-button';
    return (
        <div className={clsPrefix}>
            <Button size="large" className={`${clsPrefix}--button`}>{children}</Button>
        </div>
    );
};

UploadButton.propTypes = {
    children: PropTypes.node,
};

UploadButton.defaultProps = {
    children: null,
};

export default UploadButton;
