import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import UploadImage from 'components/UploadImage/index';
import './style.less';

class HouseUploadImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                isError: false,
                message: '',
            },
            loading: {
                isLoading: false,
                percent: 0,
            },
        };
        this.autoBind('handleSelect', 'handleDel');
    }
    handleSelect(dump, file) {
        const data = new FormData();
        data.append('file', file);

        const limitSizeInBytes = 10 * 1024 * 1024;
        if (file.size >= limitSizeInBytes) {
            this.setState({
                error: {
                    isError: true,
                    message: '图片大小超过10M',
                },
            });
            return;
        }

        this.setState({
            error: {
                isError: false,
                message: '',
            },
        });
        axios.post('/v1/common/pics', data, {
            onUploadProgress: (e) => {
                this.setState({
                    loading: {
                        isLoading: true,
                        percent: e.loaded / e.total,
                    },
                });
            },
        })
            .then((res) => {
                if (res.data.code === 200) {
                    const imgUrl = res.data.data.url;

                    // 图片上传成功
                    this.props.onSelect(imgUrl);
                } else {
                    this.setState({
                        error: {
                            isError: true,
                            message: res.data.msg || '图片上传失败',
                        },
                    });
                }
            })
            .catch((e) => {
                this.setState({
                    error: {
                        isError: true,
                        message: e.message,
                    },
                });
            })
            .then(() => {
                this.setState({
                    loading: {
                        isLoading: false,
                        percent: 0,
                    },
                });
            });
    }
    handleDel() {
        this.props.onDel();
    }
    render() {
        const clsPrefix = 'c-house-upload-image';
        return (
            <UploadImage
                imgUrl={this.props.imgUrl}
                onSelect={this.handleSelect}
                onDel={this.handleDel}
                loading={this.state.loading}
                error={this.state.error.isError}
                className={`${clsPrefix} ${this.props.className}`}
            >
                <i className={`${clsPrefix}--indicator icon-add`} />
                <div className={`${clsPrefix}--text`}>
                    {
                        this.state.error.isError
                            ? this.state.error.message
                            : this.props.children
                    }
                </div>
            </UploadImage>
        );
    }
}

HouseUploadImage.defaultProps = {
    className: '',
    children: null,
    imgUrl: '',
    onSelect: () => {},
    onDel: () => {},
};

HouseUploadImage.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    imgUrl: PropTypes.string,
    onSelect: PropTypes.func,
    onDel: PropTypes.func,
};

export default HouseUploadImage;
