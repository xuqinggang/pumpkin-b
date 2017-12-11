import React from 'react';
import QRCode from 'components/QRCode/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/Button/index';
import { showMessage } from 'modules/Message/actions';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class RentalUnitQRCode extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleCopyLink');
    }
    handleCopyLink() {
        this.urlInput.select();
        if (document.execCommand('copy')) {
            this.props.dispatch(showMessage(`分享链接（${this.props.title}）已复制`));
        }
    }
    render() {
        const clsPrefix = 'm-rental-unit-qrcode';
        return (
            <div className={clsPrefix}>
                <h3>{this.props.title}</h3>
                <QRCode
                    url={this.props.url}
                    className={`${clsPrefix}--qrcode`}
                />
                <input
                    type="text"
                    readOnly
                    value={this.props.url}
                    ref={this.storeRef('urlInput')}
                    className={`${clsPrefix}--value`}
                />
                <Button
                    className={`${clsPrefix}--btn`}
                    onClick={this.handleCopyLink}
                    type="confirm"
                >复制</Button>
            </div>
        );
    }
}

RentalUnitQRCode.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
};

RentalUnitQRCode.defaultProps = {
    title: '',
};

export default connect()(RentalUnitQRCode);
