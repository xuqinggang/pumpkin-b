import React from 'react';
import classNames from 'classnames';
import UploadImage from 'components/UploadImage/index';
import PropTypes from 'prop-types';
import './style.less';

const UploadButton = ({ picUrl, onSelect, error }) => {
    const clsPrefix = 'c-keeper-image';
    const cls = classNames(clsPrefix, {
        [`${clsPrefix}__error`]: error,
    });
    return (
        <div className={cls}>
            <UploadImage
                picUrl={picUrl}
                error={error}
                onSelect={onSelect}
            >
                <i />
                <span>上传管家图片</span>
            </UploadImage>
            <div className={`${clsPrefix}--note`}><span>请上传管家照片</span></div>
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
