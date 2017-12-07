import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import LoadingBar from 'components/LoadingBar/index';
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
        const { imgUrl } = this.props;
        const cls = classNames(
            clsPrefix,
            {
                [this.props.className]: true,
                [`${clsPrefix}__error`]: this.props.error,
                [`${clsPrefix}__loading`]: this.props.loading.isLoading,

            },
        );

        return (
            <div
                className={cls}
            >
                <div
                    className={`${clsPrefix}--select`}
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
                        imgUrl ?
                            <img className={`${clsPrefix}--image`} alt="图片" src={imgUrl} /> :
                            <div className={`${clsPrefix}--note`}>
                                <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                    {this.props.children}
                                </div>
                            </div>
                    }
                </div>
                { this.props.imgUrl ?
                    <div
                        role="presentation"
                        className={`${clsPrefix}--del`}
                        onClick={this.handleImageDel}
                    ><i className={`${clsPrefix}--del-content icon-delete`} /></div>
                    : null
                }
                {
                    this.props.loading.isLoading ?
                        <div
                            className={`${clsPrefix}--loading`}
                        >
                            <LoadingBar
                                className={`${clsPrefix}--loading-content`}
                                percent={this.props.loading.percent}
                            />
                        </div>
                        : null
                }
            </div>
        );
    }
}

UploadImage.defaultProps = {
    className: '',
    name: '',
    imgUrl: '',
    onSelect: () => {},
    onDel: () => {},
    error: false,
    children: null,
    loading: {
        isLoading: false,
        percent: 0,
    },
};

UploadImage.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    onSelect: PropTypes.func,
    onDel: PropTypes.func,
    error: PropTypes.bool,
    children: PropTypes.node,
    loading: PropTypes.shape({
        isLoading: PropTypes.bool,
        percent: PropTypes.number,
    }),
};

export default UploadImage;
