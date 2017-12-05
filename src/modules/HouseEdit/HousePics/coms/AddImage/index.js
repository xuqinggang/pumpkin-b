import React from 'react';
import classNames from 'classnames';
import HouseUploadImage from 'modules/HouseUploadImage/index';
import BaseComponent from 'components/BaseComponent/index';
import PropTypes from 'prop-types';
import './style.less';

class AddImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleImageSelect', 'handleImageDel');
    }
    handleImageSelect(imgUrl) {
        const {
            name,
            coords,
        } = this.props;

        if (this.props.forAdd) {
            this.props.onAdd({ name, coords, value: imgUrl });
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
                <HouseUploadImage
                    imgUrl={this.props.imgUrl}
                    onSelect={this.handleImageSelect}
                    onDel={this.handleImageDel}
                >
                    <div>
                        {this.props.children}
                    </div>
                </HouseUploadImage>
            </div>
        );
    }
}

AddImage.propTypes = {
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
    error: PropTypes.bool,
    forAdd: PropTypes.bool,
    onAdd: PropTypes.func,
    onDel: PropTypes.func,
};

AddImage.defaultProps = {
    name: '',
    imgUrl: '',
    coords: [0, 0],
    error: false,
    forAdd: false,
    onAdd: () => {},
    onDel: () => {},
};

export default AddImage;
