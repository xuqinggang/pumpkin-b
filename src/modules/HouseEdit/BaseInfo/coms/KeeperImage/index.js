import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import UploadImage from 'components/UploadImage/index';
import { errorType } from 'base/types';
import './style.less';

class KeeperImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleSelect', 'handleDel');
    }
    handleSelect(name, file) {
        const data = new FormData();
        data.append('file', file);
        axios.post('/v1/common/pics', data)
        .then((res) => {
            const imgUrl = res.data.data.url;
            this.props.onChange({ name: this.props.name, value: imgUrl });
        });
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
            <div className={cls}>
                <UploadImage
                    picUrl={this.props.value}
                    onSelect={this.handleSelect}
                    onDel={this.handleDel}
                >
                    <i className={`${clsPrefix}--indicator icon-add`} />
                    <div className={`${clsPrefix}--text`}>上传管家图片（选填）</div>
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
