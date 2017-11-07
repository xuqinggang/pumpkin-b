import React from 'react';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import UploadImage from 'components/UploadImage/index';
import './style.less';

class KeeperImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            picUrl: '',
            error: false,
        };
        this.autoBind('handleSelect');
    }
    handleSelect({ name, file}) {

    }
    render() {
        const clsPrefix = 'c-keeper-image';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__error`]: this.state.error,
        });
        return (
            <div className={cls}>
                <UploadImage
                    picUrl={this.state.picUrl}
                    onSelect={this.handleSelect}
                >
                    <i />
                    <span>上传管家图片</span>
                </UploadImage>
                <div className={`${clsPrefix}--note`}><span>请上传管家照片</span></div>
            </div>
        );
    }
}

export default KeeperImage;
