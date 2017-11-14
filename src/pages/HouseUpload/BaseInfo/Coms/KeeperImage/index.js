import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import UploadImage from 'components/UploadImage/index';
import { errorType } from 'base/types';
import './style.less';

class KeeperImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleSelect');
    }
    handleSelect({ name, file }) {
        const fakeImgUrl = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2236350875,3008024805&fm=27&gp=0.jpg';
        this.props.onChange({ name: this.props.name, value: fakeImgUrl });
    }
    render() {
        const clsPrefix = 'c-keeper-image';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__error`]: this.props.error,
        });
        return (
            <div className={cls}>
                <UploadImage
                    picUrl={this.props.value}
                    onSelect={this.handleSelect}
                >
                    <i />
                    <span>上传管家图片</span>
                </UploadImage>
                <div className={`${clsPrefix}--note`}><span>{this.props.error.message}</span></div>
            </div>
        );
    }
}
KeeperImage.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: errorType,
};

KeeperImage.defaultProps = {
    name: '',
    value: '',
    onChange: () => {},
    error: {
        error: false,
        message: '',
    },
};

export default KeeperImage;
