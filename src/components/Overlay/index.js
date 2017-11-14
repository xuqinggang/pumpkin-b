import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class Overlay extends BaseComponent {
    render() {
        const clsPrefix = 'c-overlay';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__modal`]: this.props.modal,
            [`${clsPrefix}__hide`]: this.props.hide,
        });
        const contentCls = classNames(`${clsPrefix}--content`, {
            [this.props.className]: true,
        });
        return (
            <div className={cls}>
                <div className={contentCls} >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Overlay.defaultProps = {
    modal: false,
    hide: false,
};

Overlay.propTypes = {
    modal: PropTypes.bool,
    hide: PropTypes.bool,
};

export default Overlay;
