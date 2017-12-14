import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import HouseUploadImage from 'modules/HouseUploadImage/index';
import { setHouseTypeImgUrl } from '../../actions';
import './style.less';

class HouseTypeImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleSelect', 'handleDel');
    }
    handleSelect(imgUrl) {
        this.props.dispatch(setHouseTypeImgUrl(imgUrl));
    }
    handleDel() {
        this.props.dispatch(setHouseTypeImgUrl(''));
    }
    render() {
        const clsPrefix = 'c-house-type-image';
        return (
            <div className={clsPrefix}>
                <HouseUploadImage
                    imgUrl={this.props.houseTypeImgUrl}
                    onSelect={this.handleSelect}
                    onDel={this.handleDel}
                >上传房源户型图片（选填）</HouseUploadImage>
            </div>
        );
    }
}

export default connect(
    state => ({
        houseTypeImgUrl: state.houseUpload.baseInfo.houseTypeImgUrl,
    }),
)(HouseTypeImage);
