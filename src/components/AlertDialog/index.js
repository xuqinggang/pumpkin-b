import React from 'react';
import PropTypes from 'prop-types';
import BaseDialog from 'components/BaseDialog/index';
import Button from 'components/Button/index';
import './style.less';

class AlertDialog extends BaseDialog {
    constructor(props) {
        super(props);
        this.autoBind('handleConfirm');
    }
    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }
    render() {
        const clsPrefix = 'c-alert-dialog';
        return (
            <BaseDialog
                hide={this.props.hide}
                className={clsPrefix}
            >
                { this.props.children }
                <div className={`${clsPrefix}--operate`}>
                    <Button
                        type="confirm"
                        onClick={this.handleConfirm}
                    >{this.props.confirmText}</Button>
                </div>
            </BaseDialog>
        );
    }
}

AlertDialog.propTypes = {
    onConfirm: PropTypes.func,
    hide: PropTypes.bool,
    children: PropTypes.node,
    confirmText: PropTypes.string,
};

AlertDialog.defaultProps = {
    onConfirm: null,
    hide: true,
    children: null,
    confirmText: '确认',
};

export default AlertDialog;
