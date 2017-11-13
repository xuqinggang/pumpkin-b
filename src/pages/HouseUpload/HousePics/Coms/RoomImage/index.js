import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import UploadImage from 'components/UploadImage/index';
import BaseComponent from 'components/BaseComponent/index';
import PropTypes from 'prop-types';
import { uploadPics, removePics } from '../../actions';
import './style.less';

class RoomImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleImageSelect', 'handleImageDel');
    }
    handleImageSelect(dump, file) {
        const {
            name,
            coords,
        } = this.props;
        const picUrl = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4234467682,519299782&fm=27&gp=0.jpg';
        if (this.props.forAdd) {
            this.props.dispatch(uploadPics(name, coords, picUrl));
        }
    }
    handleImageDel() {
        const {
            name,
            coords,
        } = this.props;
        this.props.dispatch(removePics(name, coords));
    }
    render() {
        const clsPrefix = 'c-room-image';
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

RoomImage.propTypes = {
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
    children: PropTypes.node,
    error: PropTypes.bool,
    forAdd: PropTypes.bool,

};

RoomImage.defaultProps = {
    name: '',
    coords: [0, 0],
    children: null,
    error: false,
    forAdd: false,
};

export default connect(
    (state, props) => {
        const {
            name,
            coords,
        } = props;
        let picUrl = '';
        if (!props.forAdd) {
            picUrl = state.houseUpload.housePics[name][coords[0]][coords[1]];
        }
        return {
            picUrl,
        };
    },
)(RoomImage);
