import React from 'react';
import PropTypes from 'prop-types';
import BaseDialog from 'components/BaseDialog/index';
import Button from 'components/Button/index';
import './style.less';

class ConfirmDialog extends BaseDialog {
    constructor(props) {
        super(props);
        this.autoBind('handleConfirm', 'handleCancel', 'handleClose');
    }
    handleConfirm() {
        this.props.onConfirm();
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleClose() {
        this.props.onClose();
    }
    render() {
        const clsPrefix = 'c-confirm-dialog';
        return (
            <BaseDialog
                hide={this.props.hide}
                className={clsPrefix}
            >
                {
                    this.props.onClose
                    ? (
                        <i
                            role="button"
                            tabIndex={0}
                            className={`${clsPrefix}--close icon-error-login`}
                            onClick={this.handleClose}
                        />
                    )
                    : null

                }
                { this.props.children }
                <div className={`${clsPrefix}--operate`}>
                    <Button
                        className={`${clsPrefix}--cancel`}
                        onClick={this.handleCancel}
                    >取消</Button>
                    <Button
                        type="confirm"
                        onClick={this.handleConfirm}
                    >{this.props.confirmText}</Button>
                </div>
            </BaseDialog>
        );
    }
}

ConfirmDialog.propTypes = {
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    hide: PropTypes.bool,
    children: PropTypes.node,
    confirmText: PropTypes.string,
};

ConfirmDialog.defaultProps = {
    onCancel: () => {},
    onConfirm: () => {},
    onClose: null,
    hide: true,
    children: null,
    confirmText: '确认',
};

export default ConfirmDialog;
