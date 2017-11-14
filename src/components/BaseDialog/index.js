import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Overlay from 'components/Overlay/index';
import './style.less';

class BaseDialog extends BaseComponent {
    render() {
        const stateClass = {};
        if (this.props.position) {
            stateClass[this.props.position] = true;
        }
        const clsPrefix = 'c-base-dialog';
        const containerCls = classNames(`${clsPrefix}--container`, {
            [`${clsPrefix}--container__${this.props.position}`]: this.props.position,
        });
        return (
            <Overlay
                modal={this.props.modal}
                hide={this.props.hide}
                className={clsPrefix}
            >
                <div className={containerCls}>
                    <div className={this.props.className}>
                        {this.props.children}
                    </div>
                </div>
            </Overlay>
        );
    }
}

BaseDialog.defaultProps = {
    hide: false,
    modal: true,
};

BaseDialog.propTypes = {
    position: PropTypes.oneOf(['bottom', 'top']),
    hide: PropTypes.bool,
    modal: PropTypes.bool,
};

export default BaseDialog;
