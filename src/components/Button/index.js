/**
 * @description 按钮组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent/index';
import { uiSizeType } from '../../base/types';
import './index.less';

class Button extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick() {
        if (this.props.onClick && !this.props.disabled) {
            // 组件为加载类型
            if (this.props.status === 'loading') return;
            this.props.onClick();
        }
    }

    render() {
        const clsPrefix = 'c-button';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__${this.props.type}`]: true,
            [`${clsPrefix}__${this.props.size}`]: true,
            [`${clsPrefix}__disabled`]: this.props.disabled,
        });
        return (
            <button className={cls} onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}

Button.defaultProps = {
    type: 'normal',
    size: 'normal',
    disabled: false,
    onClick: null,
    className: '',
};

Button.propTypes = {
    type: PropTypes.oneOf(['normal', 'confirm', 'danger', 'dashed', 'shadow']),
    size: uiSizeType,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
