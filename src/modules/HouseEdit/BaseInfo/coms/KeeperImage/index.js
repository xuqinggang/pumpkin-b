import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import HouseUploadImage from 'modules/HouseUploadImage/index';
import { errorType } from 'base/types';
import './style.less';

class KeeperImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleSelect', 'handleDel');
    }
    handleSelect(imgUrl) {
        this.props.onChange({ name: this.props.name, value: imgUrl });
    }
    handleDel() {
        this.props.onDel();
    }
    render() {
        const clsPrefix = 'c-keeper-image';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__error`]: this.props.error,
        });
        return (
            <div
                className={cls}
            >
                <HouseUploadImage
                    imgUrl={this.props.value}
                    onSelect={this.handleSelect}
                    onDel={this.handleDel}
                    className={`${clsPrefix}--uploader`}
                >
                    <div>上传管家图片</div>
                    <div>(选填）</div>
                </HouseUploadImage>
                <div className={`${clsPrefix}--note`}><span>{this.props.error.message}</span></div>
            </div>
        );
    }
}
KeeperImage.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onDel: PropTypes.func,
    error: errorType,
};

KeeperImage.defaultProps = {
    name: '',
    value: '',
    onChange: () => {},
    onDel: () => {},
    error: {
        error: false,
        message: '',
    },
};

export default KeeperImage;
