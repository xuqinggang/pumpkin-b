import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmDialog from 'components/ConfirmDialog/index';
import BaseComponent from 'components/BaseComponent/index';
import QRCode from 'components/QRCode/index';
import { hideShareLinkDialog } from 'modules/HouseManageList/actions';
import './style.less';

class ShareLinkDialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCopied: false,
        };
        this.autoBind('handleCancel', 'handleConfirm');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.hide && this.props.hide !== nextProps.hide) {
            this.setState({
                isCopied: false,
            });
        }
    }
    handleCancel() {
        this.props.dispatch(hideShareLinkDialog());
    }
    handleConfirm() {
        this.urlInput.select();
        if (document.execCommand('copy')) {
            // 复制成功
            this.setState({
                isCopied: true,
            });
        }
        // this.props.dispatch(hideShareLinkDialog());
    }
    render() {
        const clsPrefix = 'm-share-link-dialog';
        return (
            <ConfirmDialog
                hide={this.props.hide}
                confirmText="复制"
                onClose={this.handleCancel}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
                className={clsPrefix}
            >
                <div className={`${clsPrefix}--title`}>扫码分享</div>
                <QRCode url={this.props.url} />
                <div className={`${clsPrefix}--link`}>
                    <div style={{ display: 'inline-block' }}>
                        {this.state.isCopied
                            ? <span>
                                <i className="icon-right" style={{ color: '#81a678' }} />已复制：
                            </span>
                            : '分享链接：'}
                    </div>
                    <div style={{ textAlign: 'center', display: 'inline-block' }}>
                        <input
                            type="text"
                            readOnly
                            value={this.props.url}
                            ref={this.storeRef('urlInput')}
                            className={`${clsPrefix}--value`}
                        />
                    </div>

                </div>
            </ConfirmDialog>
        );
    }
}

ShareLinkDialog.propTypes = {
    hide: PropTypes.bool,
    url: PropTypes.string.isRequired,
};

ShareLinkDialog.defaultProps = {
    hide: true,
};

export default connect(
    state => ({
        url: state.houseManage.shareLinkDialog.url || '',
        hide: state.houseManage.shareLinkDialog.hide,
    }),
)(ShareLinkDialog);
