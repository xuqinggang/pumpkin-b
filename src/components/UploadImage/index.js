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
            'handleImageDel',
        );
    }

    handleClick() {
        this.inputFile.click();
    }
    handleImageDel() {
        this.props.onDel();
    }
    handleFileChange() {
        const { files } = this.inputFile;
        if (files.length === 0) {
            return;
        }
        this.props.onSelect(this.props.name, files[0]);
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
            >
                <div
                    className={`${cls}--select`}
                    role="presentation"
                    onClick={this.handleClick}
                >
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={this.storeRef('inputFile')}
                        name="apic"
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple
                        onChange={this.handleFileChange}
                    />
                    {
                        picUrl ?
                            <img height="100%" width="100%" alt="pic" src={picUrl} /> :
                            <div className={`${clsPrefix}--note`}>
                                <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                    {this.props.children}
                                </div>
                            </div>
                    }
                </div>
                { this.props.picUrl ?
                    <div
                        role="presentation"
                        className={`${cls}--del`}
                        onClick={this.handleImageDel}
                    ><i className={`${cls}--del-note icon-delete`} /></div>
                    : null
                }
            </div>
        );
    }
}

UploadImage.defaultProps = {
    name: '',
    picUrl: '',
    onSelect: () => {},
    onDel: () => {},
    error: false,
    children: null,
};

UploadImage.propTypes = {
    name: PropTypes.string,
    picUrl: PropTypes.string,
    onSelect: PropTypes.func,
    onDel: PropTypes.func,
    error: PropTypes.bool,
    children: PropTypes.node,
};

export default UploadImage;
