import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class UploadImage extends BaseComponent {

    constructor(props) {
        super(props);
        this.autoBind(
            'handleClick',
            'handleFileChange',
        );
    }

    handleClick() {
        this.inputFile.click();
    }

    handleFileChange() {
        const { name, files } = this.inputFile;
        if (files.length === 0) {
            return;
        }
        this.props.onSelect(name, files[0]);
        this.inputFile.value = null;
    }

    render() {
        const clsPrefix = 'c-upload-image';
        const { picUrl } = this.props;
        const cls = classNames(
            clsPrefix,
            {
                [`${clsPrefix}__error`]: this.props.error,
            },
        );

        return (
            <div
                className={cls}
                role="presentation"
                onClick={this.handleClick}
            >
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={this.storeRef('inputFile')}
                    name="apic"
                    accept="image/x-png,image/gif,image/jpeg"
                    multiple="multiple"
                    onChange={this.handleFileChange}
                />
                {
                    picUrl ?
                        <img height="100%" width="100%" alt="pic" src={picUrl} /> :
                        <div className={`${clsPrefix}--note`}>
                            {this.props.children}
                        </div>
                }
            </div>
        );
    }
}

UploadImage.defaultProps = {
    picUrl: '',
    onSelect: () => {},
    error: false,
    children: null,
};

UploadImage.propTypes = {
    picUrl: PropTypes.string,
    onSelect: PropTypes.func,
    error: PropTypes.bool,
    children: PropTypes.node,
};

export default UploadImage;