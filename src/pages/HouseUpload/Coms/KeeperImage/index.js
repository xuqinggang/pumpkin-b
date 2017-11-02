import React from 'react';
import UploadImage from 'components/UploadImage/index';
import PropTypes from 'prop-types';
import './style.less';

const UploadButton = ({ picUrl, onSelect, error }) => {
    const clsPrefix = 'c-keeper-image';
    return (
        <div className={clsPrefix}>
            <UploadImage
                picUrl={picUrl}
                error={error}
                onSelect={onSelect}
            >
                <i />
                <span>上传管家图片</span>
            </UploadImage>
        </div>
    );
};

UploadButton.propTypes = {
    picUrl: PropTypes.string,
    onSelect: PropTypes.func,
    error: PropTypes.bool,
};

UploadButton.defaultProps = {
    error: false,
    picUrl: '',
    onSelect: () => {},
};

export default UploadButton;
