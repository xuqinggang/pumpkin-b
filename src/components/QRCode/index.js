import qrcode from 'qrcode';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

const QRCode = ({ url, className }) => {
    const clsPrefix = 'c-qrcode';
    const cls = classNames(clsPrefix, {
        [className]: true,
    });
    const showQRCode = (node) => {
        if (node) {
            qrcode.toCanvas(node, url, { errorCorrectionLevel: 'L' }, () => {});
        }
    };
    return (
        <canvas ref={showQRCode} className={cls} />
    );
};
QRCode.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
};

QRCode.defaultProps = {
    className: '',
};

export default QRCode;
