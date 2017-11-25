import React from 'react';
import axios from 'axios';
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
    handleImageSelect(dump, file) {
        const {
            name,
            coords,
        } = this.props;

        if (this.props.forAdd) {
            const data = new FormData();
            data.append('file', file);
            axios.post('/v1/common/pics', data)
            .then((res) => {
                const imgUrl = res.data.data.url;
                this.props.onAdd({ name, coords, value: imgUrl });
            });
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
                    ><i className={`${cls}--del-note icon-delete`} /></div>
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
