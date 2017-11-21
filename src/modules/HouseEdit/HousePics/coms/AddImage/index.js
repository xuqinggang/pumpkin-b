import React from 'react';
import classNames from 'classnames';
import UploadImage from 'components/UploadImage/index';
import BaseComponent from 'components/BaseComponent/index';
import PropTypes from 'prop-types';
import './style.less';

class AddImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleImageSelect', 'handleImageDel');
    }
    handleImageSelect() {
        const {
            name,
            coords,
        } = this.props;
        const picUrl = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4234467682,519299782&fm=27&gp=0.jpg';
        if (this.props.forAdd) {
            this.props.onAdd({ name, coords, value: picUrl });
        }
    }
    handleImageDel() {
        const {
            name,
            coords,
        } = this.props;
        this.props.onDel({ name, coords });
    }
    render() {
        const clsPrefix = 'c-add-image';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__error`]: this.props.error,
        });
        return (
            <div className={cls}>
                <UploadImage
                    picUrl={this.props.picUrl}
                    onSelect={this.handleImageSelect}
                >
                    <i />
                    {this.props.children}
                </UploadImage>
                { this.props.picUrl ?
                    <div
                        role="presentation"
                        className={`${cls}--del-wrap`}
                        onClick={this.handleImageDel}
                    ><span className={`${cls}--del-note`}>删除</span></div>
                    : null
                }
            </div>
        );
    }
}

AddImage.propTypes = {
    name: PropTypes.string,
    picUrl: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
    error: PropTypes.bool,
    forAdd: PropTypes.bool,
    onAdd: PropTypes.func,
    onDel: PropTypes.func,
};

AddImage.defaultProps = {
    name: '',
    picUrl: '',
    coords: [0, 0],
    error: false,
    forAdd: false,
    onAdd: () => {},
    onDel: () => {},
};

export default AddImage;
