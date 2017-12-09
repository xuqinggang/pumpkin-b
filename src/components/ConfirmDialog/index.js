import React from 'react';
import PropTypes from 'prop-types';
import BaseDialog from 'components/BaseDialog/index';
import Button from 'components/Button/index';
import './style.less';

class ConfirmDialog extends BaseDialog {
    constructor(props) {
        super(props);
        this.autoBind('handleConfirm', 'handleCancel');
    }
    handleConfirm() {
        this.props.onConfirm();
    }
    handleCancel() {
        this.props.onCancel();
    }
    render() {
        const clsPrefix = 'c-confirm-dialog';
        return (
            <BaseDialog
                hide={this.props.hide}
                className={clsPrefix}
            >
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
    hide: PropTypes.bool,
    children: PropTypes.node,
    confirmText: PropTypes.string,
};

ConfirmDialog.defaultProps = {
    onCancel: () => {},
    onConfirm: () => {},
    hide: true,
    children: null,
    confirmText: '确认',
};

export default ConfirmDialog;
