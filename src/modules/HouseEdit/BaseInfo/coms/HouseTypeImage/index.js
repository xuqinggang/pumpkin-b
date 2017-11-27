import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BaseComponent from 'components/BaseComponent/index';
import UploadImage from 'components/UploadImage/index';
import { setHouseTypeImgUrl } from '../../actions';
import './style.less';

class HouseTypeImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleSelect');
    }
    handleSelect(dump, file) {
        const data = new FormData();
        data.append('file', file);
        axios.post('/v1/common/pics', data)
        .then((res) => {
            const imgUrl = res.data.data.url;
            this.props.dispatch(setHouseTypeImgUrl(imgUrl));
        });
    }
    render() {
        const clsPrefix = 'c-house-type-image';
        return (
            <div className={clsPrefix}>
                <UploadImage
                    picUrl={this.props.houseTypeImgUrl}
                    onSelect={this.handleSelect}
                >
                    <i className={`${clsPrefix}--indicator icon-add`} />
                    <div className={`${clsPrefix}--text`}>上传房源户型图片</div>
                </UploadImage>
            </div>
        );
    }
}

export default connect(
    state => ({
        houseTypeImgUrl: state.houseUpload.baseInfo.houseTypeImgUrl,
    }),
)(HouseTypeImage);
