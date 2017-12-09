import qrcode from 'qrcode';
import PropTypes from 'prop-types';
import './style.less';

const QRCode = ({ url }) => {
    const clsPrefix = 'c-qrcode';
    const showQRCode = (node) => {
        if (node) {
            qrcode.toCanvas(node, url, { errorCorrectionLevel: 'L' }, () => {});
        }
    };
    return (
        <canvas ref={showQRCode} className={clsPrefix} />
    );
};
QRCode.propTypes = {
    url: PropTypes.string.isRequired,
};

export default QRCode;
